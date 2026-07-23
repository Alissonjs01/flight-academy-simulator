"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { User } from "firebase/auth";
import type { StudentProfileDocument, UserRole } from "@/features/auth/types";
import { isFirebaseConfigured } from "@/lib/firebase/client";
import { getFirebaseAuthErrorMessage } from "@/lib/firebase/errors";
import { observeAuthState } from "@/services/authService";
import { ensureStudentProfile, updateStudentProfile } from "@/services/userProfileService";
import {
  clearPrivateLocalData,
  detectLocalMigrationSummary,
  hydratePrivateLocalCacheFromFirestore,
  migrateLocalStorageToFirestore,
  type LocalMigrationSummary
} from "@/services/localStorageMigrationService";
import { Panel } from "@/components/ui/Panel";

type AuthContextValue = {
  user: User | null;
  profile?: StudentProfileDocument;
  role: UserRole | null;
  isLoading: boolean;
  isConfigured: boolean;
  error?: string;
};

const AuthContext = createContext<AuthContextValue>({
  user: null,
  role: null,
  isLoading: true,
  isConfigured: false
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<StudentProfileDocument | undefined>();
  const [role, setRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();
  const [migrationSummary, setMigrationSummary] = useState<LocalMigrationSummary | undefined>();
  const isConfigured = isFirebaseConfigured();

  useEffect(() => {
    if (!isConfigured) {
      setIsLoading(false);
      setError("Firebase ainda não está configurado. Preencha as variáveis em .env.local para ativar autenticação e dados remotos.");
      return;
    }

    return observeAuthState(async (nextUser) => {
      setIsLoading(true);
      setError(undefined);
      setUser(nextUser);

      try {
        if (!nextUser) {
          setProfile(undefined);
          setRole(null);
          setMigrationSummary(undefined);
          setIsLoading(false);
          return;
        }

        const ensuredProfile = await ensureStudentProfile(nextUser);
        const token = await nextUser.getIdTokenResult();
        const claimRole = token.claims.role;
        const resolvedRole = claimRole === "admin" || claimRole === "instructor" || claimRole === "student" ? claimRole : ensuredProfile.role;

        setProfile({ ...ensuredProfile, role: resolvedRole });
        setRole(resolvedRole);

        if (ensuredProfile.migrationCompleted) {
          await hydratePrivateLocalCacheFromFirestore(nextUser.uid);
          setMigrationSummary(undefined);
        } else {
          const summary = detectLocalMigrationSummary();
          setMigrationSummary(summary.hasLocalData ? summary : undefined);
          if (!summary.hasLocalData) {
            await updateStudentProfile(nextUser.uid, { migrationCompleted: true });
            setProfile((current) => (current ? { ...current, migrationCompleted: true } : current));
          }
        }
      } catch (authError) {
        setError(getFirebaseAuthErrorMessage(authError));
      } finally {
        setIsLoading(false);
      }
    });
  }, [isConfigured]);

  const value = useMemo<AuthContextValue>(() => ({ user, profile, role, isLoading, isConfigured, error }), [error, isConfigured, isLoading, profile, role, user]);

  return (
    <AuthContext.Provider value={value}>
      {children}
      {user && profile && migrationSummary ? (
        <LocalMigrationPanel uid={user.uid} summary={migrationSummary} onDone={() => setMigrationSummary(undefined)} onProfileUpdated={() => setProfile({ ...profile, migrationCompleted: true })} />
      ) : null}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

function LocalMigrationPanel({ uid, summary, onDone, onProfileUpdated }: { uid: string; summary: LocalMigrationSummary; onDone: () => void; onProfileUpdated: () => void }) {
  const [isWorking, setIsWorking] = useState(false);
  const [message, setMessage] = useState<string | undefined>();

  async function finishWithoutMigration(clearData: boolean) {
    setIsWorking(true);
    await updateStudentProfile(uid, { migrationCompleted: true });
    if (clearData) {
      clearPrivateLocalData();
    }
    onProfileUpdated();
    onDone();
  }

  async function handleMigration() {
    setIsWorking(true);
    setMessage(undefined);

    try {
      await migrateLocalStorageToFirestore(uid);
      await updateStudentProfile(uid, { migrationCompleted: true });
      clearPrivateLocalData();
      await hydratePrivateLocalCacheFromFirestore(uid);
      onProfileUpdated();
      onDone();
    } catch {
      setMessage("Não foi possível migrar os dados locais agora. Tente novamente antes de continuar estudando.");
      setIsWorking(false);
    }
  }

  return (
    <div className="fixed inset-x-0 bottom-20 z-50 px-4 lg:bottom-6 lg:left-72">
      <Panel className="mx-auto max-w-4xl border-aviation-amber/30 bg-aviation-ink/95 shadow-2xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-aviation-amber">Progresso local encontrado</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Há dados locais deste navegador: {summary.progressCount} progresso, {summary.exerciseAttemptCount} tentativa(s), {summary.reviewItemCount} revisão(ões), {summary.checklistSessionCount} checklist(s) e {summary.trainingRecordCount} treinamento(s).
            </p>
            {message ? <p className="mt-2 text-sm text-aviation-amber">{message}</p> : null}
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" disabled={isWorking} onClick={handleMigration} className="focus-ring rounded-md bg-aviation-cyan px-4 py-2 text-sm font-semibold text-aviation-ink disabled:opacity-60">
              Migrar
            </button>
            <button type="button" disabled={isWorking} onClick={() => finishWithoutMigration(true)} className="focus-ring rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">
              Ignorar
            </button>
            <button type="button" disabled={isWorking} onClick={() => finishWithoutMigration(true)} className="focus-ring rounded-md border border-red-400/30 bg-red-400/[0.08] px-4 py-2 text-sm font-semibold text-red-100 disabled:opacity-60">
              Excluir locais
            </button>
          </div>
        </div>
      </Panel>
    </div>
  );
}
