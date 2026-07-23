import { TrendingUp } from "lucide-react";
import { PlaceholderPage } from "@/components/placeholder/PlaceholderPage";
import { ProgressOverview } from "@/components/progress/ProgressOverview";
import type { CourseStructure } from "@/features/content/types";
import { getCourseStructure, listCourses } from "@/services/courseService";

export default async function ProgressPage() {
  const courses = await listCourses();
  const structures = (await Promise.all(courses.map((course) => getCourseStructure(course.slug)))).filter(
    (structure): structure is CourseStructure => Boolean(structure)
  );

  return (
    <PlaceholderPage
      eyebrow="Progresso"
      title="Evolução do aluno"
      description="Resumo local demonstrativo. Futuramente será alimentado por Firebase Authentication e Cloud Firestore."
      icon={TrendingUp}
    >
      <ProgressOverview structures={structures} />
    </PlaceholderPage>
  );
}
