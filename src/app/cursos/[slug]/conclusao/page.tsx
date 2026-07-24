import { notFound } from "next/navigation";
import { CourseCompletion } from "@/components/course/CourseCompletion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getFinalAssessmentByCourseSlug } from "@/services/assessmentService";
import { getCourseStructure } from "@/services/courseService";

export default async function CourseConclusionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const structure = await getCourseStructure(slug);

  if (!structure) {
    notFound();
  }

  const assessment = await getFinalAssessmentByCourseSlug(slug);

  return (
    <div className="mx-auto max-w-7xl">
      <SectionHeader eyebrow="Conclusão" title={structure.course.title} description="Revise seu progresso e inicie a avaliação final do curso." />
      <CourseCompletion structure={structure} assessment={assessment} />
    </div>
  );
}
