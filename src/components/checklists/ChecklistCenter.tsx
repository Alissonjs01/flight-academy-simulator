"use client";

import clsx from "clsx";
import { AlertTriangle, CheckCircle2, RotateCcw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { ChecklistDocument, FlightPhase, UserChecklistSessionDocument } from "@/features/checklists/types";
import { checklistDisclaimer } from "@/features/checklists/data/localChecklists";
import { flightPhaseLabels, getFlightPhaseLabel } from "@/features/checklists/statusLabels";
import { readChecklistSession, resetChecklistSession, setChecklistMode, toggleChecklistItem } from "@/services/checklistSessionService";
import { EmptyState } from "@/components/ui/StateMessage";
import { Panel } from "@/components/ui/Panel";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { TechnicalMetadataSummary } from "@/components/technical/TechnicalMetadataSummary";

const allOption = "Todos";

export function ChecklistCenter({ checklists }: { checklists: ChecklistDocument[] }) {
  const [query, setQuery] = useState("");
  const [phase, setPhase] = useState<FlightPhase | typeof allOption>(allOption);
  const [selectedChecklistId, setSelectedChecklistId] = useState(checklists[0]?.id ?? "");

  const phases = useMemo<Array<FlightPhase | typeof allOption>>(() => [allOption, ...Array.from(new Set(checklists.map((checklist) => checklist.flightPhase)))], [checklists]);
  const filteredChecklists = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("pt-BR");

    return checklists.filter((checklist) => {
      const haystack = [checklist.title, checklist.description, checklist.aircraftName].join(" ").toLocaleLowerCase("pt-BR");
      return (!normalizedQuery || haystack.includes(normalizedQuery)) && (phase === allOption || checklist.flightPhase === phase);
    });
  }, [checklists, phase, query]);

  const selectedChecklist = checklists.find((checklist) => checklist.id === selectedChecklistId) ?? filteredChecklists[0];

  useEffect(() => {
    if (filteredChecklists.length && !filteredChecklists.some((checklist) => checklist.id === selectedChecklistId)) {
      setSelectedChecklistId(filteredChecklists[0].id);
    }
  }, [filteredChecklists, selectedChecklistId]);

  return (
    <div className="space-y-5">
      <Panel className="border-aviation-amber/25 bg-aviation-amber/[0.07]">
        <div className="flex gap-3 text-sm leading-6 text-slate-200">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-aviation-amber" />
          <p>{checklistDisclaimer}</p>
        </div>
      </Panel>

      <div className="grid gap-3 rounded-md border border-white/10 bg-white/[0.035] p-4 md:grid-cols-[minmax(0,1fr)_14rem]">
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Busca</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar por título, descrição ou aeronave"
            className="focus-ring mt-2 h-11 w-full rounded-md border border-white/10 bg-aviation-ink/60 px-3 text-sm text-white placeholder:text-slate-500"
          />
        </label>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Fase</span>
          <select
            value={phase}
            onChange={(event) => setPhase(event.target.value as FlightPhase | typeof allOption)}
            className="focus-ring mt-2 h-11 w-full rounded-md border border-white/10 bg-aviation-ink/60 px-3 text-sm text-white"
          >
            {phases.map((item) => (
              <option key={item} value={item}>
                {item === allOption ? allOption : flightPhaseLabels[item]}
              </option>
            ))}
          </select>
        </label>
      </div>

      {filteredChecklists.length ? (
        <div className="grid gap-4 lg:grid-cols-[20rem_minmax(0,1fr)]">
          <div className="space-y-3">
            {filteredChecklists.map((checklist) => (
              <button
                key={checklist.id}
                type="button"
                onClick={() => setSelectedChecklistId(checklist.id)}
                className={clsx(
                  "focus-ring w-full rounded-md border p-4 text-left transition",
                  selectedChecklist?.id === checklist.id ? "border-aviation-cyan/50 bg-aviation-cyan/[0.08]" : "border-white/10 bg-white/[0.035] hover:border-aviation-cyan/35"
                )}
              >
                <p className="text-xs uppercase tracking-[0.16em] text-aviation-cyan">{getFlightPhaseLabel(checklist.flightPhase)}</p>
                <h3 className="mt-2 font-semibold text-white">{checklist.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{checklist.aircraftName}</p>
              </button>
            ))}
          </div>
          {selectedChecklist ? <ChecklistRunner checklist={selectedChecklist} /> : null}
        </div>
      ) : (
        <EmptyState title="Nenhum checklist encontrado" description="Ajuste busca ou fase para visualizar os checklists disponíveis." />
      )}
    </div>
  );
}

function ChecklistRunner({ checklist }: { checklist: ChecklistDocument }) {
  const [session, setSession] = useState<UserChecklistSessionDocument>(() => readChecklistSession(checklist));

  useEffect(() => {
    setSession(readChecklistSession(checklist));
  }, [checklist]);

  const incompleteCriticalItems = checklist.items.filter((item) => item.kind === "critical" && !session.completedItemIds.includes(item.id));
  const isOperational = session.mode === "operational";

  function handleToggleItem(itemId: string) {
    setSession(toggleChecklistItem(checklist, itemId));
  }

  function handleReset() {
    setSession(resetChecklistSession(checklist));
  }

  function handleMode(mode: UserChecklistSessionDocument["mode"]) {
    setSession(setChecklistMode(checklist, mode));
  }

  return (
    <Panel>
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-aviation-cyan">{getFlightPhaseLabel(checklist.flightPhase)}</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">{checklist.title}</h2>
          {!isOperational ? <p className="mt-3 text-sm leading-7 text-slate-300">{checklist.description}</p> : null}
        </div>
        <div className="flex shrink-0 gap-2">
          <ModeButton active={session.mode === "study"} label="Estudo" onClick={() => handleMode("study")} />
          <ModeButton active={session.mode === "operational"} label="Operacional" onClick={() => handleMode("operational")} />
        </div>
      </div>

      <div className="mt-5">
        <ProgressBar value={session.progressPercent} label="Progresso do checklist" />
      </div>

      {isOperational && incompleteCriticalItems.length ? (
        <div className="mt-4 rounded-md border border-aviation-amber/25 bg-aviation-amber/[0.08] p-3 text-sm text-slate-200">
          Há {incompleteCriticalItems.length} item(ns) crítico(s) pendente(s).
        </div>
      ) : null}

      {!isOperational ? (
        <div className="mt-5 rounded-md border border-white/10 bg-white/[0.035] p-4 text-sm leading-6 text-slate-300">
          <p className="font-semibold text-white">Modo de estudo</p>
          <p className="mt-2">{checklist.studyMode.description}</p>
          <p className="mt-2 text-slate-400">Versão {checklist.version} · Atualizado em {formatDate(checklist.updatedAt)}</p>
          <p className="mt-2 text-aviation-amber">{checklist.notes}</p>
          <div className="mt-4">
            <TechnicalMetadataSummary metadata={checklist.technicalMetadata} />
          </div>
        </div>
      ) : null}

      <div className={clsx("mt-5 grid gap-3", isOperational ? "sm:grid-cols-2" : "")}>
        {checklist.items.map((item) => {
          const completed = session.completedItemIds.includes(item.id);

          return (
            <div key={item.id} className={clsx("rounded-md border p-3", completed ? "border-aviation-mint/30 bg-aviation-mint/[0.07]" : "border-white/10 bg-white/[0.035]")}>
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={completed}
                  onChange={() => handleToggleItem(item.id)}
                  className="mt-1 h-5 w-5 rounded border-white/20 bg-aviation-ink text-aviation-cyan"
                />
                <span className="min-w-0">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-white">{item.text}</span>
                    {item.kind === "critical" ? <span className="rounded-sm bg-aviation-amber/[0.12] px-2 py-1 text-xs font-semibold text-aviation-amber">Crítico</span> : null}
                  </span>
                  <span className="mt-1 block text-sm text-slate-400">{item.expectedResponse}</span>
                </span>
              </label>
              {!isOperational ? (
                <details className="mt-3 rounded-md border border-white/10 bg-aviation-ink/45 p-3 text-sm leading-6 text-slate-300">
                  <summary className="cursor-pointer font-semibold text-aviation-cyan">Explicação e observação</summary>
                  <p className="mt-2">{item.explanation}</p>
                  <p className="mt-2 text-slate-400">{item.observation}</p>
                  <TechnicalMetadataSummary metadata={item.technicalMetadata} compact />
                </details>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <button type="button" onClick={handleReset} className="focus-ring inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white">
          <RotateCcw className="h-4 w-4" />
          Reiniciar
        </button>
        {session.progressPercent === 100 ? (
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-aviation-mint">
            <CheckCircle2 className="h-5 w-5" />
            Checklist concluído
          </span>
        ) : null}
      </div>
    </Panel>
  );
}

function ModeButton({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx("focus-ring rounded-md px-3 py-2 text-sm font-semibold", active ? "bg-aviation-cyan text-aviation-ink" : "border border-white/10 bg-white/5 text-white")}
    >
      {label}
    </button>
  );
}

function formatDate(date: string) {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
}
