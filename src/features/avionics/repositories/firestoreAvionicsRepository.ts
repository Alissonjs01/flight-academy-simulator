import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { getFirebaseConfigStatus } from "@/lib/firebase/config";
import { getFirebaseDb } from "@/lib/firebase/client";
import type { AvionicsRepository } from "@/features/avionics/repositories/avionicsRepository";
import type {
  AvionicComponentDocument,
  AvionicCourseRelationDocument,
  AvionicDocument,
  AvionicFilters,
  AvionicProcedureDocument,
  AvionicSectionDocument,
  AvionicTrainingDocument
} from "@/features/avionics/types";

async function firstByField<T extends { id: string }>(collectionName: string, field: string, value: string) {
  const snapshot = await getDocs(query(collection(getFirebaseDb(), collectionName), where(field, "==", value), limit(1)));
  const item = snapshot.docs[0];
  return item ? ({ id: item.id, ...item.data() } as T) : undefined;
}

async function listByAvionic<T extends { id: string; avionicId: string; order: number }>(collectionName: string, avionicId: string) {
  const snapshot = await getDocs(query(collection(getFirebaseDb(), collectionName), where("avionicId", "==", avionicId), orderBy("order", "asc")));
  return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }) as T);
}

function matchesFilters(avionic: AvionicDocument, filters?: AvionicFilters) {
  if (avionic.publicationState !== "published") {
    return false;
  }

  const normalizedQuery = filters?.query?.trim().toLocaleLowerCase("pt-BR") ?? "";
  const haystack = [avionic.name, avionic.manufacturer, avionic.version, avionic.description].join(" ").toLocaleLowerCase("pt-BR");

  return (
    (!normalizedQuery || haystack.includes(normalizedQuery)) &&
    (!filters?.manufacturer || filters.manufacturer === "Todos" || avionic.manufacturer === filters.manufacturer) &&
    (!filters?.studyStatus || filters.studyStatus === "Todos" || avionic.studyStatus === filters.studyStatus)
  );
}

export const firestoreAvionicsRepository: AvionicsRepository = {
  async listAvionics(filters) {
    const snapshot = await getDocs(query(collection(getFirebaseDb(), "avionics"), orderBy("name", "asc")));
    return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }) as AvionicDocument).filter((avionic) => matchesFilters(avionic, filters));
  },
  async getAvionicById(avionicId) {
    return firstByField<AvionicDocument>("avionics", "id", avionicId);
  },
  async getAvionicBySlug(slug) {
    return firstByField<AvionicDocument>("avionics", "slug", slug);
  },
  async getAvionicProfileBySlug(slug) {
    const avionic = await this.getAvionicBySlug(slug);
    if (!avionic) {
      return undefined;
    }

    return {
      avionic,
      sections: await listByAvionic<AvionicSectionDocument>("avionicsSections", avionic.id),
      components: await listByAvionic<AvionicComponentDocument>("avionicsComponents", avionic.id),
      procedures: await listByAvionic<AvionicProcedureDocument>("avionicsProcedures", avionic.id),
      trainings: await listByAvionic<AvionicTrainingDocument>("avionicsTrainings", avionic.id),
      courses: await listByAvionic<AvionicCourseRelationDocument>("avionicsCourses", avionic.id)
    };
  }
};

export function shouldUseFirestoreAvionics() {
  const status = getFirebaseConfigStatus();
  return status.isConfigured && status.useFirestoreContent;
}
