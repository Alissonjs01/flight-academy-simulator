import Link from "next/link";
import { Gauge, PlaneTakeoff, Route } from "lucide-react";
import type { CourseDocument } from "@/features/content/types";
import { learningStatusLabels } from "@/features/content/statusLabels";
import { ProgressBar } from "@/components/ui/ProgressBar";

export function CourseCard({ course }: { course: CourseDocument }) {
  const Icon = course.imageIcon === "gauge" ? Gauge : course.imageIcon === "route" ? Route : PlaneTakeoff;

  return (
    <Link
      href={`/cursos/${course.slug}`}
      className="focus-ring block rounded-md border border-white/10 bg-white/[0.04] p-5 transition hover:border-aviation-cyan/45 hover:bg-white/[0.07]"
    >
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded-sm bg-aviation-cyan/12 px-2 py-1 font-semibold text-aviation-cyan">{course.category}</span>
        <span className="rounded-sm bg-white/[0.08] px-2 py-1 text-slate-300">{course.level}</span>
        <span className="ml-auto text-slate-400">{course.estimatedDuration}</span>
      </div>
      <div className="mt-4 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-aviation-cyan/25 bg-aviation-cyan/10 text-aviation-cyan">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">{course.title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">{course.description}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-400">
        <span>{course.moduleCount} módulo(s)</span>
        <span>•</span>
        <span>{learningStatusLabels[course.status]}</span>
        <span>•</span>
        <span>{course.publicationState === "published" ? "Publicado" : "Rascunho"}</span>
      </div>
      <div className="mt-5">
        <ProgressBar value={course.progressPercent} label="Progresso do curso" />
      </div>
    </Link>
  );
}
