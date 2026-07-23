import type { AircraftRepository } from "@/features/aircraft/repositories/aircraftRepository";

export type FirestoreAircraftCollectionPath =
  | "aircraft"
  | "aircraft/{aircraftId}/systems"
  | "aircraft/{aircraftId}/limitations"
  | "aircraft/{aircraftId}/procedures"
  | "aircraft/{aircraftId}/media"
  | "users/{userId}/aircraftProgress";

export type FirestoreAircraftRepository = AircraftRepository;

export const firestoreAircraftCollectionPaths: Record<string, FirestoreAircraftCollectionPath> = {
  aircraft: "aircraft",
  aircraftSystems: "aircraft/{aircraftId}/systems",
  aircraftLimitations: "aircraft/{aircraftId}/limitations",
  aircraftProcedures: "aircraft/{aircraftId}/procedures",
  aircraftMedia: "aircraft/{aircraftId}/media",
  aircraftProgress: "users/{userId}/aircraftProgress"
};
