import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { localAircraftDocuments } from "@/features/aircraft/data/localAircraft";
import { c408ChecklistAircraftId, localChecklistDocuments } from "@/features/checklists/data/localChecklists";
import { getFlightPhaseLabel, operationalFlightPhaseOrder } from "@/features/checklists/statusLabels";

describe("organização dos checklists por aeronave", () => {
  it("exibe somente o C408 como aeronave atual com checklists publicados", () => {
    const visibleAircraft = localAircraftDocuments.filter(
      (aircraft) =>
        aircraft.publicationState === "published" &&
        aircraft.studyStatus === "current" &&
        localChecklistDocuments.some((checklist) => checklist.aircraftId === aircraft.id && checklist.publicationState === "published")
    );

    expect(visibleAircraft.map((aircraft) => aircraft.fullName)).toEqual(["Cessna 408 SkyCourier"]);
  });

  it("mantém todos os checklists vinculados ao C408 por ID estável", () => {
    expect(localChecklistDocuments).toHaveLength(23);
    expect(localChecklistDocuments.every((checklist) => checklist.aircraftId === c408ChecklistAircraftId)).toBe(true);
    expect(localChecklistDocuments.every((checklist) => checklist.id.startsWith("checklist-c408-"))).toBe(true);
    expect(localChecklistDocuments.every((checklist) => checklist.items.every((item) => item.checklistId === checklist.id))).toBe(true);
  });

  it("mantém as fases na ordem operacional esperada", () => {
    const orderedPhases = [...localChecklistDocuments].sort((a, b) => a.order - b.order).map((checklist) => checklist.flightPhase);

    expect(orderedPhases).toEqual(operationalFlightPhaseOrder);
    expect(orderedPhases.map((phase) => getFlightPhaseLabel(phase))).toEqual([
      "Preparação do voo",
      "Inspeção externa",
      "Cockpit inicial",
      "Energização",
      "Antes da partida",
      "Partida do motor 1",
      "Partida do motor 2",
      "Após a partida",
      "Antes do táxi",
      "Táxi",
      "Antes da decolagem",
      "Alinhamento",
      "Decolagem",
      "Após a decolagem",
      "Subida",
      "Cruzeiro",
      "Preparação da descida",
      "Descida",
      "Aproximação",
      "Antes do pouso",
      "Após pouso",
      "Estacionamento",
      "Desligamento"
    ]);
  });

  it("mantém a página da aeronave como consulta rápida sem estado de checklist", () => {
    const source = readFileSync("src/components/checklists/ChecklistCenter.tsx", "utf8");

    expect(source).not.toContain("useState");
    expect(source).not.toContain("readChecklistSession");
    expect(source).not.toContain("toggleChecklistItem");
    expect(source).not.toContain("resetChecklistSession");
    expect(source).not.toContain("type=\"checkbox\"");
    expect(source).not.toContain("Progresso da fase");
    expect(source).toContain("OVERHEAD");
    expect(source).toContain("FRONTAL");
    expect(source).toContain("PEDESTAL");
  });
});
