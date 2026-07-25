import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { EmptyState } from "@/components/ui/StateMessage";
import { aircraft } from "@/data/mockAcademy";
import { listCourseStructures } from "@/services/courseService";

export default async function DashboardPage() {
  const structures = await listCourseStructures();

  if (!structures.length) {
    return <EmptyState title="Nenhum curso disponível" description="Cadastre um curso publicado para iniciar o dashboard do aluno." />;
  }

  return <DashboardContent studentName="Aluno" structures={structures} aircraft={aircraft[0]} />;
}
