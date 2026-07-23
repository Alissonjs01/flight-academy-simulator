import type { AircraftDocument, AircraftFilters, AircraftProfile } from "@/features/aircraft/types";

export type AircraftRepository = {
  listAircraft(filters?: AircraftFilters): Promise<AircraftDocument[]>;
  getAircraftById(aircraftId: string): Promise<AircraftDocument | undefined>;
  getAircraftBySlug(slug: string): Promise<AircraftDocument | undefined>;
  getAircraftProfileBySlug(slug: string): Promise<AircraftProfile | undefined>;
};
