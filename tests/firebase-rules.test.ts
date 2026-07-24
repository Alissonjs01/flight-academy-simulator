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

  it("bloqueia aluno lendo conteúdo arquivado mesmo com publicationState publicado", async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), "courses", "course-archived"), { ...publishedCourse("course-archived"), archivedAt: "2026-07-23T00:00:00.000Z" });
    });
    const db = testEnv.authenticatedContext("student-a", { role: "student" }).firestore();
    await assertFails(getDoc(doc(db, "courses", "course-archived")));
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
    await assertFails(setDoc(doc(db, "courses", "course-new"), publishedCourse("course-new", "student-a")));
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
    await assertFails(setDoc(doc(db, "courses", "course-verified"), verifiedCourse("course-verified", "student-a")));
  });

  it("permite instrutor criar rascunho e editar conteúdo permitido sem marcar verified", async () => {
    const db = testEnv.authenticatedContext("instructor-a", { role: "instructor" }).firestore();
    await assertSucceeds(setDoc(doc(db, "courses", "course-instructor"), draftCourse("course-instructor", "instructor-a")));
    await assertSucceeds(updateDoc(doc(db, "courses", "course-instructor"), { title: "Curso atualizado", updatedAt: "2026-07-23T00:01:00.000Z", updatedBy: "instructor-a" }));
  });

  it("bloqueia instrutor marcando conteúdo como verified", async () => {
    const db = testEnv.authenticatedContext("instructor-a", { role: "instructor" }).firestore();
    await assertFails(setDoc(doc(db, "courses", "course-instructor-verified"), verifiedCourse("course-instructor-verified", "instructor-a")));
  });

  it("permite administrador publicar conteúdo e marcar verified", async () => {
    const db = testEnv.authenticatedContext("admin-a", { role: "admin" }).firestore();
    await assertSucceeds(setDoc(doc(db, "courses", "course-admin-verified"), verifiedCourse("course-admin-verified", "admin-a")));
  });

  it("permite administrador gerenciar papéis sem permitir aluno fazer o mesmo", async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), "users", "student-a"), userProfile("student-a", "student"));
    });
    const adminDb = testEnv.authenticatedContext("admin-a", { role: "admin" }).firestore();
    const studentDb = testEnv.authenticatedContext("student-a", { role: "student" }).firestore();
    await assertSucceeds(updateDoc(doc(adminDb, "users", "student-a"), { role: "instructor", updatedAt: "2026-07-23T00:02:00.000Z" }));
    await assertFails(updateDoc(doc(studentDb, "users", "student-a"), { role: "admin" }));
  });

  it("bloqueia alteração de createdBy e createdAt em conteúdo existente", async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), "courses", "course-created"), draftCourse("course-created", "instructor-a"));
    });
    const db = testEnv.authenticatedContext("instructor-a", { role: "instructor" }).firestore();
    await assertFails(updateDoc(doc(db, "courses", "course-created"), { createdBy: "other", updatedAt: "2026-07-23T00:03:00.000Z", updatedBy: "instructor-a" }));
    await assertFails(updateDoc(doc(db, "courses", "course-created"), { createdAt: "2026-07-24T00:00:00.000Z", updatedAt: "2026-07-23T00:03:00.000Z", updatedBy: "instructor-a" }));
  });

  it("bloqueia publicação técnica sem classificação", async () => {
    const db = testEnv.authenticatedContext("admin-a", { role: "admin" }).firestore();
    await assertFails(setDoc(doc(db, "lessons", "lesson-no-classification"), {
      id: "lesson-no-classification",
      title: "Aula sem metadados",
      publicationState: "published",
      createdAt: "2026-07-23T00:00:00.000Z",
      updatedAt: "2026-07-23T00:00:00.000Z",
      createdBy: "admin-a",
      updatedBy: "admin-a"
    }));
  });

  it("permite conteúdo técnico provisório corretamente classificado", async () => {
    const db = testEnv.authenticatedContext("instructor-a", { role: "instructor" }).firestore();
    await assertSucceeds(setDoc(doc(db, "lessons", "lesson-provisional"), {
      id: "lesson-provisional",
      title: "Aula provisória",
      publicationState: "published",
      createdAt: "2026-07-23T00:00:00.000Z",
      updatedAt: "2026-07-23T00:00:00.000Z",
      createdBy: "instructor-a",
      updatedBy: "instructor-a",
      technicalMetadata: {
        contentClassification: "provisional_unverified",
        verificationStatus: "pending_verification"
      }
    }));
  });

  it("permite instrutor criar sistema de aeronave provisório", async () => {
    const db = testEnv.authenticatedContext("instructor-a", { role: "instructor" }).firestore();
    await assertSucceeds(setDoc(doc(db, "aircraftSystems", "system-a"), technicalAircraftContent("system-a", "instructor-a", "draft")));
  });

  it("bloqueia aluno criando limitação técnica", async () => {
    const db = testEnv.authenticatedContext("student-a", { role: "student" }).firestore();
    await assertFails(setDoc(doc(db, "aircraftLimitations", "lim-a"), technicalAircraftContent("lim-a", "student-a", "draft")));
  });

  it("bloqueia publicação de limitação sem variante", async () => {
    const db = testEnv.authenticatedContext("admin-a", { role: "admin" }).firestore();
    await assertFails(setDoc(doc(db, "aircraftLimitations", "lim-no-variant"), {
      ...technicalAircraftContent("lim-no-variant", "admin-a", "published"),
      aircraftVariant: ""
    }));
  });

  it("bloqueia verified sem fonte técnica identificável mesmo para admin", async () => {
    const db = testEnv.authenticatedContext("admin-a", { role: "admin" }).firestore();
    await assertFails(setDoc(doc(db, "aircraftLimitations", "lim-verified-no-source"), {
      ...technicalAircraftContent("lim-verified-no-source", "admin-a", "published"),
      aircraftVariant: "Variante",
      technicalMetadata: {
        contentClassification: "official_real_world",
        verificationStatus: "verified"
      }
    }));
  });

  it("permite admin marcar verified quando há fonte técnica", async () => {
    const db = testEnv.authenticatedContext("admin-a", { role: "admin" }).firestore();
    await assertSucceeds(setDoc(doc(db, "aircraftLimitations", "lim-verified-source"), {
      ...technicalAircraftContent("lim-verified-source", "admin-a", "published"),
      aircraftVariant: "Variante",
      technicalMetadata: {
        contentClassification: "official_real_world",
        verificationStatus: "verified",
        sourceTitle: "AFM aplicável à variante",
        sourceOrganization: "Fabricante"
      }
    }));
  });

  it("bloqueia instrutor marcando procedimento como verified", async () => {
    const db = testEnv.authenticatedContext("instructor-a", { role: "instructor" }).firestore();
    await assertFails(setDoc(doc(db, "aircraftProcedures", "proc-verified"), {
      ...technicalAircraftContent("proc-verified", "instructor-a", "published"),
      technicalMetadata: {
        contentClassification: "official_real_world",
        verificationStatus: "verified",
        sourceTitle: "AFM aplicável à variante"
      }
    }));
  });

  it("permite auditoria append-only para editor autorizado", async () => {
    const db = testEnv.authenticatedContext("instructor-a", { role: "instructor" }).firestore();
    const auditRef = doc(db, "auditLogs", "audit-a");
    await assertSucceeds(setDoc(auditRef, {
      id: "audit-a",
      action: "create",
      entityType: "course",
      entityId: "course-a",
      entityTitle: "Curso",
      userId: "instructor-a",
      userRole: "instructor",
      timestamp: "2026-07-23T00:00:00.000Z",
      changedFields: ["title"]
    }));
    await assertFails(updateDoc(auditRef, { entityTitle: "Alterado" }));
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

  it("permite instrutor enviar imagem de aula válida", async () => {
    const storage = testEnv.authenticatedContext("instructor-a", { role: "instructor" }).storage();
    await assertSucceeds(uploadBytes(ref(storage, "lessonImages/lesson-a/main.webp"), imageBlob("image/webp")));
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

function publishedCourse(id: string, owner = "admin-a") {
  return {
    id,
    slug: id,
    title: "Curso publicado",
    publicationState: "published",
    order: 1,
    createdAt: "2026-07-23T00:00:00.000Z",
    updatedAt: "2026-07-23T00:00:00.000Z",
    createdBy: owner,
    updatedBy: owner,
    technicalMetadata: {
      contentClassification: "provisional_unverified",
      verificationStatus: "pending_verification"
    }
  };
}

function draftCourse(id: string, owner = "instructor-a") {
  return {
    ...publishedCourse(id, owner),
    publicationState: "draft"
  };
}

function verifiedCourse(id: string, owner = "admin-a") {
  return {
    ...publishedCourse(id, owner),
    technicalMetadata: {
      contentClassification: "official_real_world",
      verificationStatus: "verified",
      sourceTitle: "Documento técnico identificado"
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

function technicalAircraftContent(id: string, owner: string, publicationState: "published" | "draft") {
  return {
    id,
    aircraftId: "aircraft-c408",
    aircraftVariant: "Variante provisória",
    title: "Conteúdo técnico",
    slug: id,
    value: "Valor provisório",
    order: 1,
    publicationState,
    createdAt: "2026-07-23T00:00:00.000Z",
    updatedAt: "2026-07-23T00:00:00.000Z",
    createdBy: owner,
    updatedBy: owner,
    technicalMetadata: {
      contentClassification: "provisional_unverified",
      verificationStatus: "pending_verification"
    }
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
