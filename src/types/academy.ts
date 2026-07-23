import type { LucideIcon } from "lucide-react";

export type RouteItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export type Category = {
  slug: string;
  title: string;
  description: string;
};

export type Lesson = {
  slug: string;
  title: string;
  duration: string;
  status: "concluida" | "atual" | "bloqueada" | "disponivel";
  summary: string;
};

export type Module = {
  slug: string;
  title: string;
  progress: number;
  lessons: Lesson[];
};

export type Course = {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  level: string;
  progress: number;
  duration: string;
  currentLessonSlug: string;
  modules: Module[];
};

export type Aircraft = {
  slug: string;
  name: string;
  role: string;
  focus: string;
  status: string;
};

export type Avionic = {
  slug: string;
  name: string;
  platform: string;
  focus: string;
  status: string;
};

export type Checklist = {
  slug: string;
  title: string;
  aircraft: string;
  phase: string;
  items: string[];
};

export type TrainingMission = {
  slug: string;
  title: string;
  aircraft: string;
  category: string;
  duration: string;
  status: string;
};
