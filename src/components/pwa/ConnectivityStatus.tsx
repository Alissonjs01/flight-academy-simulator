"use client";

import { CheckCircle2, CloudOff, Loader2 } from "lucide-react";
import { useMemo } from "react";
import { usePwa } from "@/components/pwa/PwaProvider";

type ConnectivityStatusProps = {
  compact?: boolean;
};

export function ConnectivityStatus({ compact = false }: ConnectivityStatusProps) {
  const { isOnline } = usePwa();

  const state = useMemo(() => {
    if (!isOnline) {
      return {
        label: "Offline",
        description: "Algumas ações precisam de conexão.",
        className: "border-aviation-amber/25 bg-aviation-amber/[0.08] text-aviation-amber",
        icon: CloudOff
      };
    }

    return {
      label: "Online",
      description: "Conexão disponível.",
      className: "border-emerald-400/25 bg-emerald-400/[0.08] text-emerald-200",
      icon: CheckCircle2
    };
  }, [isOnline]);

  const Icon = state.icon;

  if (compact) {
    return (
      <div title={state.description} className={`hidden h-10 items-center gap-2 rounded-md border px-3 text-sm font-semibold md:inline-flex ${state.className}`}>
        <Icon className="h-4 w-4" />
        {state.label}
      </div>
    );
  }

  return (
    <div className={`rounded-md border p-4 ${state.className}`}>
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5" />
        <div>
          <p className="font-semibold">{state.label}</p>
          <p className="mt-1 text-sm opacity-85">{state.description}</p>
        </div>
      </div>
    </div>
  );
}

export function SyncStatus({ status }: { status: "idle" | "syncing" | "synced" | "failed" | "pending" }) {
  const labels = {
    idle: "Sem sincronização ativa",
    syncing: "Sincronizando...",
    synced: "Sincronizado",
    failed: "Falha de sincronização",
    pending: "Alterações pendentes"
  };

  return (
    <div className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200">
      {status === "syncing" ? <Loader2 className="h-4 w-4 animate-spin text-aviation-cyan" /> : <CheckCircle2 className="h-4 w-4 text-aviation-cyan" />}
      {labels[status]}
    </div>
  );
}
