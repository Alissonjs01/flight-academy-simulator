"use client";

import { BarChart3, BookOpen, CalendarClock, CheckCircle2, ClipboardCheck, Mail, RotateCcw, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { User } from "firebase/auth";
import { useEffect } from "react";
import type { StudentProfileDocument } from "@/features/auth/types";
import type { UserProfileStats } from "@/services/userProfileStatsService";
import { UserAvatar } from "@/components/ui/SafeImage";

type UserProfileModalProps = {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  profile?: StudentProfileDocument;
  stats: UserProfileStats;
  profileError?: string;
  isProfileLoading?: boolean;
};

export function UserProfileModal({ isOpen, onClose, user, profile, stats, profileError, isProfileLoading = false }: UserProfileModalProps) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const displayName = profile?.displayName || user.displayName || "Aluno";
  const email = profile?.email || user.email || "Ainda não informado";

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-black/65 px-3 py-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-modal-title"
      onMouseDown={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-md border border-white/10 bg-aviation-ink shadow-2xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/10 p-4 sm:p-5">
          <div className="flex min-w-0 items-center gap-3">
            <UserAvatar
              src={profile?.photoURL ?? user.photoURL}
              name={displayName}
              className="inline-flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-md border border-white/10 bg-white/5 object-cover text-base font-semibold text-aviation-cyan"
            />
            <div className="min-w-0">
              <h2 id="profile-modal-title" className="truncate text-lg font-semibold text-white">{displayName}</h2>
              <p className="mt-1 flex min-w-0 items-center gap-2 text-sm text-slate-400">
                <Mail className="h-4 w-4 shrink-0 text-aviation-cyan" />
                <span className="truncate">{email}</span>
              </p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="focus-ring inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/5 text-slate-100" aria-label="Fechar perfil">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[min(78vh,42rem)] overflow-y-auto p-4 sm:p-5">
          {profileError ? (
            <div className="mb-4 rounded-md border border-aviation-amber/30 bg-aviation-amber/[0.08] p-3 text-sm leading-6 text-slate-200">
              {profileError}
            </div>
          ) : null}
          {isProfileLoading ? (
            <div className="mb-4 rounded-md border border-white/10 bg-white/[0.035] p-3 text-sm leading-6 text-slate-300">
              Atualizando dados do perfil...
            </div>
          ) : null}
          <div className="grid gap-3 sm:grid-cols-2">
            <ProfileInfo icon={CalendarClock} label="Criado em" value={formatDate(profile?.createdAt)} />
            <ProfileInfo icon={RotateCcw} label="Último acesso" value={formatDate(profile?.lastLoginAt)} />
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <ProfileMetric icon={BookOpen} label="Cursos iniciados" value={stats.coursesStarted ? String(stats.coursesStarted) : "Nenhum curso iniciado"} />
            <ProfileMetric icon={CheckCircle2} label="Aulas concluídas" value={`${stats.completedLessons} aula(s)`} />
            <ProfileMetric icon={BarChart3} label="Progresso geral" value={`${stats.overallProgressPercent}%`} />
            <ProfileMetric icon={ClipboardCheck} label="Checklists concluídos" value={`${stats.completedChecklists} checklist(s)`} />
            <ProfileMetric icon={RotateCcw} label="Revisões registradas" value={`${stats.assessmentAttempts} registro(s)`} />
            <ProfileMetric icon={BookOpen} label="Práticas registradas" value={`${stats.exerciseAttempts} registro(s)`} />
          </div>

          <p className="mt-4 rounded-md border border-white/10 bg-white/[0.035] p-3 text-sm leading-6 text-slate-400">
            Os números são calculados pelo progresso associado ao usuário autenticado. Quando não houver registros, a plataforma mostra estados vazios em vez de usar dados fictícios.
          </p>
        </div>
      </div>
    </div>
  );
}

function ProfileInfo({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-white/[0.035] p-3">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-slate-500">
        <Icon className="h-4 w-4 text-aviation-cyan" />
        {label}
      </div>
      <p className="mt-2 text-sm font-semibold text-white">{value}</p>
    </div>
  );
}

function ProfileMetric({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-white/[0.035] p-3">
      <Icon className="h-5 w-5 text-aviation-cyan" />
      <p className="mt-3 text-xs uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-white">{value}</p>
    </div>
  );
}

function formatDate(value?: string) {
  if (!value) {
    return "Ainda não informado";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Ainda não informado";
  }

  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(date);
}
