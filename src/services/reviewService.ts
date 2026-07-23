import { localContentRepository } from "@/features/content/repositories/localContentRepository";
import type { CourseDocument, ExerciseDocument, LessonDocument, ModuleDocument } from "@/features/content/types";

export type ReviewReferenceData = {
  courses: CourseDocument[];
  modules: ModuleDocument[];
  lessons: LessonDocument[];
  exercises: ExerciseDocument[];
};

export async function getReviewReferenceData(): Promise<ReviewReferenceData> {
  const courses = await localContentRepository.listCourses({ status: "Todos", level: "Todos", category: "Todos" });
  const structures = await Promise.all(courses.map((course) => localContentRepository.getCourseStructure(course.slug)));
  const modules = structures.flatMap((structure) => structure?.modules ?? []);
  const lessons = modules.flatMap((courseModule) => courseModule.lessons);
  const exerciseGroups = await Promise.all(lessons.map((lesson) => localContentRepository.listExercisesByLessonId(lesson.id)));

  return {
    courses,
    modules,
    lessons,
    exercises: exerciseGroups.flat()
  };
}
