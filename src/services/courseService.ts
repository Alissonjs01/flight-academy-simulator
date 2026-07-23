import { localContentRepository } from "@/features/content/repositories/localContentRepository";
import type { CourseFilters } from "@/features/content/types";

const repository = localContentRepository;

export async function listCourses(filters?: CourseFilters) {
  return repository.listCourses(filters);
}

export async function getCourseBySlug(slug: string) {
  return repository.getCourseBySlug(slug);
}

export async function getCourseStructure(slug: string) {
  return repository.getCourseStructure(slug);
}
