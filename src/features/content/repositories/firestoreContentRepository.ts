import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { getFirebaseConfigStatus } from "@/lib/firebase/config";
import { getFirebaseDb } from "@/lib/firebase/client";
import type { AcademyContentRepository } from "@/features/content/repositories/contentRepository";
import type { CourseDocument, CourseFilters, ExerciseDocument, FinalAssessmentDocument, LessonDocument, ModuleDocument } from "@/features/content/types";

function byOrder<T extends { order: number }>(items: T[]) {
  return [...items].sort((a, b) => a.order - b.order);
}

async function listCollection<T extends { id: string }>(collectionName: string) {
  const snapshot = await getDocs(collection(getFirebaseDb(), collectionName));
  return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }) as T);
}

async function firstByField<T extends { id: string }>(collectionName: string, field: string, value: string) {
  const snapshot = await getDocs(query(collection(getFirebaseDb(), collectionName), where(field, "==", value), limit(1)));
  const item = snapshot.docs[0];
  return item ? ({ id: item.id, ...item.data() } as T) : undefined;
}

function matchesCourseFilters(course: CourseDocument, filters?: CourseFilters) {
  const normalizedQuery = filters?.query?.trim().toLocaleLowerCase("pt-BR") ?? "";
  const haystack = [course.title, course.description, course.category, course.level, course.status].join(" ").toLocaleLowerCase("pt-BR");

  return (
    (!normalizedQuery || haystack.includes(normalizedQuery)) &&
    (!filters?.category || filters.category === "Todos" || course.category === filters.category) &&
    (!filters?.level || filters.level === "Todos" || course.level === filters.level) &&
    (!filters?.status || filters.status === "Todos" || course.status === filters.status)
  );
}

export const firestoreContentRepository: AcademyContentRepository = {
  async listCourses(filters) {
    const snapshot = await getDocs(query(collection(getFirebaseDb(), "courses"), orderBy("order", "asc")));
    return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }) as CourseDocument).filter((course) => matchesCourseFilters(course, filters));
  },

  async getCourseById(courseId) {
    return firstByField<CourseDocument>("courses", "id", courseId);
  },

  async getCourseBySlug(slug) {
    return firstByField<CourseDocument>("courses", "slug", slug);
  },

  async listModulesByCourseId(courseId) {
    const snapshot = await getDocs(query(collection(getFirebaseDb(), "modules"), where("courseId", "==", courseId), orderBy("order", "asc")));
    return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }) as ModuleDocument);
  },

  async getModuleById(moduleId) {
    return firstByField<ModuleDocument>("modules", "id", moduleId);
  },

  async listLessonsByModuleId(moduleId) {
    const snapshot = await getDocs(query(collection(getFirebaseDb(), "lessons"), where("moduleId", "==", moduleId), orderBy("order", "asc")));
    return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }) as LessonDocument);
  },

  async listLessonsByCourseId(courseId) {
    const modules = await this.listModulesByCourseId(courseId);
    const lessonsByModule = await Promise.all(modules.map((module) => this.listLessonsByModuleId(module.id)));
    return lessonsByModule.flat();
  },

  async getLessonById(lessonId) {
    return firstByField<LessonDocument>("lessons", "id", lessonId);
  },

  async getLessonBySlug(slug) {
    return firstByField<LessonDocument>("lessons", "slug", slug);
  },

  async getExerciseByLessonId(lessonId) {
    return (await this.listExercisesByLessonId(lessonId))[0];
  },

  async listExercisesByLessonId(lessonId) {
    const snapshot = await getDocs(query(collection(getFirebaseDb(), "exercises"), where("lessonId", "==", lessonId), orderBy("order", "asc")));
    return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }) as ExerciseDocument);
  },

  async getFinalAssessmentByCourseId(courseId) {
    return firstByField<FinalAssessmentDocument>("assessments", "courseId", courseId);
  },

  async getFinalAssessmentByCourseSlug(slug) {
    const course = await this.getCourseBySlug(slug);
    return course ? this.getFinalAssessmentByCourseId(course.id) : undefined;
  },

  async getCourseStructure(slug) {
    const course = await this.getCourseBySlug(slug);

    if (!course) {
      return undefined;
    }

    const modules = await this.listModulesByCourseId(course.id);
    const modulesWithLessons = await Promise.all(modules.map(async (module) => ({ ...module, lessons: await this.listLessonsByModuleId(module.id) })));
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

    const courses = await listCollection<CourseDocument>("courses");
    const course = courses.find((item) => item.id === courseModule.courseId);

    if (!course) {
      return undefined;
    }

    const orderedLessons = byOrder(await this.listLessonsByCourseId(course.id));
    const lessonIndex = orderedLessons.findIndex((item) => item.id === lesson.id);
    const exercises = await this.listExercisesByLessonId(lesson.id);

    return {
      course,
      module: courseModule,
      lesson,
      exercise: exercises[0],
      exercises,
      previousLesson: orderedLessons[lessonIndex - 1],
      nextLesson: orderedLessons[lessonIndex + 1],
      orderedLessons
    };
  }
};

export function shouldUseFirestoreContent() {
  const status = getFirebaseConfigStatus();
  return status.isConfigured && status.useFirestoreContent;
}
