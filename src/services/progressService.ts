import type { LessonDocument, ModuleDocument } from "@/features/content/types";
import type { LessonProgressState, ProgressSummary, StudentProgressDocument } from "@/features/progress/types";
import { syncProgressToFirestore } from "@/services/firestorePrivateSyncService";

const STORAGE_KEY = "flight-academy-simulator:student-progress:v1";
const UNLOCKED_COURSES_KEY = "flight-academy-simulator:unlocked-courses:v1";
const DEFAULT_STUDENT_ID = "local-student";

function nowIso() {
  return new Date().toISOString();
}

export function createInitialProgress(lessons: LessonDocument[]): StudentProgressDocument {
  const firstLesson = lessons[0];
  const secondLesson = lessons[1];

  return {
    id: `progress-${DEFAULT_STUDENT_ID}`,
    studentId: DEFAULT_STUDENT_ID,
    completedLessonIds: firstLesson ? [firstLesson.id] : [],
    currentLessonId: secondLesson?.id ?? firstLesson?.id,
    lastLessonId: secondLesson?.id ?? firstLesson?.id,
    updatedAt: nowIso()
  };
}

export function readLocalProgress(lessons: LessonDocument[]): StudentProgressDocument {
  if (typeof window === "undefined") {
    return createInitialProgress(lessons);
  }

  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEY);

    if (!storedValue) {
      const initialProgress = createInitialProgress(lessons);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProgress));
      return initialProgress;
    }

    const parsed = JSON.parse(storedValue) as Partial<StudentProgressDocument>;
    const lessonIds = new Set(lessons.map((lesson) => lesson.id));
    const completedLessonIds = Array.isArray(parsed.completedLessonIds)
      ? parsed.completedLessonIds.filter((lessonId) => lessonIds.has(lessonId))
      : [];
    const currentLessonId = parsed.currentLessonId && lessonIds.has(parsed.currentLessonId) ? parsed.currentLessonId : undefined;
    const lastLessonId = parsed.lastLessonId && lessonIds.has(parsed.lastLessonId) ? parsed.lastLessonId : currentLessonId;

    return {
      id: parsed.id ?? `progress-${DEFAULT_STUDENT_ID}`,
      studentId: parsed.studentId ?? DEFAULT_STUDENT_ID,
      completedLessonIds,
      currentLessonId: currentLessonId ?? findNextAvailableLessonId(lessons, completedLessonIds),
      lastLessonId,
      updatedAt: parsed.updatedAt ?? nowIso()
    };
  } catch {
    return createInitialProgress(lessons);
  }
}

export function writeLocalProgress(progress: StudentProgressDocument) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...progress, updatedAt: nowIso() }));
  syncProgressToFirestore(progress);
}

export function completeLesson(lessons: LessonDocument[], progress: StudentProgressDocument, lessonId: string): StudentProgressDocument {
  const completedLessonIds = Array.from(new Set([...progress.completedLessonIds, lessonId]));
  const nextLessonId = findNextAvailableLessonId(lessons, completedLessonIds);
  const nextProgress = {
    ...progress,
    completedLessonIds,
    currentLessonId: nextLessonId,
    lastLessonId: nextLessonId ?? lessonId,
    updatedAt: nowIso()
  };

  writeLocalProgress(nextProgress);
  return nextProgress;
}

export function setCurrentLesson(progress: StudentProgressDocument, lessonId: string): StudentProgressDocument {
  const nextProgress = {
    ...progress,
    currentLessonId: lessonId,
    lastLessonId: lessonId,
    updatedAt: nowIso()
  };

  writeLocalProgress(nextProgress);
  return nextProgress;
}

export function getLessonProgressStates(lessons: LessonDocument[], progress: StudentProgressDocument): LessonProgressState[] {
  return lessons.map((lesson, index) => {
    const isCompleted = progress.completedLessonIds.includes(lesson.id);
    const previousLesson = lessons[index - 1];
    const isUnlocked = index === 0 || (previousLesson ? progress.completedLessonIds.includes(previousLesson.id) : false);
    const isCurrent = progress.currentLessonId === lesson.id || (!progress.currentLessonId && isUnlocked && !isCompleted);

    return {
      lessonId: lesson.id,
      isUnlocked,
      status: isCompleted ? "concluida" : isUnlocked && isCurrent ? "atual" : isUnlocked ? "disponivel" : "bloqueada"
    };
  });
}

export function getLessonStatus(lessons: LessonDocument[], progress: StudentProgressDocument, lessonId: string) {
  return getLessonProgressStates(lessons, progress).find((state) => state.lessonId === lessonId);
}

export function calculateCourseProgress(lessons: LessonDocument[], progress: StudentProgressDocument): ProgressSummary {
  const publishedLessons = lessons.filter((lesson) => lesson.publicationState === "published");
  const totalLessons = publishedLessons.length;
  const completedLessons = publishedLessons.filter((lesson) => progress.completedLessonIds.includes(lesson.id)).length;
  const coursePercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return {
    coursePercent,
    completedLessons,
    totalLessons,
    currentLessonId: progress.currentLessonId,
    lastLessonId: progress.lastLessonId
  };
}

export function calculateModuleProgress(module: ModuleDocument, lessons: LessonDocument[], progress: StudentProgressDocument) {
  const moduleLessons = lessons.filter((lesson) => lesson.moduleId === module.id && lesson.publicationState === "published");
  const total = moduleLessons.length;
  const completed = moduleLessons.filter((lesson) => progress.completedLessonIds.includes(lesson.id)).length;

  return total > 0 ? Math.round((completed / total) * 100) : 0;
}

export function readUnlockedCourseIds(): string[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const parsed = JSON.parse(window.localStorage.getItem(UNLOCKED_COURSES_KEY) ?? "[]") as unknown;
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}

export function unlockCourses(courseIds: string[]) {
  if (typeof window === "undefined") {
    return;
  }

  const unlockedCourseIds = Array.from(new Set([...readUnlockedCourseIds(), ...courseIds]));
  window.localStorage.setItem(UNLOCKED_COURSES_KEY, JSON.stringify(unlockedCourseIds));
}

export function isCourseUnlocked(courseId: string) {
  return readUnlockedCourseIds().includes(courseId);
}

function findNextAvailableLessonId(lessons: LessonDocument[], completedLessonIds: string[]) {
  return lessons.find((lesson) => !completedLessonIds.includes(lesson.id))?.id;
}
