import { localContentRepository } from "@/features/content/repositories/localContentRepository";

const repository = localContentRepository;

export async function getLessonContext(slug: string) {
  return repository.getLessonContext(slug);
}

export async function listLessonsByCourseId(courseId: string) {
  return repository.listLessonsByCourseId(courseId);
}
