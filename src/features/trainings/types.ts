import type { PublicationState } from "@/features/content/types";

export type TrainingDifficulty = "Inicial" | "Intermediário" | "Avançado";

export type TrainingStatus = "not_started" | "in_progress" | "completed" | "needs_review";

export type TrainingDocument = {
  id: string;
  slug: string;
  title: string;
  aircraftId: string;
  aircraftName: string;
  difficulty: TrainingDifficulty;
  duration: string;
  departureAirport: string;
  destinationAirport: string;
  conditions: string;
  objective: string;
  instructions: string[];
  completionCriteria: string[];
  studentReport: string;
  personalNote: string;
  status: TrainingStatus;
  relatedCourseId: string;
  relatedCourseSlug: string;
  relatedLessonId?: string;
  relatedLessonSlug?: string;
  publicationState: PublicationState;
};

export type UserTrainingRecordDocument = {
  id: string;
  userId: string;
  trainingId: string;
  studentReport: string;
  personalNote: string;
  status: TrainingStatus;
  updatedAt: string;
};

export type TrainingFilters = {
  query?: string;
  aircraftId?: string;
  difficulty?: TrainingDifficulty | "Todos";
  status?: TrainingStatus | "Todos";
};
