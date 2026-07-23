import { firestoreAircraftRepository, shouldUseFirestoreAircraft } from "@/features/aircraft/repositories/firestoreAircraftRepository";
import { localAircraftRepository } from "@/features/aircraft/repositories/localAircraftRepository";

export function getAircraftRepository() {
  return shouldUseFirestoreAircraft() ? firestoreAircraftRepository : localAircraftRepository;
}
