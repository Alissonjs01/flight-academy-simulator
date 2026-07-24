"use client";

import clsx from "clsx";
import { Lock, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { LessonContext } from "@/features/content/types";
import type { StudentProgressDocument } from "@/features/progress/types";
import { getLessonStatusClass, lessonStatusLabels } from "@/features/content/statusLabels";
import { completeLesson, getLessonStatus, isCourseUnlocked, readLocalProgress, setCurrentLesson } from "@/services/progressService";
import { LoadingState } from "@/components/ui/StateMessage";
import { Panel } from "@/components/ui/Panel";

export function LessonStudy({ context }: { context: LessonContext }) {
  const orderedLessons = useMemo(() => context.orderedLessons, [context.orderedLessons]);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState<StudentProgressDocument>(() => readLocalProgress(orderedLessons));
  const [courseUnlocked, setCourseUnlocked] = useState(false);

  useEffect(() => {
    const localProgress = readLocalProgress(orderedLessons);
    const lessonState = getLessonStatus(orderedLessons, localProgress, context.lesson.id);
    const unlocked = isCourseUnlocked(context.course.id);
    setCourseUnlocked(unlocked);
    setProgress((context.course.status === "locked" && !unlocked) || !lessonState?.isUnlocked ? localProgress : setCurrentLesson(localProgress, context.lesson.id));
    setIsLoading(false);
  }, [context.course.id, context.course.status, context.lesson.id, orderedLessons]);

  const lessonState = getLessonStatus(orderedLessons, progress, context.lesson.id);
  const isLocked = (context.course.status === "locked" && !courseUnlocked) || !lessonState?.isUnlocked;
  const isCompleted = lessonState?.status === "concluida";
  const nextLessonState = context.nextLesson ? getLessonStatus(orderedLessons, progress, context.nextLesson.id) : undefined;
  const canContinue = Boolean(context.nextLesson && nextLessonState?.isUnlocked);

  function handleComplete() {
    if (isLocked) {
      return;
    }

    setProgress(completeLesson(orderedLessons, progress, context.lesson.id));
  }

  if (isLoading) {
    return <LoadingState title="Carregando aula" description="Sincronizando progresso local deste aluno." />;
  }

  return (
    <div className="space-y-4">
      <Panel className="bg-white/[0.028]">
        <div className="grid gap-4 sm:grid-cols-3">
          <InfoBox label="Módulo" value={context.module.title} />
          <InfoBox label="Duração" value={context.lesson.estimatedDuration} />
          <InfoBox label="Status" value={lessonStatusLabels[lessonState?.status ?? "bloqueada"]} />
        </div>

        {isLocked ? (
          <div className="mt-6 flex items-start gap-3 rounded-md border border-white/10 bg-white/[0.035] p-4 text-sm text-slate-300">
            <Lock className="mt-0.5 h-5 w-5 shrink-0 text-slate-500" />
            <p>Esta aula ainda está bloqueada. Conclua a aula anterior para liberar este conteúdo.</p>
          </div>
        ) : null}

        <div className="mt-8">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Objetivo</p>
          <p className="mt-2 text-sm leading-7 text-slate-300">{context.lesson.objective}</p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {context.lesson.keyConcepts.map((concept) => (
            <span key={concept} className="rounded-sm border border-aviation-cyan/20 bg-aviation-cyan/[0.08] px-2 py-1 text-xs font-semibold text-aviation-cyan">
              {concept}
            </span>
          ))}
        </div>

        <div className="mt-8 divide-y divide-white/[0.08]">
          <LessonSection title="Introdução" body={context.lesson.introduction} />
          <LessonSection title="Explicação didática" body={context.lesson.didacticExplanation} />
          <LessonSection title="Exemplo" body={context.lesson.example} tone="cyan" />
          <LessonSection title="Erro comum" body={context.lesson.commonMistake} tone="amber" />
          <LessonSection title="Aplicação no simulador" body={context.lesson.simulatorApplication} />
          <LessonSection title="Conclusão" body={context.lesson.conclusion} />
          <LessonSection title="Ligação com a aula seguinte" body={context.lesson.nextLessonConnection} tone="mint" />
        </div>
      </Panel>

      <Panel className="flex flex-col gap-3 bg-white/[0.028] sm:flex-row sm:items-center sm:justify-between">
        <div className={clsx("rounded-md border px-3 py-2 text-sm", getLessonStatusClass(lessonState?.status ?? "bloqueada"))}>
          {lessonStatusLabels[lessonState?.status ?? "bloqueada"]}
        </div>
        <div className="flex flex-wrap gap-3">
          {context.previousLesson ? (
            <Link
              href={`/aulas/${context.previousLesson.slug}`}
              className="focus-ring inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white"
            >
              <RotateCcw className="h-4 w-4" />
              Aula anterior
            </Link>
          ) : null}
          <button
            type="button"
            onClick={handleComplete}
            disabled={isLocked || isCompleted}
            className="focus-ring rounded-md bg-aviation-cyan px-4 py-2 text-sm font-semibold text-aviation-ink disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isCompleted ? "Aula concluída" : "Concluir aula"}
          </button>
          {context.nextLesson ? (
            <Link
              href={canContinue ? `/aulas/${context.nextLesson.slug}` : `/cursos/${context.course.slug}`}
              className={clsx(
                "focus-ring rounded-md border px-4 py-2 text-sm font-semibold",
                canContinue ? "border-aviation-mint/40 bg-aviation-mint/[0.08] text-aviation-mint" : "border-white/10 bg-white/[0.03] text-slate-500"
              )}
            >
              Continuar
            </Link>
          ) : null}
          {!context.nextLesson ? (
            <Link
              href={`/cursos/${context.course.slug}/conclusao`}
              className="focus-ring rounded-md border border-aviation-mint/40 bg-aviation-mint/[0.08] px-4 py-2 text-sm font-semibold text-aviation-mint"
            >
              Conclusão do curso
            </Link>
          ) : null}
        </div>
      </Panel>
    </div>
  );
}

function LessonSection({ title, body, tone = "default" }: { title: string; body: string; tone?: "default" | "cyan" | "amber" | "mint" }) {
  return (
    <section
      className={clsx(
        "py-5 text-sm leading-7",
        tone === "default" && "text-slate-300",
        tone === "cyan" && "text-slate-200",
        tone === "amber" && "text-slate-200",
        tone === "mint" && "text-slate-200"
      )}
    >
      <p className={clsx("text-xs font-semibold uppercase tracking-[0.16em]", tone === "cyan" ? "text-aviation-cyan" : tone === "mint" ? "text-aviation-mint" : "text-slate-500")}>{title}</p>
      <p className="mt-3 max-w-5xl">{body}</p>
    </section>
  );
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/[0.08] bg-white/[0.028] p-3">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 font-semibold text-white">{value}</p>
    </div>
  );
}
