import type { TrainingFilters } from "@/features/trainings/types";
import { getTrainingRepository } from "@/features/trainings/repositories/repositoryFactory";

export async function listTrainings(filters?: TrainingFilters) {
  return getTrainingRepository().listTrainings(filters);
}

export async function getTrainingBySlug(slug: string) {
  return getTrainingRepository().getTrainingBySlug(slug);
}
