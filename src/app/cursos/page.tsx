import { CourseCatalog } from "@/components/course/CourseCatalog";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { listCourseStructures } from "@/services/courseService";

export default async function CoursesPage() {
  const structures = await listCourseStructures();
  const courses = structures.map((structure) => structure.course);

  return (
    <div className="mx-auto max-w-7xl">
      <SectionHeader
        eyebrow="Cursos"
        title="Trilhas de aprendizagem"
        description="Comece pelos fundamentos da pilotagem e avance para Garmin G1000 NXi, navegação e IFR."
      />
      <CourseCatalog courses={courses} structures={structures} />
    </div>
  );
}
