import { firestoreContentRepository, shouldUseFirestoreContent } from "@/features/content/repositories/firestoreContentRepository";
import { localContentRepository } from "@/features/content/repositories/localContentRepository";

export function getContentRepository() {
  return shouldUseFirestoreContent() ? firestoreContentRepository : localContentRepository;
}
