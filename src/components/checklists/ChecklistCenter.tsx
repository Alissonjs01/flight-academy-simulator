"use client";

import clsx from "clsx";
import { ArrowLeft, ArrowRight, Check, RotateCcw, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { SafeImage } from "@/components/ui/SafeImage";
import { EmptyState } from "@/components/ui/StateMessage";
import { ProgressBar } from "@/components/ui/ProgressBar";
import type { AircraftDocument } from "@/features/aircraft/types";
import type { ChecklistDocument, UserChecklistSessionDocument } from "@/features/checklists/types";
import { getFlightPhaseLabel, operationalFlightPhaseOrder } from "@/features/checklists/statusLabels";
import { readChecklistSession, resetChecklistSession, toggleChecklistItem } from "@/services/checklistSessionService";

type ChecklistCenterProps = {
  aircraft: AircraftDocument;
  checklists: ChecklistDocument[];
};

export function ChecklistCenter({ aircraft, checklists }: ChecklistCenterProps) {
  const orderedChecklists = useMemo(() => orderChecklists(checklists), [checklists]);
  const [selectedChecklistId, setSelectedChecklistId] = useState(orderedChecklists[0]?.id ?? "");
  const [sessions, setSessions] = useState<Record<string, UserChecklistSessionDocument>>({});

  useEffect(() => {
    setSessions(Object.fromEntries(orderedChecklists.map((checklist) => [checklist.id, readChecklistSession(checklist)])));
  }, [orderedChecklists]);

  useEffect(() => {
    if (orderedChecklists.length && !orderedChecklists.some((checklist) => checklist.id === selectedChecklistId)) {
      setSelectedChecklistId(orderedChecklists[0].id);
    }
  }, [orderedChecklists, selectedChecklistId]);

  const selectedChecklist = orderedChecklists.find((checklist) => checklist.id === selectedChecklistId) ?? orderedChecklists[0];
  const selectedIndex = selectedChecklist ? orderedChecklists.findIndex((checklist) => checklist.id === selectedChecklist.id) : -1;
  const selectedSession = selectedChecklist ? sessions[selectedChecklist.id] ?? readChecklistSession(selectedChecklist) : undefined;
  const sessionProgress = calculateSessionProgress(orderedChecklists, sessions);

  function handleToggleItem(checklist: ChecklistDocument, itemId: string) {
    const nextSession = toggleChecklistItem(checklist, itemId);
    setSessions((current) => ({ ...current, [checklist.id]: nextSession }));
  }

  function handleResetPhase(checklist: ChecklistDocument) {
    const nextSession = resetChecklistSession(checklist);
    setSessions((current) => ({ ...current, [checklist.id]: nextSession }));
  }

  function handleResetAll() {
    const nextSessions = Object.fromEntries(orderedChecklists.map((checklist) => [checklist.id, resetChecklistSession(checklist)]));
    setSessions(nextSessions);
  }

  function move(delta: -1 | 1) {
    const nextChecklist = orderedChecklists[selectedIndex + delta];
    if (nextChecklist) {
      setSelectedChecklistId(nextChecklist.id);
    }
  }

  if (!orderedChecklists.length) {
    return (
      <EmptyState
        title="Nenhum checklist disponível"
        description="Esta aeronave ainda não possui checklists publicados para uso em sessão de voo."
      />
    );
  }

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-md border border-white/[0.08] bg-[#07111d]">
        <div className="grid gap-0 lg:grid-cols-[minmax(19rem,0.9fr)_minmax(0,1.25fr)]">
          <div className="relative min-h-56 overflow-hidden border-b border-white/[0.08] lg:border-b-0 lg:border-r">
            <SafeImage
              src={aircraft.mainImage.url}
              alt={aircraft.mainImage.alt}
              fallbackLabel={aircraft.fullName}
              className="h-full min-h-56 w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#06101c]/35 via-transparent to-transparent" />
          </div>
          <div className="flex flex-col justify-center p-5 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-aviation-cyan">Checklists</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">{aircraft.fullName}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
              Checklist rápido por fase para uso durante voos simulados. As marcações abaixo pertencem somente à sessão atual e não alteram o progresso dos cursos.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <Metric label="Fases" value={orderedChecklists.length} />
              <Metric label="Itens" value={orderedChecklists.reduce((total, checklist) => total + checklist.items.length, 0)} />
              <Metric label="Sessão" value={`${sessionProgress}%`} />
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-[18rem_minmax(0,1fr)]">
        <aside className="rounded-md border border-white/[0.08] bg-white/[0.026] p-3 lg:sticky lg:top-24 lg:self-start">
          <div className="flex gap-2 overflow-x-auto pb-1 lg:block lg:space-y-1 lg:overflow-visible lg:pb-0">
            {orderedChecklists.map((checklist, index) => {
              const phaseSession = sessions[checklist.id] ?? readChecklistSession(checklist);
              const active = selectedChecklist?.id === checklist.id;

              return (
                <button
                  key={checklist.id}
                  type="button"
                  onClick={() => setSelectedChecklistId(checklist.id)}
                  className={clsx(
                    "focus-ring flex min-w-[13rem] items-center gap-3 rounded-md px-3 py-3 text-left transition lg:min-w-0 lg:w-full",
                    active ? "bg-aviation-cyan/14 text-aviation-cyan" : "text-slate-300 hover:bg-white/[0.045] hover:text-white"
                  )}
                >
                  <span
                    className={clsx(
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-md border text-xs font-semibold",
                      active ? "border-aviation-cyan/45 bg-aviation-cyan/10" : "border-white/[0.08] bg-white/[0.03]"
                    )}
                  >
                    {phaseSession.progressPercent === 100 ? <Check className="h-4 w-4" /> : index + 1}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold">{checklist.title}</span>
                    <span className="mt-0.5 block text-xs text-slate-500">{phaseSession.progressPercent}% concluído</span>
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        {selectedChecklist && selectedSession ? (
          <section className="rounded-md border border-white/[0.08] bg-[#07111d]/92">
            <div className="border-b border-white/[0.08] p-4 sm:p-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-aviation-cyan">
                    Fase {selectedIndex + 1} de {orderedChecklists.length}
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">{getFlightPhaseLabel(selectedChecklist.flightPhase)}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{selectedChecklist.description}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleResetPhase(selectedChecklist)}
                    className="focus-ring inline-flex items-center gap-2 rounded-md border border-white/[0.08] bg-white/[0.035] px-3 py-2 text-sm font-semibold text-white hover:border-aviation-cyan/35"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Reiniciar fase
                  </button>
                  <button
                    type="button"
                    onClick={handleResetAll}
                    className="focus-ring inline-flex items-center gap-2 rounded-md border border-white/[0.08] bg-white/[0.035] px-3 py-2 text-sm font-semibold text-white hover:border-aviation-cyan/35"
                  >
                    <Trash2 className="h-4 w-4" />
                    Limpar tudo
                  </button>
                </div>
              </div>
              <div className="mt-5">
                <ProgressBar value={selectedSession.progressPercent} label="Progresso da fase" />
              </div>
            </div>

            <div className="divide-y divide-white/[0.07]">
              {selectedChecklist.items.map((item) => {
                const completed = selectedSession.completedItemIds.includes(item.id);

                return (
                  <label
                    key={item.id}
                    className={clsx(
                      "group flex cursor-pointer items-start gap-3 px-4 py-3 transition sm:px-5",
                      completed ? "bg-aviation-cyan/[0.055]" : "hover:bg-white/[0.035]"
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={completed}
                      onChange={() => handleToggleItem(selectedChecklist, item.id)}
                      className="mt-1 h-5 w-5 shrink-0 rounded border-white/20 bg-[#050b12] text-aviation-cyan"
                    />
                    <span className="grid min-w-0 flex-1 gap-1 sm:grid-cols-[minmax(0,1fr)_minmax(8rem,0.45fr)] sm:items-start">
                      <span className={clsx("text-sm font-semibold", completed ? "text-aviation-cyan" : "text-white")}>{item.text}</span>
                      <span className="text-sm font-semibold text-slate-300 sm:text-right">{item.expectedResponse}</span>
                      {item.observation ? <span className="text-xs leading-5 text-slate-500 sm:col-span-2">{item.observation}</span> : null}
                    </span>
                  </label>
                );
              })}
            </div>

            <div className="flex flex-col gap-3 border-t border-white/[0.08] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
              <button
                type="button"
                disabled={selectedIndex <= 0}
                onClick={() => move(-1)}
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-md border border-white/[0.08] bg-white/[0.035] px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowLeft className="h-4 w-4" />
                Fase anterior
              </button>
              <span className="text-center text-sm text-slate-500">Sessão de checklist independente do progresso dos cursos</span>
              <button
                type="button"
                disabled={selectedIndex >= orderedChecklists.length - 1}
                onClick={() => move(1)}
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-md bg-aviation-cyan px-4 py-2 text-sm font-semibold text-[#06101c] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Próxima fase
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-md border border-white/[0.08] bg-white/[0.035] p-3">
      <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className="mt-1 text-xl font-semibold text-white">{value}</p>
    </div>
  );
}

function orderChecklists(checklists: ChecklistDocument[]) {
  return [...checklists].sort((a, b) => {
    const phaseA = operationalFlightPhaseOrder.indexOf(a.flightPhase);
    const phaseB = operationalFlightPhaseOrder.indexOf(b.flightPhase);
    const safePhaseA = phaseA === -1 ? Number.MAX_SAFE_INTEGER : phaseA;
    const safePhaseB = phaseB === -1 ? Number.MAX_SAFE_INTEGER : phaseB;

    return safePhaseA - safePhaseB || a.order - b.order;
  });
}

function calculateSessionProgress(checklists: ChecklistDocument[], sessions: Record<string, UserChecklistSessionDocument>) {
  const totalItems = checklists.reduce((total, checklist) => total + checklist.items.length, 0);
  if (!totalItems) {
    return 0;
  }

  const completedItems = checklists.reduce((total, checklist) => {
    const validIds = new Set(checklist.items.map((item) => item.id));
    const session = sessions[checklist.id];
    const completedForChecklist = new Set((session?.completedItemIds ?? []).filter((itemId) => validIds.has(itemId)));
    return total + completedForChecklist.size;
  }, 0);

  return Math.min(100, Math.round((completedItems / totalItems) * 100));
}
