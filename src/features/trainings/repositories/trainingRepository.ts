import type { TrainingDocument, TrainingFilters } from "@/features/trainings/types";

export type TrainingRepository = {
  listTrainings(filters?: TrainingFilters): Promise<TrainingDocument[]>;
  getTrainingById(trainingId: string): Promise<TrainingDocument | undefined>;
  getTrainingBySlug(slug: string): Promise<TrainingDocument | undefined>;
};
