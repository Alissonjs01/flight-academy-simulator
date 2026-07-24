import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { localLessonDocuments } from "@/features/content/data/localContent";
import { clearPrivateLocalData } from "@/services/localStorageMigrationService";
import { calculateCourseProgress, createInitialProgress, readLocalProgress } from "@/services/progressService";
import { calculateOverallProgressPercent, readUserProfileStats } from "@/services/userProfileStatsService";

const keys = {
  progress: "flight-academy-simulator:student-progress:v1",
  exerciseAttempts: "flight-academy-simulator:exercise-attempts:v1",
  assessmentAttempts: "flight-academy-simulator:assessment-attempts:v1",
  checklistSessions: "flight-academy-simulator:checklist-sessions:v1",
  trainingRecords: "flight-academy-simulator:training-records:v1"
};

afterEach(() => {
  installLocalStorage();
  clearPrivateLocalData();
});

describe("progresso inicial e estatísticas do perfil", () => {
  it("inicia usuário novo com 0% e nenhuma aula concluída", () => {
    const progress = createInitialProgress(localLessonDocuments);
    const summary = calculateCourseProgress(localLessonDocuments, progress);

    expect(progress.completedLessonIds).toEqual([]);
    expect(summary.completedLessons).toBe(0);
    expect(summary.coursePercent).toBe(0);
  });

  it("não grava progresso fictício no localStorage apenas por abrir o dashboard", () => {
    installLocalStorage();
    const progress = readLocalProgress(localLessonDocuments);

    expect(progress.completedLessonIds).toEqual([]);
    expect(window.localStorage.getItem(keys.progress)).toBeNull();
  });

  it("calcula percentual apenas por aulas concluídas reais e nunca acima de 100", () => {
    const allLessonIds = localLessonDocuments.map((lesson) => lesson.id);
    const summary = calculateCourseProgress(localLessonDocuments, {
      id: "progress-user-a",
      studentId: "user-a",
      completedLessonIds: [...allLessonIds, "lesson-inexistente"],
      updatedAt: new Date().toISOString()
    });

    expect(calculateOverallProgressPercent(0, allLessonIds.length)).toBe(0);
    expect(summary.coursePercent).toBe(100);
  });

  it("não herda estatísticas privadas de outro UID", () => {
    installLocalStorage();
    window.localStorage.setItem(keys.progress, JSON.stringify({ id: "progress-user-a", userId: "user-a", studentId: "user-a", completedLessonIds: ["lesson-a"], currentLessonId: "lesson-b" }));
    window.localStorage.setItem(keys.checklistSessions, JSON.stringify([{ id: "checklist-user-a", userId: "user-a", checklistId: "checklist-a", completedItemIds: ["item-a"], progressPercent: 100 }]));

    const userAStats = readUserProfileStats("user-a", 10);
    const userBStats = readUserProfileStats("user-b", 10);

    expect(userAStats.overallProgressPercent).toBe(10);
    expect(userAStats.completedChecklists).toBe(1);
    expect(userBStats.overallProgressPercent).toBe(0);
    expect(userBStats.completedChecklists).toBe(0);
  });

  it("limpa estado privado local antes de uma troca de conta", () => {
    installLocalStorage();
    window.localStorage.setItem(keys.progress, JSON.stringify({ id: "progress-user-a", userId: "user-a", studentId: "user-a", completedLessonIds: ["lesson-a"] }));
    clearPrivateLocalData();

    expect(readUserProfileStats("user-b", 10)).toMatchObject({
      coursesStarted: 0,
      completedLessons: 0,
      completedChecklists: 0,
      assessmentAttempts: 0
    });
  });
});

describe("estado de autenticação e modal de perfil", () => {
  it("separa erro de autenticação de erro de perfil/Firestore", () => {
    const provider = readFileSync(resolve("src/components/auth/AuthProvider.tsx"), "utf8");
    const gate = readFileSync(resolve("src/components/auth/AuthGate.tsx"), "utf8");

    expect(provider).toContain("authError");
    expect(provider).toContain("profileError");
    expect(provider).toContain("setAuthError(undefined)");
    expect(provider).toContain("setProfileError(getFirebaseDataErrorMessage");
    expect(gate).toContain("{authError ?");
    expect(gate).toContain("{profileError ?");
  });

  it("abre o popup pelo menu do usuário e apresenta estados vazios neutros", () => {
    const shell = readFileSync(resolve("src/components/layout/AppShell.tsx"), "utf8");
    const modal = readFileSync(resolve("src/components/profile/UserProfileModal.tsx"), "utf8");

    expect(shell).toContain("setProfileOpen(true)");
    expect(shell).toContain("UserProfileModal");
    expect(modal).toContain("Ainda não informado");
    expect(modal).toContain("Nenhum curso iniciado");
    expect(modal).toContain("Fechar perfil");
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
