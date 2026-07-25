import type { FlightPhase } from "@/features/checklists/types";

export const flightPhaseLabels: Record<FlightPhase, string> = {
  "preparacao-do-voo": "Preparação do voo",
  "inspecao-externa": "Inspeção externa",
  "cockpit-inicial": "Cockpit inicial",
  energizacao: "Energização",
  "antes-da-partida": "Antes da partida",
  "partida-motor-1": "Partida do motor 1",
  "partida-motor-2": "Partida do motor 2",
  "apos-partida": "Após a partida",
  alinhamento: "Alinhamento",
  "apos-decolagem": "Após a decolagem",
  "preparacao-descida": "Preparação da descida",
  "antes-pouso": "Antes do pouso",
  estacionamento: "Estacionamento",
  desligamento: "Desligamento",
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

export const operationalFlightPhaseOrder: FlightPhase[] = [
  "preparacao-do-voo",
  "inspecao-externa",
  "cockpit-inicial",
  "energizacao",
  "antes-da-partida",
  "partida-motor-1",
  "partida-motor-2",
  "apos-partida",
  "antes-do-taxi",
  "taxi",
  "antes-da-decolagem",
  "alinhamento",
  "decolagem",
  "apos-decolagem",
  "subida",
  "cruzeiro",
  "preparacao-descida",
  "descida",
  "aproximacao",
  "antes-pouso",
  "apos-pouso",
  "estacionamento",
  "desligamento"
];

export function getFlightPhaseLabel(phase: FlightPhase) {
  return flightPhaseLabels[phase];
}
