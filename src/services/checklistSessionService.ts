import type { ChecklistDocument, UserChecklistSessionDocument } from "@/features/checklists/types";

const SESSION_KEY = "flight-academy-simulator:checklist-sessions:v1";
const DEFAULT_USER_ID = "local-student";

function nowIso() {
  return new Date().toISOString();
}

function readSessions(): UserChecklistSessionDocument[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    return JSON.parse(window.localStorage.getItem(SESSION_KEY) ?? "[]") as UserChecklistSessionDocument[];
  } catch {
    return [];
  }
}

function writeSessions(sessions: UserChecklistSessionDocument[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(SESSION_KEY, JSON.stringify(sessions));
}

export function readChecklistSession(checklist: ChecklistDocument): UserChecklistSessionDocument {
  const sessions = readSessions();
  const existing = sessions.find((session) => session.checklistId === checklist.id);

  if (existing) {
    return {
      ...existing,
      progressPercent: calculateChecklistProgress(checklist, existing.completedItemIds)
    };
  }

  return {
    id: `checklist-session-${DEFAULT_USER_ID}-${checklist.id}`,
    userId: DEFAULT_USER_ID,
    checklistId: checklist.id,
    completedItemIds: [],
    mode: "study",
    progressPercent: 0,
    updatedAt: nowIso()
  };
}

export function toggleChecklistItem(checklist: ChecklistDocument, itemId: string) {
  const current = readChecklistSession(checklist);
  const completedItemIds = current.completedItemIds.includes(itemId)
    ? current.completedItemIds.filter((completedItemId) => completedItemId !== itemId)
    : [...current.completedItemIds, itemId];

  return writeChecklistSession(checklist, {
    ...current,
    completedItemIds,
    progressPercent: calculateChecklistProgress(checklist, completedItemIds),
    updatedAt: nowIso()
  });
}

export function resetChecklistSession(checklist: ChecklistDocument) {
  return writeChecklistSession(checklist, {
    ...readChecklistSession(checklist),
    completedItemIds: [],
    progressPercent: 0,
    updatedAt: nowIso()
  });
}

export function setChecklistMode(checklist: ChecklistDocument, mode: UserChecklistSessionDocument["mode"]) {
  const current = readChecklistSession(checklist);
  return writeChecklistSession(checklist, { ...current, mode, updatedAt: nowIso() });
}

export function calculateChecklistProgress(checklist: ChecklistDocument, completedItemIds: string[]) {
  if (checklist.items.length === 0) {
    return 0;
  }

  return Math.round((completedItemIds.length / checklist.items.length) * 100);
}

function writeChecklistSession(checklist: ChecklistDocument, session: UserChecklistSessionDocument) {
  const sessions = readSessions();
  const nextSession = {
    ...session,
    progressPercent: calculateChecklistProgress(checklist, session.completedItemIds)
  };
  writeSessions([...sessions.filter((item) => item.checklistId !== checklist.id), nextSession]);
  return nextSession;
}
