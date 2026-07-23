import type { ContentClassification, TechnicalMetadata, VerificationStatus } from "@/features/technical/types";

export const platformTechnicalDisclaimer =
  "A plataforma não substitui instrução real, AFM, POH, FCOM, QRH, checklists oficiais ou documentos do fabricante.";

export const classificationLabels: Record<ContentClassification, string> = {
  official_real_world: "Procedimento real oficial",
  official_simulator_documentation: "Documentação oficial do simulador",
  simulator_adaptation: "Adaptação para simulador",
  training_exercise: "Exercício didático",
  educational_explanation: "Explicação educacional",
  provisional_unverified: "Provisório não verificado"
};

export const verificationStatusLabels: Record<VerificationStatus, string> = {
  verified: "Verificado",
  partially_verified: "Parcialmente verificado",
  pending_verification: "Pendente de verificação",
  conflicting_sources: "Fontes conflitantes",
  obsolete: "Obsoleto"
};

export function technicalMetadata(overrides: Partial<TechnicalMetadata> = {}): TechnicalMetadata {
  return {
    contentClassification: "provisional_unverified",
    verificationStatus: "pending_verification",
    sourceType: "internal_training_material",
    sourceTitle: "Conteúdo local provisório",
    sourceOrganization: "Flight Academy Simulator",
    simulatorPlatform: "Microsoft Flight Simulator",
    technicalDisclaimer: platformTechnicalDisclaimer,
    revisionNotes: "Conteúdo preparado para futura verificação técnica e registro de fonte.",
    ...overrides
  };
}

export function provisionalTechnicalMetadata(overrides: Partial<TechnicalMetadata> = {}) {
  return technicalMetadata({
    contentClassification: "provisional_unverified",
    verificationStatus: "pending_verification",
    ...overrides
  });
}

export function simulatorAdaptationMetadata(overrides: Partial<TechnicalMetadata> = {}) {
  return technicalMetadata({
    contentClassification: "simulator_adaptation",
    verificationStatus: "pending_verification",
    simulatorAdaptationNotes: "Adaptação criada para estudo no Microsoft Flight Simulator; validar contra a variante e a documentação aplicáveis antes de uso operacional.",
    ...overrides
  });
}

export function trainingExerciseMetadata(overrides: Partial<TechnicalMetadata> = {}) {
  return technicalMetadata({
    contentClassification: "training_exercise",
    verificationStatus: "pending_verification",
    sourceType: "internal_training_material",
    revisionNotes: "Exercício didático local. Não classificar como fonte técnica ou procedimento oficial.",
    ...overrides
  });
}

export function educationalExplanationMetadata(overrides: Partial<TechnicalMetadata> = {}) {
  return technicalMetadata({
    contentClassification: "educational_explanation",
    verificationStatus: "pending_verification",
    sourceType: "internal_training_material",
    revisionNotes: "Explicação didática local. Usar fontes aeronáuticas primárias para validação técnica.",
    ...overrides
  });
}
