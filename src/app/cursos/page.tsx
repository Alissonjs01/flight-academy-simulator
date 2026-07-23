import { CourseCatalog } from "@/components/course/CourseCatalog";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { listCourses } from "@/services/courseService";

export default async function CoursesPage() {
  const courses = await listCourses();

  return (
    <div className="mx-auto max-w-7xl">
      <SectionHeader
        eyebrow="Cursos"
        title="Trilhas de aprendizagem"
        description="Comece pelos fundamentos da pilotagem e avance para Garmin G1000 NXi, navegação e IFR."
      />
      <CourseCatalog courses={courses} />
    </div>
  );
}
