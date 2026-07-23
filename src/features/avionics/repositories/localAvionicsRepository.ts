import type { AvionicsRepository } from "@/features/avionics/repositories/avionicsRepository";
import type { AvionicDocument, AvionicFilters } from "@/features/avionics/types";
import {
  localAvionicComponentDocuments,
  localAvionicCourseRelations,
  localAvionicDocuments,
  localAvionicProcedureDocuments,
  localAvionicSectionDocuments,
  localAvionicTrainingDocuments
} from "@/features/avionics/data/localAvionics";

function byName(items: AvionicDocument[]) {
  return [...items].sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
}

function byOrder<T extends { order: number }>(items: T[]) {
  return [...items].sort((a, b) => a.order - b.order);
}

function matchesText(avionic: AvionicDocument, query?: string) {
  if (!query?.trim()) {
    return true;
  }

  const normalizedQuery = query.trim().toLocaleLowerCase("pt-BR");
  const haystack = [avionic.name, avionic.manufacturer, avionic.version, avionic.description].join(" ").toLocaleLowerCase("pt-BR");

  return haystack.includes(normalizedQuery);
}

function matchesFilters(avionic: AvionicDocument, filters?: AvionicFilters) {
  const manufacturerMatches = !filters?.manufacturer || filters.manufacturer === "Todos" || avionic.manufacturer === filters.manufacturer;
  const statusMatches = !filters?.studyStatus || filters.studyStatus === "Todos" || avionic.studyStatus === filters.studyStatus;

  return manufacturerMatches && statusMatches && matchesText(avionic, filters?.query);
}

export const localAvionicsRepository: AvionicsRepository = {
  async listAvionics(filters) {
    return byName(localAvionicDocuments.filter((avionic) => matchesFilters(avionic, filters)));
  },

  async getAvionicById(avionicId) {
    return localAvionicDocuments.find((avionic) => avionic.id === avionicId);
  },

  async getAvionicBySlug(slug) {
    return localAvionicDocuments.find((avionic) => avionic.slug === slug);
  },

  async getAvionicProfileBySlug(slug) {
    const avionic = await this.getAvionicBySlug(slug);

    if (!avionic) {
      return undefined;
    }

    return {
      avionic,
      sections: byOrder(localAvionicSectionDocuments.filter((section) => section.avionicId === avionic.id)),
      components: byOrder(localAvionicComponentDocuments.filter((component) => component.avionicId === avionic.id)),
      procedures: byOrder(localAvionicProcedureDocuments.filter((procedure) => procedure.avionicId === avionic.id)),
      trainings: byOrder(localAvionicTrainingDocuments.filter((training) => training.avionicId === avionic.id)),
      courses: byOrder(localAvionicCourseRelations.filter((course) => course.avionicId === avionic.id))
    };
  }
};
