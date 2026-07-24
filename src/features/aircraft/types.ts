import type { PublicationState } from "@/features/content/types";
import type { TechnicalMetadata } from "@/features/technical/types";

export type AircraftStudyStatus = "current" | "available" | "planned" | "paused";

export type AircraftSystemCategory =
  | "electrical"
  | "fuel"
  | "hydraulic"
  | "pneumatic"
  | "environmental"
  | "flightControls"
  | "landingGear"
  | "brakes"
  | "iceProtection"
  | "fireProtection"
  | "propulsion"
  | "avionics"
  | "navigation"
  | "communication"
  | "lighting"
  | "warningSystems"
  | "other";

export type AircraftLimitationCategory =
  | "airspeed"
  | "altitude"
  | "weight"
  | "centerOfGravity"
  | "engine"
  | "propeller"
  | "temperature"
  | "fuel"
  | "loadFactor"
  | "runway"
  | "weather"
  | "icing"
  | "autopilot"
  | "avionics"
  | "operational"
  | "other";

export type AircraftProcedureType = "normal" | "abnormal" | "emergency" | "supplementary" | "simulatorAdaptation" | "trainingOnly";

export type AircraftProcedurePhase =
  | "preflight"
  | "cockpitPreparation"
  | "beforeStart"
  | "engineStart"
  | "afterStart"
  | "taxi"
  | "beforeTakeoff"
  | "takeoff"
  | "climb"
  | "cruise"
  | "descent"
  | "approach"
  | "landing"
  | "afterLanding"
  | "shutdown"
  | "securing"
  | "goAround"
  | "rejectedTakeoff"
  | "emergency";

export type AircraftProcedureStep = {
  id: string;
  order: number;
  action: string;
  controlOrEquipment?: string;
  expectedPositionOrValue?: string;
  expectedResponse?: string;
  responsible?: string;
  condition?: string;
  note?: string;
  critical: boolean;
  technicalReference?: string;
};

export type AircraftPerformanceType =
  | "takeoffDistance"
  | "landingDistance"
  | "climbPerformance"
  | "cruisePerformance"
  | "fuelFlow"
  | "endurance"
  | "range"
  | "ceiling"
  | "weightAndBalance"
  | "runwayCorrection"
  | "temperatureCorrection"
  | "windCorrection"
  | "other";

export type AircraftPerformanceTable = {
  id: string;
  headers: string[];
  units: string[];
  rows: Array<{ id: string; cells: string[] }>;
  originalUnit?: string;
};

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
  slug?: string;
  category?: AircraftSystemCategory;
  summary: string;
  description?: string;
  details: string;
  components?: string[];
  controls?: string[];
  indications?: string[];
  normalOperation?: string;
  abnormalConsiderations?: string;
  warnings?: string[];
  cautions?: string[];
  notes?: string[];
  relatedSystemIds?: string[];
  subsections?: Array<{ id: string; title: string; body: string; order: number }>;
  imageIds?: string[];
  diagramIds?: string[];
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
  category?: AircraftLimitationCategory;
  value: string;
  unit?: string;
  minValue?: string;
  maxValue?: string;
  condition?: string;
  aircraftConfiguration?: string;
  flightPhase?: string;
  note: string;
  warning?: string;
  caution?: string;
  applicability?: string;
  aircraftVariant?: string;
  simulatorAircraftVariant?: string;
  simulatorImplementation?: "implemented" | "not_implemented" | "partial" | "unknown";
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
  type?: AircraftPerformanceType;
  aircraftVariant?: string;
  engine?: string;
  configuration?: string;
  weightOrMass?: string;
  altitude?: string;
  temperature?: string;
  wind?: string;
  runwayCondition?: string;
  powerSetting?: string;
  speed?: string;
  fuel?: string;
  distance?: string;
  value: string;
  unit?: string;
  conditions?: string;
  note: string;
  table?: AircraftPerformanceTable;
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
  type?: AircraftProcedureType;
  phase: string;
  title: string;
  applicability?: string;
  aircraftVariant?: string;
  entryConditions?: string;
  expectedResult?: string;
  warnings?: string[];
  cautions?: string[];
  notes?: string[];
  memoryOrReference?: "memory" | "reference" | "both";
  steps: string[] | AircraftProcedureStep[];
  simulatorAdaptation?: string;
  knownSimulatorDifferences?: string;
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
