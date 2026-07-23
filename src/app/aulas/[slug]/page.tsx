import { notFound } from "next/navigation";
import { LessonStudy } from "@/components/lesson/LessonStudy";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getLessonContext } from "@/services/lessonService";

export default async function LessonPage({ params }: { params: { slug: string } }) {
  const context = await getLessonContext(params.slug);

  if (!context) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl">
      <SectionHeader eyebrow={context.course.title} title={context.lesson.title} description={context.lesson.summary} />
      <LessonStudy context={context} />
    </div>
  );
}
