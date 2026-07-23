import { firestoreTrainingRepository, shouldUseFirestoreTrainings } from "@/features/trainings/repositories/firestoreTrainingRepository";
import { localTrainingRepository } from "@/features/trainings/repositories/localTrainingRepository";

export function getTrainingRepository() {
  return shouldUseFirestoreTrainings() ? firestoreTrainingRepository : localTrainingRepository;
}
