import { firestoreChecklistRepository, shouldUseFirestoreChecklists } from "@/features/checklists/repositories/firestoreChecklistRepository";
import { localChecklistRepository } from "@/features/checklists/repositories/localChecklistRepository";

export function getChecklistRepository() {
  return shouldUseFirestoreChecklists() ? firestoreChecklistRepository : localChecklistRepository;
}
