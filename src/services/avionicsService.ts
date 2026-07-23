import type { AvionicFilters } from "@/features/avionics/types";
import { localAvionicsRepository } from "@/features/avionics/repositories/localAvionicsRepository";

const repository = localAvionicsRepository;

export async function listAvionics(filters?: AvionicFilters) {
  return repository.listAvionics(filters);
}

export async function getAvionicBySlug(slug: string) {
  return repository.getAvionicBySlug(slug);
}

export async function getAvionicProfileBySlug(slug: string) {
  return repository.getAvionicProfileBySlug(slug);
}
