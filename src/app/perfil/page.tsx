import { ProfilePage } from "@/components/profile/ProfilePage";
import { EmptyState } from "@/components/ui/StateMessage";
import { listCourseStructures } from "@/services/courseService";

export default async function ProfileRoutePage() {
  const structures = await listCourseStructures();

  if (!structures.length) {
    return <EmptyState title="Perfil indisponível" description="Cadastre ao menos um curso publicado para calcular a evolução do aluno." />;
  }

  return <ProfilePage structures={structures} />;
}
