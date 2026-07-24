"use client";

import { Award } from "lucide-react";
import type { CourseDocument } from "@/features/content/types";
import { Panel } from "@/components/ui/Panel";

export function SymbolicCertificate({ course }: { course: CourseDocument }) {
  return (
    <div className="mx-auto max-w-4xl">
      <Panel className="border-aviation-mint/30 bg-aviation-mint/[0.06] p-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-md border border-aviation-mint/40 bg-aviation-mint/[0.1] text-aviation-mint">
          <Award className="h-9 w-9" />
        </div>
        <p className="mt-6 text-xs uppercase tracking-[0.2em] text-aviation-mint">Certificado simbólico interno</p>
        <h2 className="mt-3 text-2xl font-semibold text-white">Conclusão de {course.title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-300">
          Registro interno de conclusão baseado no progresso das aulas da plataforma Flight Academy Simulator.
        </p>
      </Panel>
    </div>
  );
}
