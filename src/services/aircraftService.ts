import type { AircraftFilters } from "@/features/aircraft/types";
import { getAircraftRepository } from "@/features/aircraft/repositories/repositoryFactory";

export async function listAircraft(filters?: AircraftFilters) {
  return getAircraftRepository().listAircraft(filters);
}

export async function getAircraftBySlug(slug: string) {
  return getAircraftRepository().getAircraftBySlug(slug);
}

export async function getAircraftProfileBySlug(slug: string) {
  return getAircraftRepository().getAircraftProfileBySlug(slug);
}
