import type { FirebaseOptions } from "firebase/app";

const requiredClientEnv = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

export type FirebaseConfigStatus = {
  isConfigured: boolean;
  missingKeys: string[];
  config?: FirebaseOptions;
  useEmulators: boolean;
  useFirestoreContent: boolean;
};

export function getFirebaseConfigStatus(): FirebaseConfigStatus {
  const missingKeys = Object.entries(requiredClientEnv)
    .filter(([, value]) => !value)
    .map(([key]) => `NEXT_PUBLIC_FIREBASE_${toEnvKey(key)}`);

  const allowEmulators = process.env.NODE_ENV !== "production";

  return {
    isConfigured: missingKeys.length === 0,
    missingKeys,
    config:
      missingKeys.length === 0
        ? {
            ...requiredClientEnv,
            measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
          }
        : undefined,
    useEmulators: allowEmulators && process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATORS === "true",
    useFirestoreContent: process.env.NEXT_PUBLIC_FIREBASE_CONTENT_SOURCE === "firestore"
  };
}

export function assertFirebaseConfigured() {
  const status = getFirebaseConfigStatus();

  if (!status.isConfigured || !status.config) {
    throw new Error(`Firebase não configurado. Variáveis ausentes: ${status.missingKeys.join(", ")}`);
  }

  return status.config;
}

function toEnvKey(key: string) {
  return key.replace(/[A-Z]/g, (letter) => `_${letter}`).toUpperCase();
}
