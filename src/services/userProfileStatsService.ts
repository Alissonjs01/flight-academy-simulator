import type { AssessmentAttemptDocument, ExerciseAttemptDocument } from "@/features/content/types";
import type { StudentProgressDocument } from "@/features/progress/types";
import type { UserChecklistSessionDocument } from "@/features/checklists/types";
import type { UserTrainingRecordDocument } from "@/features/trainings/types";

export type UserProfileStats = {
  coursesStarted: number;
  completedLessons: number;
  totalLessons: number;
  overallProgressPercent: number;
  assessmentAttempts: number;
  completedChecklists: number;
  exerciseAttempts: number;
  trainingRecords: number;
};

const LOCAL_KEYS = {
  progress: "flight-academy-simulator:student-progress:v1",
  exerciseAttempts: "flight-academy-simulator:exercise-attempts:v1",
  assessmentAttempts: "flight-academy-simulator:assessment-attempts:v1",
  checklistSessions: "flight-academy-simulator:checklist-sessions:v1",
  trainingRecords: "flight-academy-simulator:training-records:v1"
} as const;

export function createEmptyUserProfileStats(totalLessons = 0): UserProfileStats {
  return {
    coursesStarted: 0,
    completedLessons: 0,
    totalLessons,
    overallProgressPercent: 0,
    assessmentAttempts: 0,
    completedChecklists: 0,
    exerciseAttempts: 0,
    trainingRecords: 0
  };
}

export function calculateOverallProgressPercent(completedLessons: number, totalLessons: number) {
  if (totalLessons <= 0 || completedLessons <= 0) {
    return 0;
  }

  return Math.max(0, Math.min(100, Math.round((completedLessons / totalLessons) * 100)));
}

export function readUserProfileStats(uid: string, totalLessons: number, validLessonIds?: string[]): UserProfileStats {
  if (typeof window === "undefined") {
    return createEmptyUserProfileStats(totalLessons);
  }

  const validLessonIdSet = validLessonIds?.length ? new Set(validLessonIds) : undefined;
  const progress = readJson<Partial<StudentProgressDocument>>(LOCAL_KEYS.progress);
  const completedLessonIds = isOwnedByUser(progress, uid) && Array.isArray(progress.completedLessonIds)
    ? Array.from(new Set(progress.completedLessonIds.filter(isString).filter((lessonId) => !validLessonIdSet || validLessonIdSet.has(lessonId))))
    : [];
  const hasStartedCourse = Boolean(completedLessonIds.length || (isOwnedByUser(progress, uid) && (progress.currentLessonId || progress.lastLessonId)));
  const checklistSessions = readOwnedArray<UserChecklistSessionDocument>(LOCAL_KEYS.checklistSessions, uid, isChecklistSession);

  return {
    coursesStarted: hasStartedCourse ? 1 : 0,
    completedLessons: completedLessonIds.length,
    totalLessons,
    overallProgressPercent: calculateOverallProgressPercent(completedLessonIds.length, totalLessons),
    assessmentAttempts: readOwnedArray<AssessmentAttemptDocument>(LOCAL_KEYS.assessmentAttempts, uid, isAssessmentAttempt).length,
    completedChecklists: checklistSessions.filter((session) => session.progressPercent === 100).length,
    exerciseAttempts: readOwnedArray<ExerciseAttemptDocument>(LOCAL_KEYS.exerciseAttempts, uid, isExerciseAttempt).length,
    trainingRecords: readOwnedArray<UserTrainingRecordDocument>(LOCAL_KEYS.trainingRecords, uid, isTrainingRecord).length
  };
}

function readOwnedArray<T extends { userId?: string; studentId?: string }>(key: string, uid: string, guard: (value: unknown) => value is T) {
  const value = readJson<unknown>(key);
  return Array.isArray(value) ? value.filter(guard).filter((item) => isOwnedByUser(item, uid)) : [];
}

function readJson<T>(key: string): T | undefined {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : undefined;
  } catch {
    return undefined;
  }
}

function isOwnedByUser(value: unknown, uid: string): value is { userId?: string; studentId?: string; currentLessonId?: string; lastLessonId?: string; completedLessonIds?: unknown } {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as { userId?: unknown; studentId?: unknown };
  return candidate.userId === uid || candidate.studentId === uid || (!candidate.userId && candidate.studentId === "local-student");
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isExerciseAttempt(value: unknown): value is ExerciseAttemptDocument {
  return hasStringId(value) && "exerciseId" in value && "lessonId" in value;
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

function hasStringId(value: unknown): value is { id: string; userId?: string; studentId?: string } {
  return typeof value === "object" && value !== null && "id" in value && typeof value.id === "string";
}
