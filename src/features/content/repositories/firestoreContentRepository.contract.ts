import type { AcademyContentRepository } from "@/features/content/repositories/contentRepository";

export type FirestoreCollectionPath =
  | "courses"
  | "courses/{courseId}/modules"
  | "courses/{courseId}/modules/{moduleId}/lessons"
  | "courses/{courseId}/modules/{moduleId}/lessons/{lessonId}/exercises"
  | "courses/{courseId}/assessments"
  | "users/{userId}/progress"
  | "users/{userId}/exerciseAttempts"
  | "users/{userId}/exerciseResponses"
  | "users/{userId}/assessmentAttempts"
  | "users/{userId}/reviewItems"
  | "users/{userId}/courseProgress"
  | "users/{userId}/certificates";

export type FirestoreContentRepository = AcademyContentRepository;

export const firestoreCollectionPaths: Record<string, FirestoreCollectionPath> = {
  courses: "courses",
  modules: "courses/{courseId}/modules",
  lessons: "courses/{courseId}/modules/{moduleId}/lessons",
  exercises: "courses/{courseId}/modules/{moduleId}/lessons/{lessonId}/exercises",
  assessments: "courses/{courseId}/assessments",
  progress: "users/{userId}/progress",
  exerciseAttempts: "users/{userId}/exerciseAttempts",
  exerciseResponses: "users/{userId}/exerciseResponses",
  assessmentAttempts: "users/{userId}/assessmentAttempts",
  reviewItems: "users/{userId}/reviewItems",
  courseProgress: "users/{userId}/courseProgress",
  certificates: "users/{userId}/certificates"
};
