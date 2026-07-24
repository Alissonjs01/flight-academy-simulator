import Link from "next/link";
import { notFound } from "next/navigation";
import { Panel } from "@/components/ui/Panel";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getCourseStructure } from "@/services/courseService";

export default async function CourseResultPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const structure = await getCourseStructure(slug);

  if (!structure) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl">
      <SectionHeader eyebrow="Resumo pausado" title={structure.course.title} description="Os resultados avaliativos foram removidos temporariamente da experiência do aluno." />
      <Panel className="max-w-3xl">
        <h2 className="text-xl font-semibold text-white">Use o progresso das aulas como referência principal</h2>
        <p className="mt-3 text-sm leading-7 text-slate-400">
          O estudo segue normalmente pelas aulas, módulos e práticas no simulador. A área de resultados poderá voltar quando essa etapa estiver revisada.
        </p>
        <Link href={`/cursos/${structure.course.slug}`} className="focus-ring mt-5 inline-flex rounded-md bg-aviation-cyan px-4 py-2 text-sm font-semibold text-aviation-ink">
          Voltar ao curso
        </Link>
      </Panel>
    </div>
  );
}
