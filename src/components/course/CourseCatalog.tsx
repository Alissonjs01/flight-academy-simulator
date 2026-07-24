"use client";

import { useEffect, useMemo, useState } from "react";
import type { CourseDocument, LearningLevel, LearningStatus } from "@/features/content/types";
import { learningStatusLabels } from "@/features/content/statusLabels";
import { readUnlockedCourseIds } from "@/services/progressService";
import { CourseCard } from "@/components/course/CourseCard";
import { EmptyState } from "@/components/ui/StateMessage";

type CourseCatalogProps = {
  courses: CourseDocument[];
};

const allOption = "Todos";

export function CourseCatalog({ courses }: CourseCatalogProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(allOption);
  const [level, setLevel] = useState<LearningLevel | typeof allOption>(allOption);
  const [status, setStatus] = useState<LearningStatus | typeof allOption>(allOption);
  const [unlockedCourseIds, setUnlockedCourseIds] = useState<string[]>([]);

  useEffect(() => {
    setUnlockedCourseIds(readUnlockedCourseIds());
  }, []);

  const displayCourses = useMemo(
    () =>
      courses.map((course) => ({
        ...course,
        status: course.status === "locked" && unlockedCourseIds.includes(course.id) ? ("not_started" as const) : course.status
      })),
    [courses, unlockedCourseIds]
  );

  const categories = useMemo(() => [allOption, ...Array.from(new Set(displayCourses.map((course) => course.category)))], [displayCourses]);
  const levels = useMemo(() => [allOption, ...Array.from(new Set(displayCourses.map((course) => course.level)))], [displayCourses]);
  const statuses = useMemo(() => [allOption, ...Array.from(new Set(displayCourses.map((course) => course.status)))], [displayCourses]);

  const filteredCourses = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("pt-BR");

    return displayCourses.filter((course) => {
      const text = [course.title, course.description, course.category, course.level].join(" ").toLocaleLowerCase("pt-BR");
      return (
        (!normalizedQuery || text.includes(normalizedQuery)) &&
        (category === allOption || course.category === category) &&
        (level === allOption || course.level === level) &&
        (status === allOption || course.status === status)
      );
    });
  }, [category, displayCourses, level, query, status]);

  return (
    <div className="space-y-5">
      <div className="grid gap-3 rounded-md border border-white/[0.08] bg-white/[0.028] p-4 md:grid-cols-[minmax(0,1fr)_12rem_12rem_12rem]">
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Busca</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar por curso, categoria ou descrição"
            className="focus-ring mt-2 h-11 w-full rounded-md border border-white/[0.08] bg-[#050c14]/80 px-3 text-sm text-white placeholder:text-slate-500"
          />
        </label>
        <SelectFilter label="Categoria" value={category} values={categories} onChange={setCategory} />
        <SelectFilter label="Nível" value={level} values={levels} onChange={(value) => setLevel(value as LearningLevel | typeof allOption)} />
        <SelectFilter label="Status" value={status} values={statuses} onChange={(value) => setStatus(value as LearningStatus | typeof allOption)} formatValue={formatStatus} />
      </div>

      {filteredCourses.length ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <EmptyState title="Nenhum curso encontrado" description="Ajuste os filtros ou limpe a busca para visualizar as trilhas disponíveis." />
      )}
    </div>
  );
}

type SelectFilterProps = {
  label: string;
  value: string;
  values: string[];
  onChange: (value: string) => void;
  formatValue?: (value: string) => string;
};

function SelectFilter({ label, value, values, onChange, formatValue = (item) => item }: SelectFilterProps) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="focus-ring mt-2 h-11 w-full rounded-md border border-white/[0.08] bg-[#050c14]/80 px-3 text-sm text-white"
      >
        {values.map((item) => (
          <option key={item} value={item}>
            {formatValue(item)}
          </option>
        ))}
      </select>
    </label>
  );
}

function formatStatus(status: string) {
  if (status === allOption) {
    return allOption;
  }

  return learningStatusLabels[status as LearningStatus] ?? status;
}
