import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { getFirebaseConfigStatus } from "@/lib/firebase/config";
import { getFirebaseDb } from "@/lib/firebase/client";
import type { TrainingRepository } from "@/features/trainings/repositories/trainingRepository";
import type { TrainingDocument, TrainingFilters } from "@/features/trainings/types";

function matchesFilters(training: TrainingDocument, filters?: TrainingFilters) {
  const normalizedQuery = filters?.query?.trim().toLocaleLowerCase("pt-BR") ?? "";
  const haystack = [training.title, training.aircraftName, training.objective, training.conditions].join(" ").toLocaleLowerCase("pt-BR");

  return (
    (!normalizedQuery || haystack.includes(normalizedQuery)) &&
    (!filters?.aircraftId || filters.aircraftId === "Todos" || training.aircraftId === filters.aircraftId) &&
    (!filters?.difficulty || filters.difficulty === "Todos" || training.difficulty === filters.difficulty) &&
    (!filters?.status || filters.status === "Todos" || training.status === filters.status)
  );
}

export const firestoreTrainingRepository: TrainingRepository = {
  async listTrainings(filters) {
    const snapshot = await getDocs(query(collection(getFirebaseDb(), "trainings"), orderBy("title", "asc")));
    return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }) as TrainingDocument).filter((training) => matchesFilters(training, filters));
  },
  async getTrainingById(trainingId) {
    const snapshot = await getDocs(query(collection(getFirebaseDb(), "trainings"), where("id", "==", trainingId), limit(1)));
    const item = snapshot.docs[0];
    return item ? ({ id: item.id, ...item.data() } as TrainingDocument) : undefined;
  },
  async getTrainingBySlug(slug) {
    const snapshot = await getDocs(query(collection(getFirebaseDb(), "trainings"), where("slug", "==", slug), limit(1)));
    const item = snapshot.docs[0];
    return item ? ({ id: item.id, ...item.data() } as TrainingDocument) : undefined;
  }
};

export function shouldUseFirestoreTrainings() {
  const status = getFirebaseConfigStatus();
  return status.isConfigured && status.useFirestoreContent;
}
