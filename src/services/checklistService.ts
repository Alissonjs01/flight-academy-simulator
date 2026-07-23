import type { ChecklistFilters } from "@/features/checklists/types";
import { localChecklistRepository } from "@/features/checklists/repositories/localChecklistRepository";

const repository = localChecklistRepository;

export async function listChecklists(filters?: ChecklistFilters) {
  return repository.listChecklists(filters);
}

export async function getChecklistBySlug(slug: string) {
  return repository.getChecklistBySlug(slug);
}
