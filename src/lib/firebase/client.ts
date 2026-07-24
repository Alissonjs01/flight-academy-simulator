import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { connectAuthEmulator, getAuth, type Auth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore, type Firestore } from "firebase/firestore";
import { assertFirebaseConfigured, getFirebaseConfigStatus, isFirebaseStorageEnabled } from "@/lib/firebase/config";

let authEmulatorConnected = false;
let firestoreEmulatorConnected = false;
let storageEmulatorConnected = false;

export function isFirebaseConfigured() {
  return getFirebaseConfigStatus().isConfigured;
}

export function getFirebaseApp(): FirebaseApp {
  const config = assertFirebaseConfigured();
  return getApps().length ? getApp() : initializeApp(config);
}

export function getFirebaseAuth(): Auth {
  const auth = getAuth(getFirebaseApp());
  connectEmulators(auth);
  return auth;
}

export function getFirebaseDb(): Firestore {
  const db = getFirestore(getFirebaseApp());
  connectEmulators(undefined, db);
  return db;
}

export async function getFirebaseStorage(): Promise<import("firebase/storage").FirebaseStorage> {
  if (!isFirebaseStorageEnabled()) {
    throw new Error("Firebase Storage está desativado no modo Spark atual. Ative somente quando o Storage estiver configurado no seu projeto Firebase.");
  }

  const { connectStorageEmulator, getStorage } = await import("firebase/storage");
  const storage = getStorage(getFirebaseApp());
  connectStorageEmulatorWhenNeeded(storage, connectStorageEmulator);
  return storage;
}

function connectEmulators(auth?: Auth, db?: Firestore) {
  const status = getFirebaseConfigStatus();

  if (!status.useEmulators) {
    return;
  }

  if (typeof window === "undefined") {
    return;
  }

  try {
    if (auth && !authEmulatorConnected) {
      connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
      authEmulatorConnected = true;
    }

    if (db && !firestoreEmulatorConnected) {
      connectFirestoreEmulator(db, "127.0.0.1", 8080);
      firestoreEmulatorConnected = true;
    }
  } catch {
    authEmulatorConnected = Boolean(auth) || authEmulatorConnected;
    firestoreEmulatorConnected = Boolean(db) || firestoreEmulatorConnected;
  }
}

function connectStorageEmulatorWhenNeeded(
  storage: import("firebase/storage").FirebaseStorage,
  connectStorageEmulator: (storage: import("firebase/storage").FirebaseStorage, host: string, port: number) => void
) {
  const status = getFirebaseConfigStatus();

  if (!status.useEmulators || typeof window === "undefined" || storageEmulatorConnected) {
    return;
  }

  try {
    connectStorageEmulator(storage, "127.0.0.1", 9199);
    storageEmulatorConnected = true;
  } catch {
    storageEmulatorConnected = true;
  }
}
