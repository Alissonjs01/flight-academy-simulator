"use client";

import { Award } from "lucide-react";
import { useEffect, useState } from "react";
import type { AssessmentResultDocument, CourseDocument } from "@/features/content/types";
import { readAssessmentResult } from "@/services/assessmentService";
import { Panel } from "@/components/ui/Panel";

export function SymbolicCertificate({ course }: { course: CourseDocument }) {
  const [result, setResult] = useState<AssessmentResultDocument | undefined>();

  useEffect(() => {
    setResult(readAssessmentResult(course.id));
  }, [course.id]);

  const issuedAt = result?.completedAt ? new Intl.DateTimeFormat("pt-BR").format(new Date(result.completedAt)) : "Pendente";

  return (
    <div className="mx-auto max-w-4xl">
      <Panel className="border-aviation-mint/30 bg-aviation-mint/[0.06] p-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-md border border-aviation-mint/40 bg-aviation-mint/[0.1] text-aviation-mint">
          <Award className="h-9 w-9" />
        </div>
        <p className="mt-6 text-xs uppercase tracking-[0.2em] text-aviation-mint">Certificado simbólico interno</p>
        <h2 className="mt-3 text-2xl font-semibold text-white">Conclusão de {course.title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-300">
          Emitido para o aluno local da plataforma Flight Academy Simulator em {issuedAt}, com base no progresso e na avaliação registrados neste navegador.
        </p>
        <div className="mx-auto mt-6 max-w-2xl rounded-md border border-white/10 bg-aviation-ink/45 p-4 text-sm leading-6 text-slate-300">
          {course.disclaimer}
        </div>
      </Panel>
    </div>
  );
}
