"use client";

import clsx from "clsx";
import { BookMarked, CheckCircle2, RotateCcw, XCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { ExerciseAnswerValue, ExerciseAttemptDocument, ExerciseDocument, OpenAnswerSelfAssessment } from "@/features/content/types";
import { readLatestAttemptByExercise, submitExerciseAttempt } from "@/services/exerciseAttemptService";
import { Panel } from "@/components/ui/Panel";

type ExercisePanelProps = {
  exercise: ExerciseDocument;
  isLocked: boolean;
  onAttemptSaved: () => void;
};

const typeLabels: Record<ExerciseDocument["type"], string> = {
  multiple_choice: "Múltipla escolha",
  true_false: "Verdadeiro ou falso",
  open_answer: "Resposta aberta"
};

const selfAssessmentLabels: Record<OpenAnswerSelfAssessment, string> = {
  entendi: "Entendi",
  preciso_revisar: "Preciso revisar",
  nao_entendi: "Não entendi"
};

export function ExercisePanel({ exercise, isLocked, onAttemptSaved }: ExercisePanelProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<ExerciseAnswerValue>("");
  const [personalNote, setPersonalNote] = useState("");
  const [selfAssessment, setSelfAssessment] = useState<OpenAnswerSelfAssessment | undefined>();
  const [latestAttempt, setLatestAttempt] = useState<ExerciseAttemptDocument | undefined>();

  useEffect(() => {
    const attempt = readLatestAttemptByExercise(exercise.id);
    setLatestAttempt(attempt);
    setSelectedAnswer(attempt?.answer ?? "");
    setSelfAssessment(attempt?.selfAssessment);
    setPersonalNote(attempt?.personalNote ?? "");
  }, [exercise.id]);

  const isOpenAnswer = exercise.type === "open_answer";
  const wasAnswered = Boolean(latestAttempt);
  const isCorrect = latestAttempt?.isCorrect;
  const feedback = useMemo(() => getFeedback(exercise, latestAttempt), [exercise, latestAttempt]);

  function handleSubmit() {
    if (isLocked || selectedAnswer === "") {
      return;
    }

    const attempt = submitExerciseAttempt({ exercise, answer: selectedAnswer, selfAssessment, personalNote });
    setLatestAttempt(attempt);
    onAttemptSaved();
  }

  function handleRetry() {
    setSelectedAnswer("");
    setSelfAssessment(undefined);
    setPersonalNote("");
    setLatestAttempt(undefined);
    onAttemptSaved();
  }

  function handleSelfAssessment(value: OpenAnswerSelfAssessment) {
    if (isLocked || !selectedAnswer) {
      return;
    }

    const attempt = submitExerciseAttempt({ exercise, answer: selectedAnswer, selfAssessment: value, personalNote });
    setSelfAssessment(value);
    setLatestAttempt(attempt);
    onAttemptSaved();
  }

  return (
    <Panel className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-aviation-cyan">{typeLabels[exercise.type]}</p>
          <h3 className="mt-2 text-lg font-semibold text-white">{exercise.prompt}</h3>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2 text-xs">
          <span className="rounded-sm border border-white/10 bg-white/[0.04] px-2 py-1 text-slate-300">{exercise.difficulty}</span>
          <span className="rounded-sm border border-aviation-mint/20 bg-aviation-mint/[0.07] px-2 py-1 text-aviation-mint">{exercise.points} pts</span>
        </div>
      </div>

      {exercise.type === "multiple_choice" ? (
        <div className="grid gap-2">
          {(exercise.alternatives ?? []).map((alternative) => (
            <ChoiceButton
              key={alternative}
              label={alternative}
              selected={selectedAnswer === alternative}
              disabled={isLocked}
              onClick={() => setSelectedAnswer(alternative)}
            />
          ))}
        </div>
      ) : null}

      {exercise.type === "true_false" ? (
        <div className="grid gap-2 sm:grid-cols-2">
          <ChoiceButton label="Verdadeiro" selected={selectedAnswer === true} disabled={isLocked} onClick={() => setSelectedAnswer(true)} />
          <ChoiceButton label="Falso" selected={selectedAnswer === false} disabled={isLocked} onClick={() => setSelectedAnswer(false)} />
        </div>
      ) : null}

      {isOpenAnswer ? (
        <label className="block">
          <span className="text-sm font-semibold text-slate-300">Sua resposta</span>
          <textarea
            value={String(selectedAnswer)}
            onChange={(event) => setSelectedAnswer(event.target.value)}
            rows={4}
            disabled={isLocked}
            className="focus-ring mt-2 w-full rounded-md border border-white/10 bg-aviation-ink/60 p-3 text-sm leading-6 text-white placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-60"
            placeholder="Explique com suas palavras, conectando instrumentos, intenção e desempenho."
          />
        </label>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isLocked || selectedAnswer === ""}
          className="focus-ring rounded-md bg-aviation-cyan px-4 py-2 text-sm font-semibold text-aviation-ink disabled:cursor-not-allowed disabled:opacity-50"
        >
          Enviar resposta
        </button>
        {wasAnswered ? (
          <button
            type="button"
            onClick={handleRetry}
            className="focus-ring inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white"
          >
            <RotateCcw className="h-4 w-4" />
            Tentar novamente
          </button>
        ) : null}
      </div>

      {wasAnswered ? (
        <div
          className={clsx(
            "rounded-md border p-4 text-sm leading-6",
            isCorrect === false && "border-red-400/25 bg-red-400/[0.08] text-red-100",
            isCorrect === true && "border-aviation-mint/25 bg-aviation-mint/[0.08] text-slate-100",
            isCorrect === undefined && "border-aviation-amber/25 bg-aviation-amber/[0.08] text-slate-100"
          )}
        >
          <div className="flex items-center gap-2 font-semibold">
            {isCorrect === false ? <XCircle className="h-5 w-5 text-red-300" /> : <CheckCircle2 className="h-5 w-5 text-aviation-mint" />}
            <span>{feedback.title}</span>
          </div>
          <p className="mt-2">{feedback.description}</p>
          <p className="mt-3 font-semibold text-white">Resposta esperada</p>
          <p className="mt-1 text-slate-300">{exercise.expectedAnswer}</p>
          <p className="mt-3 font-semibold text-white">Explicação</p>
          <p className="mt-1 text-slate-300">{exercise.explanation}</p>
        </div>
      ) : null}

      {isOpenAnswer && wasAnswered ? (
        <div className="rounded-md border border-white/10 bg-white/[0.035] p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <BookMarked className="h-4 w-4 text-aviation-amber" />
            Autoavaliação
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {(Object.keys(selfAssessmentLabels) as OpenAnswerSelfAssessment[]).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => handleSelfAssessment(value)}
                className={clsx(
                  "focus-ring rounded-md border px-3 py-2 text-sm font-semibold",
                  selfAssessment === value ? "border-aviation-cyan bg-aviation-cyan text-aviation-ink" : "border-white/10 bg-white/5 text-white"
                )}
              >
                {selfAssessmentLabels[value]}
              </button>
            ))}
          </div>
          <label className="mt-4 block">
            <span className="text-sm text-slate-400">Observação pessoal</span>
            <textarea
              value={personalNote}
              onChange={(event) => setPersonalNote(event.target.value)}
              rows={3}
              className="focus-ring mt-2 w-full rounded-md border border-white/10 bg-aviation-ink/60 p-3 text-sm leading-6 text-white placeholder:text-slate-500"
              placeholder="Anote o que quer revisar depois."
            />
          </label>
        </div>
      ) : null}
    </Panel>
  );
}

function ChoiceButton({ label, selected, disabled, onClick }: { label: string; selected: boolean; disabled: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        "focus-ring rounded-md border px-3 py-3 text-left text-sm leading-6 disabled:cursor-not-allowed disabled:opacity-60",
        selected ? "border-aviation-cyan bg-aviation-cyan/[0.12] text-white" : "border-white/10 bg-white/[0.035] text-slate-300"
      )}
    >
      {label}
    </button>
  );
}

function getFeedback(exercise: ExerciseDocument, attempt?: ExerciseAttemptDocument) {
  if (!attempt) {
    return { title: "", description: "" };
  }

  if (exercise.type === "open_answer") {
    return {
      title: "Resposta registrada",
      description: "Compare sua resposta com a referência e use a autoavaliação para decidir se este ponto entra na revisão."
    };
  }

  if (attempt.isCorrect) {
    return {
      title: "Resposta correta",
      description: "O raciocínio está alinhado com a aula. Você pode avançar ou tentar novamente para consolidar."
    };
  }

  return {
    title: "Resposta incorreta",
    description: "Esse item foi enviado para revisão. Leia a explicação e tente novamente quando estiver confortável."
  };
}
