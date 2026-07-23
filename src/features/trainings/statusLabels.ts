import type { TrainingStatus } from "@/features/trainings/types";

export const trainingStatusLabels: Record<TrainingStatus, string> = {
  not_started: "Não iniciado",
  in_progress: "Em andamento",
  completed: "Concluído",
  needs_review: "Precisa revisar"
};
