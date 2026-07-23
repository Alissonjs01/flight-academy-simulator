import { SlidersHorizontal } from "lucide-react";
import { PlaceholderPage } from "@/components/placeholder/PlaceholderPage";
import { Panel } from "@/components/ui/Panel";
import { categories } from "@/data/mockAcademy";
import { listCourses } from "@/services/courseService";

export default async function AdminPage() {
  const courses = await listCourses();

  return (
    <PlaceholderPage
      eyebrow="Admin"
      title="Painel administrativo inicial"
      description="Estrutura visual para futuramente adicionar cursos, módulos, aulas, aeronaves, aviônicos e checklists."
      icon={SlidersHorizontal}
    >
      <div className="grid gap-4 xl:grid-cols-2">
        <Panel>
          <h3 className="font-semibold text-white">Conteúdo cadastrado</h3>
          <dl className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-md border border-white/10 bg-white/[0.035] p-4">
              <dt className="text-sm text-slate-500">Cursos</dt>
              <dd className="mt-1 text-2xl font-semibold text-white">{courses.length}</dd>
            </div>
            <div className="rounded-md border border-white/10 bg-white/[0.035] p-4">
              <dt className="text-sm text-slate-500">Categorias</dt>
              <dd className="mt-1 text-2xl font-semibold text-white">{categories.length}</dd>
            </div>
          </dl>
        </Panel>
        <Panel>
          <h3 className="font-semibold text-white">Próximos recursos do admin</h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li>Cadastro de cursos e módulos.</li>
            <li>Editor de aulas com validação.</li>
            <li>Publicação de checklists e exercícios.</li>
            <li>Controle de permissões com Firebase Authentication e Security Rules.</li>
          </ul>
        </Panel>
      </div>
    </PlaceholderPage>
  );
}
