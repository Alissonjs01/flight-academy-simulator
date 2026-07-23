import type { PublicationState } from "@/features/content/types";

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
  checklistIds: string[];
  trainingIds: string[];
  relatedCourseIds: string[];
  installedAvionicIds: string[];
  publicationState: PublicationState;
  createdAt: string;
  updatedAt: string;
};

export type AircraftSystemDocument = {
  id: string;
  aircraftId: string;
  title: string;
  summary: string;
  details: string;
  order: number;
  publicationState: PublicationState;
};

export type AircraftLimitationDocument = {
  id: string;
  aircraftId: string;
  title: string;
  value: string;
  note: string;
  order: number;
  publicationState: PublicationState;
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
};

export type AircraftChecklistDocument = {
  id: string;
  aircraftId: string;
  title: string;
  phase: string;
  items: string[];
  order: number;
  publicationState: PublicationState;
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
};

export type AircraftAvionicDocument = {
  id: string;
  aircraftId: string;
  avionicId: string;
  name: string;
  summary: string;
  order: number;
  publicationState: PublicationState;
};

export type AircraftProfile = {
  aircraft: AircraftDocument;
  systems: AircraftSystemDocument[];
  limitations: AircraftLimitationDocument[];
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
