import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User
} from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase/client";
import { ensureStudentProfile } from "@/services/userProfileService";
import { clearPrivateLocalData } from "@/services/localStorageMigrationService";
import { clearPwaPrivateCaches } from "@/services/pwaService";

export function observeAuthState(callback: (user: User | null) => void) {
  return onAuthStateChanged(getFirebaseAuth(), callback);
}

export async function registerWithEmail(displayName: string, email: string, password: string) {
  const auth = getFirebaseAuth();
  await setPersistence(auth, browserLocalPersistence);
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(credential.user, { displayName });
  await ensureStudentProfile(credential.user, displayName);
  return credential.user;
}

export async function loginWithEmail(email: string, password: string) {
  const auth = getFirebaseAuth();
  await setPersistence(auth, browserLocalPersistence);
  const credential = await signInWithEmailAndPassword(auth, email, password);
  await ensureStudentProfile(credential.user);
  return credential.user;
}

export async function logout() {
  await signOut(getFirebaseAuth());
  clearPrivateLocalData();
  await clearPwaPrivateCaches();
}

export async function requestPasswordReset(email: string) {
  await sendPasswordResetEmail(getFirebaseAuth(), email);
}
