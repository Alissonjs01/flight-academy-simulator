import type { AvionicStudyStatus } from "@/features/avionics/types";

export const avionicStudyStatusLabels: Record<AvionicStudyStatus, string> = {
  current: "Em estudo",
  available: "Disponível",
  planned: "Planejado",
  paused: "Pausado"
};

export function getAvionicStudyStatusLabel(status: AvionicStudyStatus) {
  return avionicStudyStatusLabels[status];
}
