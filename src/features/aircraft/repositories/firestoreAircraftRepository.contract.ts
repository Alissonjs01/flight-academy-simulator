import type { AircraftRepository } from "@/features/aircraft/repositories/aircraftRepository";

export type FirestoreAircraftCollectionPath =
  | "aircraft"
  | "aircraftSystems"
  | "aircraftLimitations"
  | "aircraftPerformance"
  | "aircraftProcedures"
  | "aircraftMedia"
  | "userAircraftProgress";

export type FirestoreAircraftRepository = AircraftRepository;

export const firestoreAircraftCollectionPaths: Record<string, FirestoreAircraftCollectionPath> = {
  aircraft: "aircraft",
  aircraftSystems: "aircraftSystems",
  aircraftLimitations: "aircraftLimitations",
  aircraftPerformance: "aircraftPerformance",
  aircraftProcedures: "aircraftProcedures",
  aircraftMedia: "aircraftMedia",
  aircraftProgress: "userAircraftProgress"
};
