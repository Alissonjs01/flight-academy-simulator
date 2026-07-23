import { notFound } from "next/navigation";
import { AssessmentResultView } from "@/components/assessment/AssessmentResultView";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getFinalAssessmentByCourseSlug } from "@/services/assessmentService";
import { getCourseStructure } from "@/services/courseService";

export default async function CourseResultPage({ params }: { params: { slug: string } }) {
  const structure = await getCourseStructure(params.slug);
  const assessment = await getFinalAssessmentByCourseSlug(params.slug);

  if (!structure || !assessment) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl">
      <SectionHeader eyebrow="Resultado" title={structure.course.title} description="Resumo de desempenho da avaliação final e próximos passos." />
      <AssessmentResultView course={structure.course} assessment={assessment} />
    </div>
  );
}
