import type { ChecklistRepository } from "@/features/checklists/repositories/checklistRepository";

export type FirestoreChecklistCollectionPath =
  | "checklists"
  | "checklists/{checklistId}/items"
  | "users/{userId}/userChecklistSessions";

export type FirestoreChecklistRepository = ChecklistRepository;

export const firestoreChecklistCollectionPaths: Record<string, FirestoreChecklistCollectionPath> = {
  checklists: "checklists",
  checklistItems: "checklists/{checklistId}/items",
  userChecklistSessions: "users/{userId}/userChecklistSessions"
};
