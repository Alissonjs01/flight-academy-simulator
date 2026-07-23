"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { applyServiceWorkerUpdate, getPwaStorageSummary, isIosLike, isSafariLike, isStandaloneMode, registerServiceWorker, type PwaStorageSummary } from "@/services/pwaService";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

type PwaContextValue = {
  isOnline: boolean;
  isStandalone: boolean;
  isIos: boolean;
  isSafari: boolean;
  canInstall: boolean;
  updateAvailable: boolean;
  storage?: PwaStorageSummary;
  install: () => Promise<void>;
  refreshStorage: () => Promise<void>;
  updateNow: () => void;
  dismissUpdate: () => void;
};

const PwaContext = createContext<PwaContextValue>({
  isOnline: true,
  isStandalone: false,
  isIos: false,
  isSafari: false,
  canInstall: false,
  updateAvailable: false,
  install: async () => undefined,
  refreshStorage: async () => undefined,
  updateNow: () => undefined,
  dismissUpdate: () => undefined
});

export function PwaProvider({ children }: { children: ReactNode }) {
  const [isOnline, setIsOnline] = useState(true);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [isSafari, setIsSafari] = useState(false);
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | undefined>();
  const [updateRegistration, setUpdateRegistration] = useState<ServiceWorkerRegistration | undefined>();
  const [showUpdate, setShowUpdate] = useState(false);
  const [storage, setStorage] = useState<PwaStorageSummary | undefined>();

  const install = useCallback(async () => {
    if (!installEvent) {
      return;
    }

    await installEvent.prompt();
    await installEvent.userChoice;
    setInstallEvent(undefined);
  }, [installEvent]);

  const refreshStorage = useCallback(async () => {
    setStorage(await getPwaStorageSummary());
  }, []);

  const updateNow = useCallback(() => {
    applyServiceWorkerUpdate(updateRegistration);
    setShowUpdate(false);
  }, [updateRegistration]);

  useEffect(() => {
    setIsOnline(navigator.onLine);
    setIsStandalone(isStandaloneMode());
    setIsIos(isIosLike());
    setIsSafari(isSafariLike());
    void refreshStorage();

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    const handleInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallEvent(event as BeforeInstallPromptEvent);
    };
    const handleControllerChange = () => {
      window.location.reload();
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    window.addEventListener("beforeinstallprompt", handleInstallPrompt);
    navigator.serviceWorker?.addEventListener("controllerchange", handleControllerChange);

    void registerServiceWorker((registration) => {
      setUpdateRegistration(registration);
      setShowUpdate(true);
    });

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("beforeinstallprompt", handleInstallPrompt);
      navigator.serviceWorker?.removeEventListener("controllerchange", handleControllerChange);
    };
  }, [refreshStorage]);

  const value = useMemo<PwaContextValue>(
    () => ({
      isOnline,
      isStandalone,
      isIos,
      isSafari,
      canInstall: Boolean(installEvent) && !isStandalone,
      updateAvailable: showUpdate,
      storage,
      install,
      refreshStorage,
      updateNow,
      dismissUpdate: () => setShowUpdate(false)
    }),
    [install, installEvent, isIos, isOnline, isSafari, isStandalone, refreshStorage, showUpdate, storage, updateNow]
  );

  return (
    <PwaContext.Provider value={value}>
      {children}
      <PwaUpdateBanner />
    </PwaContext.Provider>
  );
}

export function usePwa() {
  return useContext(PwaContext);
}

function PwaUpdateBanner() {
  const { updateAvailable, updateNow, dismissUpdate } = usePwa();

  if (!updateAvailable) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-20 z-50 px-4 lg:bottom-6 lg:left-72">
      <div className="mx-auto flex max-w-4xl flex-col gap-3 rounded-md border border-aviation-cyan/25 bg-aviation-ink/95 p-4 shadow-2xl backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-white">Uma nova versão da plataforma está disponível.</p>
          <p className="mt-1 text-xs leading-5 text-slate-400">Atualize quando não houver exercício, checklist operacional, upload ou edição em andamento.</p>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={dismissUpdate} className="focus-ring rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white">
            Depois
          </button>
          <button type="button" onClick={updateNow} className="focus-ring rounded-md bg-aviation-cyan px-3 py-2 text-sm font-semibold text-aviation-ink">
            Atualizar agora
          </button>
        </div>
      </div>
    </div>
  );
}
