import { applicationDefault, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import {
  localCourseDocuments,
  localExerciseDocuments,
  localFinalAssessmentDocuments,
  localLessonDocuments,
  localModuleDocuments
} from "../src/features/content/data/localContent";
import {
  localAircraftAvionicDocuments,
  localAircraftChecklistDocuments,
  localAircraftCourseRelations,
  localAircraftDocuments,
  localAircraftLimitationDocuments,
  localAircraftPerformanceDocuments,
  localAircraftProcedureDocuments,
  localAircraftSystemDocuments,
  localAircraftTrainingDocuments
} from "../src/features/aircraft/data/localAircraft";
import {
  localAvionicComponentDocuments,
  localAvionicCourseRelations,
  localAvionicDocuments,
  localAvionicProcedureDocuments,
  localAvionicSectionDocuments,
  localAvionicTrainingDocuments
} from "../src/features/avionics/data/localAvionics";
import { localChecklistDocuments } from "../src/features/checklists/data/localChecklists";
import { localTrainingDocuments } from "../src/features/trainings/data/localTrainings";

const projectId = process.env.FIREBASE_PROJECT_ID ?? process.env.GCLOUD_PROJECT ?? process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "demo-flight-academy-simulator";
const isEmulator = Boolean(process.env.FIRESTORE_EMULATOR_HOST);
const realSeedConfirmation = process.env.CONFIRM_REAL_FIREBASE_SEED;

if (!isEmulator && realSeedConfirmation !== projectId) {
  console.error(`Seed real bloqueado. Para carregar dados em ${projectId}, defina CONFIRM_REAL_FIREBASE_SEED=${projectId}.`);
  console.error("Confirme o projeto de destino antes de executar. O seed é idempotente e não apaga dados existentes.");
  process.exit(1);
}

if (!getApps().length) {
  initializeApp(isEmulator ? { projectId } : { projectId, credential: applicationDefault() });
}

const db = getFirestore();
db.settings({ ignoreUndefinedProperties: true });

async function main() {
  await Promise.all([
    seedCollection("courses", localCourseDocuments),
    seedCollection("modules", localModuleDocuments),
    seedCollection("lessons", localLessonDocuments),
    seedCollection("exercises", localExerciseDocuments),
    seedCollection("assessments", localFinalAssessmentDocuments),
    seedCollection("aircraft", localAircraftDocuments),
    seedCollection("aircraftSystems", localAircraftSystemDocuments),
    seedCollection("aircraftLimitations", localAircraftLimitationDocuments),
    seedCollection("aircraftPerformance", localAircraftPerformanceDocuments),
    seedCollection("aircraftProcedures", localAircraftProcedureDocuments),
    seedCollection("aircraftChecklists", localAircraftChecklistDocuments),
    seedCollection("aircraftTrainings", localAircraftTrainingDocuments),
    seedCollection("aircraftCourseRelations", localAircraftCourseRelations),
    seedCollection("aircraftAvionics", localAircraftAvionicDocuments),
    seedCollection("avionics", localAvionicDocuments),
    seedCollection("avionicsSections", localAvionicSectionDocuments),
    seedCollection("avionicsComponents", localAvionicComponentDocuments),
    seedCollection("avionicsProcedures", localAvionicProcedureDocuments),
    seedCollection("avionicsTrainings", localAvionicTrainingDocuments),
    seedCollection("avionicsCourses", localAvionicCourseRelations),
    seedCollection(
      "checklists",
      localChecklistDocuments.map((checklist) => ({ ...checklist, items: [] }))
    ),
    seedCollection("checklistItems", localChecklistDocuments.flatMap((checklist) => checklist.items)),
    seedCollection("trainings", localTrainingDocuments)
  ]);

  console.log(`Seed concluído para projeto ${projectId}. Conteúdos provisórios permaneceram pendentes de verificação.`);
}

async function seedCollection<T extends { id: string }>(collectionName: string, values: T[]) {
  const batch = db.batch();
  values.forEach((value) => batch.set(db.collection(collectionName).doc(value.id), value, { merge: true }));
  await batch.commit();
  console.log(`${collectionName}: ${values.length} documento(s) sincronizado(s).`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
