import { notFound } from "next/navigation";
import { CourseDetail } from "@/components/course/CourseDetail";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { listCourseStructures } from "@/services/courseService";

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const structures = await listCourseStructures();
  const structure = structures.find((item) => item.course.slug === slug);

  if (!structure) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl">
      <SectionHeader eyebrow={structure.course.category} title={structure.course.title} description={structure.course.description} />
      <CourseDetail structure={structure} structures={structures} />
    </div>
  );
}
