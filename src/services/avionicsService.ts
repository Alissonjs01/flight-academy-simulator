import type { AvionicFilters } from "@/features/avionics/types";
import { getAvionicsRepository } from "@/features/avionics/repositories/repositoryFactory";

export async function listAvionics(filters?: AvionicFilters) {
  return getAvionicsRepository().listAvionics(filters);
}

export async function getAvionicBySlug(slug: string) {
  return getAvionicsRepository().getAvionicBySlug(slug);
}

export async function getAvionicProfileBySlug(slug: string) {
  return getAvionicsRepository().getAvionicProfileBySlug(slug);
}
