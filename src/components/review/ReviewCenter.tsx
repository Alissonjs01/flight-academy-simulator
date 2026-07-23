"use client";

import { BookOpen, CheckCircle2, HelpCircle, Lightbulb, RotateCcw, XCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { ReviewItemDocument } from "@/features/content/types";
import type { ReviewReferenceData } from "@/services/reviewService";
import { readActiveReviewItems, removeReviewItem } from "@/services/exerciseAttemptService";
import { readLocalProgress } from "@/services/progressService";
import { EmptyState } from "@/components/ui/StateMessage";
import { Panel } from "@/components/ui/Panel";

type ReviewCenterProps = {
  references: ReviewReferenceData;
};

const sectionConfig = {
  lesson_review: {
    title: "Aulas marcadas para revisar",
    icon: BookOpen
  },
  wrong_question: {
    title: "Perguntas erradas",
    icon: XCircle
  },
  open_answer_not_understood: {
    title: "Respostas abertas não compreendidas",
    icon: HelpCircle
  },
  low_score_concept: {
    title: "Conceitos com baixa pontuação",
    icon: Lightbulb
  }
};

export function ReviewCenter({ references }: ReviewCenterProps) {
  const [items, setItems] = useState<ReviewItemDocument[]>([]);

  useEffect(() => {
    setItems(readActiveReviewItems());
  }, []);

  const orderedLessons = useMemo(() => [...references.lessons].sort((a, b) => a.moduleId.localeCompare(b.moduleId) || a.order - b.order), [references.lessons]);
  const recommendedLesson = useMemo(() => {
    const progress = readLocalProgress(orderedLessons);
    return orderedLessons.find((lesson) => lesson.id === progress.currentLessonId) ?? orderedLessons.find((lesson) => !progress.completedLessonIds.includes(lesson.id));
  }, [orderedLessons]);

  function handleRemove(itemId: string) {
    removeReviewItem(itemId);
    setItems(readActiveReviewItems());
  }

  const groupedItems = {
    lesson_review: items.filter((item) => item.type === "lesson_review"),
    wrong_question: items.filter((item) => item.type === "wrong_question"),
    open_answer_not_understood: items.filter((item) => item.type === "open_answer_not_understood"),
    low_score_concept: items.filter((item) => item.type === "low_score_concept")
  };

  return (
    <div className="space-y-4">
      <Panel>
        <p className="text-xs uppercase tracking-[0.18em] text-aviation-cyan">Revisão</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">Central de revisão do aluno</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
          Esta área reúne itens gerados por respostas incorretas, autoavaliações e resultados de avaliação. Por enquanto, tudo fica salvo neste navegador.
        </p>
        {recommendedLesson ? (
          <div className="mt-5 flex flex-col gap-3 rounded-md border border-aviation-cyan/25 bg-aviation-cyan/[0.08] p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-aviation-cyan">Próxima aula recomendada</p>
              <p className="mt-1 font-semibold text-white">{recommendedLesson.title}</p>
            </div>
            <Link href={`/aulas/${recommendedLesson.slug}`} className="focus-ring inline-flex items-center gap-2 rounded-md bg-aviation-cyan px-4 py-2 text-sm font-semibold text-aviation-ink">
              <RotateCcw className="h-4 w-4" />
              Estudar agora
            </Link>
          </div>
        ) : null}
      </Panel>

      {items.length === 0 ? (
        <EmptyState title="Nenhum item de revisão" description="Quando houver erros, conceitos fracos ou respostas abertas marcadas para revisar, eles aparecerão aqui." />
      ) : (
        (Object.keys(groupedItems) as Array<keyof typeof groupedItems>).map((type) => {
          const SectionIcon = sectionConfig[type].icon;
          const sectionItems = groupedItems[type];

          return (
            <Panel key={type}>
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <SectionIcon className="h-5 w-5 text-aviation-cyan" />
                <h3>{sectionConfig[type].title}</h3>
              </div>
              {sectionItems.length === 0 ? (
                <p className="mt-4 text-sm text-slate-500">Nada pendente nesta seção.</p>
              ) : (
                <div className="mt-4 grid gap-3">
                  {sectionItems.map((item) => (
                    <ReviewItemCard key={item.id} item={item} references={references} onRemove={handleRemove} />
                  ))}
                </div>
              )}
            </Panel>
          );
        })
      )}
    </div>
  );
}

function ReviewItemCard({ item, references, onRemove }: { item: ReviewItemDocument; references: ReviewReferenceData; onRemove: (itemId: string) => void }) {
  const lesson = references.lessons.find((referenceLesson) => referenceLesson.id === item.lessonId);
  const courseModule = references.modules.find((referenceModule) => referenceModule.id === item.moduleId);
  const exercise = references.exercises.find((referenceExercise) => referenceExercise.id === item.exerciseId);

  return (
    <div className="rounded-md border border-white/10 bg-white/[0.035] p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="font-semibold text-white">{lesson?.title ?? item.title}</p>
          <p className="mt-1 text-sm text-slate-400">{courseModule?.title ?? "Módulo não identificado"}</p>
          <p className="mt-3 text-sm leading-6 text-slate-300">{exercise?.prompt ?? item.description}</p>
          {item.concept ? <p className="mt-2 text-sm text-aviation-amber">Conceito: {item.concept}</p> : null}
        </div>
        <button
          type="button"
          onClick={() => onRemove(item.id)}
          className="focus-ring inline-flex shrink-0 items-center gap-2 rounded-md border border-aviation-mint/30 bg-aviation-mint/[0.08] px-3 py-2 text-sm font-semibold text-aviation-mint"
        >
          <CheckCircle2 className="h-4 w-4" />
          Remover
        </button>
      </div>
      {lesson ? (
        <Link href={`/aulas/${lesson.slug}`} className="focus-ring mt-4 inline-flex rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white">
          Abrir aula
        </Link>
      ) : null}
    </div>
  );
}
