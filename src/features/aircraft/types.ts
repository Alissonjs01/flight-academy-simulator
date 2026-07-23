import type { PublicationState } from "@/features/content/types";
import type { TechnicalMetadata } from "@/features/technical/types";

export type AircraftStudyStatus = "current" | "available" | "planned" | "paused";

export type AircraftMediaReference = {
  id: string;
  aircraftId: string;
  kind: "main" | "gallery" | "panel";
  alt: string;
  storagePath?: string;
  url?: string;
  caption?: string;
  publicationState: PublicationState;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  updatedBy?: string;
  publishedAt?: string;
  archivedAt?: string | null;
  archivedBy?: string;
  version?: number;
  technicalMetadata?: TechnicalMetadata;
};

export type AircraftDocument = {
  id: string;
  slug: string;
  manufacturer: string;
  model: string;
  fullName: string;
  category: string;
  engineType: string;
  numberOfEngines: number | null;
  cruiseSpeed: string;
  range: string;
  serviceCeiling: string;
  capacity: string;
  description: string;
  mainImage: AircraftMediaReference;
  gallery: AircraftMediaReference[];
  studyStatus: AircraftStudyStatus;
  progressPercent: number;
  systemIds: string[];
  limitationIds: string[];
  procedureIds: string[];
  performanceIds: string[];
  checklistIds: string[];
  trainingIds: string[];
  relatedCourseIds: string[];
  installedAvionicIds: string[];
  publicationState: PublicationState;
  createdAt: string;
  updatedAt: string;
  technicalMetadata?: TechnicalMetadata;
};

export type AircraftSystemDocument = {
  id: string;
  aircraftId: string;
  title: string;
  summary: string;
  details: string;
  order: number;
  publicationState: PublicationState;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
  archivedAt?: string | null;
  version?: number;
  technicalMetadata?: TechnicalMetadata;
};

export type AircraftLimitationDocument = {
  id: string;
  aircraftId: string;
  title: string;
  value: string;
  note: string;
  order: number;
  publicationState: PublicationState;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
  archivedAt?: string | null;
  version?: number;
  technicalMetadata?: TechnicalMetadata;
};

export type AircraftPerformanceDocument = {
  id: string;
  aircraftId: string;
  title: string;
  value: string;
  unit?: string;
  conditions?: string;
  note: string;
  order: number;
  publicationState: PublicationState;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
  archivedAt?: string | null;
  version?: number;
  technicalMetadata?: TechnicalMetadata;
};

export type AircraftProcedureDocument = {
  id: string;
  aircraftId: string;
  phase: string;
  title: string;
  steps: string[];
  safetyNote: string;
  order: number;
  publicationState: PublicationState;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
  archivedAt?: string | null;
  version?: number;
  technicalMetadata?: TechnicalMetadata;
};

export type AircraftChecklistDocument = {
  id: string;
  aircraftId: string;
  title: string;
  phase: string;
  items: string[];
  order: number;
  publicationState: PublicationState;
  technicalMetadata?: TechnicalMetadata;
};

export type AircraftTrainingDocument = {
  id: string;
  aircraftId: string;
  title: string;
  objective: string;
  duration: string;
  status: "available" | "planned";
  order: number;
  publicationState: PublicationState;
  technicalMetadata?: TechnicalMetadata;
};

export type AircraftCourseRelationDocument = {
  id: string;
  aircraftId: string;
  courseId: string;
  title: string;
  slug: string;
  relation: string;
  order: number;
  publicationState: PublicationState;
  technicalMetadata?: TechnicalMetadata;
};

export type AircraftAvionicDocument = {
  id: string;
  aircraftId: string;
  avionicId: string;
  name: string;
  summary: string;
  order: number;
  publicationState: PublicationState;
  technicalMetadata?: TechnicalMetadata;
};

export type AircraftProfile = {
  aircraft: AircraftDocument;
  systems: AircraftSystemDocument[];
  limitations: AircraftLimitationDocument[];
  performances: AircraftPerformanceDocument[];
  procedures: AircraftProcedureDocument[];
  checklists: AircraftChecklistDocument[];
  trainings: AircraftTrainingDocument[];
  relatedCourses: AircraftCourseRelationDocument[];
  installedAvionics: AircraftAvionicDocument[];
};

export type AircraftFilters = {
  query?: string;
  category?: string;
  studyStatus?: AircraftStudyStatus | "Todos";
};
