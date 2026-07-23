import type { AcademyContentRepository } from "@/features/content/repositories/contentRepository";

export type FirestoreCollectionPath =
  | "courses"
  | "modules"
  | "lessons"
  | "exercises"
  | "assessments"
  | "users"
  | "userCourseProgress"
  | "userLessonProgress"
  | "exerciseAttempts"
  | "assessmentAttempts"
  | "reviewItems";

export type FirestoreContentRepository = AcademyContentRepository;

export const firestoreCollectionPaths: Record<string, FirestoreCollectionPath> = {
  courses: "courses",
  modules: "modules",
  lessons: "lessons",
  exercises: "exercises",
  assessments: "assessments",
  users: "users",
  userCourseProgress: "userCourseProgress",
  userLessonProgress: "userLessonProgress",
  exerciseAttempts: "exerciseAttempts",
  assessmentAttempts: "assessmentAttempts",
  reviewItems: "reviewItems"
};
