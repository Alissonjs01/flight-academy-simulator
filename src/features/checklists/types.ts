import type { PublicationState } from "@/features/content/types";
import type { TechnicalMetadata } from "@/features/technical/types";

export type FlightPhase =
  | "preparacao"
  | "cockpit"
  | "partida"
  | "antes-do-taxi"
  | "taxi"
  | "antes-da-decolagem"
  | "decolagem"
  | "subida"
  | "cruzeiro"
  | "descida"
  | "aproximacao"
  | "pouso"
  | "apos-pouso"
  | "corte-dos-motores"
  | "emergencia";

export type ChecklistItemKind = "critical" | "normal";

export type ChecklistItemStatus = "completed" | "pending";

export type ChecklistModeSettings = {
  enabled: boolean;
  description: string;
};

export type ChecklistItemDocument = {
  id: string;
  checklistId: string;
  text: string;
  expectedResponse: string;
  observation: string;
  order: number;
  kind: ChecklistItemKind;
  status: ChecklistItemStatus;
  explanation?: string;
  technicalMetadata?: TechnicalMetadata;
};

export type ChecklistDocument = {
  id: string;
  slug: string;
  aircraftId: string;
  aircraftName: string;
  flightPhase: FlightPhase;
  title: string;
  description: string;
  items: ChecklistItemDocument[];
  order: number;
  notes: string;
  version: string;
  publicationState: PublicationState;
  updatedAt: string;
  createdAt?: string;
  createdBy?: string;
  updatedBy?: string;
  publishedAt?: string;
  archivedAt?: string | null;
  archivedBy?: string;
  versionNumber?: number;
  studyMode: ChecklistModeSettings;
  operationalMode: ChecklistModeSettings;
  technicalMetadata?: TechnicalMetadata;
};

export type UserChecklistSessionDocument = {
  id: string;
  userId: string;
  checklistId: string;
  completedItemIds: string[];
  mode: "study" | "operational";
  progressPercent: number;
  updatedAt: string;
};

export type ChecklistFilters = {
  query?: string;
  aircraftId?: string;
  flightPhase?: FlightPhase | "Todos";
};
