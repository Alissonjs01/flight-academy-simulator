export type StudentProgressDocument = {
  id: string;
  studentId: string;
  completedLessonIds: string[];
  currentLessonId?: string;
  lastLessonId?: string;
  updatedAt: string;
};

export type LessonProgressState = {
  lessonId: string;
  status: "concluida" | "atual" | "bloqueada" | "disponivel";
  isUnlocked: boolean;
};

export type ProgressSummary = {
  coursePercent: number;
  completedLessons: number;
  totalLessons: number;
  currentLessonId?: string;
  lastLessonId?: string;
};
