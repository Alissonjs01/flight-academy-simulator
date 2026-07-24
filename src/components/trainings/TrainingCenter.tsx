"use client";

import clsx from "clsx";
import { CheckCircle2, ClipboardEdit, PlayCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { TrainingDifficulty, TrainingDocument, TrainingStatus, UserTrainingRecordDocument } from "@/features/trainings/types";
import { trainingStatusLabels } from "@/features/trainings/statusLabels";
import { readTrainingRecord, saveTrainingRecord, setTrainingStatus } from "@/services/trainingRecordService";
import { EmptyState } from "@/components/ui/StateMessage";
import { Panel } from "@/components/ui/Panel";
import { TechnicalMetadataSummary } from "@/components/technical/TechnicalMetadataSummary";

const allOption = "Todos";

export function TrainingCenter({ trainings }: { trainings: TrainingDocument[] }) {
  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState<TrainingDifficulty | typeof allOption>(allOption);
  const [status, setStatus] = useState<TrainingStatus | typeof allOption>(allOption);
  const [recordStatuses, setRecordStatuses] = useState<Record<string, TrainingStatus>>({});

  const difficulties = useMemo(() => [allOption, ...Array.from(new Set(trainings.map((training) => training.difficulty)))], [trainings]);
  const statuses = useMemo(() => [allOption, ...Array.from(new Set(trainings.map((training) => recordStatuses[training.id] ?? training.status)))], [recordStatuses, trainings]);

  useEffect(() => {
    setRecordStatuses(Object.fromEntries(trainings.map((training) => [training.id, readTrainingRecord(training).status])));
  }, [trainings]);

  const filteredTrainings = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("pt-BR");

    return trainings.filter((training) => {
      const currentStatus = recordStatuses[training.id] ?? training.status;
      const haystack = [training.title, training.aircraftName, training.objective, training.conditions].join(" ").toLocaleLowerCase("pt-BR");
      return (
        (!normalizedQuery || haystack.includes(normalizedQuery)) &&
        (difficulty === allOption || training.difficulty === difficulty) &&
        (status === allOption || currentStatus === status)
      );
    });
  }, [difficulty, query, recordStatuses, status, trainings]);

  function handleRecordSaved() {
    setRecordStatuses(Object.fromEntries(trainings.map((training) => [training.id, readTrainingRecord(training).status])));
  }

  return (
    <div className="space-y-5">
      <div className="grid gap-3 rounded-md border border-white/[0.08] bg-white/[0.028] p-4 md:grid-cols-[minmax(0,1fr)_12rem_12rem]">
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Busca</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar por treinamento, aeronave ou objetivo"
            className="focus-ring mt-2 h-11 w-full rounded-md border border-white/[0.08] bg-[#050c14]/80 px-3 text-sm text-white placeholder:text-slate-500"
          />
        </label>
        <SelectFilter label="Dificuldade" value={difficulty} values={difficulties} onChange={(value) => setDifficulty(value as TrainingDifficulty | typeof allOption)} />
        <SelectFilter label="Status" value={status} values={statuses} onChange={(value) => setStatus(value as TrainingStatus | typeof allOption)} formatValue={formatStatus} />
      </div>

      {filteredTrainings.length ? (
        <div className="grid gap-4 xl:grid-cols-2">
          {filteredTrainings.map((training) => (
            <TrainingCard key={training.id} training={training} onRecordSaved={handleRecordSaved} />
          ))}
        </div>
      ) : (
        <EmptyState title="Nenhum treinamento encontrado" description="Ajuste os filtros para visualizar os cenários práticos disponíveis." />
      )}
    </div>
  );
}

function TrainingCard({ training, onRecordSaved }: { training: TrainingDocument; onRecordSaved: () => void }) {
  const [record, setRecord] = useState<UserTrainingRecordDocument>(() => readTrainingRecord(training));
  const [studentReport, setStudentReport] = useState(record.studentReport);
  const [personalNote, setPersonalNote] = useState(record.personalNote);

  useEffect(() => {
    const nextRecord = readTrainingRecord(training);
    setRecord(nextRecord);
    setStudentReport(nextRecord.studentReport);
    setPersonalNote(nextRecord.personalNote);
  }, [training]);

  function handleStatus(status: TrainingStatus) {
    const nextRecord = setTrainingStatus(training, status);
    setRecord(nextRecord);
    onRecordSaved();
  }

  function handleSaveText() {
    const nextRecord = saveTrainingRecord(training, { studentReport, personalNote });
    setRecord(nextRecord);
    onRecordSaved();
  }

  return (
    <Panel className="h-full">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="rounded-sm border border-aviation-cyan/25 bg-aviation-cyan/[0.08] px-2 py-1 font-semibold text-aviation-cyan">{training.difficulty}</span>
            <span className="rounded-sm border border-white/[0.08] bg-white/[0.035] px-2 py-1 text-slate-300">{training.duration}</span>
            <span className="rounded-sm border border-white/[0.08] bg-white/[0.035] px-2 py-1 text-slate-300">{trainingStatusLabels[record.status]}</span>
          </div>
          <h3 className="mt-4 text-xl font-semibold text-white">{training.title}</h3>
          <p className="mt-2 text-sm text-slate-400">{training.aircraftName}</p>
          <p className="mt-4 text-sm leading-7 text-slate-300">{training.objective}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <Spec label="Origem" value={training.departureAirport} />
        <Spec label="Destino" value={training.destinationAirport} />
      </div>
      <div className="mt-3 rounded-md border border-white/[0.08] bg-white/[0.028] p-3 text-sm leading-6 text-slate-300">
        {training.conditions}
      </div>
      <TechnicalMetadataSummary metadata={training.technicalMetadata} compact />

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <ListBlock title="Instruções" items={training.instructions} />
        <ListBlock title="Critérios de conclusão" items={training.completionCriteria} />
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <StatusButton status="in_progress" currentStatus={record.status} label="Iniciar" icon="play" onClick={handleStatus} />
        <StatusButton status="completed" currentStatus={record.status} label="Concluir" icon="check" onClick={handleStatus} />
        <StatusButton status="needs_review" currentStatus={record.status} label="Revisar" icon="note" onClick={handleStatus} />
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Relato do aluno</span>
          <textarea
            value={studentReport}
            onChange={(event) => setStudentReport(event.target.value)}
            rows={4}
            className="focus-ring mt-2 w-full rounded-md border border-white/[0.08] bg-[#050c14]/80 p-3 text-sm leading-6 text-white placeholder:text-slate-500"
            placeholder="Registre o que aconteceu no treino."
          />
        </label>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Nota pessoal</span>
          <textarea
            value={personalNote}
            onChange={(event) => setPersonalNote(event.target.value)}
            rows={4}
            className="focus-ring mt-2 w-full rounded-md border border-white/[0.08] bg-[#050c14]/80 p-3 text-sm leading-6 text-white placeholder:text-slate-500"
            placeholder="Anote ajustes para repetir depois."
          />
        </label>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <button type="button" onClick={handleSaveText} className="focus-ring inline-flex items-center gap-2 rounded-md bg-aviation-cyan px-4 py-2 text-sm font-semibold text-aviation-ink">
          <ClipboardEdit className="h-4 w-4" />
          Salvar registro
        </button>
        <div className="flex flex-wrap gap-2">
          <Link href={`/cursos/${training.relatedCourseSlug}`} className="focus-ring rounded-md border border-white/[0.08] bg-white/[0.035] px-3 py-2 text-sm font-semibold text-white">
            Curso
          </Link>
          {training.relatedLessonSlug ? (
            <Link href={`/aulas/${training.relatedLessonSlug}`} className="focus-ring rounded-md border border-white/[0.08] bg-white/[0.035] px-3 py-2 text-sm font-semibold text-white">
              Aula
            </Link>
          ) : null}
        </div>
      </div>
    </Panel>
  );
}

function StatusButton({
  status,
  currentStatus,
  label,
  icon,
  onClick
}: {
  status: TrainingStatus;
  currentStatus: TrainingStatus;
  label: string;
  icon: "play" | "check" | "note";
  onClick: (status: TrainingStatus) => void;
}) {
  const Icon = icon === "play" ? PlayCircle : icon === "check" ? CheckCircle2 : ClipboardEdit;

  return (
    <button
      type="button"
      onClick={() => onClick(status)}
      className={clsx(
        "focus-ring inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-semibold",
        currentStatus === status ? "border-aviation-cyan bg-aviation-cyan text-aviation-ink" : "border-white/[0.08] bg-white/[0.035] text-white"
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{title}</p>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
        {items.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/[0.08] bg-white/[0.028] p-3">
      <p className="text-xs uppercase tracking-[0.14em] text-slate-500">{label}</p>
      <p className="mt-2 text-sm font-semibold leading-6 text-white">{value}</p>
    </div>
  );
}

type SelectFilterProps = {
  label: string;
  value: string;
  values: string[];
  onChange: (value: string) => void;
  formatValue?: (value: string) => string;
};

function SelectFilter({ label, value, values, onChange, formatValue = (item) => item }: SelectFilterProps) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="focus-ring mt-2 h-11 w-full rounded-md border border-white/[0.08] bg-[#050c14]/80 px-3 text-sm text-white"
      >
        {values.map((item) => (
          <option key={item} value={item}>
            {formatValue(item)}
          </option>
        ))}
      </select>
    </label>
  );
}

function formatStatus(status: string) {
  if (status === allOption) {
    return allOption;
  }

  return trainingStatusLabels[status as TrainingStatus] ?? status;
}
