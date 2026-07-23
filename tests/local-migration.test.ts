import { afterEach, describe, expect, it } from "vitest";
import { clearPrivateLocalData, detectLocalMigrationSummary } from "@/services/localStorageMigrationService";

const keys = {
  progress: "flight-academy-simulator:student-progress:v1",
  exerciseAttempts: "flight-academy-simulator:exercise-attempts:v1",
  reviewItems: "flight-academy-simulator:review-items:v1",
  assessmentAttempts: "flight-academy-simulator:assessment-attempts:v1",
  checklistSessions: "flight-academy-simulator:checklist-sessions:v1",
  trainingRecords: "flight-academy-simulator:training-records:v1"
};

afterEach(() => {
  installLocalStorage();
  clearPrivateLocalData();
});

describe("migração localStorage", () => {
  it("detecta usuário sem progresso local", () => {
    installLocalStorage();
    const summary = detectLocalMigrationSummary();
    expect(summary.hasLocalData).toBe(false);
  });

  it("detecta progresso local reconhecido", () => {
    installLocalStorage();
    window.localStorage.setItem(keys.progress, JSON.stringify({ completedLessonIds: ["lesson-a"], currentLessonId: "lesson-b" }));
    window.localStorage.setItem(keys.exerciseAttempts, JSON.stringify([{ id: "attempt-a", exerciseId: "exercise-a", lessonId: "lesson-a" }]));
    window.localStorage.setItem(keys.checklistSessions, JSON.stringify([{ id: "checklist-a", checklistId: "checklist-a", completedItemIds: ["item-a"] }]));

    const summary = detectLocalMigrationSummary();
    expect(summary.hasLocalData).toBe(true);
    expect(summary.progressCount).toBe(1);
    expect(summary.exerciseAttemptCount).toBe(1);
    expect(summary.checklistSessionCount).toBe(1);
  });

  it("ignora dados parcialmente inválidos", () => {
    installLocalStorage();
    window.localStorage.setItem(keys.progress, JSON.stringify({ completedLessonIds: "invalido" }));
    window.localStorage.setItem(keys.exerciseAttempts, JSON.stringify([{ id: "sem-exercise" }, { id: "attempt-ok", exerciseId: "exercise-a", lessonId: "lesson-a" }]));
    const summary = detectLocalMigrationSummary();
    expect(summary.progressCount).toBe(0);
    expect(summary.exerciseAttemptCount).toBe(1);
  });

  it("exclui dados privados locais", () => {
    installLocalStorage();
    window.localStorage.setItem(keys.progress, JSON.stringify({ completedLessonIds: ["lesson-a"] }));
    clearPrivateLocalData();
    expect(window.localStorage.getItem(keys.progress)).toBeNull();
  });
});

function installLocalStorage() {
  const store = new Map<string, string>();
  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: {
      localStorage: {
        getItem: (key: string) => store.get(key) ?? null,
        setItem: (key: string, value: string) => store.set(key, value),
        removeItem: (key: string) => store.delete(key)
      }
    }
  });
}
