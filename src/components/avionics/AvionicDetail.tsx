"use client";

import clsx from "clsx";
import { BookOpen, Gauge, ListChecks, Plane, Target } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { type ReactNode, useState } from "react";
import type { AvionicProfile, AvionicSectionDocument } from "@/features/avionics/types";
import { avionicStudyStatusLabels } from "@/features/avionics/statusLabels";
import { Panel } from "@/components/ui/Panel";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SafeImage } from "@/components/ui/SafeImage";
import { TechnicalMetadataSummary } from "@/components/technical/TechnicalMetadataSummary";

type AvionicDetailProps = {
  profile: AvionicProfile;
};

type TabId = "overview" | "components" | "procedures" | "trainings" | "courses" | string;

export function AvionicDetail({ profile }: AvionicDetailProps) {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const { avionic } = profile;
  const sectionTabs = profile.sections.map((section) => ({ id: section.slug, label: section.title, icon: Gauge }));
  const tabs: Array<{ id: TabId; label: string; icon: LucideIcon }> = [
    { id: "overview", label: "Visão geral", icon: Gauge },
    ...sectionTabs,
    { id: "components", label: "Componentes", icon: ListChecks },
    { id: "procedures", label: "Procedimentos", icon: Target },
    { id: "trainings", label: "Treinamentos", icon: Plane },
    { id: "courses", label: "Cursos", icon: BookOpen }
  ];
  const activeSection = profile.sections.find((section) => section.slug === activeTab);

  return (
    <div className="mx-auto max-w-7xl space-y-5">
      <Panel className="overflow-hidden p-0">
        <div className="grid gap-0 lg:grid-cols-[minmax(0,1.2fr)_minmax(20rem,0.8fr)]">
          <div className="p-5 sm:p-6">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-sm border border-aviation-cyan/30 bg-aviation-cyan/[0.08] px-2 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-aviation-cyan">
                {avionicStudyStatusLabels[avionic.studyStatus]}
              </span>
              <span className="rounded-sm border border-white/10 bg-white/[0.04] px-2 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-300">
                {avionic.manufacturer} {avionic.version}
              </span>
            </div>
            <h1 className="mt-4 text-3xl font-semibold tracking-normal text-white sm:text-4xl">{avionic.name}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">{avionic.description}</p>
            <div className="mt-6 max-w-2xl">
              <ProgressBar value={avionic.progressPercent} label="Progresso de estudo do aviônico" />
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <Spec label="Fabricante" value={avionic.manufacturer} />
              <Spec label="Versão" value={avionic.version} />
              <Spec label="Publicação" value={avionic.publicationState === "published" ? "Publicado" : "Rascunho"} />
            </div>
          </div>
          <MediaPanel src={avionic.image.url} alt={avionic.image.alt} caption={avionic.image.caption} />
        </div>
      </Panel>

      <div className="rounded-md border border-white/10 bg-white/[0.035] p-2">
        <div className="flex gap-2 overflow-x-auto">
          {tabs.map((tab) => {
            const TabIcon = tab.icon;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={clsx(
                  "focus-ring inline-flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold",
                  activeTab === tab.id ? "bg-aviation-cyan text-aviation-ink" : "text-slate-300 hover:bg-white/[0.06] hover:text-white"
                )}
              >
                <TabIcon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {activeTab === "overview" ? <OverviewTab profile={profile} /> : null}
      {activeSection ? <SectionTab section={activeSection} /> : null}
      {activeTab === "components" ? <ComponentsTab profile={profile} /> : null}
      {activeTab === "procedures" ? <ProceduresTab profile={profile} /> : null}
      {activeTab === "trainings" ? <TrainingsTab profile={profile} /> : null}
      {activeTab === "courses" ? <CoursesTab profile={profile} /> : null}
    </div>
  );
}

function OverviewTab({ profile }: AvionicDetailProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <Panel>
        <h2 className="text-xl font-semibold text-white">Visão geral</h2>
        <p className="mt-3 text-sm leading-7 text-slate-300">{profile.avionic.description}</p>
        <div className="mt-5">
          <TechnicalMetadataSummary metadata={profile.avionic.technicalMetadata} />
        </div>
      </Panel>
      <Panel>
        <h3 className="font-semibold text-white">Relacionamentos</h3>
        <div className="mt-4 space-y-3">
          <Spec label="Aeronaves compatíveis" value={`${profile.avionic.compatibleAircraftIds.length} cadastro(s)`} />
          <Spec label="Cursos" value={`${profile.courses.length} curso(s)`} />
          <Spec label="Componentes" value={`${profile.components.length} componente(s)`} />
          <Spec label="Treinamentos" value={`${profile.trainings.length} treinamento(s)`} />
        </div>
      </Panel>
    </div>
  );
}

function SectionTab({ section }: { section: AvionicSectionDocument }) {
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <Panel>
        <p className="text-xs uppercase tracking-[0.18em] text-aviation-cyan">Seção</p>
        <h2 className="mt-2 text-xl font-semibold text-white">{section.title}</h2>
        <p className="mt-3 text-sm leading-7 text-slate-300">{section.body}</p>
        <div className="mt-5">
          <TechnicalMetadataSummary metadata={section.technicalMetadata} />
        </div>
        <div className="mt-5">
          <MediaPanel src={section.image?.url} alt={section.image?.alt ?? section.title} caption={section.image?.caption} compact />
        </div>
      </Panel>
      <Panel>
        <h3 className="font-semibold text-white">Campos preparados</h3>
        <Block title="Pontos destacados" items={section.highlights} />
        <Block title="Exemplos" items={section.examples} />
        <div className="mt-5">
          <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Links internos para aulas</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {section.internalLessonSlugs.map((slug) => (
              <Link key={slug} href={`/aulas/${slug}`} className="focus-ring rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white">
                Abrir aula
              </Link>
            ))}
          </div>
        </div>
      </Panel>
    </div>
  );
}

function ComponentsTab({ profile }: AvionicDetailProps) {
  return (
    <Panel>
      <h2 className="text-xl font-semibold text-white">Componentes</h2>
      <RecordGrid
        items={profile.components}
        emptyText="Nenhum componente cadastrado."
        renderItem={(item) => (
          <>
            <p className="font-semibold text-white">{item.title}</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">{item.summary}</p>
            <p className="mt-3 text-xs uppercase tracking-[0.16em] text-slate-500">{item.sectionSlug}</p>
            <TechnicalMetadataSummary metadata={item.technicalMetadata} compact />
          </>
        )}
      />
    </Panel>
  );
}

function ProceduresTab({ profile }: AvionicDetailProps) {
  return (
    <Panel>
      <h2 className="text-xl font-semibold text-white">Procedimentos</h2>
      <RecordGrid
        items={profile.procedures}
        emptyText="Nenhum procedimento cadastrado."
        renderItem={(item) => (
          <>
            <p className="font-semibold text-white">{item.title}</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              {item.steps.map((step) => (
                <li key={step}>• {step}</li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-6 text-aviation-amber">{item.note}</p>
            <TechnicalMetadataSummary metadata={item.technicalMetadata} compact />
          </>
        )}
      />
    </Panel>
  );
}

function TrainingsTab({ profile }: AvionicDetailProps) {
  return (
    <Panel>
      <h2 className="text-xl font-semibold text-white">Treinamentos</h2>
      <RecordGrid
        items={profile.trainings}
        emptyText="Nenhum treinamento cadastrado."
        renderItem={(item) => (
          <>
            <p className="text-xs uppercase tracking-[0.16em] text-aviation-cyan">{item.status === "available" ? "Disponível" : "Planejado"}</p>
            <p className="mt-2 font-semibold text-white">{item.title}</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">{item.objective}</p>
            <p className="mt-3 text-sm text-slate-500">{item.duration}</p>
            <TechnicalMetadataSummary metadata={item.technicalMetadata} compact />
          </>
        )}
      />
    </Panel>
  );
}

function CoursesTab({ profile }: AvionicDetailProps) {
  return (
    <Panel>
      <h2 className="text-xl font-semibold text-white">Cursos</h2>
      {profile.courses.length ? (
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {profile.courses.map((course) => (
            <Link key={course.id} href={`/cursos/${course.slug}`} className="focus-ring rounded-md border border-white/10 bg-white/[0.035] p-4 transition hover:border-aviation-cyan/45">
              <p className="font-semibold text-white">{course.title}</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">{course.relation}</p>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyInline text="Nenhum curso relacionado." />
      )}
    </Panel>
  );
}

function MediaPanel({ src, alt, caption, compact = false }: { src?: string; alt: string; caption?: string; compact?: boolean }) {
  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center overflow-hidden border-white/10 bg-gradient-to-br from-slate-950 via-aviation-ink to-slate-800 text-center",
        compact ? "min-h-60 rounded-md border" : "min-h-full border-l"
      )}
    >
      <SafeImage src={src} alt={alt} className="h-full min-h-60 w-full object-cover" fallbackLabel={caption ?? "Diagrama pendente"} />
      <div className="w-full border-t border-white/10 bg-aviation-ink/85 p-4">
        <p className="text-sm font-semibold text-white">{caption ?? "Mídia futura vinculada por URL HTTPS ou /images."}</p>
      </div>
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-white/[0.035] p-3">
      <p className="text-xs uppercase tracking-[0.14em] text-slate-500">{label}</p>
      <p className="mt-2 text-sm font-semibold leading-6 text-white">{value}</p>
    </div>
  );
}

function Block({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-5">
      <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{title}</p>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
        {items.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}

function RecordGrid<T extends { id: string }>({ items, emptyText, renderItem }: { items: T[]; emptyText: string; renderItem: (item: T) => ReactNode }) {
  if (!items.length) {
    return <EmptyInline text={emptyText} />;
  }

  return <div className="mt-4 grid gap-3 md:grid-cols-2">{items.map((item) => <div key={item.id} className="rounded-md border border-white/10 bg-white/[0.035] p-4">{renderItem(item)}</div>)}</div>;
}

function EmptyInline({ text }: { text: string }) {
  return <p className="mt-4 rounded-md border border-white/10 bg-white/[0.035] p-4 text-sm text-slate-500">{text}</p>;
}
