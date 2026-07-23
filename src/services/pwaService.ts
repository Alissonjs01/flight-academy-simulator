"use client";

import { privateCacheName, publicCacheName, runtimeCacheName } from "@/features/pwa/cachePolicy";
import { clearPrivateLocalData } from "@/services/localStorageMigrationService";

export type PwaConnectionState = "online" | "offline";

export type PwaStorageSummary = {
  usageBytes?: number;
  quotaBytes?: number;
  persisted?: boolean;
};

const privateCachePrefixes = ["flight-academy-private", "flight-academy-user", "flight-academy-admin"];
const allCachePrefixes = ["flight-academy-public", "flight-academy-runtime", ...privateCachePrefixes];

export function canUseServiceWorker() {
  return typeof window !== "undefined" && "serviceWorker" in navigator;
}

export function shouldRegisterServiceWorker() {
  if (!canUseServiceWorker()) {
    return false;
  }

  if (process.env.NODE_ENV === "production") {
    return true;
  }

  return process.env.NEXT_PUBLIC_ENABLE_PWA_IN_DEV === "true";
}

export async function unregisterServiceWorkersInDevelopment() {
  if (!canUseServiceWorker() || process.env.NODE_ENV === "production" || process.env.NEXT_PUBLIC_ENABLE_PWA_IN_DEV === "true") {
    return;
  }

  const registrations = await navigator.serviceWorker.getRegistrations();
  await Promise.all(registrations.map((registration) => registration.unregister()));
}

export async function registerServiceWorker(onUpdateFound: (registration: ServiceWorkerRegistration) => void) {
  if (!shouldRegisterServiceWorker()) {
    await unregisterServiceWorkersInDevelopment();
    return undefined;
  }

  const registration = await navigator.serviceWorker.register("/sw.js", { scope: "/" });

  registration.addEventListener("updatefound", () => {
    const installingWorker = registration.installing;
    if (!installingWorker) {
      return;
    }

    installingWorker.addEventListener("statechange", () => {
      if (installingWorker.state === "installed" && navigator.serviceWorker.controller) {
        onUpdateFound(registration);
      }
    });
  });

  return registration;
}

export function applyServiceWorkerUpdate(registration?: ServiceWorkerRegistration) {
  registration?.waiting?.postMessage({ type: "SKIP_WAITING" });
}

export async function clearPwaPrivateCaches() {
  await deleteCachesByPrefix(privateCachePrefixes);
  notifyServiceWorker({ type: "CLEAR_PRIVATE_CACHES" });
}

export async function clearPwaPublicCaches() {
  await deleteCachesByPrefix(["flight-academy-public", "flight-academy-runtime"]);
  notifyServiceWorker({ type: "CLEAR_PUBLIC_CACHES" });
}

export async function clearApplicationLocalData() {
  clearPrivateLocalData();
  await clearPwaPrivateCaches();
}

export async function clearAllPwaCaches() {
  await deleteCachesByPrefix(allCachePrefixes);
  notifyServiceWorker({ type: "CLEAR_ALL_CACHES" });
}

export function notifyServiceWorker(message: Record<string, unknown>) {
  if (!canUseServiceWorker()) {
    return;
  }

  navigator.serviceWorker.controller?.postMessage(message);
}

export function isStandaloneMode() {
  if (typeof window === "undefined") {
    return false;
  }

  const navigatorWithStandalone = navigator as Navigator & { standalone?: boolean };
  return window.matchMedia("(display-mode: standalone)").matches || window.matchMedia("(display-mode: fullscreen)").matches || navigatorWithStandalone.standalone === true;
}

export function isIosLike() {
  if (typeof window === "undefined") {
    return false;
  }

  const platform = navigator.platform.toLowerCase();
  const userAgent = navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(userAgent) || (platform === "macintel" && navigator.maxTouchPoints > 1);
}

export function isSafariLike() {
  if (typeof window === "undefined") {
    return false;
  }

  const userAgent = navigator.userAgent.toLowerCase();
  return userAgent.includes("safari") && !userAgent.includes("chrome") && !userAgent.includes("android");
}

export async function getPwaStorageSummary(): Promise<PwaStorageSummary> {
  if (typeof navigator === "undefined" || !navigator.storage?.estimate) {
    return {};
  }

  const estimate = await navigator.storage.estimate();
  const persisted = navigator.storage.persisted ? await navigator.storage.persisted() : undefined;
  return {
    usageBytes: estimate.usage,
    quotaBytes: estimate.quota,
    persisted
  };
}

export const activePwaCacheNames = {
  publicCacheName,
  runtimeCacheName,
  privateCacheName
};

async function deleteCachesByPrefix(prefixes: string[]) {
  if (typeof caches === "undefined") {
    return;
  }

  const cacheNames = await caches.keys();
  await Promise.all(cacheNames.filter((name) => prefixes.some((prefix) => name.startsWith(prefix))).map((name) => caches.delete(name)));
}
