import { getContentRepository } from "@/features/content/repositories/repositoryFactory";
import type { CourseFilters } from "@/features/content/types";

export async function listCourses(filters?: CourseFilters) {
  return getContentRepository().listCourses(filters);
}

export async function getCourseBySlug(slug: string) {
  return getContentRepository().getCourseBySlug(slug);
}

export async function getCourseStructure(slug: string) {
  return getContentRepository().getCourseStructure(slug);
}
