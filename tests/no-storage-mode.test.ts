import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import { adminEntityConfigs } from "@/features/admin/entityConfig";
import type { AdminContentPayload } from "@/features/admin/types";
import { validateAdminPayload } from "@/features/admin/validation";
import { getFirebaseStorage } from "@/lib/firebase/client";
import { getImageSourceKind, placeholderImagePath, resolveSafeImageSource } from "@/lib/images";
import { deleteAdminStorageFile } from "@/services/adminContentService";

describe("modo Spark sem Firebase Storage", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("mantém Storage desativado para qualquer valor diferente de true", async () => {
    vi.stubEnv("NEXT_PUBLIC_ENABLE_FIREBASE_STORAGE", "false");
    await expect(getFirebaseStorage()).rejects.toThrow(/Storage está desativado/);

    vi.stubEnv("NEXT_PUBLIC_ENABLE_FIREBASE_STORAGE", "TRUE");
    await expect(getFirebaseStorage()).rejects.toThrow(/Storage está desativado/);
  });

  it("aceita URL HTTPS e imagem local no painel administrativo", () => {
    expect(validateAdminPayload(adminEntityConfigs.course, coursePayload("https://example.com/imagem.jpg"), "admin")).toEqual([]);
    expect(validateAdminPayload(adminEntityConfigs.course, coursePayload("/images/cursos/curso1.jpg"), "admin")).toEqual([]);
  });

  it("rejeita referências de imagem inseguras", () => {
    const invalidSources = ["javascript:alert(1)", "data:image/png;base64,abc", "../secret.png", "http://example.com/imagem.jpg"];

    for (const source of invalidSources) {
      const issues = validateAdminPayload(adminEntityConfigs.course, coursePayload(source), "admin");
      expect(issues.some((issue) => issue.field === "imageUrl")).toBe(true);
    }
  });

  it("resolve placeholder local quando a imagem está ausente ou inválida", () => {
    expect(resolveSafeImageSource("")).toBe(placeholderImagePath);
    expect(resolveSafeImageSource("javascript:alert(1)")).toBe(placeholderImagePath);
    expect(getImageSourceKind("/images/placeholder.svg")).toBe("local");
  });

  it("não tenta excluir arquivo antigo quando Storage está desativado", async () => {
    vi.stubEnv("NEXT_PUBLIC_ENABLE_FIREBASE_STORAGE", "false");
    await expect(deleteAdminStorageFile("courseImages/course-a/main.png")).resolves.toBeUndefined();
  });

  it("não mantém imports estáticos de firebase/storage no código da aplicação", () => {
    const files = [
      "src/lib/firebase/client.ts",
      "src/services/adminContentService.ts",
      "src/services/storageService.ts"
    ];

    for (const file of files) {
      const source = readFileSync(resolve(file), "utf8");
      expect(source).not.toMatch(/import\s+\{[^}]+\}\s+from\s+["']firebase\/storage["']/);
    }
  });

  it("bloqueia upload antes de carregar firebase/storage", () => {
    const source = readFileSync(resolve("src/services/adminContentService.ts"), "utf8");
    expect(source.indexOf("isFirebaseStorageEnabled")).toBeGreaterThanOrEqual(0);
    expect(source.indexOf("isFirebaseStorageEnabled")).toBeLessThan(source.indexOf('import("firebase/storage")'));
  });

  it("avatar funciona sem Storage", () => {
    const source = readFileSync(resolve("src/components/ui/SafeImage.tsx"), "utf8");
    expect(source).toContain("UserAvatar");
    expect(source).toContain("getInitials");
    expect(source).not.toContain("firebase/storage");
  });

  it("scripts padrão não iniciam Storage Emulator nem fazem deploy de Storage", () => {
    const packageJson = JSON.parse(readFileSync(resolve("package.json"), "utf8")) as { scripts: Record<string, string> };
    expect(packageJson.scripts.test).not.toContain("emulators:exec");
    expect(packageJson.scripts["test:rules"]).toContain("--only firestore");
    expect(packageJson.scripts["test:rules"]).not.toContain("storage");
    expect(packageJson.scripts["test:firebase"]).toContain("--only auth,firestore");
    expect(packageJson.scripts["test:firebase"]).not.toContain("storage");
    expect(packageJson.scripts.emulators).toContain("--only auth,firestore");
    expect(packageJson.scripts.emulators).not.toContain("storage");
    expect(packageJson.scripts["deploy:firestore"]).toBe("firebase deploy --only firestore:rules,firestore:indexes");
  });
});

function coursePayload(imageUrl: string): AdminContentPayload {
  return {
    ...adminEntityConfigs.course.defaultValues,
    id: "course-a",
    title: "Curso",
    slug: "curso",
    imageUrl,
    publicationState: "draft" as const
  };
}
