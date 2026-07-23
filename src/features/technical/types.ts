export type ContentClassification =
  | "official_real_world"
  | "official_simulator_documentation"
  | "simulator_adaptation"
  | "training_exercise"
  | "educational_explanation"
  | "provisional_unverified";

export type VerificationStatus =
  | "verified"
  | "partially_verified"
  | "pending_verification"
  | "conflicting_sources"
  | "obsolete";

export type SourceType =
  | "afm_poh"
  | "fcom"
  | "qrh"
  | "sop"
  | "manufacturer_documentation"
  | "avionics_manual"
  | "simulator_developer_documentation"
  | "official_aeronautical_publication"
  | "trusted_technical_reference"
  | "internal_training_material"
  | "not_applicable"
  | "other";

export type TechnicalRevisionEntry = {
  id: string;
  changedAt: string;
  changedBy: string;
  summary: string;
  verificationStatus: VerificationStatus;
  sourceDocumentId?: string;
  notes?: string;
};

export type TechnicalMetadata = {
  sourceType?: SourceType;
  sourceTitle?: string;
  sourceOrganization?: string;
  sourceEdition?: string;
  sourceRevision?: string;
  sourceDate?: string;
  sourcePage?: string;
  sourceUrl?: string;
  sourceDocumentId?: string;
  aircraftManufacturer?: string;
  aircraftModel?: string;
  aircraftVariant?: string;
  simulatorAircraftVariant?: string;
  simulatorPlatform?: string;
  simulatorDeveloper?: string;
  addonVersion?: string;
  verificationStatus: VerificationStatus;
  verifiedBy?: string;
  verifiedAt?: string;
  lastReviewedAt?: string;
  contentClassification: ContentClassification;
  simulatorAdaptationNotes?: string;
  knownSimulatorDifferences?: string;
  technicalDisclaimer?: string;
  revisionNotes?: string;
  revisionHistory?: TechnicalRevisionEntry[];
  markedForReview?: boolean;
  reviewReason?: string;
};

export type WithTechnicalMetadata = {
  technicalMetadata?: TechnicalMetadata;
};
