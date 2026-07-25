import { notFound } from "next/navigation";
import { LessonStudy } from "@/components/lesson/LessonStudy";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { listCourseStructures } from "@/services/courseService";
import { getLessonContext } from "@/services/lessonService";

export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const context = await getLessonContext(slug);
  const structures = await listCourseStructures();

  if (!context) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl">
      <SectionHeader eyebrow={context.course.title} title={context.lesson.title} description={context.lesson.summary} />
      <LessonStudy context={context} structures={structures} />
    </div>
  );
}
