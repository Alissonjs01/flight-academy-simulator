import { notFound } from "next/navigation";
import { CourseCompletion } from "@/components/course/CourseCompletion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getCourseStructure } from "@/services/courseService";

export default async function CourseConclusionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const structure = await getCourseStructure(slug);

  if (!structure) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl">
      <SectionHeader eyebrow="Conclusão" title={structure.course.title} description="Revise seu progresso e finalize o curso no seu ritmo." />
      <CourseCompletion structure={structure} />
    </div>
  );
}
