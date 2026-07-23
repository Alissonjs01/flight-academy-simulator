import type { TrainingRepository } from "@/features/trainings/repositories/trainingRepository";
import type { TrainingDocument, TrainingFilters } from "@/features/trainings/types";
import { localTrainingDocuments } from "@/features/trainings/data/localTrainings";

function byTitle(items: TrainingDocument[]) {
  return [...items].sort((a, b) => a.title.localeCompare(b.title, "pt-BR"));
}

function matchesText(training: TrainingDocument, query?: string) {
  if (!query?.trim()) {
    return true;
  }

  const normalizedQuery = query.trim().toLocaleLowerCase("pt-BR");
  const haystack = [training.title, training.aircraftName, training.objective, training.conditions].join(" ").toLocaleLowerCase("pt-BR");

  return haystack.includes(normalizedQuery);
}

function matchesFilters(training: TrainingDocument, filters?: TrainingFilters) {
  const aircraftMatches = !filters?.aircraftId || filters.aircraftId === "Todos" || training.aircraftId === filters.aircraftId;
  const difficultyMatches = !filters?.difficulty || filters.difficulty === "Todos" || training.difficulty === filters.difficulty;
  const statusMatches = !filters?.status || filters.status === "Todos" || training.status === filters.status;

  return aircraftMatches && difficultyMatches && statusMatches && matchesText(training, filters?.query);
}

export const localTrainingRepository: TrainingRepository = {
  async listTrainings(filters) {
    return byTitle(localTrainingDocuments.filter((training) => matchesFilters(training, filters)));
  },

  async getTrainingById(trainingId) {
    return localTrainingDocuments.find((training) => training.id === trainingId);
  },

  async getTrainingBySlug(slug) {
    return localTrainingDocuments.find((training) => training.slug === slug);
  }
};
