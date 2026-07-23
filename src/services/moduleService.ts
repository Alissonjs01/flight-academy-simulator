import { localContentRepository } from "@/features/content/repositories/localContentRepository";

const repository = localContentRepository;

export async function listModulesByCourseId(courseId: string) {
  return repository.listModulesByCourseId(courseId);
}

export async function getModuleById(moduleId: string) {
  return repository.getModuleById(moduleId);
}
