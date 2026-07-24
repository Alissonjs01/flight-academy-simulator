import type { PublicationState } from "@/features/content/types";
import type { ContentClassification, TechnicalMetadata, VerificationStatus } from "@/features/technical/types";

export type AdminRole = "instructor" | "admin";

export type AdminEntityType =
  | "course"
  | "module"
  | "lesson"
  | "exercise"
  | "aircraft"
  | "aircraftSystem"
  | "aircraftLimitation"
  | "aircraftProcedure"
  | "aircraftPerformance"
  | "avionic"
  | "checklist"
  | "training";

export type AdminCollectionName =
  | "courses"
  | "modules"
  | "lessons"
  | "exercises"
  | "aircraft"
  | "aircraftSystems"
  | "aircraftLimitations"
  | "aircraftProcedures"
  | "aircraftPerformance"
  | "avionics"
  | "checklists"
  | "trainings";

export type AdminEntityConfig = {
  type: AdminEntityType;
  collectionName: AdminCollectionName;
  label: string;
  pluralLabel: string;
  description: string;
  titleField: string;
  slugField?: string;
  searchFields: string[];
  relationFields: string[];
  technical: boolean;
  uploadFolder?: "courseImages" | "lessonImages" | "aircraftImages" | "avionicsImages";
  defaultValues: AdminContentPayload;
};

export type AdminContentPayload = Record<string, unknown> & {
  id?: string;
  slug?: string;
  title?: string;
  name?: string;
  description?: string;
  publicationState?: PublicationState;
  archivedAt?: string | null;
  order?: number;
  technicalMetadata?: TechnicalMetadata;
};

export type AdminContentSummary = {
  id: string;
  entityType: AdminEntityType;
  collectionName: AdminCollectionName;
  title: string;
  subtitle: string;
  slug?: string;
  publicationState: PublicationState;
  archivedAt?: string | null;
  order?: number;
  updatedAt?: string;
  updatedBy?: string;
  createdBy?: string;
  technicalMetadata?: TechnicalMetadata;
  raw: AdminContentPayload;
};

export type AdminListFilters = {
  query: string;
  publicationState: "all" | PublicationState;
  classification: "all" | ContentClassification;
  verificationStatus: "all" | VerificationStatus;
  updatedBy: string;
};

export type AdminDashboardMetrics = {
  totalCourses: number;
  publishedCourses: number;
  draftCourses: number;
  totalModules: number;
  totalLessons: number;
  totalExercises: number;
  totalAircraft: number;
  totalAvionics: number;
  totalChecklists: number;
  totalTrainings: number;
  pendingVerification: number;
  markedForReview: number;
  recentChanges: AdminAuditLogDocument[];
};

export type AdminAuditAction =
  | "create"
  | "update"
  | "duplicate"
  | "publish"
  | "unpublish"
  | "archive"
  | "restore"
  | "submitForReview"
  | "verify"
  | "markConflict"
  | "createRevision"
  | "changeActiveVersion"
  | "migrateReferences"
  | "delete"
  | "upload";

export type AdminAuditLogDocument = {
  id: string;
  action: AdminAuditAction;
  entityType: AdminEntityType;
  entityId: string;
  entityTitle: string;
  userId: string;
  userRole: AdminRole;
  timestamp: string;
  previousStatus?: string;
  newStatus?: string;
  changedFields: string[];
  revisionNotes?: string;
};

export type AdminContentRevisionDocument = AdminAuditLogDocument & {
  snapshot?: AdminContentPayload;
};

export type AdminSaveResult = {
  id: string;
  title: string;
};

export type AdminUploadResult = {
  url: string;
  storagePath: string;
  alt: string;
};
