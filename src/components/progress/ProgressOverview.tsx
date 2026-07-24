"use client";

import { useEffect, useMemo, useState } from "react";
import type { CourseStructure } from "@/features/content/types";
import type { StudentProgressDocument } from "@/features/progress/types";
import { calculateCourseProgress, calculateModuleProgress, readLocalProgress } from "@/services/progressService";
import { Panel } from "@/components/ui/Panel";
import { ProgressBar } from "@/components/ui/ProgressBar";

export function ProgressOverview({ structures }: { structures: CourseStructure[] }) {
  const allLessons = useMemo(() => structures.flatMap((structure) => structure.modules.flatMap((module) => module.lessons)), [structures]);
  const [progress, setProgress] = useState<StudentProgressDocument>(() => readLocalProgress(allLessons));

  useEffect(() => {
    setProgress(readLocalProgress(allLessons));
  }, [allLessons]);

  return (
    <Panel className="bg-white/[0.028]">
      <div className="space-y-6">
        {structures.map((structure) => {
          const lessons = structure.modules.flatMap((module) => module.lessons);
          const summary = calculateCourseProgress(lessons, progress);

          return (
            <div key={structure.course.id} className="rounded-md border border-white/[0.08] bg-white/[0.025] p-4">
              <ProgressBar value={summary.coursePercent} label={structure.course.title} />
              <div className="mt-4 space-y-3">
                {structure.modules.length ? (
                  structure.modules.map((module) => (
                    <ProgressBar key={module.id} value={calculateModuleProgress(module, allLessons, progress)} label={module.title} />
                  ))
                ) : (
                  <p className="text-sm text-slate-400">Nenhum módulo cadastrado para este curso.</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Panel>
  );
}
