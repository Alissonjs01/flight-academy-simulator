export type PublicationState = "published" | "draft";

export type LearningLevel = "Inicial" | "Intermediário" | "Avançado";

export type LearningStatus = "not_started" | "in_progress" | "completed" | "locked";

export type LessonRuntimeStatus = "concluida" | "atual" | "bloqueada" | "disponivel";

export type ContentBlock = {
  id: string;
  type: "paragraph" | "callout" | "checklist";
  text?: string;
  items?: string[];
};

export type CourseDocument = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  imageIcon: string;
  level: LearningLevel;
  audience: string;
  referenceAircraft: string;
  language: string;
  disclaimer: string;
  estimatedDuration: string;
  progressPercent: number;
  moduleCount: number;
  status: LearningStatus;
  prerequisites: string[];
  updatedAt: string;
  order: number;
  publicationState: PublicationState;
};

export type ModuleDocument = {
  id: string;
  courseId: string;
  title: string;
  description: string;
  order: number;
  lessonIds: string[];
  duration: string;
  status: LearningStatus;
  progressPercent: number;
  prerequisites: string[];
  publicationState: PublicationState;
};

export type LessonDocument = {
  id: string;
  moduleId: string;
  title: string;
  slug: string;
  summary: string;
  introduction: string;
  didacticExplanation: string;
  example: string;
  commonMistake: string;
  simulatorApplication: string;
  exercisePrompt: string;
  expectedAnswer: string;
  conclusion: string;
  nextLessonConnection: string;
  content: ContentBlock[];
  order: number;
  estimatedDuration: string;
  objective: string;
  keyConcepts: string[];
  exerciseId: string;
  exerciseIds: string[];
  status: LearningStatus;
  actions: {
    canComplete: boolean;
    canContinue: boolean;
    canGoBack: boolean;
  };
  publicationState: PublicationState;
};

export type FinalAssessmentQuestion = {
  id: string;
  prompt: string;
  expectedKeywords: string[];
  weight: number;
  concept: string;
  moduleId: string;
};

export type FinalAssessmentDocument = {
  id: string;
  courseId: string;
  slug: string;
  title: string;
  scenario: string;
  instructions: string;
  questions: FinalAssessmentQuestion[];
  questionCount: number;
  passingScore: number;
  criteria: string;
  allowRetake: boolean;
  shuffleQuestions: boolean;
  timeLimitMinutes?: number;
  publicationState: PublicationState;
};

export type AssessmentResultDocument = {
  id: string;
  studentId: string;
  courseId: string;
  assessmentId: string;
  score: number;
  maxScore: number;
  completedAt: string;
  strengths: string[];
  improvements: string[];
  unlockedCourseIds: string[];
};

export type CertificateDocument = {
  id: string;
  studentId: string;
  courseId: string;
  title: string;
  issuedAt: string;
  disclaimer: string;
  symbolicOnly: boolean;
};

export type ExerciseType = "multiple_choice" | "true_false" | "open_answer";

export type ExerciseDifficulty = "facil" | "medio" | "dificil";

export type OpenAnswerSelfAssessment = "entendi" | "preciso_revisar" | "nao_entendi";

export type ExerciseDocument = {
  id: string;
  lessonId: string;
  moduleId: string;
  courseId: string;
  type: ExerciseType;
  prompt: string;
  alternatives?: string[];
  correctAnswer?: string | boolean;
  expectedAnswer: string;
  explanation: string;
  difficulty: ExerciseDifficulty;
  order: number;
  points: number;
  publicationState: PublicationState;
};

export type ExerciseAnswerValue = string | boolean;

export type ExerciseAttemptDocument = {
  id: string;
  userId: string;
  courseId: string;
  moduleId: string;
  lessonId: string;
  exerciseId: string;
  answer: ExerciseAnswerValue;
  isCorrect?: boolean;
  selfAssessment?: OpenAnswerSelfAssessment;
  personalNote?: string;
  score: number;
  maxScore: number;
  attemptNumber: number;
  createdAt: string;
  updatedAt: string;
};

export type ExerciseResultSummary = {
  totalExercises: number;
  completedExercises: number;
  correctCount: number;
  wrongCount: number;
  reviewCount: number;
  earnedPoints: number;
  totalPoints: number;
  completedExerciseIds: string[];
};

export type ReviewItemType = "lesson_review" | "wrong_question" | "open_answer_not_understood" | "low_score_concept";

export type ReviewItemStatus = "active" | "removed";

export type ReviewItemDocument = {
  id: string;
  userId: string;
  courseId: string;
  moduleId?: string;
  lessonId?: string;
  exerciseId?: string;
  assessmentAttemptId?: string;
  type: ReviewItemType;
  title: string;
  description: string;
  concept?: string;
  status: ReviewItemStatus;
  createdAt: string;
  resolvedAt?: string;
};

export type AssessmentAttemptDocument = {
  id: string;
  userId: string;
  courseId: string;
  assessmentId: string;
  questionIds: string[];
  answers: Record<string, string>;
  score: number;
  maxScore: number;
  percentage: number;
  passed: boolean;
  weakConcepts: string[];
  modulesToReview: string[];
  attemptNumber: number;
  startedAt: string;
  completedAt: string;
  durationSeconds?: number;
  unlockedCourseIds: string[];
};

export type CourseFilters = {
  query?: string;
  category?: string;
  level?: LearningLevel | "Todos";
  status?: LearningStatus | "Todos";
};

export type CourseStructure = {
  course: CourseDocument;
  modules: Array<ModuleDocument & { lessons: LessonDocument[] }>;
};

export type LessonContext = {
  course: CourseDocument;
  module: ModuleDocument;
  lesson: LessonDocument;
  exercise?: ExerciseDocument;
  exercises: ExerciseDocument[];
  previousLesson?: LessonDocument;
  nextLesson?: LessonDocument;
  orderedLessons: LessonDocument[];
};

export type AssessmentContext = {
  course: CourseDocument;
  assessment: FinalAssessmentDocument;
};
