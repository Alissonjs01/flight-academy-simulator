import { getContentRepository } from "@/features/content/repositories/repositoryFactory";
import type { CourseFilters, CourseStructure } from "@/features/content/types";

export async function listCourses(filters?: CourseFilters) {
  return getContentRepository().listCourses(filters);
}

export async function listCourseStructures(filters?: CourseFilters) {
  const courses = await listCourses(filters);
  const structures = await Promise.all(courses.map((course) => getCourseStructure(course.slug)));
  return structures.filter((structure): structure is CourseStructure => Boolean(structure));
}

export async function getCourseBySlug(slug: string) {
  return getContentRepository().getCourseBySlug(slug);
}

export async function getCourseStructure(slug: string) {
  return getContentRepository().getCourseStructure(slug);
}
