import type {
  CourseDocument,
  CourseFilters,
  CourseStructure,
  ExerciseDocument,
  FinalAssessmentDocument,
  LessonContext,
  LessonDocument,
  ModuleDocument
} from "@/features/content/types";

export type CourseRepository = {
  listCourses(filters?: CourseFilters): Promise<CourseDocument[]>;
  getCourseById(courseId: string): Promise<CourseDocument | undefined>;
  getCourseBySlug(slug: string): Promise<CourseDocument | undefined>;
};

export type ModuleRepository = {
  listModulesByCourseId(courseId: string): Promise<ModuleDocument[]>;
  getModuleById(moduleId: string): Promise<ModuleDocument | undefined>;
};

export type LessonRepository = {
  listLessonsByModuleId(moduleId: string): Promise<LessonDocument[]>;
  getLessonById(lessonId: string): Promise<LessonDocument | undefined>;
  getLessonBySlug(slug: string): Promise<LessonDocument | undefined>;
  listLessonsByCourseId(courseId: string): Promise<LessonDocument[]>;
};

export type ExerciseRepository = {
  getExerciseByLessonId(lessonId: string): Promise<ExerciseDocument | undefined>;
  listExercisesByLessonId(lessonId: string): Promise<ExerciseDocument[]>;
};

export type AssessmentRepository = {
  getFinalAssessmentByCourseId(courseId: string): Promise<FinalAssessmentDocument | undefined>;
  getFinalAssessmentByCourseSlug(slug: string): Promise<FinalAssessmentDocument | undefined>;
};

export type AcademyContentRepository = CourseRepository &
  ModuleRepository &
  LessonRepository &
  ExerciseRepository & {
    getFinalAssessmentByCourseId(courseId: string): Promise<FinalAssessmentDocument | undefined>;
    getFinalAssessmentByCourseSlug(slug: string): Promise<FinalAssessmentDocument | undefined>;
    getCourseStructure(slug: string): Promise<CourseStructure | undefined>;
    getLessonContext(slug: string): Promise<LessonContext | undefined>;
  };
