import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { getFirebaseConfigStatus } from "@/lib/firebase/config";
import { getFirebaseDb } from "@/lib/firebase/client";
import type { AircraftRepository } from "@/features/aircraft/repositories/aircraftRepository";
import type {
  AircraftAvionicDocument,
  AircraftChecklistDocument,
  AircraftCourseRelationDocument,
  AircraftDocument,
  AircraftFilters,
  AircraftLimitationDocument,
  AircraftPerformanceDocument,
  AircraftProcedureDocument,
  AircraftSystemDocument,
  AircraftTrainingDocument
} from "@/features/aircraft/types";

function byOrder<T extends { order: number }>(items: T[]) {
  return [...items].sort((a, b) => a.order - b.order);
}

async function firstByField<T extends { id: string }>(collectionName: string, field: string, value: string) {
  const snapshot = await getDocs(query(collection(getFirebaseDb(), collectionName), where(field, "==", value), limit(1)));
  const item = snapshot.docs[0];
  return item ? ({ id: item.id, ...item.data() } as T) : undefined;
}

async function listByAircraft<T extends { id: string; aircraftId: string; order: number }>(collectionName: string, aircraftId: string) {
  const snapshot = await getDocs(query(collection(getFirebaseDb(), collectionName), where("aircraftId", "==", aircraftId), orderBy("order", "asc")));
  return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }) as T);
}

function matchesFilters(aircraft: AircraftDocument, filters?: AircraftFilters) {
  const normalizedQuery = filters?.query?.trim().toLocaleLowerCase("pt-BR") ?? "";
  const haystack = [aircraft.manufacturer, aircraft.model, aircraft.fullName, aircraft.category, aircraft.description].join(" ").toLocaleLowerCase("pt-BR");

  return (
    (!normalizedQuery || haystack.includes(normalizedQuery)) &&
    (!filters?.category || filters.category === "Todos" || aircraft.category === filters.category) &&
    (!filters?.studyStatus || filters.studyStatus === "Todos" || aircraft.studyStatus === filters.studyStatus)
  );
}

export const firestoreAircraftRepository: AircraftRepository = {
  async listAircraft(filters) {
    const snapshot = await getDocs(query(collection(getFirebaseDb(), "aircraft"), orderBy("fullName", "asc")));
    return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }) as AircraftDocument).filter((aircraft) => matchesFilters(aircraft, filters));
  },
  async getAircraftById(aircraftId) {
    return firstByField<AircraftDocument>("aircraft", "id", aircraftId);
  },
  async getAircraftBySlug(slug) {
    return firstByField<AircraftDocument>("aircraft", "slug", slug);
  },
  async getAircraftProfileBySlug(slug) {
    const aircraft = await this.getAircraftBySlug(slug);
    if (!aircraft) {
      return undefined;
    }

    return {
      aircraft,
      systems: await listByAircraft<AircraftSystemDocument>("aircraftSystems", aircraft.id),
      limitations: await listByAircraft<AircraftLimitationDocument>("aircraftLimitations", aircraft.id),
      performances: await listByAircraft<AircraftPerformanceDocument>("aircraftPerformance", aircraft.id),
      procedures: await listByAircraft<AircraftProcedureDocument>("aircraftProcedures", aircraft.id),
      checklists: await listByAircraft<AircraftChecklistDocument>("aircraftChecklists", aircraft.id),
      trainings: await listByAircraft<AircraftTrainingDocument>("aircraftTrainings", aircraft.id),
      relatedCourses: await listByAircraft<AircraftCourseRelationDocument>("aircraftCourseRelations", aircraft.id),
      installedAvionics: await listByAircraft<AircraftAvionicDocument>("aircraftAvionics", aircraft.id)
    };
  }
};

export function shouldUseFirestoreAircraft() {
  const status = getFirebaseConfigStatus();
  return status.isConfigured && status.useFirestoreContent;
}
