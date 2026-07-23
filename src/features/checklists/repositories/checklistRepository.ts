import type { ChecklistDocument, ChecklistFilters } from "@/features/checklists/types";

export type ChecklistRepository = {
  listChecklists(filters?: ChecklistFilters): Promise<ChecklistDocument[]>;
  getChecklistById(checklistId: string): Promise<ChecklistDocument | undefined>;
  getChecklistBySlug(slug: string): Promise<ChecklistDocument | undefined>;
};
