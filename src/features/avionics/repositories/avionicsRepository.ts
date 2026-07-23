import type { AvionicDocument, AvionicFilters, AvionicProfile } from "@/features/avionics/types";

export type AvionicsRepository = {
  listAvionics(filters?: AvionicFilters): Promise<AvionicDocument[]>;
  getAvionicById(avionicId: string): Promise<AvionicDocument | undefined>;
  getAvionicBySlug(slug: string): Promise<AvionicDocument | undefined>;
  getAvionicProfileBySlug(slug: string): Promise<AvionicProfile | undefined>;
};
