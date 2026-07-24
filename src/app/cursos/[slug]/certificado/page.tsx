import { notFound } from "next/navigation";
import { SymbolicCertificate } from "@/components/assessment/SymbolicCertificate";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getCourseStructure } from "@/services/courseService";

export default async function CourseCertificatePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const structure = await getCourseStructure(slug);

  if (!structure) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl">
      <SectionHeader eyebrow="Certificado" title="Certificado simbólico interno" description="Registro local de conclusão para uso dentro da plataforma de estudos." />
      <SymbolicCertificate course={structure.course} />
    </div>
  );
}
