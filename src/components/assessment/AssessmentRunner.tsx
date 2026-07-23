"use client";

import { CheckCircle2, Clock, RotateCcw } from "lucide-react";
import Link from "next/link";
import { type FormEvent, useEffect, useMemo, useState } from "react";
import type { AssessmentAttemptDocument, CourseDocument, FinalAssessmentDocument, FinalAssessmentQuestion } from "@/features/content/types";
import { readAssessmentAttemptsByCourse, startAssessmentSession, submitAssessmentAttempt } from "@/services/assessmentAttemptService";
import { Panel } from "@/components/ui/Panel";
import { ProgressBar } from "@/components/ui/ProgressBar";

type AssessmentRunnerProps = {
  course: CourseDocument;
  assessment: FinalAssessmentDocument;
};

export function AssessmentRunner({ course, assessment }: AssessmentRunnerProps) {
  const [session, setSession] = useState(() => startAssessmentSession(assessment));
  const [attempt, setAttempt] = useState<AssessmentAttemptDocument | undefined>();
  const [historyVersion, setHistoryVersion] = useState(0);
  const [attemptHistory, setAttemptHistory] = useState<AssessmentAttemptDocument[]>([]);
  const selectedQuestions = useMemo(
    () => session.questionIds.map((questionId) => assessment.questions.find((question) => question.id === questionId)).filter((question): question is FinalAssessmentQuestion => Boolean(question)),
    [assessment.questions, session.questionIds]
  );

  useEffect(() => {
    setAttemptHistory(readAssessmentAttemptsByCourse(course.id));
  }, [course.id, historyVersion]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const answers = Object.fromEntries(selectedQuestions.map((question) => [question.id, String(formData.get(question.id) ?? "")]));
    const nextAttempt = submitAssessmentAttempt(assessment, answers, session);
    setAttempt(nextAttempt);
    setHistoryVersion((value) => value + 1);
  }

  function handleRetake() {
    setSession(startAssessmentSession(assessment));
    setAttempt(undefined);
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-5xl space-y-4">
      <Panel>
        <p className="text-xs uppercase tracking-[0.18em] text-aviation-cyan">Avaliação final</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">{assessment.title}</h2>
        <p className="mt-3 text-sm leading-7 text-slate-300">{assessment.instructions}</p>
        <div className="mt-5 rounded-md border border-aviation-amber/25 bg-aviation-amber/[0.08] p-4 text-sm leading-6 text-slate-200">
          {assessment.scenario}
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <Metric label="Perguntas sorteadas" value={`${selectedQuestions.length}/${assessment.questions.length}`} />
          <Metric label="Aprovação" value={`${assessment.passingScore}%`} />
          <Metric label="Tempo opcional" value={assessment.timeLimitMinutes ? `${assessment.timeLimitMinutes} min` : "Livre"} />
        </div>
        <p className="mt-4 text-sm leading-6 text-slate-400">{course.disclaimer}</p>
      </Panel>

      <div className="space-y-4">
        {selectedQuestions.map((question) => (
          <Panel key={question.id}>
            <label className="block">
              <span className="text-sm font-semibold text-white">{question.prompt}</span>
              <span className="mt-2 block text-xs uppercase tracking-[0.16em] text-slate-500">{question.concept}</span>
              <textarea
                name={question.id}
                rows={4}
                className="focus-ring mt-3 w-full rounded-md border border-white/10 bg-aviation-ink/60 p-3 text-sm leading-6 text-white placeholder:text-slate-500"
                placeholder="Descreva sua decisão, os instrumentos usados e a lógica de energia."
              />
            </label>
          </Panel>
        ))}
      </div>

      <Panel className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {attempt ? (
          <div className="min-w-0 flex-1 space-y-3">
            <div className="flex items-center gap-3 text-sm text-aviation-mint">
              <CheckCircle2 className="h-5 w-5" />
              <span>Avaliação registrada. Resultado estimado: {attempt.percentage}%.</span>
            </div>
            <ProgressBar value={attempt.percentage} label={attempt.passed ? "Critério de aprovação atingido" : "Revisão recomendada"} />
            {attempt.weakConcepts.length > 0 ? (
              <p className="text-sm text-slate-400">Assuntos com maior dificuldade: {attempt.weakConcepts.join(", ")}.</p>
            ) : null}
          </div>
        ) : (
          <p className="text-sm text-slate-400">A correção local procura palavras-chave conceituais. A revisão humana poderá ser adicionada futuramente.</p>
        )}
        <div className="flex flex-wrap gap-3">
          <button type="submit" className="focus-ring rounded-md bg-aviation-cyan px-4 py-2 text-sm font-semibold text-aviation-ink">
            Finalizar avaliação
          </button>
          {assessment.allowRetake && attempt ? (
            <button type="button" onClick={handleRetake} className="focus-ring inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white">
              <RotateCcw className="h-4 w-4" />
              Refazer
            </button>
          ) : null}
          {attempt ? (
            <Link href={`/cursos/${course.slug}/resultado`} className="focus-ring rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white">
              Ver resultado
            </Link>
          ) : null}
        </div>
      </Panel>

      {attemptHistory.length > 0 ? (
        <Panel>
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <Clock className="h-4 w-4 text-aviation-cyan" />
            Histórico de tentativas
          </div>
          <div className="mt-4 grid gap-2">
            {attemptHistory.slice(0, 5).map((item) => (
              <div key={item.id} className="flex flex-col gap-1 rounded-md border border-white/10 bg-white/[0.035] p-3 text-sm sm:flex-row sm:items-center sm:justify-between">
                <span className="text-slate-300">Tentativa {item.attemptNumber}</span>
                <span className={item.passed ? "font-semibold text-aviation-mint" : "font-semibold text-aviation-amber"}>{item.percentage}%</span>
              </div>
            ))}
          </div>
        </Panel>
      ) : null}
    </form>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-white/[0.035] p-3">
      <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-white">{value}</p>
    </div>
  );
}
