import { getContentRepository } from "@/features/content/repositories/repositoryFactory";

export async function getLessonContext(slug: string) {
  return getContentRepository().getLessonContext(slug);
}

export async function listLessonsByCourseId(courseId: string) {
  return getContentRepository().listLessonsByCourseId(courseId);
}
