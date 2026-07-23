import { collection, doc, getDocs, query, serverTimestamp, setDoc, where } from "firebase/firestore";
import { getFirebaseDb, isFirebaseConfigured } from "@/lib/firebase/client";
import type { AssessmentAttemptDocument, ExerciseAttemptDocument, ReviewItemDocument } from "@/features/content/types";
import type { StudentProgressDocument } from "@/features/progress/types";
import type { UserChecklistSessionDocument } from "@/features/checklists/types";
import type { UserTrainingRecordDocument } from "@/features/trainings/types";

const LOCAL_KEYS = {
  progress: "flight-academy-simulator:student-progress:v1",
  unlockedCourses: "flight-academy-simulator:unlocked-courses:v1",
  exerciseAttempts: "flight-academy-simulator:exercise-attempts:v1",
  reviewItems: "flight-academy-simulator:review-items:v1",
  assessmentAttempts: "flight-academy-simulator:assessment-attempts:v1",
  checklistSessions: "flight-academy-simulator:checklist-sessions:v1",
  trainingRecords: "flight-academy-simulator:training-records:v1"
} as const;

const localStudentId = "local-student";
const defaultCourseId = "course-fundamentos-pilotagem";

export type LocalMigrationSummary = {
  hasLocalData: boolean;
  progressCount: number;
  exerciseAttemptCount: number;
  reviewItemCount: number;
  assessmentAttemptCount: number;
  checklistSessionCount: number;
  trainingRecordCount: number;
};

type LocalMigrationPayload = {
  progress?: StudentProgressDocument;
  unlockedCourses: string[];
  exerciseAttempts: ExerciseAttemptDocument[];
  reviewItems: ReviewItemDocument[];
  assessmentAttempts: AssessmentAttemptDocument[];
  checklistSessions: UserChecklistSessionDocument[];
  trainingRecords: UserTrainingRecordDocument[];
};

export function detectLocalMigrationSummary(): LocalMigrationSummary {
  const payload = readLocalMigrationPayload();

  return {
    hasLocalData: Boolean(
      payload.progress ||
        payload.exerciseAttempts.length ||
        payload.reviewItems.length ||
        payload.assessmentAttempts.length ||
        payload.checklistSessions.length ||
        payload.trainingRecords.length
    ),
    progressCount: payload.progress ? 1 : 0,
    exerciseAttemptCount: payload.exerciseAttempts.length,
    reviewItemCount: payload.reviewItems.length,
    assessmentAttemptCount: payload.assessmentAttempts.length,
    checklistSessionCount: payload.checklistSessions.length,
    trainingRecordCount: payload.trainingRecords.length
  };
}

export async function migrateLocalStorageToFirestore(uid: string) {
  if (!isFirebaseConfigured()) {
    throw new Error("Firebase não configurado para migração.");
  }

  const payload = readLocalMigrationPayload();
  const db = getFirebaseDb();
  const timestamp = new Date().toISOString();

  if (payload.progress) {
    const courseProgressId = `${uid}_${defaultCourseId}`;
    await setDoc(
      doc(db, "userCourseProgress", courseProgressId),
      {
        ...rewriteUser(payload.progress, uid),
        id: courseProgressId,
        userId: uid,
        courseId: defaultCourseId,
        unlockedCourseIds: payload.unlockedCourses,
        migratedFromLocalStorage: true,
        updatedAt: timestamp,
        updatedAtServer: serverTimestamp()
      },
      { merge: true }
    );

    await Promise.all(
      payload.progress.completedLessonIds.map((lessonId) =>
        setDoc(
          doc(db, "userLessonProgress", `${uid}_${lessonId}`),
          {
            id: `${uid}_${lessonId}`,
            userId: uid,
            lessonId,
            courseId: defaultCourseId,
            status: "completed",
            completedAt: timestamp,
            updatedAt: timestamp,
            updatedAtServer: serverTimestamp()
          },
          { merge: true }
        )
      )
    );
  }

  await Promise.all([
    ...payload.exerciseAttempts.map((item) => writePrivateDocument("exerciseAttempts", rewriteUser(item, uid))),
    ...payload.reviewItems.map((item) => writePrivateDocument("reviewItems", rewriteUser(item, uid))),
    ...payload.assessmentAttempts.map((item) => writePrivateDocument("assessmentAttempts", rewriteUser(item, uid))),
    ...payload.checklistSessions.map((item) => writePrivateDocument("userChecklistSessions", rewriteUser(item, uid))),
    ...payload.trainingRecords.map((item) => writePrivateDocument("userTrainingRecords", rewriteUser(item, uid)))
  ]);
}

export async function hydratePrivateLocalCacheFromFirestore(uid: string) {
  if (!isFirebaseConfigured() || typeof window === "undefined") {
    return;
  }

  const db = getFirebaseDb();
  const progressSnapshot = await getDocs(query(collection(db, "userCourseProgress"), where("userId", "==", uid)));
  const firstProgress = progressSnapshot.docs[0]?.data() as StudentProgressDocument | undefined;

  if (firstProgress) {
    window.localStorage.setItem(LOCAL_KEYS.progress, JSON.stringify(firstProgress));
  }
}

export function clearPrivateLocalData() {
  if (typeof window === "undefined") {
    return;
  }

  Object.values(LOCAL_KEYS).forEach((key) => window.localStorage.removeItem(key));
}

function readLocalMigrationPayload(): LocalMigrationPayload {
  return {
    progress: readProgress(),
    unlockedCourses: readArray<string>(LOCAL_KEYS.unlockedCourses, isString),
    exerciseAttempts: readArray<ExerciseAttemptDocument>(LOCAL_KEYS.exerciseAttempts, isExerciseAttempt),
    reviewItems: readArray<ReviewItemDocument>(LOCAL_KEYS.reviewItems, isReviewItem),
    assessmentAttempts: readArray<AssessmentAttemptDocument>(LOCAL_KEYS.assessmentAttempts, isAssessmentAttempt),
    checklistSessions: readArray<UserChecklistSessionDocument>(LOCAL_KEYS.checklistSessions, isChecklistSession),
    trainingRecords: readArray<UserTrainingRecordDocument>(LOCAL_KEYS.trainingRecords, isTrainingRecord)
  };
}

async function writePrivateDocument<T extends { id: string; userId: string }>(collectionName: string, value: T) {
  await setDoc(
    doc(getFirebaseDb(), collectionName, value.id),
    {
      ...value,
      updatedAtServer: serverTimestamp()
    },
    { merge: true }
  );
}

function rewriteUser<T extends { id: string; userId?: string; studentId?: string }>(value: T, uid: string): T & { userId: string } {
  const id = value.id.replaceAll(localStudentId, uid);
  return {
    ...value,
    id,
    userId: uid,
    studentId: uid
  };
}

function readProgress() {
  const value = readJson<Partial<StudentProgressDocument>>(LOCAL_KEYS.progress);
  if (!value || !Array.isArray(value.completedLessonIds)) {
    return undefined;
  }

  return {
    id: value.id ?? `progress-${localStudentId}`,
    studentId: value.studentId ?? localStudentId,
    completedLessonIds: value.completedLessonIds.filter(isString),
    currentLessonId: isString(value.currentLessonId) ? value.currentLessonId : undefined,
    lastLessonId: isString(value.lastLessonId) ? value.lastLessonId : undefined,
    updatedAt: isString(value.updatedAt) ? value.updatedAt : new Date().toISOString()
  };
}

function readArray<T>(key: string, guard: (value: unknown) => value is T): T[] {
  const value = readJson<unknown>(key);
  return Array.isArray(value) ? value.filter(guard) : [];
}

function readJson<T>(key: string): T | undefined {
  if (typeof window === "undefined") {
    return undefined;
  }

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : undefined;
  } catch {
    return undefined;
  }
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function hasStringId(value: unknown): value is { id: string } {
  return typeof value === "object" && value !== null && "id" in value && typeof value.id === "string";
}

function isExerciseAttempt(value: unknown): value is ExerciseAttemptDocument {
  return hasStringId(value) && "exerciseId" in value && "lessonId" in value;
}

function isReviewItem(value: unknown): value is ReviewItemDocument {
  return hasStringId(value) && "type" in value && "status" in value;
}

function isAssessmentAttempt(value: unknown): value is AssessmentAttemptDocument {
  return hasStringId(value) && "assessmentId" in value && "percentage" in value;
}

function isChecklistSession(value: unknown): value is UserChecklistSessionDocument {
  return hasStringId(value) && "checklistId" in value && "completedItemIds" in value;
}

function isTrainingRecord(value: unknown): value is UserTrainingRecordDocument {
  return hasStringId(value) && "trainingId" in value && "status" in value;
}
