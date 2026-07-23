import type { LearningStatus, LessonRuntimeStatus } from "@/features/content/types";

export const learningStatusLabels: Record<LearningStatus, string> = {
  not_started: "Não iniciado",
  in_progress: "Em andamento",
  completed: "Concluído",
  locked: "Bloqueado"
};

export const lessonStatusLabels: Record<LessonRuntimeStatus, string> = {
  concluida: "Concluída",
  atual: "Atual",
  bloqueada: "Bloqueada",
  disponivel: "Disponível"
};

export function getLessonStatusClass(status: LessonRuntimeStatus) {
  if (status === "concluida") {
    return "border-aviation-mint/35 bg-aviation-mint/[0.08] text-aviation-mint";
  }

  if (status === "atual") {
    return "border-aviation-cyan/45 bg-aviation-cyan/[0.1] text-aviation-cyan";
  }

  if (status === "bloqueada") {
    return "border-white/10 bg-white/[0.03] text-slate-500";
  }

  return "border-white/10 bg-white/[0.04] text-slate-300";
}
