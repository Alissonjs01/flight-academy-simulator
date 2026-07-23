import { firestoreAvionicsRepository, shouldUseFirestoreAvionics } from "@/features/avionics/repositories/firestoreAvionicsRepository";
import { localAvionicsRepository } from "@/features/avionics/repositories/localAvionicsRepository";

export function getAvionicsRepository() {
  return shouldUseFirestoreAvionics() ? firestoreAvionicsRepository : localAvionicsRepository;
}
