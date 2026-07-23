import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { initializeTestEnvironment, assertFails, assertSucceeds, type RulesTestEnvironment } from "@firebase/rules-unit-testing";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { getBytes, ref, uploadBytes } from "firebase/storage";

let testEnv: RulesTestEnvironment;

const projectId = "demo-flight-academy-simulator-rules";

beforeAll(async () => {
  testEnv = await initializeTestEnvironment({
    projectId,
    firestore: {
      rules: readFileSync(resolve("firestore.rules"), "utf8")
    },
    storage: {
      rules: readFileSync(resolve("storage.rules"), "utf8")
    }
  });
});

afterEach(async () => {
  await testEnv.clearFirestore();
  await testEnv.clearStorage();
});

afterAll(async () => {
  await testEnv.cleanup();
});

describe("Firestore Security Rules", () => {
  it("bloqueia usuário não autenticado em dados privados", async () => {
    await seedPrivateProgress("student-a");
    const db = testEnv.unauthenticatedContext().firestore();
    await assertFails(getDoc(doc(db, "userCourseProgress", "student-a_course")));
  });

  it("permite aluno ler curso publicado", async () => {
    await seedCourse("course-published", "published");
    const db = testEnv.authenticatedContext("student-a", { role: "student" }).firestore();
    await assertSucceeds(getDoc(doc(db, "courses", "course-published")));
  });

  it("bloqueia aluno lendo curso em rascunho", async () => {
    await seedCourse("course-draft", "draft");
    const db = testEnv.authenticatedContext("student-a", { role: "student" }).firestore();
    await assertFails(getDoc(doc(db, "courses", "course-draft")));
  });

  it("permite aluno alterar o próprio progresso", async () => {
    const db = testEnv.authenticatedContext("student-a", { role: "student" }).firestore();
    await assertSucceeds(setDoc(doc(db, "userCourseProgress", "student-a_course"), privateProgress("student-a")));
  });

  it("permite duas atualizações rápidas no mesmo progresso sem duplicar documento", async () => {
    const db = testEnv.authenticatedContext("student-a", { role: "student" }).firestore();
    const progressRef = doc(db, "userCourseProgress", "student-a_course");
    await assertSucceeds(setDoc(progressRef, privateProgress("student-a")));
    await assertSucceeds(setDoc(progressRef, { ...privateProgress("student-a"), completedLessonIds: ["lesson-a", "lesson-b"] }, { merge: true }));
    const snapshot = await getDoc(progressRef);
    expect(snapshot.data()?.completedLessonIds).toEqual(["lesson-a", "lesson-b"]);
  });

  it("bloqueia aluno alterando progresso de outro usuário", async () => {
    const db = testEnv.authenticatedContext("student-a", { role: "student" }).firestore();
    await assertFails(setDoc(doc(db, "userCourseProgress", "student-b_course"), privateProgress("student-b")));
  });

  it("bloqueia aluno editando curso", async () => {
    const db = testEnv.authenticatedContext("student-a", { role: "student" }).firestore();
    await assertFails(setDoc(doc(db, "courses", "course-new"), publishedCourse("course-new")));
  });

  it("bloqueia aluno alterando o próprio papel", async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), "users", "student-a"), userProfile("student-a", "student"));
    });
    const db = testEnv.authenticatedContext("student-a", { role: "student" }).firestore();
    await assertFails(updateDoc(doc(db, "users", "student-a"), { role: "admin" }));
  });

  it("bloqueia aluno marcando conteúdo como verified", async () => {
    const db = testEnv.authenticatedContext("student-a", { role: "student" }).firestore();
    await assertFails(setDoc(doc(db, "courses", "course-verified"), verifiedCourse("course-verified")));
  });

  it("permite instrutor editar conteúdo permitido sem marcar verified", async () => {
    const db = testEnv.authenticatedContext("instructor-a", { role: "instructor" }).firestore();
    await assertSucceeds(setDoc(doc(db, "courses", "course-instructor"), publishedCourse("course-instructor")));
  });

  it("bloqueia instrutor marcando conteúdo como verified", async () => {
    const db = testEnv.authenticatedContext("instructor-a", { role: "instructor" }).firestore();
    await assertFails(setDoc(doc(db, "courses", "course-instructor-verified"), verifiedCourse("course-instructor-verified")));
  });

  it("permite administrador gerenciar conteúdo verificado", async () => {
    const db = testEnv.authenticatedContext("admin-a", { role: "admin" }).firestore();
    await assertSucceeds(setDoc(doc(db, "courses", "course-admin-verified"), verifiedCourse("course-admin-verified")));
  });

  it("bloqueia gravação privada com campos inválidos", async () => {
    const db = testEnv.authenticatedContext("student-a", { role: "student" }).firestore();
    await assertFails(setDoc(doc(db, "userCourseProgress", "student-a_invalid"), { ...privateProgress("student-a"), role: "admin" }));
  });

  it("bloqueia gravação privada com timestamp inválido", async () => {
    const db = testEnv.authenticatedContext("student-a", { role: "student" }).firestore();
    await assertFails(setDoc(doc(db, "userCourseProgress", "student-a_bad_timestamp"), { ...privateProgress("student-a"), updatedAt: 123 }));
  });

  it("permite criação e leitura do próprio perfil", async () => {
    const db = testEnv.authenticatedContext("student-a", { role: "student" }).firestore();
    await assertSucceeds(setDoc(doc(db, "users", "student-a"), userProfile("student-a", "student")));
    await assertSucceeds(getDoc(doc(db, "users", "student-a")));
  });

  it("permite alterar campos permitidos do próprio perfil", async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), "users", "student-a"), userProfile("student-a", "student"));
    });
    const db = testEnv.authenticatedContext("student-a", { role: "student" }).firestore();
    await assertSucceeds(updateDoc(doc(db, "users", "student-a"), { displayName: "Aluno Atualizado", onboardingCompleted: true, updatedAt: "2026-07-23T00:00:00.000Z" }));
  });

  it("bloqueia aluno alterando UID do perfil", async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), "users", "student-a"), userProfile("student-a", "student"));
    });
    const db = testEnv.authenticatedContext("student-a", { role: "student" }).firestore();
    await assertFails(updateDoc(doc(db, "users", "student-a"), { uid: "student-b" }));
  });

  it("bloqueia acesso ao perfil de outro usuário", async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), "users", "student-b"), userProfile("student-b", "student"));
    });
    const db = testEnv.authenticatedContext("student-a", { role: "student" }).firestore();
    await assertFails(getDoc(doc(db, "users", "student-b")));
  });

  it("bloqueia gravações privadas cruzadas em tentativas, revisão, checklist e treinamento", async () => {
    const db = testEnv.authenticatedContext("student-a", { role: "student" }).firestore();
    await assertFails(setDoc(doc(db, "exerciseAttempts", "attempt-b"), privateAttempt("student-b")));
    await assertFails(setDoc(doc(db, "assessmentAttempts", "assessment-b"), privateAssessmentAttempt("student-b")));
    await assertFails(setDoc(doc(db, "reviewItems", "review-b"), privateReviewItem("student-b")));
    await assertFails(setDoc(doc(db, "userChecklistSessions", "checklist-b"), privateChecklistSession("student-b")));
    await assertFails(setDoc(doc(db, "userTrainingRecords", "training-b"), privateTrainingRecord("student-b")));
  });

  it("permite gravações privadas próprias em tentativas, revisão, checklist e treinamento", async () => {
    const db = testEnv.authenticatedContext("student-a", { role: "student" }).firestore();
    await assertSucceeds(setDoc(doc(db, "exerciseAttempts", "attempt-a"), privateAttempt("student-a")));
    await assertSucceeds(setDoc(doc(db, "assessmentAttempts", "assessment-a"), privateAssessmentAttempt("student-a")));
    await assertSucceeds(setDoc(doc(db, "reviewItems", "review-a"), privateReviewItem("student-a")));
    await assertSucceeds(setDoc(doc(db, "userChecklistSessions", "checklist-a"), privateChecklistSession("student-a")));
    await assertSucceeds(setDoc(doc(db, "userTrainingRecords", "training-a"), privateTrainingRecord("student-a")));
  });
});

describe("Storage Security Rules", () => {
  it("bloqueia upload não autenticado", async () => {
    const storage = testEnv.unauthenticatedContext().storage();
    await assertFails(uploadBytes(ref(storage, "profilePhotos/student-a/avatar.png"), imageBlob("image/png")));
  });

  it("bloqueia aluno enviando imagem administrativa", async () => {
    const storage = testEnv.authenticatedContext("student-a", { role: "student" }).storage();
    await assertFails(uploadBytes(ref(storage, "courseImages/course-a/main.png"), imageBlob("image/png")));
  });

  it("permite administrador enviar imagem de curso válida", async () => {
    const storage = testEnv.authenticatedContext("admin-a", { role: "admin" }).storage();
    await assertSucceeds(uploadBytes(ref(storage, "courseImages/course-a/main.png"), imageBlob("image/png")));
  });

  it("bloqueia upload com tipo inválido", async () => {
    const storage = testEnv.authenticatedContext("admin-a", { role: "admin" }).storage();
    await assertFails(uploadBytes(ref(storage, "courseImages/course-a/main.txt"), imageBlob("text/plain")));
  });

  it("bloqueia upload acima do limite", async () => {
    const storage = testEnv.authenticatedContext("admin-a", { role: "admin" }).storage();
    const oversized = new Blob([new Uint8Array(6 * 1024 * 1024)], { type: "image/png" });
    await assertFails(uploadBytes(ref(storage, "courseImages/course-a/large.png"), oversized));
  });

  it("bloqueia leitura de foto privada de outro usuário", async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await uploadBytes(ref(context.storage(), "profilePhotos/student-b/avatar.png"), imageBlob("image/png"));
    });
    const storage = testEnv.authenticatedContext("student-a", { role: "student" }).storage();
    await assertFails(getBytes(ref(storage, "profilePhotos/student-b/avatar.png")));
  });
});

async function seedCourse(id: string, publicationState: "published" | "draft") {
  await testEnv.withSecurityRulesDisabled(async (context) => {
    await setDoc(doc(context.firestore(), "courses", id), { ...publishedCourse(id), publicationState });
  });
}

async function seedPrivateProgress(userId: string) {
  await testEnv.withSecurityRulesDisabled(async (context) => {
    await setDoc(doc(context.firestore(), "userCourseProgress", `${userId}_course`), privateProgress(userId));
  });
}

function publishedCourse(id: string) {
  return {
    id,
    slug: id,
    title: "Curso publicado",
    publicationState: "published",
    order: 1,
    technicalMetadata: {
      contentClassification: "provisional_unverified",
      verificationStatus: "pending_verification"
    }
  };
}

function verifiedCourse(id: string) {
  return {
    ...publishedCourse(id),
    technicalMetadata: {
      contentClassification: "official_real_world",
      verificationStatus: "verified"
    }
  };
}

function privateProgress(userId: string) {
  return {
    id: `${userId}_course`,
    userId,
    courseId: "course-fundamentos-pilotagem",
    completedLessonIds: ["lesson-a"],
    updatedAt: "2026-07-23T00:00:00.000Z"
  };
}

function privateAttempt(userId: string) {
  return {
    id: `attempt-${userId}`,
    userId,
    courseId: "course-fundamentos-pilotagem",
    moduleId: "module-a",
    lessonId: "lesson-a",
    exerciseId: "exercise-a",
    answer: "Resposta",
    score: 1,
    maxScore: 1,
    attemptNumber: 1,
    createdAt: "2026-07-23T00:00:00.000Z",
    updatedAt: "2026-07-23T00:00:00.000Z"
  };
}

function privateAssessmentAttempt(userId: string) {
  return {
    id: `assessment-${userId}`,
    userId,
    courseId: "course-fundamentos-pilotagem",
    assessmentId: "assessment-a",
    questionIds: ["q1"],
    answers: { q1: "Resposta" },
    score: 1,
    maxScore: 1,
    percentage: 100,
    passed: true,
    weakConcepts: [],
    modulesToReview: [],
    attemptNumber: 1,
    startedAt: "2026-07-23T00:00:00.000Z",
    completedAt: "2026-07-23T00:00:00.000Z",
    unlockedCourseIds: []
  };
}

function privateReviewItem(userId: string) {
  return {
    id: `review-${userId}`,
    userId,
    courseId: "course-fundamentos-pilotagem",
    type: "wrong_question",
    title: "Revisar",
    description: "Pergunta errada",
    status: "active",
    createdAt: "2026-07-23T00:00:00.000Z"
  };
}

function privateChecklistSession(userId: string) {
  return {
    id: `checklist-${userId}`,
    userId,
    checklistId: "checklist-a",
    completedItemIds: ["item-a"],
    mode: "study",
    progressPercent: 50,
    updatedAt: "2026-07-23T00:00:00.000Z"
  };
}

function privateTrainingRecord(userId: string) {
  return {
    id: `training-${userId}`,
    userId,
    trainingId: "training-a",
    studentReport: "Relato",
    personalNote: "Nota",
    status: "completed",
    updatedAt: "2026-07-23T00:00:00.000Z"
  };
}

function userProfile(uid: string, role: "student" | "instructor" | "admin") {
  return {
    uid,
    displayName: "Aluno",
    email: `${uid}@example.com`,
    role,
    createdAt: "2026-07-23T00:00:00.000Z",
    updatedAt: "2026-07-23T00:00:00.000Z",
    lastLoginAt: "2026-07-23T00:00:00.000Z",
    migrationCompleted: false,
    onboardingCompleted: false
  };
}

function imageBlob(contentType: string) {
  return new Blob([new Uint8Array([1, 2, 3])], { type: contentType });
}
