import type { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions, WithFieldValue } from "firebase/firestore";

export function createFirestoreConverter<T extends { id: string }>(): FirestoreDataConverter<T> {
  return {
    toFirestore(value: WithFieldValue<T>): DocumentData {
      return value;
    },
    fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): T {
      return { id: snapshot.id, ...snapshot.data(options) } as T;
    }
  };
}
