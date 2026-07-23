import type { AvionicsRepository } from "@/features/avionics/repositories/avionicsRepository";

export type FirestoreAvionicsCollectionPath =
  | "avionics"
  | "avionics/{avionicId}/sections"
  | "avionics/{avionicId}/components"
  | "avionics/{avionicId}/procedures"
  | "avionics/{avionicId}/trainings"
  | "avionics/{avionicId}/courses"
  | "users/{userId}/avionicsProgress";

export type FirestoreAvionicsRepository = AvionicsRepository;

export const firestoreAvionicsCollectionPaths: Record<string, FirestoreAvionicsCollectionPath> = {
  avionics: "avionics",
  avionicsSections: "avionics/{avionicId}/sections",
  avionicsComponents: "avionics/{avionicId}/components",
  avionicsProcedures: "avionics/{avionicId}/procedures",
  avionicsTrainings: "avionics/{avionicId}/trainings",
  avionicsCourses: "avionics/{avionicId}/courses",
  avionicsProgress: "users/{userId}/avionicsProgress"
};
