import type { FlightPhase } from "@/features/checklists/types";

export const flightPhaseLabels: Record<FlightPhase, string> = {
  preparacao: "Preparação",
  cockpit: "Cockpit",
  partida: "Partida",
  "antes-do-taxi": "Antes do táxi",
  taxi: "Táxi",
  "antes-da-decolagem": "Antes da decolagem",
  decolagem: "Decolagem",
  subida: "Subida",
  cruzeiro: "Cruzeiro",
  descida: "Descida",
  aproximacao: "Aproximação",
  pouso: "Pouso",
  "apos-pouso": "Após pouso",
  "corte-dos-motores": "Corte dos motores",
  emergencia: "Emergência"
};

export function getFlightPhaseLabel(phase: FlightPhase) {
  return flightPhaseLabels[phase];
}
