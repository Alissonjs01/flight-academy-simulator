import { afterEach, describe, expect, it, vi } from "vitest";
import { localAircraftDocuments } from "@/features/aircraft/data/localAircraft";
import { c408ChecklistAircraftId, localChecklistDocuments } from "@/features/checklists/data/localChecklists";
import { getFlightPhaseLabel, operationalFlightPhaseOrder } from "@/features/checklists/statusLabels";
import { readChecklistSession, resetChecklistSession, toggleChecklistItem } from "@/services/checklistSessionService";

describe("organização dos checklists por aeronave", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

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

  it("marca e reinicia a sessão sem escrever no progresso pedagógico", () => {
    const storage = createStorage();
    vi.stubGlobal("window", { localStorage: storage });

    const checklist = localChecklistDocuments[0];
    const firstItemId = checklist.items[0].id;

    expect(readChecklistSession(checklist).progressPercent).toBe(0);

    const markedSession = toggleChecklistItem(checklist, firstItemId);
    expect(markedSession.completedItemIds).toEqual([firstItemId]);
    expect(markedSession.progressPercent).toBe(20);

    const resetSession = resetChecklistSession(checklist);
    expect(resetSession.completedItemIds).toEqual([]);
    expect(resetSession.progressPercent).toBe(0);

    expect(storage.getItem("flight-academy-simulator:student-progress:v1")).toBeNull();
  });
});

function createStorage(): Storage {
  const store = new Map<string, string>();

  return {
    get length() {
      return store.size;
    },
    clear() {
      store.clear();
    },
    getItem(key: string) {
      return store.get(key) ?? null;
    },
    key(index: number) {
      return Array.from(store.keys())[index] ?? null;
    },
    removeItem(key: string) {
      store.delete(key);
    },
    setItem(key: string, value: string) {
      store.set(key, value);
    }
  };
}
