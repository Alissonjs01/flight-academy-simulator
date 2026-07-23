import type { AcademyContentRepository } from "@/features/content/repositories/contentRepository";
import type { CourseDocument, CourseFilters, LearningStatus } from "@/features/content/types";
import {
  localCourseDocuments,
  localExerciseDocuments,
  localFinalAssessmentDocuments,
  localLessonDocuments,
  localModuleDocuments
} from "@/features/content/data/localContent";

function byOrder<T extends { order: number }>(items: T[]): T[] {
  return [...items].sort((a, b) => a.order - b.order);
}

function matchesText(course: CourseDocument, query?: string): boolean {
  if (!query?.trim()) {
    return true;
  }

  const normalizedQuery = query.trim().toLocaleLowerCase("pt-BR");
  const haystack = [course.title, course.description, course.category, course.level, course.status]
    .join(" ")
    .toLocaleLowerCase("pt-BR");

  return haystack.includes(normalizedQuery);
}

function matchesStatus(courseStatus: LearningStatus, filterStatus?: LearningStatus | "Todos"): boolean {
  return !filterStatus || filterStatus === "Todos" || courseStatus === filterStatus;
}

export const localContentRepository: AcademyContentRepository = {
  async listCourses(filters?: CourseFilters) {
    const courses = byOrder(localCourseDocuments).filter((course) => {
      const categoryMatches = !filters?.category || filters.category === "Todos" || course.category === filters.category;
      const levelMatches = !filters?.level || filters.level === "Todos" || course.level === filters.level;

      return categoryMatches && levelMatches && matchesStatus(course.status, filters?.status) && matchesText(course, filters?.query);
    });

    return courses;
  },

  async getCourseById(courseId) {
    return localCourseDocuments.find((course) => course.id === courseId);
  },

  async getCourseBySlug(slug) {
    return localCourseDocuments.find((course) => course.slug === slug);
  },

  async listModulesByCourseId(courseId) {
    return byOrder(localModuleDocuments.filter((module) => module.courseId === courseId));
  },

  async getModuleById(moduleId) {
    return localModuleDocuments.find((module) => module.id === moduleId);
  },

  async listLessonsByModuleId(moduleId) {
    return byOrder(localLessonDocuments.filter((lesson) => lesson.moduleId === moduleId));
  },

  async getLessonById(lessonId) {
    return localLessonDocuments.find((lesson) => lesson.id === lessonId);
  },

  async getLessonBySlug(slug) {
    return localLessonDocuments.find((lesson) => lesson.slug === slug);
  },

  async listLessonsByCourseId(courseId) {
    const modules = await this.listModulesByCourseId(courseId);
    const lessonGroups = await Promise.all(modules.map((module) => this.listLessonsByModuleId(module.id)));
    return lessonGroups.flat();
  },

  async getExerciseByLessonId(lessonId) {
    return localExerciseDocuments.find((exercise) => exercise.lessonId === lessonId);
  },

  async listExercisesByLessonId(lessonId) {
    return byOrder(localExerciseDocuments.filter((exercise) => exercise.lessonId === lessonId));
  },

  async getFinalAssessmentByCourseId(courseId) {
    return localFinalAssessmentDocuments.find((assessment) => assessment.courseId === courseId);
  },

  async getFinalAssessmentByCourseSlug(slug) {
    const course = await this.getCourseBySlug(slug);

    if (!course) {
      return undefined;
    }

    return this.getFinalAssessmentByCourseId(course.id);
  },

  async getCourseStructure(slug) {
    const course = await this.getCourseBySlug(slug);

    if (!course) {
      return undefined;
    }

    const modules = await this.listModulesByCourseId(course.id);
    const modulesWithLessons = await Promise.all(
      modules.map(async (module) => ({
        ...module,
        lessons: await this.listLessonsByModuleId(module.id)
      }))
    );

    return { course, modules: modulesWithLessons };
  },

  async getLessonContext(slug) {
    const lesson = await this.getLessonBySlug(slug);

    if (!lesson) {
      return undefined;
    }

    const courseModule = await this.getModuleById(lesson.moduleId);

    if (!courseModule) {
      return undefined;
    }

    const course = await this.getCourseById(courseModule.courseId);

    if (!course) {
      return undefined;
    }

    const orderedLessons = await this.listLessonsByCourseId(course.id);
    const lessonIndex = orderedLessons.findIndex((item) => item.id === lesson.id);

    return {
      course,
      module: courseModule,
      lesson,
      exercise: await this.getExerciseByLessonId(lesson.id),
      exercises: await this.listExercisesByLessonId(lesson.id),
      previousLesson: lessonIndex > 0 ? orderedLessons[lessonIndex - 1] : undefined,
      nextLesson: lessonIndex >= 0 ? orderedLessons[lessonIndex + 1] : undefined,
      orderedLessons
    };
  }
};
