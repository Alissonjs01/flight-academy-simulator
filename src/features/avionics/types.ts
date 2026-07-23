import type { PublicationState } from "@/features/content/types";

export type AvionicStudyStatus = "current" | "available" | "planned" | "paused";

export type AvionicMediaReference = {
  id: string;
  avionicId: string;
  kind: "main" | "diagram" | "section";
  alt: string;
  storagePath?: string;
  url?: string;
  caption?: string;
  publicationState: PublicationState;
  createdAt: string;
  updatedAt: string;
};

export type AvionicDocument = {
  id: string;
  slug: string;
  name: string;
  manufacturer: string;
  version: string;
  description: string;
  image: AvionicMediaReference;
  compatibleAircraftIds: string[];
  courseIds: string[];
  componentIds: string[];
  procedureIds: string[];
  trainingIds: string[];
  progressPercent: number;
  studyStatus: AvionicStudyStatus;
  publicationState: PublicationState;
  createdAt: string;
  updatedAt: string;
};

export type AvionicSectionDocument = {
  id: string;
  avionicId: string;
  slug: string;
  title: string;
  summary: string;
  body: string;
  image?: AvionicMediaReference;
  highlights: string[];
  examples: string[];
  exercisePrompts: string[];
  relatedTrainingIds: string[];
  relatedAircraftIds: string[];
  internalLessonSlugs: string[];
  order: number;
  publicationState: PublicationState;
};

export type AvionicComponentDocument = {
  id: string;
  avionicId: string;
  title: string;
  summary: string;
  sectionSlug: string;
  order: number;
  publicationState: PublicationState;
};

export type AvionicProcedureDocument = {
  id: string;
  avionicId: string;
  title: string;
  sectionSlug: string;
  steps: string[];
  note: string;
  order: number;
  publicationState: PublicationState;
};

export type AvionicTrainingDocument = {
  id: string;
  avionicId: string;
  title: string;
  objective: string;
  relatedAircraftIds: string[];
  duration: string;
  status: "available" | "planned";
  order: number;
  publicationState: PublicationState;
};

export type AvionicCourseRelationDocument = {
  id: string;
  avionicId: string;
  courseId: string;
  title: string;
  slug: string;
  relation: string;
  order: number;
  publicationState: PublicationState;
};

export type AvionicProfile = {
  avionic: AvionicDocument;
  sections: AvionicSectionDocument[];
  components: AvionicComponentDocument[];
  procedures: AvionicProcedureDocument[];
  trainings: AvionicTrainingDocument[];
  courses: AvionicCourseRelationDocument[];
};

export type AvionicFilters = {
  query?: string;
  manufacturer?: string;
  studyStatus?: AvionicStudyStatus | "Todos";
};
