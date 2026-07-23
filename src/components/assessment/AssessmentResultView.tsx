"use client";

import { Award, Gauge } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { AssessmentAttemptDocument, AssessmentResultDocument, CourseDocument, FinalAssessmentDocument } from "@/features/content/types";
import { readAssessmentResult } from "@/services/assessmentService";
import { readAssessmentAttemptsByCourse } from "@/services/assessmentAttemptService";
import { Panel } from "@/components/ui/Panel";
import { ProgressBar } from "@/components/ui/ProgressBar";

type AssessmentResultViewProps = {
  course: CourseDocument;
  assessment: FinalAssessmentDocument;
};

export function AssessmentResultView({ course, assessment }: AssessmentResultViewProps) {
  const [result, setResult] = useState<AssessmentResultDocument | undefined>();
  const [attempts, setAttempts] = useState<AssessmentAttemptDocument[]>([]);

  useEffect(() => {
    setResult(readAssessmentResult(course.id));
    setAttempts(readAssessmentAttemptsByCourse(course.id));
  }, [course.id]);

  if (!result) {
    return (
      <Panel>
        <h2 className="text-xl font-semibold text-white">Resultado ainda não encontrado</h2>
        <p className="mt-2 text-sm text-slate-400">Finalize a avaliação para gerar o resumo de desempenho e o certificado simbólico interno.</p>
        <Link href={`/cursos/${course.slug}/avaliacao`} className="focus-ring mt-5 inline-flex rounded-md bg-aviation-cyan px-4 py-2 text-sm font-semibold text-aviation-ink">
          Abrir avaliação
        </Link>
      </Panel>
    );
  }

  const percent = Math.round((result.score / result.maxScore) * 100);
  const passed = percent >= assessment.passingScore;
  const latestAttempt = attempts[0];

  return (
    <div className="mx-auto max-w-5xl space-y-4">
      <Panel>
        <p className="text-xs uppercase tracking-[0.18em] text-aviation-cyan">Resultado</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">{passed ? "Fundamentos concluídos" : "Revisão recomendada"}</h2>
        <p className="mt-3 text-sm leading-7 text-slate-300">
          Pontuação simbólica interna: {result.score} de {result.maxScore} pontos. Este resultado não representa licença, habilitação ou certificação aeronáutica real.
        </p>
        <div className="mt-5">
          <ProgressBar value={percent} label="Desempenho da avaliação" />
        </div>
      </Panel>

      <div className="grid gap-4 md:grid-cols-2">
        <Panel>
          <h3 className="font-semibold text-white">Pontos fortes</h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            {result.strengths.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </Panel>
        <Panel>
          <h3 className="font-semibold text-white">Melhorias sugeridas</h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            {result.improvements.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </Panel>
      </div>

      {latestAttempt ? (
        <div className="grid gap-4 md:grid-cols-2">
          <Panel>
            <h3 className="font-semibold text-white">Assuntos com maior dificuldade</h3>
            {latestAttempt.weakConcepts.length > 0 ? (
              <ul className="mt-4 space-y-2 text-sm text-slate-300">
                {latestAttempt.weakConcepts.map((concept) => (
                  <li key={concept}>• {concept}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-slate-400">Nenhum assunto crítico registrado nesta tentativa.</p>
            )}
          </Panel>
          <Panel>
            <h3 className="font-semibold text-white">Módulos para revisar</h3>
            {latestAttempt.modulesToReview.length > 0 ? (
              <ul className="mt-4 space-y-2 text-sm text-slate-300">
                {latestAttempt.modulesToReview.map((moduleId) => (
                  <li key={moduleId}>• {moduleId}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-slate-400">A tentativa não apontou módulos prioritários para revisão.</p>
            )}
          </Panel>
        </div>
      ) : null}

      {attempts.length > 0 ? (
        <Panel>
          <h3 className="font-semibold text-white">Histórico de tentativas</h3>
          <div className="mt-4 grid gap-2">
            {attempts.map((item) => (
              <div key={item.id} className="flex flex-col gap-1 rounded-md border border-white/10 bg-white/[0.035] p-3 text-sm sm:flex-row sm:items-center sm:justify-between">
                <span className="text-slate-300">Tentativa {item.attemptNumber} em {new Intl.DateTimeFormat("pt-BR").format(new Date(item.completedAt))}</span>
                <span className={item.passed ? "font-semibold text-aviation-mint" : "font-semibold text-aviation-amber"}>{item.percentage}%</span>
              </div>
            ))}
          </div>
        </Panel>
      ) : null}

      <Panel className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 text-sm text-slate-300">
          {passed ? <Gauge className="h-5 w-5 text-aviation-mint" /> : <Award className="h-5 w-5 text-aviation-amber" />}
          <span>{passed ? "Curso Garmin G1000 NXi desbloqueado." : "Revise as aulas e refaça a avaliação quando desejar."}</span>
        </div>
        <div className="flex flex-wrap gap-3">
          {passed ? (
            <Link href={`/cursos/${course.slug}/certificado`} className="focus-ring rounded-md bg-aviation-cyan px-4 py-2 text-sm font-semibold text-aviation-ink">
              Ver certificado
            </Link>
          ) : null}
          <Link href="/revisao" className="focus-ring rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white">
            Abrir revisão
          </Link>
          <Link href="/cursos/garmin-g1000-nxi" className="focus-ring rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white">
            Garmin G1000 NXi
          </Link>
        </div>
      </Panel>
    </div>
  );
}
