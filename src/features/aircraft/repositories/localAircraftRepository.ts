import type { AircraftRepository } from "@/features/aircraft/repositories/aircraftRepository";
import type { AircraftDocument, AircraftFilters } from "@/features/aircraft/types";
import {
  localAircraftAvionicDocuments,
  localAircraftChecklistDocuments,
  localAircraftCourseRelations,
  localAircraftDocuments,
  localAircraftLimitationDocuments,
  localAircraftPerformanceDocuments,
  localAircraftProcedureDocuments,
  localAircraftSystemDocuments,
  localAircraftTrainingDocuments
} from "@/features/aircraft/data/localAircraft";

function byFullName(items: AircraftDocument[]) {
  return [...items].sort((a, b) => a.fullName.localeCompare(b.fullName, "pt-BR"));
}

function byOrder<T extends { order: number }>(items: T[]) {
  return [...items].sort((a, b) => a.order - b.order);
}

function matchesText(aircraft: AircraftDocument, query?: string) {
  if (!query?.trim()) {
    return true;
  }

  const normalizedQuery = query.trim().toLocaleLowerCase("pt-BR");
  const haystack = [aircraft.manufacturer, aircraft.model, aircraft.fullName, aircraft.category, aircraft.description].join(" ").toLocaleLowerCase("pt-BR");

  return haystack.includes(normalizedQuery);
}

function matchesFilters(aircraft: AircraftDocument, filters?: AircraftFilters) {
  if (aircraft.publicationState !== "published") {
    return false;
  }

  const categoryMatches = !filters?.category || filters.category === "Todos" || aircraft.category === filters.category;
  const statusMatches = !filters?.studyStatus || filters.studyStatus === "Todos" || aircraft.studyStatus === filters.studyStatus;

  return categoryMatches && statusMatches && matchesText(aircraft, filters?.query);
}

export const localAircraftRepository: AircraftRepository = {
  async listAircraft(filters) {
    return byFullName(localAircraftDocuments.filter((aircraft) => matchesFilters(aircraft, filters)));
  },

  async getAircraftById(aircraftId) {
    return localAircraftDocuments.find((aircraft) => aircraft.id === aircraftId);
  },

  async getAircraftBySlug(slug) {
    return localAircraftDocuments.find((aircraft) => aircraft.slug === slug);
  },

  async getAircraftProfileBySlug(slug) {
    const aircraft = await this.getAircraftBySlug(slug);

    if (!aircraft) {
      return undefined;
    }

    return {
      aircraft,
      systems: byOrder(localAircraftSystemDocuments.filter((system) => system.aircraftId === aircraft.id)),
      limitations: byOrder(localAircraftLimitationDocuments.filter((limitation) => limitation.aircraftId === aircraft.id)),
      performances: byOrder(localAircraftPerformanceDocuments.filter((performance) => performance.aircraftId === aircraft.id)),
      procedures: byOrder(localAircraftProcedureDocuments.filter((procedure) => procedure.aircraftId === aircraft.id)),
      checklists: byOrder(localAircraftChecklistDocuments.filter((checklist) => checklist.aircraftId === aircraft.id)),
      trainings: byOrder(localAircraftTrainingDocuments.filter((training) => training.aircraftId === aircraft.id)),
      relatedCourses: byOrder(localAircraftCourseRelations.filter((course) => course.aircraftId === aircraft.id)),
      installedAvionics: byOrder(localAircraftAvionicDocuments.filter((avionic) => avionic.aircraftId === aircraft.id))
    };
  }
};
