import type { TrainingRepository } from "@/features/trainings/repositories/trainingRepository";

export type FirestoreTrainingCollectionPath =
  | "trainings"
  | "users/{userId}/userTrainingRecords";

export type FirestoreTrainingRepository = TrainingRepository;

export const firestoreTrainingCollectionPaths: Record<string, FirestoreTrainingCollectionPath> = {
  trainings: "trainings",
  userTrainingRecords: "users/{userId}/userTrainingRecords"
};
