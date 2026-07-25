"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { User } from "firebase/auth";
import type { StudentProfileDocument, UserRole } from "@/features/auth/types";
import { isFirebaseConfigured } from "@/lib/firebase/client";
import { getFirebaseAuthErrorMessage, getFirebaseDataErrorMessage } from "@/lib/firebase/errors";
import { observeAuthState } from "@/services/authService";
import { ensureStudentProfile, getStudentProfile, updateStudentProfile } from "@/services/userProfileService";
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
  isProfileLoading: boolean;
  isConfigured: boolean;
  authError?: string;
  profileError?: string;
  error?: string;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue>({
  user: null,
  role: null,
  isLoading: true,
  isProfileLoading: false,
  isConfigured: false,
  refreshProfile: async () => undefined
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<StudentProfileDocument | undefined>();
  const [role, setRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [authError, setAuthError] = useState<string | undefined>();
  const [profileError, setProfileError] = useState<string | undefined>();
  const [migrationSummary, setMigrationSummary] = useState<LocalMigrationSummary | undefined>();
  const activeUidRef = useRef<string | null>(null);
  const isConfigured = isFirebaseConfigured();

  useEffect(() => {
    if (!isConfigured) {
      setIsLoading(false);
      setAuthError("Firebase ainda não está configurado. Preencha as variáveis em .env.local para ativar autenticação e dados remotos.");
      return;
    }

    return observeAuthState(async (nextUser) => {
      setIsLoading(true);
      setIsProfileLoading(Boolean(nextUser));
      setAuthError(undefined);
      setProfileError(undefined);

      try {
        if (!nextUser) {
          activeUidRef.current = null;
          clearPrivateLocalData();
          setUser(null);
          setProfile(undefined);
          setRole(null);
          setMigrationSummary(undefined);
          setIsLoading(false);
          setIsProfileLoading(false);
          return;
        }

        const isAccountSwitch = Boolean(activeUidRef.current && activeUidRef.current !== nextUser.uid);
        if (isAccountSwitch) {
          clearPrivateLocalData();
          setMigrationSummary(undefined);
        }

        activeUidRef.current = nextUser.uid;
        setUser(nextUser);

        let ensuredProfile: StudentProfileDocument;
        try {
          ensuredProfile = await ensureStudentProfile(nextUser);
        } catch (profileLoadError) {
          const fallbackProfile = createFallbackStudentProfile(nextUser);
          ensuredProfile = fallbackProfile;
          setProfile(fallbackProfile);
          setRole("student");
          setProfileError(buildProfileFallbackMessage(profileLoadError));
        }

        const token = await nextUser.getIdTokenResult();
        const claimRole = token.claims.role;
        const resolvedRole = claimRole === "admin" || claimRole === "instructor" || claimRole === "student" ? claimRole : ensuredProfile.role;

        setProfile({ ...ensuredProfile, role: resolvedRole });
        setRole(resolvedRole);

        try {
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
        } catch (privateDataError) {
          setProfileError(buildPrivateDataFallbackMessage(privateDataError));
        }
      } catch (authError) {
        setAuthError(getFirebaseAuthErrorMessage(authError));
      } finally {
        setIsLoading(false);
        setIsProfileLoading(false);
      }
    });
  }, [isConfigured]);

  const refreshProfile = useCallback(async () => {
    if (!user) {
      return;
    }

    setIsProfileLoading(true);
    setProfileError(undefined);

    try {
      const remoteProfile = await getStudentProfile(user.uid);
      const nextProfile = remoteProfile ?? createFallbackStudentProfile(user);
      const token = await user.getIdTokenResult();
      const claimRole = token.claims.role;
      const resolvedRole = claimRole === "admin" || claimRole === "instructor" || claimRole === "student" ? claimRole : nextProfile.role;

      setProfile({ ...nextProfile, role: resolvedRole });
      setRole(resolvedRole);
    } catch (profileLoadError) {
      setProfileError(buildProfileFallbackMessage(profileLoadError));
    } finally {
      setIsProfileLoading(false);
    }
  }, [user]);

  const value = useMemo<AuthContextValue>(
    () => ({ user, profile, role, isLoading, isProfileLoading, isConfigured, authError, profileError, error: authError, refreshProfile }),
    [authError, isConfigured, isLoading, isProfileLoading, profile, profileError, refreshProfile, role, user]
  );

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

function createFallbackStudentProfile(user: User): StudentProfileDocument {
  const timestamp = new Date().toISOString();

  return {
    uid: user.uid,
    displayName: user.displayName || "Aluno",
    email: user.email ?? "",
    photoURL: user.photoURL ?? undefined,
    role: "student",
    createdAt: timestamp,
    updatedAt: timestamp,
    lastLoginAt: timestamp,
    migrationCompleted: true,
    onboardingCompleted: false
  };
}

function buildProfileFallbackMessage(error: unknown) {
  const detail = normalizeFirebaseDataDetail(getFirebaseDataErrorMessage(error));
  return `O perfil remoto não pôde ser carregado agora. A sessão continua ativa com dados locais. Detalhe: ${detail}`;
}

function buildPrivateDataFallbackMessage(error: unknown) {
  const detail = normalizeFirebaseDataDetail(getFirebaseDataErrorMessage(error));
  return `Alguns dados remotos de progresso não puderam ser carregados agora. O login foi mantido e a plataforma usará o fallback local quando disponível. Detalhe: ${detail}`;
}

function normalizeFirebaseDataDetail(message: string) {
  return message === "Não foi possível acessar os dados no Firebase." ? "falha recuperável de leitura no Firestore." : message;
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
