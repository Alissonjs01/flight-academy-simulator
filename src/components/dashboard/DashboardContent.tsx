"use client";

import { BookOpen, Clock3, Gauge, ListChecks, Plane, Route, Target, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { MetricCard } from "@/components/cards/MetricCard";
import { QuickLinkCard } from "@/components/cards/QuickLinkCard";
import { Panel } from "@/components/ui/Panel";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Aircraft } from "@/types/academy";
import type { CourseStructure, LessonDocument } from "@/features/content/types";
import type { StudentProgressDocument } from "@/features/progress/types";
import {
  calculateCourseProgress,
  calculateModuleProgress,
  getLessonProgressStates,
  readLocalProgress
} from "@/services/progressService";

type DashboardContentProps = {
  studentName: string;
  structure: CourseStructure;
  aircraft: Aircraft;
};

export function DashboardContent({ studentName, structure, aircraft }: DashboardContentProps) {
  const orderedLessons = useMemo(() => structure.modules.flatMap((module) => module.lessons), [structure.modules]);
  const [progress, setProgress] = useState<StudentProgressDocument>(() => readLocalProgress(orderedLessons));

  useEffect(() => {
    setProgress(readLocalProgress(orderedLessons));
  }, [orderedLessons]);

  const lessonStates = getLessonProgressStates(orderedLessons, progress);
  const courseProgress = calculateCourseProgress(orderedLessons, progress);
  const currentLesson = getCurrentLesson(orderedLessons, progress.currentLessonId) ?? orderedLessons[0];
  const nextModules = structure.modules.filter((module) => calculateModuleProgress(module, orderedLessons, progress) < 100).slice(0, 2);
  const completedLabel = `${courseProgress.completedLessons}/${courseProgress.totalLessons || 0}`;

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <section className="grid min-w-0 gap-4 xl:grid-cols-[1.45fr_0.9fr]">
        <Panel className="overflow-hidden">
          <div className="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-center">
            <div className="min-w-0">
              <p className="text-sm font-medium text-aviation-cyan">Bem-vindo de volta, {studentName}</p>
              <h2 className="mt-3 max-w-3xl text-2xl font-semibold text-white sm:text-3xl">Continue seu treinamento no ponto exato em que parou.</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
                A trilha atual começa com fundamentos de pilotagem e prepara a transição para Garmin G1000 NXi, navegação e IFR.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={currentLesson ? `/aulas/${currentLesson.slug}` : `/cursos/${structure.course.slug}`}
                  className="focus-ring rounded-md bg-aviation-cyan px-4 py-2 text-sm font-semibold text-aviation-ink"
                >
                  Continuar aula
                </Link>
                <Link href={`/cursos/${structure.course.slug}`} className="focus-ring rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white">
                  Ver curso
                </Link>
              </div>
            </div>
            <div className="rounded-md border border-white/10 bg-aviation-ink/55 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Curso atual</p>
              <h3 className="mt-2 text-lg font-semibold text-white">{structure.course.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{structure.course.level}</p>
              <div className="mt-5">
                <ProgressBar value={courseProgress.coursePercent} label="Progresso geral" />
              </div>
            </div>
          </div>
        </Panel>

        <Panel>
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Última aula acessada</p>
          <h3 className="mt-3 text-xl font-semibold text-white">{currentLesson?.title ?? "Nenhuma aula disponível"}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">{currentLesson?.summary ?? "Este curso ainda não possui aulas publicadas."}</p>
          <div className="mt-5 flex items-center gap-3 rounded-md border border-aviation-mint/20 bg-aviation-mint/[0.08] p-3 text-sm text-slate-200">
            <Clock3 className="h-5 w-5 text-aviation-mint" />
            <span>Tempo estimado de estudo: 45 min hoje</span>
          </div>
        </Panel>
      </section>

      <section className="grid min-w-0 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Progresso geral" value={`${courseProgress.coursePercent}%`} icon={TrendingUp} />
        <MetricCard label="Aeronave em estudo" value="C408" icon={Plane} />
        <MetricCard label="Aulas concluídas" value={completedLabel} icon={BookOpen} />
        <MetricCard label="Sequência ativa" value={`${lessonStates.filter((item) => item.isUnlocked).length} aula(s)`} icon={Route} />
      </section>

      <section className="grid min-w-0 gap-4 xl:grid-cols-[0.95fr_1.05fr]">
        <Panel>
          <SectionHeader eyebrow="Próximos módulos" title="Plano imediato" description="A sequência mantém a curva de aprendizado simples antes de avançar para navegação e IFR." />
          <div className="space-y-3">
            {nextModules.length ? (
              nextModules.map((module) => {
                const moduleProgress = calculateModuleProgress(module, orderedLessons, progress);
                return (
                  <Link
                    key={module.id}
                    href={`/cursos/${structure.course.slug}`}
                    className="focus-ring block rounded-md border border-white/10 bg-white/[0.035] p-4 transition hover:border-aviation-cyan/40"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-white">{module.title}</p>
                        <p className="mt-1 text-sm text-slate-400">{module.lessons.length} aula(s) planejada(s)</p>
                      </div>
                      <span className="text-sm font-semibold text-aviation-cyan">{moduleProgress}%</span>
                    </div>
                    <div className="mt-3">
                      <ProgressBar value={moduleProgress} />
                    </div>
                  </Link>
                );
              })
            ) : (
              <p className="rounded-md border border-white/10 bg-white/[0.035] p-4 text-sm text-slate-400">Todos os módulos disponíveis foram concluídos.</p>
            )}
          </div>
        </Panel>

        <Panel>
          <SectionHeader eyebrow="Sequência de estudos" title="Próximas ações" />
          <ol className="space-y-3">
            {["Revisar a última aula", "Concluir o exercício", "Abrir a próxima aula liberada", "Registrar prática no simulador"].map((step, index) => (
              <li key={step} className="flex gap-3 rounded-md border border-white/10 bg-white/[0.035] p-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-aviation-cyan/12 text-sm font-semibold text-aviation-cyan">{index + 1}</span>
                <span className="text-sm leading-6 text-slate-300">{step}</span>
              </li>
            ))}
          </ol>
        </Panel>
      </section>

      <section className="grid min-w-0 gap-4 xl:grid-cols-[0.85fr_1.15fr]">
        <Panel>
          <SectionHeader eyebrow="Aeronave" title={aircraft.name} description={aircraft.focus} />
          <div className="grid gap-3 text-sm sm:grid-cols-2">
            <InfoBox label="Perfil" value={aircraft.role} />
            <InfoBox label="Status" value={aircraft.status} />
          </div>
        </Panel>

        <Panel>
          <SectionHeader eyebrow="Atalhos" title="Acesso rápido" />
          <div className="grid gap-3 sm:grid-cols-2">
            <QuickLinkCard title="Cursos" description="Ver trilhas, módulos e aulas." href="/cursos" icon={BookOpen} />
            <QuickLinkCard title="Aeronaves" description="Consultar perfis e procedimentos." href="/aeronaves" icon={Plane} />
            <QuickLinkCard title="Aviônicos" description="Estudar Garmin G1000 NXi." href="/avionicos" icon={Gauge} />
            <QuickLinkCard title="Checklists" description="Abrir rotinas por fase de voo." href="/checklists" icon={ListChecks} />
            <QuickLinkCard title="Treinamentos" description="Praticar missões guiadas." href="/treinamentos" icon={Target} />
          </div>
        </Panel>
      </section>
    </div>
  );
}

function getCurrentLesson(lessons: LessonDocument[], lessonId?: string) {
  return lessons.find((lesson) => lesson.id === lessonId);
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-white/[0.035] p-3">
      <p className="text-slate-500">{label}</p>
      <p className="mt-1 font-semibold text-white">{value}</p>
    </div>
  );
}
