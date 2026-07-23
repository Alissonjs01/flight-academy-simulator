import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { isAdministrativeRoute, isFirebaseRequest, isPrivateRoute, isPublicNavigationRoute, isStaticAsset } from "@/features/pwa/cachePolicy";

describe("PWA manifest", () => {
  it("possui campos essenciais e ícones instaláveis", () => {
    const manifest = JSON.parse(readFileSync(resolve("public/manifest.webmanifest"), "utf8")) as {
      name?: string;
      short_name?: string;
      start_url?: string;
      scope?: string;
      display?: string;
      lang?: string;
      icons?: Array<{ src: string; sizes: string; purpose?: string }>;
    };

    expect(manifest.name).toBe("Flight Academy Simulator");
    expect(manifest.short_name).toBe("Flight Academy");
    expect(manifest.start_url).toContain("/dashboard");
    expect(manifest.scope).toBe("/");
    expect(manifest.display).toBe("standalone");
    expect(manifest.lang).toBe("pt-BR");
    expect(manifest.icons?.some((icon) => icon.sizes === "192x192")).toBe(true);
    expect(manifest.icons?.some((icon) => icon.sizes === "512x512")).toBe(true);
    expect(manifest.icons?.some((icon) => icon.purpose === "maskable")).toBe(true);
  });
});

describe("PWA cache policy", () => {
  it("separa assets estáticos, rotas públicas, privadas e administrativas", () => {
    expect(isStaticAsset("/_next/static/chunk.js")).toBe(true);
    expect(isStaticAsset("/icons/icon-192.png")).toBe(true);
    expect(isPublicNavigationRoute("/cursos/fundamentos-da-pilotagem")).toBe(true);
    expect(isPrivateRoute("/dashboard")).toBe(true);
    expect(isAdministrativeRoute("/admin")).toBe(true);
    expect(isPublicNavigationRoute("/admin")).toBe(false);
  });

  it("identifica hosts Firebase para evitar cache manual", () => {
    expect(isFirebaseRequest(new URL("https://firestore.googleapis.com/v1/projects/demo/databases"))).toBe(true);
    expect(isFirebaseRequest(new URL("https://identitytoolkit.googleapis.com/v1/accounts"))).toBe(true);
    expect(isFirebaseRequest(new URL("https://example.com/content"))).toBe(false);
  });
});

describe("PWA service worker", () => {
  it("possui fallback offline e comandos de limpeza de cache", () => {
    const serviceWorker = readFileSync(resolve("public/sw.js"), "utf8");
    expect(serviceWorker).toContain("CLEAR_PRIVATE_CACHES");
    expect(serviceWorker).toContain("CLEAR_PUBLIC_CACHES");
    expect(serviceWorker).toContain("CLEAR_ALL_CACHES");
    expect(serviceWorker).toContain("offlineFallback");
    expect(serviceWorker).toContain("isFirebaseRequest");
  });

  it("registra o service worker pelo provedor PWA", () => {
    const provider = readFileSync(resolve("src/components/pwa/PwaProvider.tsx"), "utf8");
    expect(provider).toContain("registerServiceWorker");
    expect(provider).toContain("beforeinstallprompt");
    expect(provider).toContain("Uma nova versão da plataforma está disponível");
  });
});
