import type { ChecklistRepository } from "@/features/checklists/repositories/checklistRepository";
import type { ChecklistDocument, ChecklistFilters } from "@/features/checklists/types";
import { localChecklistDocuments } from "@/features/checklists/data/localChecklists";

function byOrder(items: ChecklistDocument[]) {
  return [...items].sort((a, b) => a.order - b.order);
}

function matchesText(checklist: ChecklistDocument, query?: string) {
  if (!query?.trim()) {
    return true;
  }

  const normalizedQuery = query.trim().toLocaleLowerCase("pt-BR");
  const haystack = [checklist.title, checklist.description, checklist.aircraftName, checklist.flightPhase].join(" ").toLocaleLowerCase("pt-BR");

  return haystack.includes(normalizedQuery);
}

function matchesFilters(checklist: ChecklistDocument, filters?: ChecklistFilters) {
  const aircraftMatches = !filters?.aircraftId || filters.aircraftId === "Todos" || checklist.aircraftId === filters.aircraftId;
  const phaseMatches = !filters?.flightPhase || filters.flightPhase === "Todos" || checklist.flightPhase === filters.flightPhase;

  return aircraftMatches && phaseMatches && matchesText(checklist, filters?.query);
}

export const localChecklistRepository: ChecklistRepository = {
  async listChecklists(filters) {
    return byOrder(localChecklistDocuments.filter((checklist) => matchesFilters(checklist, filters)));
  },

  async getChecklistById(checklistId) {
    return localChecklistDocuments.find((checklist) => checklist.id === checklistId);
  },

  async getChecklistBySlug(slug) {
    return localChecklistDocuments.find((checklist) => checklist.slug === slug);
  }
};
