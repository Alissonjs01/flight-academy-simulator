"use client";

import clsx from "clsx";
import { BookOpen, Gauge, ListChecks, Plane, Settings2, ShieldAlert, SlidersHorizontal, Target } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { type ReactNode, useState } from "react";
import type { AircraftProfile } from "@/features/aircraft/types";
import { aircraftStudyStatusLabels } from "@/features/aircraft/statusLabels";
import { Panel } from "@/components/ui/Panel";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SafeImage } from "@/components/ui/SafeImage";
import { TechnicalMetadataSummary } from "@/components/technical/TechnicalMetadataSummary";

type AircraftDetailProps = {
  profile: AircraftProfile;
};

type TabId = "overview" | "panel" | "systems" | "limitations" | "procedures" | "checklists" | "trainings" | "courses";

const tabs: Array<{ id: TabId; label: string; icon: LucideIcon }> = [
  { id: "overview", label: "Visão geral", icon: Plane },
  { id: "panel", label: "Painel", icon: Gauge },
  { id: "systems", label: "Sistemas", icon: Settings2 },
  { id: "limitations", label: "Limitações", icon: ShieldAlert },
  { id: "procedures", label: "Procedimentos", icon: SlidersHorizontal },
  { id: "checklists", label: "Checklists", icon: ListChecks },
  { id: "trainings", label: "Treinamentos", icon: Target },
  { id: "courses", label: "Cursos relacionados", icon: BookOpen }
];

export function AircraftDetail({ profile }: AircraftDetailProps) {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const { aircraft } = profile;

  return (
    <div className="mx-auto max-w-7xl space-y-5">
      <Panel className="overflow-hidden p-0">
        <div className="grid gap-0 lg:grid-cols-[minmax(0,1.2fr)_minmax(20rem,0.8fr)]">
          <div className="p-5 sm:p-6">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-sm border border-aviation-cyan/30 bg-aviation-cyan/[0.08] px-2 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-aviation-cyan">
                {aircraftStudyStatusLabels[aircraft.studyStatus]}
              </span>
              {aircraft.publicationState === "draft" ? (
                <span className="rounded-sm border border-aviation-amber/30 bg-aviation-amber/[0.08] px-2 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-aviation-amber">
                  Rascunho
                </span>
              ) : null}
            </div>
            <h1 className="mt-4 text-3xl font-semibold tracking-normal text-white sm:text-4xl">{aircraft.fullName}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">{aircraft.description}</p>
            <div className="mt-6 max-w-2xl">
              <ProgressBar value={aircraft.progressPercent} label="Progresso de estudo da aeronave" />
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <Spec label="Fabricante" value={aircraft.manufacturer} />
              <Spec label="Modelo" value={aircraft.model} />
              <Spec label="Categoria" value={aircraft.category} />
              <Spec label="Motores" value={aircraft.numberOfEngines === null ? "Dados provisórios" : `${aircraft.numberOfEngines} ${aircraft.engineType}`} />
            </div>
          </div>
          <AircraftImagePanel src={aircraft.mainImage.url} alt={aircraft.mainImage.alt} caption={aircraft.mainImage.caption} />
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
      {activeTab === "panel" ? <PanelTab profile={profile} /> : null}
      {activeTab === "systems" ? <SystemsTab profile={profile} /> : null}
      {activeTab === "limitations" ? <LimitationsTab profile={profile} /> : null}
      {activeTab === "procedures" ? <ProceduresTab profile={profile} /> : null}
      {activeTab === "checklists" ? <ChecklistsTab profile={profile} /> : null}
      {activeTab === "trainings" ? <TrainingsTab profile={profile} /> : null}
      {activeTab === "courses" ? <CoursesTab profile={profile} /> : null}
    </div>
  );
}

function OverviewTab({ profile }: AircraftDetailProps) {
  const { aircraft } = profile;

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <Panel>
        <h2 className="text-xl font-semibold text-white">Visão geral</h2>
        <p className="mt-3 text-sm leading-7 text-slate-300">{aircraft.description}</p>
        <div className="mt-5">
          <TechnicalMetadataSummary metadata={aircraft.technicalMetadata} />
        </div>
      </Panel>
      <Panel>
        <h3 className="font-semibold text-white">Dados técnicos</h3>
        <div className="mt-4 space-y-3">
          <Spec label="Velocidade de cruzeiro" value={aircraft.cruiseSpeed} />
          <Spec label="Alcance" value={aircraft.range} />
          <Spec label="Teto operacional" value={aircraft.serviceCeiling} />
          <Spec label="Capacidade" value={aircraft.capacity} />
        </div>
      </Panel>
    </div>
  );
}

function PanelTab({ profile }: AircraftDetailProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <Panel>
        <h2 className="text-xl font-semibold text-white">Painel</h2>
        <p className="mt-3 text-sm leading-7 text-slate-300">Área preparada para imagens do painel, fluxos de cockpit e referências visuais validadas.</p>
        <div className="mt-5">
          <AircraftImagePanel alt="Painel da aeronave" caption="Imagem do painel pendente." compact />
        </div>
      </Panel>
      <Panel>
        <h3 className="font-semibold text-white">Aviônicos instalados</h3>
        <div className="mt-4 space-y-3">
          {profile.installedAvionics.length ? (
            profile.installedAvionics.map((avionic) => (
              <div key={avionic.id} className="rounded-md border border-white/10 bg-white/[0.035] p-3">
                <p className="font-semibold text-white">{avionic.name}</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">{avionic.summary}</p>
                <TechnicalMetadataSummary metadata={avionic.technicalMetadata} compact />
              </div>
            ))
          ) : (
            <EmptyInline text="Nenhum aviônico cadastrado para esta aeronave." />
          )}
        </div>
      </Panel>
    </div>
  );
}

function SystemsTab({ profile }: AircraftDetailProps) {
  return (
    <Panel>
      <h2 className="text-xl font-semibold text-white">Sistemas</h2>
      <RecordGrid
        items={profile.systems}
        emptyText="Nenhum sistema cadastrado ainda."
        renderItem={(item) => (
          <>
            <p className="font-semibold text-white">{item.title}</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">{item.summary}</p>
            <p className="mt-3 text-sm leading-6 text-slate-500">{item.details}</p>
            <TechnicalMetadataSummary metadata={item.technicalMetadata} compact />
          </>
        )}
      />
    </Panel>
  );
}

function LimitationsTab({ profile }: AircraftDetailProps) {
  return (
    <Panel>
      <h2 className="text-xl font-semibold text-white">Limitações</h2>
      <RecordGrid
        items={profile.limitations}
        emptyText="Nenhuma limitação cadastrada ainda."
        renderItem={(item) => (
          <>
            <p className="font-semibold text-white">{item.title}</p>
            <p className="mt-2 text-sm leading-6 text-aviation-amber">{item.value}</p>
            <p className="mt-3 text-sm leading-6 text-slate-400">{item.note}</p>
            <TechnicalMetadataSummary metadata={item.technicalMetadata} compact />
          </>
        )}
      />
    </Panel>
  );
}

function ProceduresTab({ profile }: AircraftDetailProps) {
  return (
    <Panel>
      <h2 className="text-xl font-semibold text-white">Procedimentos</h2>
      <RecordGrid
        items={profile.procedures}
        emptyText="Nenhum procedimento cadastrado ainda."
        renderItem={(item) => (
          <>
            <p className="text-xs uppercase tracking-[0.16em] text-aviation-cyan">{item.phase}</p>
            <p className="mt-2 font-semibold text-white">{item.title}</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              {item.steps.map((step, index) => {
                const stepId = typeof step === "string" ? `${item.id}-step-${index}` : step.id;
                const stepText = typeof step === "string" ? step : [step.action, step.expectedPositionOrValue].filter(Boolean).join(" — ");
                return (
                  <li key={stepId}>• {stepText}</li>
                );
              })}
            </ul>
            <p className="mt-4 text-sm leading-6 text-aviation-amber">{item.safetyNote}</p>
            <TechnicalMetadataSummary metadata={item.technicalMetadata} compact />
          </>
        )}
      />
    </Panel>
  );
}

function ChecklistsTab({ profile }: AircraftDetailProps) {
  return (
    <Panel>
      <h2 className="text-xl font-semibold text-white">Checklists</h2>
      <RecordGrid
        items={profile.checklists}
        emptyText="Nenhum checklist cadastrado ainda."
        renderItem={(item) => (
          <>
            <p className="text-xs uppercase tracking-[0.16em] text-aviation-cyan">{item.phase}</p>
            <p className="mt-2 font-semibold text-white">{item.title}</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              {item.items.map((step) => (
                <li key={step}>• {step}</li>
              ))}
            </ul>
            <TechnicalMetadataSummary metadata={item.technicalMetadata} compact />
          </>
        )}
      />
    </Panel>
  );
}

function TrainingsTab({ profile }: AircraftDetailProps) {
  return (
    <Panel>
      <h2 className="text-xl font-semibold text-white">Treinamentos</h2>
      <RecordGrid
        items={profile.trainings}
        emptyText="Nenhum treinamento cadastrado ainda."
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

function CoursesTab({ profile }: AircraftDetailProps) {
  return (
    <Panel>
      <h2 className="text-xl font-semibold text-white">Cursos relacionados</h2>
      {profile.relatedCourses.length ? (
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {profile.relatedCourses.map((course) => (
            <Link key={course.id} href={`/cursos/${course.slug}`} className="focus-ring rounded-md border border-white/10 bg-white/[0.035] p-4 transition hover:border-aviation-cyan/45">
              <p className="font-semibold text-white">{course.title}</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">{course.relation}</p>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyInline text="Nenhum curso relacionado cadastrado ainda." />
      )}
    </Panel>
  );
}

function AircraftImagePanel({ src, alt, caption, compact = false }: { src?: string; alt: string; caption?: string; compact?: boolean }) {
  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center overflow-hidden border-white/10 bg-gradient-to-br from-slate-950 via-aviation-ink to-slate-800 text-center",
        compact ? "min-h-64 rounded-md border" : "min-h-full border-l"
      )}
    >
      <SafeImage src={src} alt={alt} className="h-full min-h-64 w-full object-cover" fallbackLabel={caption ?? "Imagem pendente"} />
      <div className="w-full border-t border-white/10 bg-aviation-ink/85 p-4">
        <p className="text-sm font-semibold text-white">{caption ?? "Imagem a ser vinculada quando houver mídia validada."}</p>
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

function RecordGrid<T extends { id: string }>({ items, emptyText, renderItem }: { items: T[]; emptyText: string; renderItem: (item: T) => ReactNode }) {
  if (!items.length) {
    return <EmptyInline text={emptyText} />;
  }

  return <div className="mt-4 grid gap-3 md:grid-cols-2">{items.map((item) => <div key={item.id} className="rounded-md border border-white/10 bg-white/[0.035] p-4">{renderItem(item)}</div>)}</div>;
}

function EmptyInline({ text }: { text: string }) {
  return <p className="mt-4 rounded-md border border-white/10 bg-white/[0.035] p-4 text-sm text-slate-500">{text}</p>;
}
