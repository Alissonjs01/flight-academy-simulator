"use client";

import clsx from "clsx";
import { Award, BookOpenCheck, CheckCircle2, Compass, Gauge, GraduationCap, LogOut, Plane, RefreshCw, Save, ShieldCheck, SlidersHorizontal, UserCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { updateProfile } from "firebase/auth";
import { useAuth } from "@/components/auth/AuthProvider";
import { MetricCard } from "@/components/cards/MetricCard";
import { Panel } from "@/components/ui/Panel";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { UserAvatar } from "@/components/ui/SafeImage";
import type { CourseStructure, LessonDocument } from "@/features/content/types";
import type { StudentProfileDocument } from "@/features/auth/types";
import { getImageValidationMessage } from "@/lib/images";
import { logout, requestPasswordReset } from "@/services/authService";
import { updateStudentProfile } from "@/services/userProfileService";
import { calculateCourseProgress, getUnlockedCourseIdsFromProgress, readLocalProgress, subscribeToProgressChanges } from "@/services/progressService";
import { readUserProfileStats, type UserProfileStats } from "@/services/userProfileStatsService";

type ProfilePageProps = {
  structures: CourseStructure[];
};

type ProfileTab = "overview" | "progress" | "achievements" | "preferences" | "account";

const tabs: Array<{ id: ProfileTab; label: string; icon: typeof UserCircle }> = [
  { id: "overview", label: "Visão geral", icon: UserCircle },
  { id: "progress", label: "Progresso", icon: Gauge },
  { id: "achievements", label: "Conquistas", icon: Award },
  { id: "preferences", label: "Preferências", icon: SlidersHorizontal },
  { id: "account", label: "Conta", icon: ShieldCheck }
];

export function ProfilePage({ structures }: ProfilePageProps) {
  const { user, profile, role, isLoading, isProfileLoading, profileError, refreshProfile } = useAuth();
  const allLessons = useMemo(() => structures.flatMap((structure) => structure.modules.flatMap((module) => module.lessons)), [structures]);
  const publishedLessonIds = useMemo(() => allLessons.filter((lesson) => lesson.publicationState === "published").map((lesson) => lesson.id), [allLessons]);
  const [activeTab, setActiveTab] = useState<ProfileTab>("overview");
  const [progress, setProgress] = useState(() => readLocalProgress(allLessons));
  const [localProfile, setLocalProfile] = useState(() => buildDisplayProfile(profile, user));
  const [statusMessage, setStatusMessage] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [isSaving, setIsSaving] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);

  useEffect(() => {
    setLocalProfile(buildDisplayProfile(profile, user));
  }, [profile, user]);

  useEffect(() => {
    const refreshProgress = () => setProgress(readLocalProgress(allLessons));
    refreshProgress();
    return subscribeToProgressChanges(refreshProgress);
  }, [allLessons]);

  if (isLoading) {
    return <ProfileState title="Verificando sessão" description="Carregando autenticação do aluno..." />;
  }

  if (!user) {
    return <ProfileState title="Sessão necessária" description="Entre com sua conta para acessar o perfil." actionHref="/login" actionLabel="Ir para login" />;
  }

  const stats = readUserProfileStats(user.uid, publishedLessonIds.length, publishedLessonIds);
  const displayName = localProfile.displayName || user.displayName || "Aluno";
  const email = user.email ?? localProfile.email ?? "";
  const completedCourses = structures.filter((structure) => {
    const summary = calculateCourseProgress(structure.modules.flatMap((module) => module.lessons), progress);
    return summary.totalLessons > 0 && summary.completedLessons === summary.totalLessons;
  }).length;
  const currentStructure = selectCurrentStructure(structures, progress);
  const currentLessons = currentStructure.modules.flatMap((module) => module.lessons);
  const currentSummary = calculateCourseProgress(currentLessons, progress);
  const currentLesson = findCurrentLesson(allLessons, progress.currentLessonId) ?? currentLessons.find((lesson) => lesson.publicationState === "published");
  const nextObjectives = buildNextObjectives(currentStructure, progress);

  async function handleSave() {
    setStatusMessage(undefined);
    setErrorMessage(undefined);

    if (!user) {
      setErrorMessage("A sessão ainda não está pronta para salvar o perfil.");
      return;
    }

    const trimmedName = localProfile.displayName.trim();
    const trimmedPhoto = localProfile.photoURL?.trim() ?? "";
    const imageError = getImageValidationMessage(trimmedPhoto);

    if (!trimmedName) {
      setErrorMessage("Informe um nome para salvar o perfil.");
      return;
    }

    if (imageError) {
      setErrorMessage(imageError);
      return;
    }

    setIsSaving(true);

    try {
      await updateProfile(user, { displayName: trimmedName, photoURL: trimmedPhoto || null });
      await updateStudentProfile(user.uid, {
        displayName: trimmedName,
        photoURL: trimmedPhoto || null,
        primarySimulator: normalizeOptional(localProfile.primarySimulator),
        favoriteAircraftId: normalizeOptional(localProfile.favoriteAircraftId),
        experienceLevel: normalizeOptional(localProfile.experienceLevel),
        studyGoal: normalizeOptional(localProfile.studyGoal),
        preferredUnit: localProfile.preferredUnit,
        platformLanguage: "pt-BR",
        onboardingCompleted: true
      });
      await refreshProfile();
      setStatusMessage("Perfil salvo com sucesso.");
    } catch {
      setErrorMessage("Não foi possível salvar o perfil agora. Verifique a conexão e tente novamente.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handlePasswordReset() {
    if (!user) {
      setErrorMessage("A sessão ainda não está pronta para redefinir a senha.");
      return;
    }

    if (!email) {
      setErrorMessage("Sua conta não possui e-mail disponível para redefinição.");
      return;
    }

    setIsResettingPassword(true);
    setStatusMessage(undefined);
    setErrorMessage(undefined);

    try {
      await requestPasswordReset(email);
      setStatusMessage("Enviamos um link de redefinição para seu e-mail.");
    } catch {
      setErrorMessage("Não foi possível enviar a redefinição de senha agora.");
    } finally {
      setIsResettingPassword(false);
    }
  }

  return (
    <div className="mx-auto max-w-7xl space-y-5">
      <SectionHeader eyebrow="Perfil" title="Central do aluno" description="Seu progresso, preferências e dados de conta em uma página dedicada da plataforma." />

      <Panel className="bg-white/[0.028]">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <UserAvatar
              src={localProfile.photoURL ?? user.photoURL}
              name={displayName}
              className="inline-flex h-20 w-20 items-center justify-center overflow-hidden rounded-md border border-aviation-cyan/25 bg-aviation-cyan/[0.08] object-cover text-2xl font-semibold text-aviation-cyan"
            />
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-aviation-cyan">Aluno autenticado</p>
              <h2 className="mt-1 text-2xl font-semibold text-white">{displayName}</h2>
              <p className="mt-1 text-sm text-slate-400">{email || "E-mail não informado"}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <StatusPill label={roleLabel(role ?? profile?.role ?? "student")} />
                <StatusPill label={localProfile.experienceLevel || "Experiência não informada"} subtle />
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setActiveTab("preferences")}
            className="focus-ring inline-flex items-center justify-center gap-2 rounded-md bg-aviation-cyan px-4 py-2 text-sm font-semibold text-aviation-ink"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Editar perfil
          </button>
        </div>

        {profileError ? <InlineNotice tone="info" message="Alguns dados remotos do perfil não foram carregados. A página continua usando os dados da sessão e pode ser completada quando o Firebase responder." /> : null}
        {!profile && !isProfileLoading ? <InlineNotice tone="info" message="Este usuário ainda não possui documento de perfil completo. Use as preferências para completar seus dados." /> : null}
        {statusMessage ? <InlineNotice tone="success" message={statusMessage} /> : null}
        {errorMessage ? <InlineNotice tone="error" message={errorMessage} /> : null}
      </Panel>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Progresso geral" value={`${stats.overallProgressPercent}%`} icon={Gauge} />
        <MetricCard label="Cursos concluídos" value={String(completedCourses)} icon={GraduationCap} />
        <MetricCard label="Aulas concluídas" value={`${stats.completedLessons}/${stats.totalLessons}`} icon={BookOpenCheck} />
        <MetricCard label="Treinamentos concluídos" value={String(stats.trainingRecords)} icon={Plane} />
      </section>

      <div className="overflow-x-auto border-b border-white/[0.08]">
        <div className="flex min-w-max gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={clsx(
                  "focus-ring inline-flex items-center gap-2 border-b-2 px-3 py-3 text-sm font-semibold transition",
                  isActive ? "border-aviation-cyan text-aviation-cyan" : "border-transparent text-slate-400 hover:text-white"
                )}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {activeTab === "overview" ? (
        <OverviewTab currentStructure={currentStructure} currentLesson={currentLesson} currentSummary={currentSummary} nextObjectives={nextObjectives} stats={stats} />
      ) : null}
      {activeTab === "progress" ? <ProgressTab structures={structures} progress={progress} /> : null}
      {activeTab === "achievements" ? <AchievementsTab stats={stats} completedCourses={completedCourses} structures={structures} progress={progress} /> : null}
      {activeTab === "preferences" ? (
        <PreferencesTab profile={localProfile} onChange={setLocalProfile} onSave={handleSave} isSaving={isSaving} />
      ) : null}
      {activeTab === "account" ? (
        <AccountTab email={email} onPasswordReset={handlePasswordReset} isResettingPassword={isResettingPassword} onLogout={() => void logout()} />
      ) : null}
    </div>
  );
}

function OverviewTab({ currentStructure, currentLesson, currentSummary, nextObjectives, stats }: { currentStructure: CourseStructure; currentLesson?: LessonDocument; currentSummary: ReturnType<typeof calculateCourseProgress>; nextObjectives: string[]; stats: UserProfileStats }) {
  return (
    <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
      <Panel>
        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Continuar estudando</p>
        <h3 className="mt-2 text-xl font-semibold text-white">{currentLesson?.title ?? currentStructure.course.title}</h3>
        <p className="mt-2 text-sm leading-7 text-slate-400">{currentLesson?.summary ?? currentStructure.course.description}</p>
        <div className="mt-5">
          <ProgressBar value={currentSummary.coursePercent} label={currentStructure.course.title} />
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href={currentLesson ? `/aulas/${currentLesson.slug}` : `/cursos/${currentStructure.course.slug}`} className="focus-ring rounded-md bg-aviation-cyan px-4 py-2 text-sm font-semibold text-aviation-ink">
            Continuar aula
          </Link>
          <Link href={`/cursos/${currentStructure.course.slug}`} className="focus-ring rounded-md border border-white/[0.08] bg-white/[0.035] px-4 py-2 text-sm font-semibold text-white">
            Ver curso atual
          </Link>
        </div>
      </Panel>

      <Panel>
        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Próximos objetivos</p>
        <ol className="mt-4 space-y-3">
          {nextObjectives.map((objective, index) => (
            <li key={objective} className="flex gap-3 rounded-md border border-white/[0.08] bg-white/[0.028] p-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-aviation-cyan/12 text-sm font-semibold text-aviation-cyan">{index + 1}</span>
              <span className="text-sm leading-6 text-slate-300">{objective}</span>
            </li>
          ))}
        </ol>
        <p className="mt-5 text-sm leading-6 text-slate-500">
          Evolução atual: {stats.completedLessons} aula(s) concluída(s) e {stats.trainingRecords} registro(s) de treinamento.
        </p>
      </Panel>
    </div>
  );
}

function ProgressTab({ structures, progress }: { structures: CourseStructure[]; progress: ReturnType<typeof readLocalProgress> }) {
  const unlockedCourseIds = getUnlockedCourseIdsFromProgress(structures, progress);

  return (
    <Panel>
      <div className="space-y-4">
        {structures.map((structure) => {
          const lessons = structure.modules.flatMap((module) => module.lessons);
          const summary = calculateCourseProgress(lessons, progress);
          const status = summary.coursePercent === 100 ? "Concluído" : unlockedCourseIds.includes(structure.course.id) ? summary.completedLessons > 0 ? "Em andamento" : "Disponível" : "Bloqueado";

          return (
            <div key={structure.course.id} className="rounded-md border border-white/[0.08] bg-white/[0.025] p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">{structure.course.title}</p>
                  <p className="mt-1 text-sm text-slate-500">{summary.completedLessons} de {summary.totalLessons} aula(s)</p>
                </div>
                <StatusPill label={status} subtle={status !== "Concluído"} />
              </div>
              <div className="mt-4">
                <ProgressBar value={summary.coursePercent} />
              </div>
            </div>
          );
        })}
      </div>
    </Panel>
  );
}

function AchievementsTab({ stats, completedCourses, structures, progress }: { stats: UserProfileStats; completedCourses: number; structures: CourseStructure[]; progress: ReturnType<typeof readLocalProgress> }) {
  const ifrStructure = structures.find((structure) => structure.course.category === "IFR");
  const ifrCompleted = Boolean(ifrStructure && calculateCourseProgress(ifrStructure.modules.flatMap((module) => module.lessons), progress).coursePercent === 100);
  const achievements = [
    { title: "Primeiras aulas", description: "Concluir a primeira aula da plataforma.", unlocked: stats.completedLessons > 0 },
    { title: "Primeiro curso concluído", description: "Finalizar todos os requisitos de um curso.", unlocked: completedCourses > 0 },
    { title: "Treinamento registrado", description: "Concluir ou registrar um treinamento prático.", unlocked: stats.trainingRecords > 0 },
    { title: "Avaliação realizada", description: "Registrar uma tentativa de avaliação.", unlocked: stats.assessmentAttempts > 0 },
    { title: "Módulo IFR dominado", description: "Concluir a trilha IFR quando ela estiver liberada.", unlocked: ifrCompleted }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {achievements.map((achievement) => (
        <Panel key={achievement.title} className={clsx("bg-white/[0.028]", achievement.unlocked ? "border-aviation-cyan/25" : "opacity-70")}>
          <div className="flex items-start gap-3">
            <div className={clsx("flex h-10 w-10 shrink-0 items-center justify-center rounded-md border", achievement.unlocked ? "border-aviation-cyan/30 bg-aviation-cyan/[0.08] text-aviation-cyan" : "border-white/[0.08] bg-white/[0.03] text-slate-500")}>
              {achievement.unlocked ? <CheckCircle2 className="h-5 w-5" /> : <Award className="h-5 w-5" />}
            </div>
            <div>
              <h3 className="font-semibold text-white">{achievement.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{achievement.description}</p>
            </div>
          </div>
        </Panel>
      ))}
    </div>
  );
}

function PreferencesTab({ profile, onChange, onSave, isSaving }: { profile: DisplayProfile; onChange: (profile: DisplayProfile) => void; onSave: () => void; isSaving: boolean }) {
  return (
    <Panel>
      <div className="grid gap-4 lg:grid-cols-2">
        <TextField label="Nome" value={profile.displayName} onChange={(displayName) => onChange({ ...profile, displayName })} />
        <TextField label="Foto do perfil (URL HTTPS ou /images/...)" value={profile.photoURL ?? ""} onChange={(photoURL) => onChange({ ...profile, photoURL })} />
        <SelectField label="Simulador principal" value={profile.primarySimulator ?? ""} values={["", "Microsoft Flight Simulator 2020", "Microsoft Flight Simulator 2024"]} onChange={(primarySimulator) => onChange({ ...profile, primarySimulator })} />
        <SelectField label="Aeronave favorita" value={profile.favoriteAircraftId ?? ""} values={["", "aircraft-cessna-408-skycourier"]} labels={{ "": "Não informado", "aircraft-cessna-408-skycourier": "Cessna 408 SkyCourier" }} onChange={(favoriteAircraftId) => onChange({ ...profile, favoriteAircraftId })} />
        <SelectField label="Nível de experiência" value={profile.experienceLevel ?? ""} values={["", "Iniciante", "Intermediário", "Avançado"]} onChange={(experienceLevel) => onChange({ ...profile, experienceLevel })} />
        <SelectField label="Unidade preferida" value={profile.preferredUnit ?? "mixed"} values={["metric", "imperial", "mixed"]} labels={{ metric: "Métrica", imperial: "Imperial", mixed: "Mista" }} onChange={(preferredUnit) => onChange({ ...profile, preferredUnit: preferredUnit as DisplayProfile["preferredUnit"] })} />
        <label className="block lg:col-span-2">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Objetivo de estudo</span>
          <textarea value={profile.studyGoal ?? ""} onChange={(event) => onChange({ ...profile, studyGoal: event.target.value })} rows={4} className="focus-ring mt-2 w-full rounded-md border border-white/[0.08] bg-[#050c14]/80 px-3 py-3 text-sm text-white placeholder:text-slate-500" placeholder="Ex.: dominar navegação IFR no simulador com o C408." />
        </label>
      </div>
      <div className="mt-5 flex justify-end">
        <button type="button" onClick={onSave} disabled={isSaving} className="focus-ring inline-flex items-center gap-2 rounded-md bg-aviation-cyan px-4 py-2 text-sm font-semibold text-aviation-ink disabled:cursor-not-allowed disabled:opacity-60">
          {isSaving ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {isSaving ? "Salvando..." : "Salvar perfil"}
        </button>
      </div>
    </Panel>
  );
}

function AccountTab({ email, onPasswordReset, isResettingPassword, onLogout }: { email: string; onPasswordReset: () => void; isResettingPassword: boolean; onLogout: () => void }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Panel>
        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Conta</p>
        <h3 className="mt-2 text-lg font-semibold text-white">{email || "E-mail não informado"}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-400">Use as ações abaixo para redefinir senha ou sair com segurança deste dispositivo.</p>
      </Panel>
      <Panel className="space-y-3">
        <button type="button" onClick={onPasswordReset} disabled={isResettingPassword} className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-md border border-aviation-cyan/30 bg-aviation-cyan/[0.08] px-4 py-2 text-sm font-semibold text-aviation-cyan disabled:cursor-not-allowed disabled:opacity-60">
          <RefreshCw className={clsx("h-4 w-4", isResettingPassword && "animate-spin")} />
          {isResettingPassword ? "Enviando..." : "Enviar redefinição de senha"}
        </button>
        <button type="button" onClick={onLogout} className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-md border border-white/[0.08] bg-white/[0.035] px-4 py-2 text-sm font-semibold text-white">
          <LogOut className="h-4 w-4" />
          Sair da conta
        </button>
      </Panel>
    </div>
  );
}

type DisplayProfile = Pick<StudentProfileDocument, "displayName" | "email" | "photoURL" | "primarySimulator" | "favoriteAircraftId" | "experienceLevel" | "studyGoal" | "preferredUnit" | "platformLanguage">;

function buildDisplayProfile(profile: StudentProfileDocument | undefined, user: ReturnType<typeof useAuth>["user"]): DisplayProfile {
  return {
    displayName: profile?.displayName ?? user?.displayName ?? "Aluno",
    email: profile?.email ?? user?.email ?? "",
    photoURL: profile?.photoURL ?? user?.photoURL ?? undefined,
    primarySimulator: profile?.primarySimulator ?? "Microsoft Flight Simulator 2024",
    favoriteAircraftId: profile?.favoriteAircraftId ?? "aircraft-cessna-408-skycourier",
    experienceLevel: profile?.experienceLevel ?? "",
    studyGoal: profile?.studyGoal ?? "",
    preferredUnit: profile?.preferredUnit ?? "mixed",
    platformLanguage: "pt-BR"
  };
}

function selectCurrentStructure(structures: CourseStructure[], progress: ReturnType<typeof readLocalProgress>) {
  const unlockedCourseIds = getUnlockedCourseIdsFromProgress(structures, progress);
  const orderedStructures = [...structures].sort((a, b) => a.course.order - b.course.order);
  return (
    orderedStructures.find((structure) => {
      const summary = calculateCourseProgress(structure.modules.flatMap((module) => module.lessons), progress);
      return unlockedCourseIds.includes(structure.course.id) && summary.totalLessons > 0 && summary.coursePercent < 100;
    }) ??
    orderedStructures.find((structure) => unlockedCourseIds.includes(structure.course.id)) ??
    orderedStructures[0]
  );
}

function findCurrentLesson(lessons: LessonDocument[], lessonId?: string) {
  return lessons.find((lesson) => lesson.id === lessonId && lesson.publicationState === "published");
}

function buildNextObjectives(structure: CourseStructure, progress: ReturnType<typeof readLocalProgress>) {
  const lessons = structure.modules.flatMap((module) => module.lessons).filter((lesson) => lesson.publicationState === "published");
  const pendingLesson = lessons.find((lesson) => !progress.completedLessonIds.includes(lesson.id));
  const pendingModule = structure.modules.find((module) => module.lessons.some((lesson) => lesson.publicationState === "published" && !progress.completedLessonIds.includes(lesson.id)));

  return [
    pendingLesson ? `Concluir: ${pendingLesson.title}` : "Revisar o curso concluído",
    pendingModule ? `Avançar no módulo: ${pendingModule.title}` : "Escolher a próxima trilha disponível",
    "Registrar prática no simulador após o estudo"
  ];
}

function normalizeOptional(value?: string) {
  const trimmed = value?.trim();
  return trimmed || undefined;
}

function roleLabel(role: string) {
  const labels: Record<string, string> = {
    student: "Aluno",
    instructor: "Instrutor",
    admin: "Administrador"
  };

  return labels[role] ?? "Aluno";
}

function StatusPill({ label, subtle = false }: { label: string; subtle?: boolean }) {
  return (
    <span className={clsx("rounded-sm border px-2 py-1 text-xs font-semibold", subtle ? "border-white/[0.08] bg-white/[0.035] text-slate-300" : "border-aviation-cyan/25 bg-aviation-cyan/[0.08] text-aviation-cyan")}>
      {label}
    </span>
  );
}

function InlineNotice({ message, tone }: { message: string; tone: "info" | "success" | "error" }) {
  return (
    <div
      className={clsx(
        "mt-4 rounded-md border p-3 text-sm",
        tone === "info" && "border-aviation-cyan/20 bg-aviation-cyan/[0.06] text-slate-200",
        tone === "success" && "border-aviation-mint/25 bg-aviation-mint/[0.07] text-slate-100",
        tone === "error" && "border-red-400/30 bg-red-500/[0.06] text-red-100"
      )}
    >
      {message}
    </div>
  );
}

function TextField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{label}</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} className="focus-ring mt-2 h-11 w-full rounded-md border border-white/[0.08] bg-[#050c14]/80 px-3 text-sm text-white placeholder:text-slate-500" />
    </label>
  );
}

function SelectField({ label, value, values, labels, onChange }: { label: string; value: string; values: string[]; labels?: Record<string, string>; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="focus-ring mt-2 h-11 w-full rounded-md border border-white/[0.08] bg-[#050c14]/80 px-3 text-sm text-white">
        {values.map((item) => (
          <option key={item} value={item}>
            {labels?.[item] ?? (item || "Não informado")}
          </option>
        ))}
      </select>
    </label>
  );
}

function ProfileState({ title, description, actionHref, actionLabel }: { title: string; description: string; actionHref?: string; actionLabel?: string }) {
  return (
    <Panel className="mx-auto max-w-3xl">
      <p className="text-xs uppercase tracking-[0.18em] text-aviation-cyan">Perfil</p>
      <h2 className="mt-2 text-xl font-semibold text-white">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
      {actionHref && actionLabel ? (
        <Link href={actionHref} className="focus-ring mt-4 inline-flex rounded-md bg-aviation-cyan px-4 py-2 text-sm font-semibold text-aviation-ink">
          {actionLabel}
        </Link>
      ) : null}
    </Panel>
  );
}
