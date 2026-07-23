import type { TrainingFilters } from "@/features/trainings/types";
import { localTrainingRepository } from "@/features/trainings/repositories/localTrainingRepository";

const repository = localTrainingRepository;

export async function listTrainings(filters?: TrainingFilters) {
  return repository.listTrainings(filters);
}

export async function getTrainingBySlug(slug: string) {
  return repository.getTrainingBySlug(slug);
}
