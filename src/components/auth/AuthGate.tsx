"use client";

import { Loader2, ShieldAlert } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { getFirebaseConfigStatus } from "@/lib/firebase/config";
import { useAuth } from "@/components/auth/AuthProvider";
import { Panel } from "@/components/ui/Panel";

const publicPaths = new Set(["/login", "/cadastro", "/recuperar-senha", "/offline"]);
const authPaths = new Set(["/login", "/cadastro", "/recuperar-senha"]);

export function AuthGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, role, isLoading, isConfigured, authError, profileError } = useAuth();
  const isPublicPath = publicPaths.has(pathname);
  const isAuthPath = authPaths.has(pathname);
  const next = searchParams.get("next") ?? "/dashboard";

  useEffect(() => {
    if (isLoading || !isConfigured) {
      return;
    }

    if (!user && !isPublicPath) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    }

    if (user && isAuthPath) {
      router.replace(next);
    }
  }, [isAuthPath, isConfigured, isLoading, isPublicPath, next, pathname, router, user]);

  if (!isConfigured && !isPublicPath) {
    return <FirebaseConfigurationMessage />;
  }

  if (isLoading && !isPublicPath) {
    return <LoadingSession />;
  }

  if (!user && !isPublicPath) {
    return <LoadingSession />;
  }

  if (pathname.startsWith("/admin") && role !== "admin" && role !== "instructor") {
    return (
      <Panel className="mx-auto max-w-3xl border-aviation-amber/25 bg-aviation-amber/[0.08]">
        <div className="flex gap-3 text-sm leading-6 text-slate-200">
          <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-aviation-amber" />
          <p>Este painel exige permissão de instrutor ou administrador validada pelo Firebase. A ocultação visual não concede acesso administrativo.</p>
        </div>
      </Panel>
    );
  }

  return (
    <>
      {authError ? (
        <div className="mx-auto mb-4 max-w-5xl rounded-md border border-red-400/30 bg-red-500/[0.06] p-3 text-sm text-red-100">
          {authError}
        </div>
      ) : null}
      {profileError ? (
        <div className="mx-auto mb-4 max-w-5xl rounded-md border border-aviation-amber/30 bg-aviation-amber/[0.08] p-3 text-sm text-slate-200">
          {profileError}
        </div>
      ) : null}
      {children}
    </>
  );
}

function LoadingSession() {
  return (
    <Panel className="mx-auto max-w-3xl">
      <div className="flex items-center gap-3 text-sm text-slate-300">
        <Loader2 className="h-5 w-5 animate-spin text-aviation-cyan" />
        Verificando sessão no Firebase...
      </div>
    </Panel>
  );
}

function FirebaseConfigurationMessage() {
  const status = getFirebaseConfigStatus();

  return (
    <Panel className="mx-auto max-w-4xl border-aviation-amber/25 bg-aviation-amber/[0.08]">
      <div className="flex gap-3 text-sm leading-6 text-slate-200">
        <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-aviation-amber" />
        <div>
          <p className="font-semibold text-white">Firebase não configurado</p>
          <p className="mt-2">Crie `.env.local` com as variáveis públicas do SDK web. Variáveis ausentes: {status.missingKeys.join(", ") || "nenhuma"}.</p>
        </div>
      </div>
    </Panel>
  );
}
