import { describe, expect, it } from "vitest";
import { localCourseDocuments, localExerciseDocuments, localFinalAssessmentDocuments, localLessonDocuments } from "@/features/content/data/localContent";
import { localAircraftDocuments, localAircraftLimitationDocuments, localAircraftProcedureDocuments, localAircraftSystemDocuments } from "@/features/aircraft/data/localAircraft";
import { localAvionicDocuments, localAvionicProcedureDocuments, localAvionicSectionDocuments } from "@/features/avionics/data/localAvionics";
import { localChecklistDocuments } from "@/features/checklists/data/localChecklists";
import { localTrainingDocuments } from "@/features/trainings/data/localTrainings";
import type { TechnicalMetadata } from "@/features/technical/types";

describe("fidelidade técnica do conteúdo local", () => {
  it("não marca conteúdo provisório local como verificado", () => {
    const metadata = collectMetadata();
    expect(metadata.length).toBeGreaterThan(0);
    expect(metadata.some((item) => item.verificationStatus === "verified")).toBe(false);
  });

  it("mantém conteúdos sem fonte confirmada como pendentes de verificação", () => {
    const metadata = collectMetadata();
    expect(metadata.every((item) => item.verificationStatus === "pending_verification")).toBe(true);
    expect(metadata.every((item) => item.contentClassification !== "official_real_world")).toBe(true);
  });
});

function collectMetadata(): TechnicalMetadata[] {
  return [
    ...localCourseDocuments.map((item) => item.technicalMetadata),
    ...localLessonDocuments.map((item) => item.technicalMetadata),
    ...localExerciseDocuments.map((item) => item.technicalMetadata),
    ...localFinalAssessmentDocuments.map((item) => item.technicalMetadata),
    ...localAircraftDocuments.map((item) => item.technicalMetadata),
    ...localAircraftSystemDocuments.map((item) => item.technicalMetadata),
    ...localAircraftLimitationDocuments.map((item) => item.technicalMetadata),
    ...localAircraftProcedureDocuments.map((item) => item.technicalMetadata),
    ...localAvionicDocuments.map((item) => item.technicalMetadata),
    ...localAvionicSectionDocuments.map((item) => item.technicalMetadata),
    ...localAvionicProcedureDocuments.map((item) => item.technicalMetadata),
    ...localChecklistDocuments.flatMap((item) => [item.technicalMetadata, ...item.items.map((child) => child.technicalMetadata)]),
    ...localTrainingDocuments.map((item) => item.technicalMetadata)
  ].filter((item): item is TechnicalMetadata => Boolean(item));
}
