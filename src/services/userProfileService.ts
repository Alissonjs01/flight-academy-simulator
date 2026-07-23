import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import type { User } from "firebase/auth";
import { getFirebaseDb, isFirebaseConfigured } from "@/lib/firebase/client";
import type { StudentProfileDocument } from "@/features/auth/types";

function nowIso() {
  return new Date().toISOString();
}

export async function getStudentProfile(uid: string): Promise<StudentProfileDocument | undefined> {
  if (!isFirebaseConfigured()) {
    return undefined;
  }

  const snapshot = await getDoc(doc(getFirebaseDb(), "users", uid));
  return snapshot.exists() ? (snapshot.data() as StudentProfileDocument) : undefined;
}

export async function ensureStudentProfile(user: User, displayName?: string) {
  const timestamp = nowIso();
  const profileRef = doc(getFirebaseDb(), "users", user.uid);
  const existing = await getDoc(profileRef);

  if (existing.exists()) {
    await updateDoc(profileRef, {
      email: user.email ?? "",
      photoURL: user.photoURL ?? null,
      lastLoginAt: timestamp,
      updatedAt: timestamp,
      updatedAtServer: serverTimestamp(),
      lastLoginAtServer: serverTimestamp()
    });

    return (await getDoc(profileRef)).data() as StudentProfileDocument;
  }

  const profile: StudentProfileDocument = {
    uid: user.uid,
    displayName: displayName?.trim() || user.displayName || "Aluno",
    email: user.email ?? "",
    photoURL: user.photoURL ?? undefined,
    role: "student",
    createdAt: timestamp,
    updatedAt: timestamp,
    lastLoginAt: timestamp,
    migrationCompleted: false,
    onboardingCompleted: false
  };

  await setDoc(profileRef, {
    ...profile,
    createdAtServer: serverTimestamp(),
    updatedAtServer: serverTimestamp(),
    lastLoginAtServer: serverTimestamp()
  });

  return profile;
}

export async function updateStudentProfile(uid: string, updates: Partial<Pick<StudentProfileDocument, "displayName" | "photoURL" | "onboardingCompleted" | "migrationCompleted">>) {
  const timestamp = nowIso();
  await updateDoc(doc(getFirebaseDb(), "users", uid), {
    ...updates,
    updatedAt: timestamp,
    updatedAtServer: serverTimestamp()
  });
}
