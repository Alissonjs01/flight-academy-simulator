import { notFound } from "next/navigation";
import { AssessmentRunner } from "@/components/assessment/AssessmentRunner";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getFinalAssessmentByCourseSlug } from "@/services/assessmentService";
import { getCourseStructure } from "@/services/courseService";

export default async function CourseAssessmentPage({ params }: { params: { slug: string } }) {
  const structure = await getCourseStructure(params.slug);
  const assessment = await getFinalAssessmentByCourseSlug(params.slug);

  if (!structure || !assessment) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl">
      <SectionHeader eyebrow="Avaliação final" title={assessment.title} description="Resposta descritiva para consolidar o raciocínio de pilotagem no simulador." />
      <AssessmentRunner course={structure.course} assessment={assessment} />
    </div>
  );
}
