import type { TrainingDocument, TrainingStatus, UserTrainingRecordDocument } from "@/features/trainings/types";

const RECORD_KEY = "flight-academy-simulator:training-records:v1";
const DEFAULT_USER_ID = "local-student";

function nowIso() {
  return new Date().toISOString();
}

function readRecords(): UserTrainingRecordDocument[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    return JSON.parse(window.localStorage.getItem(RECORD_KEY) ?? "[]") as UserTrainingRecordDocument[];
  } catch {
    return [];
  }
}

function writeRecords(records: UserTrainingRecordDocument[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(RECORD_KEY, JSON.stringify(records));
}

export function readTrainingRecord(training: TrainingDocument): UserTrainingRecordDocument {
  const record = readRecords().find((item) => item.trainingId === training.id);

  return (
    record ?? {
      id: `training-record-${DEFAULT_USER_ID}-${training.id}`,
      userId: DEFAULT_USER_ID,
      trainingId: training.id,
      studentReport: training.studentReport,
      personalNote: training.personalNote,
      status: training.status,
      updatedAt: nowIso()
    }
  );
}

export function saveTrainingRecord(
  training: TrainingDocument,
  updates: Partial<Pick<UserTrainingRecordDocument, "studentReport" | "personalNote" | "status">>
) {
  const records = readRecords();
  const current = readTrainingRecord(training);
  const nextRecord: UserTrainingRecordDocument = {
    ...current,
    ...updates,
    updatedAt: nowIso()
  };

  writeRecords([...records.filter((record) => record.trainingId !== training.id), nextRecord]);
  return nextRecord;
}

export function setTrainingStatus(training: TrainingDocument, status: TrainingStatus) {
  return saveTrainingRecord(training, { status });
}
