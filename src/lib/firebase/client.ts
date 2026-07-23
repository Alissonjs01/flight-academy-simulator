import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { connectAuthEmulator, getAuth, type Auth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore, type Firestore } from "firebase/firestore";
import { connectStorageEmulator, getStorage, type FirebaseStorage } from "firebase/storage";
import { assertFirebaseConfigured, getFirebaseConfigStatus } from "@/lib/firebase/config";

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

export function getFirebaseStorage(): FirebaseStorage {
  const storage = getStorage(getFirebaseApp());
  connectEmulators(undefined, undefined, storage);
  return storage;
}

function connectEmulators(auth?: Auth, db?: Firestore, storage?: FirebaseStorage) {
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

    if (storage && !storageEmulatorConnected) {
      connectStorageEmulator(storage, "127.0.0.1", 9199);
      storageEmulatorConnected = true;
    }
  } catch {
    authEmulatorConnected = Boolean(auth) || authEmulatorConnected;
    firestoreEmulatorConnected = Boolean(db) || firestoreEmulatorConnected;
    storageEmulatorConnected = Boolean(storage) || storageEmulatorConnected;
  }
}
