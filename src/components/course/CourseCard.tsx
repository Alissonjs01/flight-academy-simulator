import Link from "next/link";
import { ArrowRight, Gauge, PlaneTakeoff, Route } from "lucide-react";
import type { CourseDocument } from "@/features/content/types";
import { learningStatusLabels } from "@/features/content/statusLabels";
import { ProgressBar } from "@/components/ui/ProgressBar";

export function CourseCard({ course }: { course: CourseDocument }) {
  const Icon = course.imageIcon === "gauge" ? Gauge : course.imageIcon === "route" ? Route : PlaneTakeoff;

  return (
    <Link
      href={`/cursos/${course.slug}`}
      className="focus-ring group block rounded-md border border-white/[0.08] bg-white/[0.028] p-5 transition hover:border-aviation-cyan/45 hover:bg-aviation-cyan/[0.045]"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-aviation-cyan/25 bg-aviation-cyan/[0.08] text-aviation-cyan">
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-semibold uppercase tracking-[0.14em] text-aviation-cyan">{course.category}</span>
            <span className="text-slate-500">/</span>
            <span className="text-slate-400">{course.level}</span>
          </div>
          <h3 className="text-lg font-semibold text-white">{course.title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">{course.description}</p>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-3 border-y border-white/[0.08] py-3 text-xs text-slate-400">
        <span>{course.moduleCount} módulos</span>
        <span>{course.estimatedDuration}</span>
        <span className="text-right">{learningStatusLabels[course.status]}</span>
      </div>
      <div className="mt-5">
        <ProgressBar value={course.progressPercent} label="Progresso do curso" />
      </div>
      <div className="mt-5 flex items-center justify-end gap-2 text-sm font-semibold text-aviation-cyan">
        <span>Abrir curso</span>
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
