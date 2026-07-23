"use client";

import clsx from "clsx";
import { AlertTriangle, CheckCircle2, Lock, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { LessonContext } from "@/features/content/types";
import type { StudentProgressDocument } from "@/features/progress/types";
import { getLessonStatusClass, lessonStatusLabels } from "@/features/content/statusLabels";
import { completeLesson, getLessonStatus, isCourseUnlocked, readLocalProgress, setCurrentLesson } from "@/services/progressService";
import { EmptyState, LoadingState } from "@/components/ui/StateMessage";
import { Panel } from "@/components/ui/Panel";
import { ExercisePanel } from "@/components/exercise/ExercisePanel";
import { summarizeLessonExercises } from "@/services/exerciseAttemptService";

export function LessonStudy({ context }: { context: LessonContext }) {
  const orderedLessons = useMemo(() => context.orderedLessons, [context.orderedLessons]);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState<StudentProgressDocument>(() => readLocalProgress(orderedLessons));
  const [courseUnlocked, setCourseUnlocked] = useState(false);
  const [exerciseVersion, setExerciseVersion] = useState(0);
  const [exerciseSummary, setExerciseSummary] = useState(() => summarizeLessonExercises(context.exercises));

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

  useEffect(() => {
    setExerciseSummary(summarizeLessonExercises(context.exercises));
  }, [context.exercises, exerciseVersion]);

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
      <Panel>
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

        <div className="mt-6 flex items-start gap-3 rounded-md border border-aviation-amber/25 bg-aviation-amber/[0.08] p-4 text-sm leading-6 text-slate-200">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-aviation-amber" />
          <p>{context.course.disclaimer}</p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {context.lesson.keyConcepts.map((concept) => (
            <span key={concept} className="rounded-sm border border-aviation-cyan/20 bg-aviation-cyan/[0.08] px-2 py-1 text-xs font-semibold text-aviation-cyan">
              {concept}
            </span>
          ))}
        </div>

        <div className="mt-8 grid gap-4">
          <LessonSection title="Introdução" body={context.lesson.introduction} />
          <LessonSection title="Explicação didática" body={context.lesson.didacticExplanation} />
          <LessonSection title="Exemplo" body={context.lesson.example} tone="cyan" />
          <LessonSection title="Erro comum" body={context.lesson.commonMistake} tone="amber" />
          <LessonSection title="Aplicação no simulador" body={context.lesson.simulatorApplication} />
          <LessonSection title="Conclusão" body={context.lesson.conclusion} />
          <LessonSection title="Ligação com a aula seguinte" body={context.lesson.nextLessonConnection} tone="mint" />
        </div>
      </Panel>

      {context.exercises.length > 0 ? (
        <div className="space-y-4">
          <Panel>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Exercícios da aula</p>
                <h3 className="mt-2 text-lg font-semibold text-white">Prática e checagem de compreensão</h3>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
                <InfoBox label="Concluídos" value={`${exerciseSummary.completedExercises}/${exerciseSummary.totalExercises}`} />
                <InfoBox label="Acertos" value={String(exerciseSummary.correctCount)} />
                <InfoBox label="Erros" value={String(exerciseSummary.wrongCount)} />
                <InfoBox label="Revisões" value={String(exerciseSummary.reviewCount)} />
              </div>
            </div>
            {exerciseSummary.completedExercises === exerciseSummary.totalExercises ? (
              <div className="mt-4 flex items-center gap-2 rounded-md border border-aviation-mint/25 bg-aviation-mint/[0.08] p-3 text-sm text-aviation-mint">
                <CheckCircle2 className="h-5 w-5" />
                <span>Todos os exercícios desta aula possuem registro local.</span>
              </div>
            ) : null}
          </Panel>
          {context.exercises.map((exercise) => (
            <ExercisePanel key={exercise.id} exercise={exercise} isLocked={isLocked} onAttemptSaved={() => setExerciseVersion((value) => value + 1)} />
          ))}
        </div>
      ) : (
        <EmptyState title="Sem exercício cadastrado" description="Esta aula já pode ser concluída, e o exercício poderá ser adicionado futuramente." />
      )}

      <Panel className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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
        "rounded-md border p-4 text-sm leading-7",
        tone === "default" && "border-white/10 bg-white/[0.035] text-slate-300",
        tone === "cyan" && "border-aviation-cyan/25 bg-aviation-cyan/[0.08] text-slate-200",
        tone === "amber" && "border-aviation-amber/25 bg-aviation-amber/[0.08] text-slate-200",
        tone === "mint" && "border-aviation-mint/25 bg-aviation-mint/[0.07] text-slate-200"
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{title}</p>
      <p className="mt-2">{body}</p>
    </section>
  );
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-white/[0.035] p-3">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 font-semibold text-white">{value}</p>
    </div>
  );
}
