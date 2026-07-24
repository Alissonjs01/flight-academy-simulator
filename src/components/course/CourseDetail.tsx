"use client";

import clsx from "clsx";
import { CheckCircle2, Lock, PlayCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { CourseStructure, LessonDocument } from "@/features/content/types";
import { getLessonStatusClass, lessonStatusLabels, learningStatusLabels } from "@/features/content/statusLabels";
import {
  calculateCourseProgress,
  calculateModuleProgress,
  getLessonProgressStates,
  isCourseUnlocked,
  readLocalProgress,
  setCurrentLesson
} from "@/services/progressService";
import { EmptyState } from "@/components/ui/StateMessage";
import { Panel } from "@/components/ui/Panel";
import { ProgressBar } from "@/components/ui/ProgressBar";

export function CourseDetail({ structure }: { structure: CourseStructure }) {
  const orderedLessons = useMemo(() => structure.modules.flatMap((module) => module.lessons), [structure.modules]);
  const [progress, setProgress] = useState(() => readLocalProgress(orderedLessons));
  const [courseUnlocked, setCourseUnlocked] = useState(false);
  const isCourseLocked = structure.course.status === "locked" && !courseUnlocked;
  const lessonStates = getLessonProgressStates(orderedLessons, progress);
  const courseProgress = calculateCourseProgress(orderedLessons, progress);

  useEffect(() => {
    setProgress(readLocalProgress(orderedLessons));
    setCourseUnlocked(isCourseUnlocked(structure.course.id));
  }, [orderedLessons, structure.course.id]);

  function handleOpenLesson(lesson: LessonDocument) {
    const lessonState = lessonStates.find((state) => state.lessonId === lesson.id);

    if (isCourseLocked || !lessonState?.isUnlocked) {
      return;
    }

    setProgress(setCurrentLesson(progress, lesson.id));
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <Panel className="bg-white/[0.028]">
        <ProgressBar value={courseProgress.coursePercent} label="Progresso do curso" />
        <div className="mt-3 text-sm text-slate-400">
          {courseProgress.completedLessons} de {courseProgress.totalLessons} aula(s) concluída(s)
        </div>

        <div className="mt-6 space-y-4">
          {structure.modules.length ? (
            structure.modules.map((module) => {
              const moduleProgress = calculateModuleProgress(module, orderedLessons, progress);

              return (
                <div key={module.id} className="rounded-md border border-white/[0.08] bg-white/[0.025] p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-white">{module.title}</h3>
                      <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-400">{module.description}</p>
                    </div>
                    <span className="text-sm font-semibold text-aviation-cyan">{moduleProgress}%</span>
                  </div>
                  <div className="mt-3">
                    <ProgressBar value={moduleProgress} />
                  </div>
                  <div className="mt-4 space-y-2">
                    {module.lessons.length ? (
                      module.lessons.map((lesson) => {
                        const lessonState = lessonStates.find((state) => state.lessonId === lesson.id);
                        const status = isCourseLocked ? "bloqueada" : lessonState?.status ?? "bloqueada";
                        const isLocked = isCourseLocked || !lessonState?.isUnlocked;
                        const Icon = status === "concluida" ? CheckCircle2 : isLocked ? Lock : PlayCircle;

                        return (
                          <Link
                            key={lesson.id}
                            href={isLocked ? `/cursos/${structure.course.slug}` : `/aulas/${lesson.slug}`}
                            onClick={() => handleOpenLesson(lesson)}
                            aria-disabled={isLocked}
                            className={clsx(
                              "focus-ring flex items-center justify-between gap-3 rounded-md border p-3 text-sm transition",
                              getLessonStatusClass(status),
                              isLocked ? "cursor-not-allowed opacity-75" : "hover:border-aviation-cyan/50"
                            )}
                          >
                            <span className="flex min-w-0 items-center gap-3">
                              <Icon className="h-5 w-5 shrink-0" />
                              <span className="min-w-0">
                                <span className="block truncate font-medium text-white">{lesson.title}</span>
                                <span className="mt-1 block text-xs text-slate-400">{lessonStatusLabels[status]}</span>
                              </span>
                            </span>
                            <span className="shrink-0 text-slate-400">{lesson.estimatedDuration}</span>
                          </Link>
                        );
                      })
                    ) : (
                      <p className="rounded-md border border-white/[0.08] bg-white/[0.025] p-3 text-sm text-slate-400">Nenhuma aula cadastrada neste módulo.</p>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <EmptyState title="Nenhum módulo cadastrado" description="Este curso já existe na estrutura, mas ainda não possui módulos publicados." />
          )}
        </div>
      </Panel>

      <Panel className="bg-white/[0.028]">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Resumo</p>
        <dl className="mt-4 space-y-4 text-sm">
          <SummaryItem label="Nível" value={structure.course.level} />
          <SummaryItem label="Público" value={structure.course.audience} />
          <SummaryItem label="Aeronave" value={structure.course.referenceAircraft} />
          <SummaryItem label="Duração estimada" value={structure.course.estimatedDuration} />
          <SummaryItem label="Módulos" value={String(structure.modules.length)} />
          <SummaryItem label="Status" value={learningStatusLabels[structure.course.status]} />
          <SummaryItem label="Publicação" value={structure.course.publicationState === "published" ? "Publicado" : "Rascunho"} />
          <SummaryItem label="Atualizado em" value={formatDate(structure.course.updatedAt)} />
        </dl>
        <div className="mt-4 grid gap-2">
          <Link href={`/cursos/${structure.course.slug}/conclusao`} className="focus-ring rounded-md bg-aviation-cyan px-4 py-2 text-center text-sm font-semibold text-aviation-ink">
            Conclusão do curso
          </Link>
        </div>
      </Panel>
    </div>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-slate-500">{label}</dt>
      <dd className="mt-1 font-semibold text-white">{value}</dd>
    </div>
  );
}

function formatDate(date: string) {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
}
