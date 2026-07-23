import type {
  ExerciseAnswerValue,
  ExerciseAttemptDocument,
  ExerciseDocument,
  ExerciseResultSummary,
  OpenAnswerSelfAssessment,
  ReviewItemDocument,
  ReviewItemType
} from "@/features/content/types";
import { syncExerciseAttemptToFirestore, syncReviewItemToFirestore } from "@/services/firestorePrivateSyncService";

const ATTEMPTS_KEY = "flight-academy-simulator:exercise-attempts:v1";
const REVIEW_ITEMS_KEY = "flight-academy-simulator:review-items:v1";
const DEFAULT_USER_ID = "local-student";

type SubmitExerciseInput = {
  exercise: ExerciseDocument;
  answer: ExerciseAnswerValue;
  selfAssessment?: OpenAnswerSelfAssessment;
  personalNote?: string;
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

export function readExerciseAttempts(): ExerciseAttemptDocument[] {
  return safeRead<ExerciseAttemptDocument[]>(ATTEMPTS_KEY, []);
}

export function readExerciseAttemptsByLesson(lessonId: string) {
  return readExerciseAttempts().filter((attempt) => attempt.lessonId === lessonId);
}

export function readLatestAttemptByExercise(exerciseId: string) {
  return [...readExerciseAttempts()]
    .filter((attempt) => attempt.exerciseId === exerciseId)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))[0];
}

export function submitExerciseAttempt({ exercise, answer, selfAssessment, personalNote }: SubmitExerciseInput) {
  const attempts = readExerciseAttempts();
  const attemptNumber = attempts.filter((attempt) => attempt.exerciseId === exercise.id).length + 1;
  const evaluated = evaluateExerciseAnswer(exercise, answer, selfAssessment);
  const timestamp = nowIso();

  const attempt: ExerciseAttemptDocument = {
    id: `attempt-${exercise.id}-${DEFAULT_USER_ID}-${timestamp}`,
    userId: DEFAULT_USER_ID,
    courseId: exercise.courseId,
    moduleId: exercise.moduleId,
    lessonId: exercise.lessonId,
    exerciseId: exercise.id,
    answer,
    isCorrect: evaluated.isCorrect,
    selfAssessment,
    personalNote,
    score: evaluated.score,
    maxScore: exercise.points,
    attemptNumber,
    createdAt: timestamp,
    updatedAt: timestamp
  };

  write(ATTEMPTS_KEY, [...attempts, attempt]);
  syncExerciseAttemptToFirestore(attempt);
  syncReviewItem(exercise, attempt);
  return attempt;
}

export function summarizeLessonExercises(exercises: ExerciseDocument[]): ExerciseResultSummary {
  const latestAttempts = exercises.map((exercise) => readLatestAttemptByExercise(exercise.id)).filter((attempt): attempt is ExerciseAttemptDocument => Boolean(attempt));
  const completedExerciseIds = latestAttempts.map((attempt) => attempt.exerciseId);
  const reviewExerciseIds = new Set(readActiveReviewItems().filter((item) => item.exerciseId).map((item) => item.exerciseId));

  return {
    totalExercises: exercises.length,
    completedExercises: completedExerciseIds.length,
    correctCount: latestAttempts.filter((attempt) => attempt.isCorrect).length,
    wrongCount: latestAttempts.filter((attempt) => attempt.isCorrect === false).length,
    reviewCount: exercises.filter((exercise) => reviewExerciseIds.has(exercise.id)).length,
    earnedPoints: latestAttempts.reduce((sum, attempt) => sum + attempt.score, 0),
    totalPoints: exercises.reduce((sum, exercise) => sum + exercise.points, 0),
    completedExerciseIds
  };
}

export function readReviewItems(): ReviewItemDocument[] {
  return safeRead<ReviewItemDocument[]>(REVIEW_ITEMS_KEY, []);
}

export function readActiveReviewItems() {
  return readReviewItems().filter((item) => item.status === "active");
}

export function removeReviewItem(reviewItemId: string) {
  const timestamp = nowIso();
  const nextItems = readReviewItems().map((item) =>
    item.id === reviewItemId ? { ...item, status: "removed" as const, resolvedAt: timestamp } : item
  );
  write(REVIEW_ITEMS_KEY, nextItems);
}

function evaluateExerciseAnswer(exercise: ExerciseDocument, answer: ExerciseAnswerValue, selfAssessment?: OpenAnswerSelfAssessment) {
  if (exercise.type === "open_answer") {
    const scoreBySelfAssessment: Record<OpenAnswerSelfAssessment, number> = {
      entendi: exercise.points,
      preciso_revisar: Math.round(exercise.points * 0.5),
      nao_entendi: 0
    };

    return {
      isCorrect: selfAssessment ? selfAssessment === "entendi" : undefined,
      score: selfAssessment ? scoreBySelfAssessment[selfAssessment] : 0
    };
  }

  const expected = exercise.correctAnswer;
  const isCorrect = typeof expected === "boolean" ? answer === expected : String(answer).trim() === String(expected ?? "").trim();

  return {
    isCorrect,
    score: isCorrect ? exercise.points : 0
  };
}

function syncReviewItem(exercise: ExerciseDocument, attempt: ExerciseAttemptDocument) {
  const currentItems = readReviewItems();
  const activeItemId = `review-${DEFAULT_USER_ID}-${exercise.id}`;
  const shouldReview = shouldCreateReviewItem(exercise, attempt);

  if (!shouldReview) {
    write(
      REVIEW_ITEMS_KEY,
      currentItems.map((item) => (item.id === activeItemId ? { ...item, status: "removed" as const, resolvedAt: nowIso() } : item))
    );
    return;
  }

  const reviewItem: ReviewItemDocument = {
    id: activeItemId,
    userId: DEFAULT_USER_ID,
    courseId: exercise.courseId,
    moduleId: exercise.moduleId,
    lessonId: exercise.lessonId,
    exerciseId: exercise.id,
    type: getReviewType(exercise, attempt),
    title: getReviewTitle(exercise, attempt),
    description: exercise.prompt,
    concept: exercise.expectedAnswer,
    status: "active",
    createdAt: nowIso()
  };

  write(REVIEW_ITEMS_KEY, [...currentItems.filter((item) => item.id !== reviewItem.id), reviewItem]);
  syncReviewItemToFirestore(reviewItem);
}

function shouldCreateReviewItem(exercise: ExerciseDocument, attempt: ExerciseAttemptDocument) {
  if (exercise.type === "open_answer") {
    return attempt.selfAssessment === "preciso_revisar" || attempt.selfAssessment === "nao_entendi";
  }

  return attempt.isCorrect === false;
}

function getReviewType(exercise: ExerciseDocument, attempt: ExerciseAttemptDocument): ReviewItemType {
  if (exercise.type === "open_answer" && attempt.selfAssessment === "nao_entendi") {
    return "open_answer_not_understood";
  }

  if (exercise.type === "open_answer") {
    return "lesson_review";
  }

  return "wrong_question";
}

function getReviewTitle(exercise: ExerciseDocument, attempt: ExerciseAttemptDocument) {
  if (exercise.type === "open_answer" && attempt.selfAssessment === "nao_entendi") {
    return "Resposta aberta marcada como não compreendida";
  }

  if (exercise.type === "open_answer") {
    return "Aula marcada para revisar";
  }

  return "Pergunta errada";
}
