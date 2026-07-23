import type { AircraftFilters } from "@/features/aircraft/types";
import { localAircraftRepository } from "@/features/aircraft/repositories/localAircraftRepository";

const repository = localAircraftRepository;

export async function listAircraft(filters?: AircraftFilters) {
  return repository.listAircraft(filters);
}

export async function getAircraftBySlug(slug: string) {
  return repository.getAircraftBySlug(slug);
}

export async function getAircraftProfileBySlug(slug: string) {
  return repository.getAircraftProfileBySlug(slug);
}
