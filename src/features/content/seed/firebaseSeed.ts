import {
  localCourseDocuments,
  localExerciseDocuments,
  localFinalAssessmentDocuments,
  localLessonDocuments,
  localModuleDocuments
} from "@/features/content/data/localContent";
import {
  localAircraftAvionicDocuments,
  localAircraftChecklistDocuments,
  localAircraftCourseRelations,
  localAircraftDocuments,
  localAircraftLimitationDocuments,
  localAircraftProcedureDocuments,
  localAircraftSystemDocuments,
  localAircraftTrainingDocuments
} from "@/features/aircraft/data/localAircraft";
import {
  localAvionicComponentDocuments,
  localAvionicCourseRelations,
  localAvionicDocuments,
  localAvionicProcedureDocuments,
  localAvionicSectionDocuments,
  localAvionicTrainingDocuments
} from "@/features/avionics/data/localAvionics";
import { localChecklistDocuments } from "@/features/checklists/data/localChecklists";
import { localTrainingDocuments } from "@/features/trainings/data/localTrainings";

export function buildFirebaseSeedPayload() {
  return {
    collections: {
      courses: localCourseDocuments,
      modules: localModuleDocuments,
      lessons: localLessonDocuments,
      exercises: localExerciseDocuments,
      assessments: localFinalAssessmentDocuments,
      aircraft: localAircraftDocuments,
      aircraftSystems: localAircraftSystemDocuments,
      aircraftLimitations: localAircraftLimitationDocuments,
      aircraftProcedures: localAircraftProcedureDocuments,
      aircraftChecklists: localAircraftChecklistDocuments,
      aircraftTrainings: localAircraftTrainingDocuments,
      aircraftCourseRelations: localAircraftCourseRelations,
      aircraftAvionics: localAircraftAvionicDocuments,
      avionics: localAvionicDocuments,
      avionicsSections: localAvionicSectionDocuments,
      avionicsComponents: localAvionicComponentDocuments,
      avionicsProcedures: localAvionicProcedureDocuments,
      avionicsTrainings: localAvionicTrainingDocuments,
      avionicsCourses: localAvionicCourseRelations,
      checklists: localChecklistDocuments,
      checklistItems: localChecklistDocuments.flatMap((checklist) => checklist.items),
      trainings: localTrainingDocuments
    },
    firestorePaths: localCourseDocuments.map((course) => ({
      coursePath: `courses/${course.id}`,
      modulePaths: localModuleDocuments
        .filter((module) => module.courseId === course.id)
        .map((module) => ({
          modulePath: `courses/${course.id}/modules/${module.id}`,
          lessonPaths: localLessonDocuments
            .filter((lesson) => lesson.moduleId === module.id)
            .map((lesson) => ({
              lessonPath: `courses/${course.id}/modules/${module.id}/lessons/${lesson.id}`,
              exercisePaths: localExerciseDocuments
                .filter((exercise) => exercise.lessonId === lesson.id)
                .map((exercise) => `courses/${course.id}/modules/${module.id}/lessons/${lesson.id}/exercises/${exercise.id}`)
            }))
        })),
      assessmentPaths: localFinalAssessmentDocuments
        .filter((assessment) => assessment.courseId === course.id)
        .map((assessment) => `courses/${course.id}/assessments/${assessment.id}`)
    })),
    aircraftFirestorePaths: localAircraftDocuments.map((aircraft) => ({
      aircraftPath: `aircraft/${aircraft.id}`,
      systemPaths: localAircraftSystemDocuments.filter((system) => system.aircraftId === aircraft.id).map((system) => `aircraft/${aircraft.id}/systems/${system.id}`),
      limitationPaths: localAircraftLimitationDocuments
        .filter((limitation) => limitation.aircraftId === aircraft.id)
        .map((limitation) => `aircraft/${aircraft.id}/limitations/${limitation.id}`),
      procedurePaths: localAircraftProcedureDocuments
        .filter((procedure) => procedure.aircraftId === aircraft.id)
        .map((procedure) => `aircraft/${aircraft.id}/procedures/${procedure.id}`),
      mediaPaths: [`aircraft/${aircraft.id}/media/${aircraft.mainImage.id}`]
    })),
    avionicsFirestorePaths: localAvionicDocuments.map((avionic) => ({
      avionicPath: `avionics/${avionic.id}`,
      sectionPaths: localAvionicSectionDocuments.filter((section) => section.avionicId === avionic.id).map((section) => `avionics/${avionic.id}/sections/${section.id}`),
      componentPaths: localAvionicComponentDocuments
        .filter((component) => component.avionicId === avionic.id)
        .map((component) => `avionics/${avionic.id}/components/${component.id}`),
      procedurePaths: localAvionicProcedureDocuments
        .filter((procedure) => procedure.avionicId === avionic.id)
        .map((procedure) => `avionics/${avionic.id}/procedures/${procedure.id}`),
      trainingPaths: localAvionicTrainingDocuments.filter((training) => training.avionicId === avionic.id).map((training) => `avionics/${avionic.id}/trainings/${training.id}`)
    })),
    checklistFirestorePaths: localChecklistDocuments.map((checklist) => ({
      checklistPath: `checklists/${checklist.id}`,
      itemPaths: checklist.items.map((item) => `checklists/${checklist.id}/items/${item.id}`)
    })),
    trainingFirestorePaths: localTrainingDocuments.map((training) => ({
      trainingPath: `trainings/${training.id}`
    }))
  };
}
