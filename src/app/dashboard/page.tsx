import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { EmptyState } from "@/components/ui/StateMessage";
import { aircraft } from "@/data/mockAcademy";
import { getCourseStructure, listCourses } from "@/services/courseService";

export default async function DashboardPage() {
  const courses = await listCourses();
  const currentCourse = courses[0];
  const structure = currentCourse ? await getCourseStructure(currentCourse.slug) : undefined;

  if (!structure) {
    return <EmptyState title="Nenhum curso disponível" description="Cadastre um curso publicado para iniciar o dashboard do aluno." />;
  }

  return <DashboardContent studentName="Aluno" structure={structure} aircraft={aircraft[0]} />;
}
