import { localContentRepository } from "@/features/content/repositories/localContentRepository";
import type { AssessmentResultDocument, FinalAssessmentDocument } from "@/features/content/types";
import { readLatestAssessmentAttempt, submitAssessmentAttempt } from "@/services/assessmentAttemptService";
import { unlockCourses } from "@/services/progressService";

const RESULT_KEY = "flight-academy-simulator:assessment-results:v1";
const DEFAULT_STUDENT_ID = "local-student";

const repository = localContentRepository;

export async function getFinalAssessmentByCourseSlug(slug: string) {
  return repository.getFinalAssessmentByCourseSlug(slug);
}

export function evaluateFinalAssessment(courseId: string, assessment: FinalAssessmentDocument, answers: Record<string, string>): AssessmentResultDocument {
  const session = {
    questionIds: assessment.questions.map((question) => question.id),
    startedAt: new Date().toISOString()
  };
  const attempt = submitAssessmentAttempt(assessment, answers, session);

  const result: AssessmentResultDocument = {
    id: `result-${assessment.id}-${DEFAULT_STUDENT_ID}`,
    studentId: DEFAULT_STUDENT_ID,
    courseId,
    assessmentId: assessment.id,
    score: attempt.score,
    maxScore: attempt.maxScore,
    completedAt: attempt.completedAt,
    strengths: [
      "Integração de potência, atitude e energia",
      "Uso de VSI, altímetro e velocidade como confirmação de desempenho",
      "Antecipação do nivelamento e busca por estabilização"
    ],
    improvements: [
      "Evitar comandos bruscos durante transições",
      "Continuar praticando diagnósticos antes de corrigir efeitos",
      "Repetir o cenário variando vento, peso e razão de descida"
    ],
    unlockedCourseIds: attempt.unlockedCourseIds
  };

  writeAssessmentResult(result);
  unlockCourses(result.unlockedCourseIds);
  return result;
}

export function readAssessmentResult(courseId: string): AssessmentResultDocument | undefined {
  const latestAttempt = readLatestAssessmentAttempt(courseId);

  if (latestAttempt) {
    return {
      id: `result-${latestAttempt.assessmentId}-${latestAttempt.userId}`,
      studentId: latestAttempt.userId,
      courseId: latestAttempt.courseId,
      assessmentId: latestAttempt.assessmentId,
      score: latestAttempt.score,
      maxScore: latestAttempt.maxScore,
      completedAt: latestAttempt.completedAt,
      strengths:
        latestAttempt.weakConcepts.length === 0
          ? ["Raciocínio consistente nos conceitos avaliados", "Boa integração entre instrumentos e energia", "Critério suficiente para avançar"]
          : ["Registro de tentativa concluído", "Base de raciocínio pronta para revisão direcionada"],
      improvements:
        latestAttempt.weakConcepts.length > 0
          ? latestAttempt.weakConcepts.map((concept) => `Revisar: ${concept}`)
          : ["Repetir o cenário com vento e peso diferentes para consolidar"],
      unlockedCourseIds: latestAttempt.unlockedCourseIds
    };
  }

  if (typeof window === "undefined") {
    return undefined;
  }

  try {
    const values = JSON.parse(window.localStorage.getItem(RESULT_KEY) ?? "[]") as AssessmentResultDocument[];
    return values.find((result) => result.courseId === courseId);
  } catch {
    return undefined;
  }
}

function writeAssessmentResult(result: AssessmentResultDocument) {
  if (typeof window === "undefined") {
    return;
  }

  const values = JSON.parse(window.localStorage.getItem(RESULT_KEY) ?? "[]") as AssessmentResultDocument[];
  const nextValues = [...values.filter((item) => item.courseId !== result.courseId), result];
  window.localStorage.setItem(RESULT_KEY, JSON.stringify(nextValues));
}
