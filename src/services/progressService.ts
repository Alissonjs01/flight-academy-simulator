import type { CourseDocument, CourseStructure, LessonDocument, ModuleDocument } from "@/features/content/types";
import type { LessonProgressState, ProgressSummary, StudentProgressDocument } from "@/features/progress/types";
import { getFirebaseAuth, isFirebaseConfigured } from "@/lib/firebase/client";
import { syncProgressToFirestore } from "@/services/firestorePrivateSyncService";

const STORAGE_KEY = "flight-academy-simulator:student-progress:v1";
const UNLOCKED_COURSES_KEY = "flight-academy-simulator:unlocked-courses:v1";
const DEFAULT_STUDENT_ID = "local-student";
const PROGRESS_UPDATED_EVENT = "flight-academy-simulator:progress-updated";

function nowIso() {
  return new Date().toISOString();
}

export function createInitialProgress(lessons: LessonDocument[]): StudentProgressDocument {
  const firstLesson = lessons[0];
  const studentId = getCurrentStudentId();

  return {
    id: `progress-${studentId}`,
    studentId,
    completedLessonIds: [],
    currentLessonId: firstLesson?.id,
    lastLessonId: undefined,
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
      return createInitialProgress(lessons);
    }

    const parsed = JSON.parse(storedValue) as Partial<StudentProgressDocument>;
    const currentStudentId = getCurrentStudentId();
    const ownerId = getStoredOwnerId(parsed);
    if (currentStudentId !== DEFAULT_STUDENT_ID && ownerId && ownerId !== currentStudentId && ownerId !== DEFAULT_STUDENT_ID) {
      return createInitialProgress(lessons);
    }

    const lessonIds = new Set(lessons.map((lesson) => lesson.id));
    const completedLessonIds = Array.isArray(parsed.completedLessonIds)
      ? Array.from(new Set(parsed.completedLessonIds.filter((lessonId): lessonId is string => typeof lessonId === "string" && lessonId.length > 0)))
      : [];
    const currentLessonId = parsed.currentLessonId && lessonIds.has(parsed.currentLessonId) ? parsed.currentLessonId : undefined;
    const lastLessonId = typeof parsed.lastLessonId === "string" && parsed.lastLessonId.length > 0 ? parsed.lastLessonId : currentLessonId;

    return {
      id: typeof parsed.id === "string" ? parsed.id : `progress-${currentStudentId}`,
      studentId: typeof parsed.studentId === "string" ? parsed.studentId : currentStudentId,
      completedLessonIds,
      currentLessonId: currentLessonId ?? findNextAvailableLessonId(lessons, completedLessonIds),
      lastLessonId,
      updatedAt: parsed.updatedAt ?? nowIso()
    };
  } catch {
    return createInitialProgress(lessons);
  }
}

export function writeLocalProgress(progress: StudentProgressDocument, courseId?: string, courseLessons?: LessonDocument[]) {
  if (typeof window === "undefined") {
    return;
  }

  const studentId = getCurrentStudentId();
  const scopedProgress = {
    ...progress,
    id: progress.id.replaceAll(DEFAULT_STUDENT_ID, studentId),
    studentId,
    updatedAt: nowIso()
  };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(scopedProgress));
  syncProgressToFirestore(scopedProgress, courseId, courseLessons);
  notifyProgressUpdated();
}

export function completeLesson(lessons: LessonDocument[], progress: StudentProgressDocument, lessonId: string, courseId?: string): StudentProgressDocument {
  const validLessonIds = new Set(lessons.filter((lesson) => lesson.publicationState === "published").map((lesson) => lesson.id));
  const completedLessonIds = validLessonIds.has(lessonId) ? Array.from(new Set([...progress.completedLessonIds, lessonId])) : progress.completedLessonIds;
  const nextLessonId = findNextAvailableLessonId(lessons, completedLessonIds);
  const nextProgress = {
    ...progress,
    completedLessonIds,
    currentLessonId: nextLessonId,
    lastLessonId: nextLessonId ?? lessonId,
    updatedAt: nowIso()
  };

  writeLocalProgress(nextProgress, courseId, lessons);
  return nextProgress;
}

export function setCurrentLesson(progress: StudentProgressDocument, lessonId: string, courseId?: string, courseLessons?: LessonDocument[]): StudentProgressDocument {
  const nextProgress = {
    ...progress,
    currentLessonId: lessonId,
    lastLessonId: lessonId,
    updatedAt: nowIso()
  };

  writeLocalProgress(nextProgress, courseId, courseLessons);
  return nextProgress;
}

export function getLessonProgressStates(lessons: LessonDocument[], progress: StudentProgressDocument): LessonProgressState[] {
  const publishedLessons = lessons.filter((lesson) => lesson.publicationState === "published");

  return lessons.map((lesson) => {
    if (lesson.publicationState !== "published") {
      return {
        lessonId: lesson.id,
        isUnlocked: false,
        status: "bloqueada"
      };
    }

    const index = publishedLessons.findIndex((item) => item.id === lesson.id);
    const isCompleted = progress.completedLessonIds.includes(lesson.id);
    const previousLesson = publishedLessons[index - 1];
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
  const coursePercent = totalLessons > 0 ? clampPercent(Math.round((completedLessons / totalLessons) * 100)) : 0;

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

  return total > 0 ? clampPercent(Math.round((completed / total) * 100)) : 0;
}

export function isCourseComplete(structure: CourseStructure, progress: StudentProgressDocument) {
  const lessons = getPublishedLessons(structure);
  return lessons.length > 0 && lessons.every((lesson) => progress.completedLessonIds.includes(lesson.id));
}

export function getUnlockedCourseIdsFromProgress(structures: CourseStructure[], progress: StudentProgressDocument): string[] {
  const orderedStructures = [...structures]
    .filter((structure) => structure.course.publicationState === "published")
    .sort((a, b) => a.course.order - b.course.order);
  const completedCourseIds = new Set(orderedStructures.filter((structure) => isCourseComplete(structure, progress)).map((structure) => structure.course.id));
  const completedCourseTitles = new Set(orderedStructures.filter((structure) => completedCourseIds.has(structure.course.id)).map((structure) => normalizeRequirement(structure.course.title)));
  const unlocked = new Set<string>();

  orderedStructures.forEach((structure, index) => {
    const isFirstCourse = index === 0;
    const prerequisitesMet = areCoursePrerequisitesMet(structure.course, completedCourseIds, completedCourseTitles);

    if (isFirstCourse || prerequisitesMet || (structure.course.status !== "locked" && structure.course.prerequisites.length === 0)) {
      unlocked.add(structure.course.id);
    }
  });

  return Array.from(unlocked);
}

export function isCourseUnlockedFromProgress(courseId: string, structures: CourseStructure[], progress: StudentProgressDocument) {
  return getUnlockedCourseIdsFromProgress(structures, progress).includes(courseId);
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

export function subscribeToProgressChanges(callback: () => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const handleStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY || event.key === UNLOCKED_COURSES_KEY) {
      callback();
    }
  };

  window.addEventListener(PROGRESS_UPDATED_EVENT, callback);
  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener(PROGRESS_UPDATED_EVENT, callback);
    window.removeEventListener("storage", handleStorage);
  };
}

function findNextAvailableLessonId(lessons: LessonDocument[], completedLessonIds: string[]) {
  return lessons.find((lesson) => lesson.publicationState === "published" && !completedLessonIds.includes(lesson.id))?.id;
}

function clampPercent(value: number) {
  return Math.max(0, Math.min(100, value));
}

function getCurrentStudentId() {
  if (typeof window === "undefined" || !isFirebaseConfigured()) {
    return DEFAULT_STUDENT_ID;
  }

  return getFirebaseAuth().currentUser?.uid ?? DEFAULT_STUDENT_ID;
}

function getStoredOwnerId(progress: Partial<StudentProgressDocument>) {
  const candidate = progress as Partial<StudentProgressDocument> & { userId?: unknown };
  if (typeof candidate.userId === "string") {
    return candidate.userId;
  }

  return typeof candidate.studentId === "string" ? candidate.studentId : undefined;
}

function notifyProgressUpdated() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(PROGRESS_UPDATED_EVENT));
  }
}

function getPublishedLessons(structure: CourseStructure) {
  return structure.modules.flatMap((module) => module.lessons).filter((lesson) => lesson.publicationState === "published");
}

function areCoursePrerequisitesMet(course: CourseDocument, completedCourseIds: Set<string>, completedCourseTitles: Set<string>) {
  if (!course.prerequisites.length) {
    return true;
  }

  return course.prerequisites.every((requirement) => {
    const normalized = normalizeRequirement(requirement);
    return completedCourseIds.has(requirement) || completedCourseTitles.has(normalized) || Array.from(completedCourseTitles).some((title) => normalized.includes(title));
  });
}

function normalizeRequirement(value: string) {
  return value.trim().toLocaleLowerCase("pt-BR");
}
