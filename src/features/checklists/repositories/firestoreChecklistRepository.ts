import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { getFirebaseConfigStatus } from "@/lib/firebase/config";
import { getFirebaseDb } from "@/lib/firebase/client";
import type { ChecklistRepository } from "@/features/checklists/repositories/checklistRepository";
import type { ChecklistDocument, ChecklistFilters, ChecklistItemDocument } from "@/features/checklists/types";

async function listItems(checklistId: string) {
  const snapshot = await getDocs(query(collection(getFirebaseDb(), "checklistItems"), where("checklistId", "==", checklistId), orderBy("order", "asc")));
  return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }) as ChecklistItemDocument);
}

function matchesFilters(checklist: ChecklistDocument, filters?: ChecklistFilters) {
  const normalizedQuery = filters?.query?.trim().toLocaleLowerCase("pt-BR") ?? "";
  const haystack = [checklist.title, checklist.description, checklist.aircraftName].join(" ").toLocaleLowerCase("pt-BR");

  return (
    (!normalizedQuery || haystack.includes(normalizedQuery)) &&
    (!filters?.aircraftId || filters.aircraftId === "Todos" || checklist.aircraftId === filters.aircraftId) &&
    (!filters?.flightPhase || filters.flightPhase === "Todos" || checklist.flightPhase === filters.flightPhase)
  );
}

export const firestoreChecklistRepository: ChecklistRepository = {
  async listChecklists(filters) {
    const snapshot = await getDocs(query(collection(getFirebaseDb(), "checklists"), orderBy("order", "asc")));
    const checklists = await Promise.all(
      snapshot.docs.map(async (item) => ({ id: item.id, ...item.data(), items: await listItems(item.id) }) as ChecklistDocument)
    );
    return checklists.filter((checklist) => matchesFilters(checklist, filters));
  },
  async getChecklistById(checklistId) {
    const snapshot = await getDocs(query(collection(getFirebaseDb(), "checklists"), where("id", "==", checklistId), limit(1)));
    const item = snapshot.docs[0];
    return item ? ({ id: item.id, ...item.data(), items: await listItems(item.id) } as ChecklistDocument) : undefined;
  },
  async getChecklistBySlug(slug) {
    const snapshot = await getDocs(query(collection(getFirebaseDb(), "checklists"), where("slug", "==", slug), limit(1)));
    const item = snapshot.docs[0];
    return item ? ({ id: item.id, ...item.data(), items: await listItems(item.id) } as ChecklistDocument) : undefined;
  }
};

export function shouldUseFirestoreChecklists() {
  const status = getFirebaseConfigStatus();
  return status.isConfigured && status.useFirestoreContent;
}
