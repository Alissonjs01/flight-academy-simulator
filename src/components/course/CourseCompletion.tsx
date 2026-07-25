"use client";

import { BookOpen, CheckCircle2, Lock, Unlock } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { CourseStructure, LessonDocument } from "@/features/content/types";
import type { StudentProgressDocument } from "@/features/progress/types";
import { calculateCourseProgress, readLocalProgress, subscribeToProgressChanges } from "@/services/progressService";
import { Panel } from "@/components/ui/Panel";
import { ProgressBar } from "@/components/ui/ProgressBar";

type CourseCompletionProps = {
  structure: CourseStructure;
};

export function CourseCompletion({ structure }: CourseCompletionProps) {
  const orderedLessons = useMemo(() => structure.modules.flatMap((module) => module.lessons), [structure.modules]);
  const [progress, setProgress] = useState<StudentProgressDocument>(() => readLocalProgress(orderedLessons));

  useEffect(() => {
    const refreshProgress = () => setProgress(readLocalProgress(orderedLessons));
    refreshProgress();
    return subscribeToProgressChanges(refreshProgress);
  }, [orderedLessons]);

  const summary = calculateCourseProgress(orderedLessons, progress);
  const isComplete = summary.totalLessons > 0 && summary.completedLessons === summary.totalLessons;
  const firstPendingLesson = orderedLessons.find((lesson) => lesson.publicationState === "published" && !progress.completedLessonIds.includes(lesson.id));

  return (
    <div className="mx-auto max-w-5xl space-y-4">
      <Panel>
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-aviation-cyan">Conclusão do curso</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">{structure.course.title}</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">Revise o progresso do curso e continue estudando no seu ritmo.</p>
          </div>
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md border border-aviation-mint/30 bg-aviation-mint/[0.08] text-aviation-mint">
            {isComplete ? <Unlock className="h-7 w-7" /> : <Lock className="h-7 w-7" />}
          </div>
        </div>

        <div className="mt-6">
          <ProgressBar value={summary.coursePercent} label="Progresso do curso" />
          <p className="mt-2 text-sm text-slate-400">
            {summary.completedLessons} de {summary.totalLessons} aula(s) concluída(s)
          </p>
        </div>
      </Panel>

      <div className="grid gap-4 md:grid-cols-2">
        <Panel>
          <BookOpen className="h-7 w-7 text-aviation-cyan" />
          <h3 className="mt-4 text-lg font-semibold text-white">Resumo de desempenho</h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            O curso avaliou consciência situacional, instrumentos básicos, física do voo, energia, precisão, antecipação e tomada de decisão no C408.
          </p>
        </Panel>
        <Panel>
          <CheckCircle2 className="h-7 w-7 text-aviation-mint" />
          <h3 className="mt-4 text-lg font-semibold text-white">Próximo passo</h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Ao concluir as aulas, avance para o próximo curso disponível e pratique os pontos estudados no simulador.
          </p>
        </Panel>
      </div>

      <Panel className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-400">
          {isComplete ? "Curso concluído. Continue para a próxima trilha quando quiser." : "Conclua todas as aulas para finalizar este curso."}
        </p>
        <div className="flex flex-wrap gap-3">
          {!isComplete && firstPendingLesson ? (
            <Link href={`/aulas/${firstPendingLesson.slug}`} className="focus-ring rounded-md bg-aviation-cyan px-4 py-2 text-sm font-semibold text-aviation-ink">
              Continuar aulas
            </Link>
          ) : null}
          {isComplete ? (
            <Link href="/cursos" className="focus-ring rounded-md bg-aviation-cyan px-4 py-2 text-sm font-semibold text-aviation-ink">
              Ver próximos cursos
            </Link>
          ) : null}
        </div>
      </Panel>
    </div>
  );
}
