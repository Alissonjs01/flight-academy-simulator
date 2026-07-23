"use client";

import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { getFirebaseAuthErrorMessage } from "@/lib/firebase/errors";
import { getFirebaseConfigStatus } from "@/lib/firebase/config";
import { loginWithEmail, registerWithEmail, requestPasswordReset } from "@/services/authService";
import { Panel } from "@/components/ui/Panel";

type AuthMode = "login" | "register" | "reset";

export function AuthForm({ mode }: { mode: AuthMode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = getFirebaseConfigStatus();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const nextPath = searchParams.get("next") ?? "/dashboard";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(undefined);
    setMessage(undefined);

    try {
      if (mode === "register") {
        await registerWithEmail(displayName, email, password);
        router.replace(nextPath);
      } else if (mode === "login") {
        await loginWithEmail(email, password);
        router.replace(nextPath);
      } else {
        await requestPasswordReset(email);
        setMessage("Enviamos um e-mail de recuperação, se este endereço estiver cadastrado.");
      }
    } catch (authError) {
      setError(getFirebaseAuthErrorMessage(authError));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Panel className="w-full max-w-md">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-aviation-cyan">Flight Academy Simulator</p>
      <h1 className="mt-3 text-2xl font-semibold text-white">{titleByMode[mode]}</h1>
      <p className="mt-2 text-sm leading-6 text-slate-400">{descriptionByMode[mode]}</p>

      {!status.isConfigured ? (
        <div className="mt-5 rounded-md border border-aviation-amber/25 bg-aviation-amber/[0.08] p-3 text-sm leading-6 text-slate-200">
          Firebase não configurado. Crie `.env.local` com as variáveis públicas do SDK web para ativar este fluxo.
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {mode === "register" ? (
          <label className="block">
            <span className="text-sm font-semibold text-slate-300">Nome</span>
            <input value={displayName} onChange={(event) => setDisplayName(event.target.value)} required className="focus-ring mt-2 h-11 w-full rounded-md border border-white/10 bg-aviation-ink/60 px-3 text-sm text-white" />
          </label>
        ) : null}

        <label className="block">
          <span className="text-sm font-semibold text-slate-300">E-mail</span>
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required className="focus-ring mt-2 h-11 w-full rounded-md border border-white/10 bg-aviation-ink/60 px-3 text-sm text-white" />
        </label>

        {mode !== "reset" ? (
          <label className="block">
            <span className="text-sm font-semibold text-slate-300">Senha</span>
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required minLength={6} className="focus-ring mt-2 h-11 w-full rounded-md border border-white/10 bg-aviation-ink/60 px-3 text-sm text-white" />
          </label>
        ) : null}

        {error ? <p className="rounded-md border border-red-400/25 bg-red-400/[0.08] p-3 text-sm text-red-100">{error}</p> : null}
        {message ? <p className="rounded-md border border-aviation-mint/25 bg-aviation-mint/[0.08] p-3 text-sm text-aviation-mint">{message}</p> : null}

        <button type="submit" disabled={!status.isConfigured || isSubmitting} className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-md bg-aviation-cyan px-4 py-3 text-sm font-semibold text-aviation-ink disabled:cursor-not-allowed disabled:opacity-60">
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {buttonByMode[mode]}
        </button>
      </form>

      <div className="mt-5 flex flex-wrap justify-between gap-3 text-sm">
        {mode !== "login" ? <Link className="text-aviation-cyan" href="/login">Entrar</Link> : null}
        {mode !== "register" ? <Link className="text-aviation-cyan" href="/cadastro">Criar conta</Link> : null}
        {mode !== "reset" ? <Link className="text-slate-400" href="/recuperar-senha">Esqueci a senha</Link> : null}
      </div>
    </Panel>
  );
}

const titleByMode: Record<AuthMode, string> = {
  login: "Entrar na plataforma",
  register: "Criar conta de aluno",
  reset: "Recuperar senha"
};

const descriptionByMode: Record<AuthMode, string> = {
  login: "Use e-mail e senha para carregar seu progresso individual.",
  register: "O perfil inicial será criado como aluno.",
  reset: "Informe seu e-mail para receber o link de recuperação."
};

const buttonByMode: Record<AuthMode, string> = {
  login: "Entrar",
  register: "Cadastrar",
  reset: "Enviar recuperação"
};
