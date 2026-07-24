import { notFound } from "next/navigation";
import { CourseDetail } from "@/components/course/CourseDetail";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getCourseStructure } from "@/services/courseService";

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const structure = await getCourseStructure(slug);

  if (!structure) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl">
      <SectionHeader eyebrow={structure.course.category} title={structure.course.title} description={structure.course.description} />
      <CourseDetail structure={structure} />
    </div>
  );
}
