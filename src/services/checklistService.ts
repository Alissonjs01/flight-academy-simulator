import type { ChecklistFilters } from "@/features/checklists/types";
import { getChecklistRepository } from "@/features/checklists/repositories/repositoryFactory";

export async function listChecklists(filters?: ChecklistFilters) {
  return getChecklistRepository().listChecklists(filters);
}

export async function getChecklistBySlug(slug: string) {
  return getChecklistRepository().getChecklistBySlug(slug);
}
