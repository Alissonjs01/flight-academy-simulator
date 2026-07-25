import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { localCourseDocuments, localLessonDocuments, localModuleDocuments } from "@/features/content/data/localContent";
import type { CourseStructure } from "@/features/content/types";
import { clearPrivateLocalData } from "@/services/localStorageMigrationService";
import { calculateCourseProgress, calculateModuleProgress, completeLesson, createInitialProgress, getUnlockedCourseIdsFromProgress, readLocalProgress } from "@/services/progressService";
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

  it("preserva IDs concluídos de outros cursos ao ler o progresso de um curso específico", () => {
    installLocalStorage();
    const structures = buildCourseStructures();
    const fundamentos = structures.find((structure) => structure.course.id === "course-fundamentos-pilotagem");
    const garmin = structures.find((structure) => structure.course.id === "course-garmin-g1000-nxi");
    const completedLessonIds = [fundamentos?.modules[0]?.lessons[0]?.id, garmin?.modules[0]?.lessons[0]?.id].filter((id): id is string => Boolean(id));

    window.localStorage.setItem(keys.progress, JSON.stringify({ id: "progress-user-a", userId: "user-a", studentId: "user-a", completedLessonIds }));

    const courseOnlyProgress = readLocalProgress(fundamentos?.modules.flatMap((module) => module.lessons) ?? []);

    expect(courseOnlyProgress.completedLessonIds).toEqual(completedLessonIds);
  });

  it("desbloqueia o próximo curso quando todos os requisitos do curso anterior são concluídos", () => {
    const structures = buildCourseStructures();
    const fundamentos = structures.find((structure) => structure.course.id === "course-fundamentos-pilotagem");
    const initialProgress = createInitialProgress(localLessonDocuments);
    const completedFundamentosProgress = {
      ...initialProgress,
      completedLessonIds: fundamentos?.modules.flatMap((module) => module.lessons).filter((lesson) => lesson.publicationState === "published").map((lesson) => lesson.id) ?? []
    };

    expect(getUnlockedCourseIdsFromProgress(structures, initialProgress)).toContain("course-fundamentos-pilotagem");
    expect(getUnlockedCourseIdsFromProgress(structures, initialProgress)).not.toContain("course-garmin-g1000-nxi");
    expect(getUnlockedCourseIdsFromProgress(structures, completedFundamentosProgress)).toContain("course-garmin-g1000-nxi");
  });

  it("sincroniza aula, módulo e curso a partir dos IDs concluídos sem duplicar contagem", () => {
    installLocalStorage();
    const structures = buildCourseStructures();
    const fundamentos = structures.find((structure) => structure.course.id === "course-fundamentos-pilotagem");
    expect(fundamentos).toBeDefined();

    const lessons = fundamentos?.modules.flatMap((module) => module.lessons).filter((lesson) => lesson.publicationState === "published") ?? [];
    const firstLesson = lessons[0];
    const firstModule = fundamentos?.modules.find((module) => module.lessons.some((lesson) => lesson.id === firstLesson.id));
    let progress = createInitialProgress(lessons);

    progress = completeLesson(lessons, progress, firstLesson.id, fundamentos?.course.id);
    progress = completeLesson(lessons, progress, firstLesson.id, fundamentos?.course.id);

    expect(progress.completedLessonIds.filter((lessonId) => lessonId === firstLesson.id)).toHaveLength(1);
    expect(calculateModuleProgress(firstModule!, lessons, progress)).toBeGreaterThan(0);
    expect(calculateCourseProgress(lessons, progress).coursePercent).toBeGreaterThan(0);

    progress = lessons.reduce((current, lesson) => completeLesson(lessons, current, lesson.id, fundamentos?.course.id), progress);

    const summary = calculateCourseProgress(lessons, progress);
    expect(summary.completedLessons).toBe(summary.totalLessons);
    expect(summary.coursePercent).toBe(100);
    expect(getUnlockedCourseIdsFromProgress(structures, progress)).toContain("course-garmin-g1000-nxi");
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

describe("estado de autenticação e página de perfil", () => {
  it("separa erro de autenticação de erro de perfil/Firestore", () => {
    const provider = readFileSync(resolve("src/components/auth/AuthProvider.tsx"), "utf8");
    const gate = readFileSync(resolve("src/components/auth/AuthGate.tsx"), "utf8");

    expect(provider).toContain("authError");
    expect(provider).toContain("profileError");
    expect(provider).toContain("setAuthError(undefined)");
    expect(provider).toContain("createFallbackStudentProfile");
    expect(gate).toContain("{authError ?");
    expect(gate).not.toContain("{profileError ?");
  });

  it("leva o avatar para a rota de perfil e remove o popup antigo do fluxo principal", () => {
    const shell = readFileSync(resolve("src/components/layout/AppShell.tsx"), "utf8");
    const profilePage = readFileSync(resolve("src/components/profile/ProfilePage.tsx"), "utf8");
    const profileRoute = readFileSync(resolve("src/app/perfil/page.tsx"), "utf8");

    expect(shell).toContain("href=\"/perfil\"");
    expect(shell).not.toContain("UserProfileModal");
    expect(shell).not.toContain("setProfileOpen");
    expect(profileRoute).toContain("ProfilePage");
    expect(profilePage).toContain("Visão geral");
    expect(profilePage).toContain("Preferências");
    expect(profilePage).toContain("Conta");
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
      },
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      dispatchEvent: () => true
    }
  });
}

function buildCourseStructures(): CourseStructure[] {
  return localCourseDocuments.map((course) => ({
    course,
    modules: localModuleDocuments
      .filter((module) => module.courseId === course.id)
      .sort((a, b) => a.order - b.order)
      .map((module) => ({
        ...module,
        lessons: localLessonDocuments.filter((lesson) => lesson.moduleId === module.id).sort((a, b) => a.order - b.order)
      }))
  }));
}
