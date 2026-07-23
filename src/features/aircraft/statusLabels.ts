import type { AircraftStudyStatus } from "@/features/aircraft/types";

export const aircraftStudyStatusLabels: Record<AircraftStudyStatus, string> = {
  current: "Em estudo",
  available: "Disponível",
  planned: "Planejada",
  paused: "Pausada"
};

export function getAircraftStudyStatusLabel(status: AircraftStudyStatus) {
  return aircraftStudyStatusLabels[status];
}
