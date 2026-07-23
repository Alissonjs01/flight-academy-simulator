import type { AssessmentAttemptDocument, FinalAssessmentDocument, FinalAssessmentQuestion, ReviewItemDocument } from "@/features/content/types";
import { unlockCourses } from "@/services/progressService";
import { readReviewItems } from "@/services/exerciseAttemptService";
import { syncAssessmentAttemptToFirestore, syncReviewItemToFirestore } from "@/services/firestorePrivateSyncService";

const ASSESSMENT_ATTEMPTS_KEY = "flight-academy-simulator:assessment-attempts:v1";
const REVIEW_ITEMS_KEY = "flight-academy-simulator:review-items:v1";
const DEFAULT_USER_ID = "local-student";

type AssessmentSession = {
  questionIds: string[];
  startedAt: string;
};

function nowIso() {
  return new Date().toISOString();
}

function safeRead<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    return JSON.parse(window.localStorage.getItem(key) ?? JSON.stringify(fallback)) as T;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}

export function startAssessmentSession(assessment: FinalAssessmentDocument): AssessmentSession {
  const questionIds = assessment.shuffleQuestions
    ? shuffleQuestions(assessment.questions).map((question) => question.id)
    : assessment.questions.map((question) => question.id);

  return {
    questionIds: questionIds.slice(0, Math.min(assessment.questionCount, questionIds.length)),
    startedAt: nowIso()
  };
}

export function submitAssessmentAttempt(
  assessment: FinalAssessmentDocument,
  answers: Record<string, string>,
  session: AssessmentSession
): AssessmentAttemptDocument {
  const selectedQuestions = assessment.questions.filter((question) => session.questionIds.includes(question.id));
  const maxScore = selectedQuestions.reduce((sum, question) => sum + question.weight, 0);
  const questionScores = selectedQuestions.map((question) => scoreQuestion(question, answers[question.id] ?? ""));
  const score = questionScores.reduce((sum, item) => sum + item.score, 0);
  const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
  const weakConcepts = questionScores.filter((item) => item.ratio < 0.6).map((item) => item.question.concept);
  const modulesToReview = Array.from(new Set(questionScores.filter((item) => item.ratio < 0.6).map((item) => item.question.moduleId)));
  const completedAt = nowIso();
  const previousAttempts = readAssessmentAttemptsByCourse(assessment.courseId);

  const attempt: AssessmentAttemptDocument = {
    id: `assessment-attempt-${assessment.id}-${DEFAULT_USER_ID}-${completedAt}`,
    userId: DEFAULT_USER_ID,
    courseId: assessment.courseId,
    assessmentId: assessment.id,
    questionIds: session.questionIds,
    answers,
    score,
    maxScore,
    percentage,
    passed: percentage >= assessment.passingScore,
    weakConcepts,
    modulesToReview,
    attemptNumber: previousAttempts.length + 1,
    startedAt: session.startedAt,
    completedAt,
    durationSeconds: Math.max(1, Math.round((new Date(completedAt).getTime() - new Date(session.startedAt).getTime()) / 1000)),
    unlockedCourseIds: percentage >= assessment.passingScore ? ["course-garmin-g1000-nxi"] : []
  };

  const allAttempts = readAssessmentAttempts();
  write(ASSESSMENT_ATTEMPTS_KEY, [...allAttempts, attempt]);
  syncAssessmentAttemptToFirestore(attempt);
  unlockCourses(attempt.unlockedCourseIds);
  syncAssessmentReviewItems(attempt, questionScores);
  return attempt;
}

export function readAssessmentAttempts(): AssessmentAttemptDocument[] {
  return safeRead<AssessmentAttemptDocument[]>(ASSESSMENT_ATTEMPTS_KEY, []);
}

export function readAssessmentAttemptsByCourse(courseId: string) {
  return readAssessmentAttempts()
    .filter((attempt) => attempt.courseId === courseId)
    .sort((a, b) => b.completedAt.localeCompare(a.completedAt));
}

export function readLatestAssessmentAttempt(courseId: string) {
  return readAssessmentAttemptsByCourse(courseId)[0];
}

function scoreQuestion(question: FinalAssessmentQuestion, answer: string) {
  const normalizedAnswer = answer.toLocaleLowerCase("pt-BR");
  const matchedKeywords = question.expectedKeywords.filter((keyword) => normalizedAnswer.includes(keyword.toLocaleLowerCase("pt-BR")));
  const ratio = question.expectedKeywords.length > 0 ? matchedKeywords.length / question.expectedKeywords.length : 0;

  return {
    question,
    ratio,
    score: Math.round(question.weight * Math.min(1, ratio))
  };
}

function shuffleQuestions(questions: FinalAssessmentQuestion[]) {
  return [...questions].sort(() => Math.random() - 0.5);
}

function syncAssessmentReviewItems(
  attempt: AssessmentAttemptDocument,
  scores: Array<{ question: FinalAssessmentQuestion; ratio: number; score: number }>
) {
  const currentItems = readReviewItems();
  const lowScoreItems = scores
    .filter((item) => item.ratio < 0.6)
    .map<ReviewItemDocument>((item) => ({
      id: `review-${DEFAULT_USER_ID}-${attempt.id}-${item.question.id}`,
      userId: DEFAULT_USER_ID,
      courseId: attempt.courseId,
      moduleId: item.question.moduleId,
      assessmentAttemptId: attempt.id,
      type: "low_score_concept",
      title: "Conceito com baixa pontuação",
      description: item.question.prompt,
      concept: item.question.concept,
      status: "active",
      createdAt: nowIso()
    }));

  write(REVIEW_ITEMS_KEY, [...currentItems, ...lowScoreItems]);
  lowScoreItems.forEach(syncReviewItemToFirestore);
}
