import Link from "next/link";
import { notFound } from "next/navigation";
import { Panel } from "@/components/ui/Panel";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getCourseStructure } from "@/services/courseService";

export default async function CourseAssessmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const structure = await getCourseStructure(slug);

  if (!structure) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl">
      <SectionHeader eyebrow="Atividade pausada" title={structure.course.title} description="Esta etapa foi removida temporariamente da experiência de estudo." />
      <Panel className="max-w-3xl">
        <h2 className="text-xl font-semibold text-white">Continue estudando pelo conteúdo das aulas</h2>
        <p className="mt-3 text-sm leading-7 text-slate-400">
          A plataforma vai manter o foco no material de estudo, progresso e prática no simulador. Essa etapa poderá voltar futuramente, quando estiver revisada e alinhada ao conteúdo.
        </p>
        <Link href={`/cursos/${structure.course.slug}`} className="focus-ring mt-5 inline-flex rounded-md bg-aviation-cyan px-4 py-2 text-sm font-semibold text-aviation-ink">
          Voltar ao curso
        </Link>
      </Panel>
    </div>
  );
}
