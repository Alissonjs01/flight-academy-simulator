"use client";

import clsx from "clsx";
import {
  BookOpen,
  Boxes,
  Cable,
  CheckSquare,
  ClipboardList,
  Gauge,
  Plane,
  Settings2,
  ShieldAlert,
  SlidersHorizontal,
  Snowflake,
  Target,
  Zap
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { type ReactNode, useMemo, useState } from "react";
import type { AircraftProfile, AircraftSystemDocument } from "@/features/aircraft/types";
import { aircraftStudyStatusLabels } from "@/features/aircraft/statusLabels";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SafeImage } from "@/components/ui/SafeImage";

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
  { id: "checklists", label: "Checklists", icon: CheckSquare },
  { id: "trainings", label: "Treinamentos", icon: Target },
  { id: "courses", label: "Cursos relacionados", icon: BookOpen }
];

const systemIcons: Record<string, LucideIcon> = {
  propulsion: Cable,
  fuel: Gauge,
  electrical: Zap,
  iceProtection: Snowflake,
  flightControls: SlidersHorizontal,
  landingGear: Settings2,
  brakes: Settings2,
  lighting: Zap,
  avionics: Gauge,
  warningSystems: ShieldAlert,
  other: Boxes
};

export function AircraftDetail({ profile }: AircraftDetailProps) {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const { aircraft } = profile;

  return (
    <div className="mx-auto max-w-[96rem] space-y-5">
      <header className="border-b border-white/[0.08] pb-0">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-semibold tracking-normal text-white sm:text-4xl">{aircraft.fullName}</h1>
              <span className="text-2xl leading-none text-slate-500">☆</span>
            </div>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">{aircraft.category}</p>
          </div>
          <div className="w-full max-w-xs">
            <ProgressBar value={aircraft.progressPercent} label="Progresso" />
          </div>
        </div>

        <nav className="tech-scrollbar mt-5 flex gap-7 overflow-x-auto" aria-label="Abas da aeronave">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={clsx(
                  "focus-ring group relative inline-flex min-h-12 shrink-0 items-center gap-2 px-1 text-sm font-medium transition",
                  isActive ? "text-aviation-cyan" : "text-slate-400 hover:text-white"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
                <span className={clsx("absolute inset-x-0 bottom-0 h-0.5 rounded-full transition", isActive ? "bg-aviation-cyan shadow-[0_0_18px_rgba(57,215,255,0.75)]" : "bg-transparent")} />
              </button>
            );
          })}
        </nav>
      </header>

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
  const specs = [
    ["Tripulação", "1-2"],
    ["Capacidade", aircraft.capacity],
    ["Alcance", aircraft.range],
    ["Motores", aircraft.numberOfEngines === null ? aircraft.engineType : `${aircraft.numberOfEngines} ${aircraft.engineType}`],
    ["Teto operacional", aircraft.serviceCeiling],
    ["Cruzeiro", aircraft.cruiseSpeed]
  ];

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(22rem,0.92fr)_minmax(0,1fr)]">
      <div className="overflow-hidden rounded-md border border-white/[0.08] bg-white/[0.035]">
        <SafeImage src={aircraft.mainImage.url} alt={aircraft.mainImage.alt} className="aspect-[4/3] h-full w-full object-cover" fallbackLabel={aircraft.mainImage.caption} />
      </div>

      <section className="flex flex-col justify-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-aviation-cyan">{aircraftStudyStatusLabels[aircraft.studyStatus]}</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-normal text-white">{aircraft.fullName}</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">{aircraft.description}</p>

        <div className="mt-7 grid gap-x-6 gap-y-4 border-y border-white/[0.08] py-5 sm:grid-cols-2 xl:grid-cols-3">
          {specs.map(([label, value]) => (
            <SpecLine key={label} label={label} value={value} />
          ))}
        </div>
      </section>
    </div>
  );
}

function PanelTab({ profile }: AircraftDetailProps) {
  return (
    <ChapterLayout
      title="Painel"
      items={profile.installedAvionics.map((item) => ({ ...item, title: item.name, icon: Gauge }))}
      emptyLabel="Nenhum aviônico cadastrado."
      render={(item) => (
        <Article title={item.name} subtitle="Aviônico instalado">
          <p>{item.summary}</p>
        </Article>
      )}
    />
  );
}

function SystemsTab({ profile }: AircraftDetailProps) {
  return (
    <ChapterLayout
      title="Sistemas"
      items={profile.systems.map((item) => ({ ...item, icon: systemIcons[item.category ?? "other"] ?? Boxes }))}
      emptyLabel="Nenhum sistema cadastrado."
      render={(item) => (
        <Article title={item.title} subtitle={categoryLabel(item.category)}>
          <p>{item.summary}</p>
          <p>{item.details}</p>
          <SystemDetailBlocks system={item} />
        </Article>
      )}
    />
  );
}

function LimitationsTab({ profile }: AircraftDetailProps) {
  return (
    <ChapterLayout
      title="Limitações"
      items={profile.limitations.map((item) => ({ ...item, icon: ShieldAlert }))}
      emptyLabel="Nenhuma limitação cadastrada."
      render={(item) => (
        <Article title={item.title} subtitle={categoryLabel(item.category)}>
          <div className="rounded-md border border-white/[0.08] bg-white/[0.035] p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Valor</p>
            <p className="mt-2 text-lg font-semibold text-white">{item.value}</p>
          </div>
          <p>{item.note}</p>
        </Article>
      )}
    />
  );
}

function ProceduresTab({ profile }: AircraftDetailProps) {
  return (
    <ChapterLayout
      title="Procedimentos"
      items={profile.procedures.map((item) => ({ ...item, icon: SlidersHorizontal }))}
      emptyLabel="Nenhum procedimento cadastrado."
      render={(item) => (
        <Article title={item.title} subtitle={item.phase}>
          <Timeline
            items={item.steps.map((step, index) => {
              const text = typeof step === "string" ? step : [step.action, step.expectedPositionOrValue].filter(Boolean).join(" - ");
              return { id: typeof step === "string" ? `${item.id}-${index}` : step.id, text };
            })}
          />
          <p>{item.safetyNote}</p>
        </Article>
      )}
    />
  );
}

function ChecklistsTab({ profile }: AircraftDetailProps) {
  return (
    <ChapterLayout
      title="Checklists"
      items={profile.checklists.map((item) => ({ ...item, icon: ClipboardList }))}
      emptyLabel="Nenhum checklist cadastrado."
      render={(item) => (
        <Article title={item.title} subtitle={item.phase}>
          <ChecklistTable items={item.items} />
        </Article>
      )}
    />
  );
}

function TrainingsTab({ profile }: AircraftDetailProps) {
  return (
    <section>
      <h2 className="text-2xl font-semibold text-white">Treinamentos</h2>
      <p className="mt-2 text-sm text-slate-400">Treinamentos cadastrados para desenvolver familiaridade com a aeronave no simulador.</p>
      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {profile.trainings.map((item) => (
          <div key={item.id} className="overflow-hidden rounded-md border border-white/[0.08] bg-white/[0.035]">
            <div className="flex aspect-[16/9] items-center justify-center bg-white/[0.035] text-aviation-cyan">
              <Target className="h-8 w-8" />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold text-white">{item.title}</p>
                <span className="rounded-sm border border-aviation-cyan/25 bg-aviation-cyan/[0.08] px-2 py-1 text-[0.68rem] font-semibold text-aviation-cyan">
                  {item.status === "available" ? "Disponível" : "Planejado"}
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-300">{item.objective}</p>
              <p className="mt-4 text-xs uppercase tracking-[0.16em] text-slate-500">{item.duration}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CoursesTab({ profile }: AircraftDetailProps) {
  return (
    <section>
      <h2 className="text-2xl font-semibold text-white">Cursos relacionados</h2>
      <p className="mt-2 text-sm text-slate-400">Cursos que complementam o aprendizado desta aeronave.</p>
      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {profile.relatedCourses.map((course) => (
          <Link key={course.id} href={`/cursos/${course.slug}`} className="focus-ring rounded-md border border-white/[0.08] bg-white/[0.035] p-5 text-center transition hover:border-aviation-cyan/45 hover:bg-aviation-cyan/[0.06]">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-md border border-aviation-cyan/25 bg-aviation-cyan/[0.08] text-aviation-cyan">
              <BookOpen className="h-7 w-7" />
            </div>
            <p className="mt-5 font-semibold text-white">{course.title}</p>
            <p className="mt-2 text-sm leading-6 text-slate-400">{course.relation}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

type ChapterItem = {
  id: string;
  title: string;
  icon: LucideIcon;
};

function ChapterLayout<T extends ChapterItem>({ title, items, emptyLabel, render }: { title: string; items: T[]; emptyLabel: string; render: (item: T) => ReactNode }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const activeItem = useMemo(() => items.find((item) => item.id === activeId) ?? items[0], [activeId, items]);

  if (!activeItem) {
    return <p className="rounded-md border border-white/[0.08] bg-white/[0.035] p-5 text-sm text-slate-400">{emptyLabel}</p>;
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[22rem_minmax(0,1fr)]">
      <aside className="rounded-md border border-white/[0.08] bg-white/[0.035] p-4">
        <h2 className="px-2 text-xl font-semibold text-white">{title}</h2>
        <nav className="tech-scrollbar mt-4 max-h-[calc(100dvh-15rem)] space-y-1 overflow-y-auto pr-1" aria-label={title}>
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem.id === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveId(item.id)}
                className={clsx(
                  "focus-ring flex min-h-11 w-full items-center gap-3 rounded-md px-3 text-left text-sm transition",
                  isActive ? "bg-aviation-cyan/[0.13] text-aviation-cyan" : "text-slate-300 hover:bg-white/[0.05] hover:text-white"
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span>{item.title}</span>
              </button>
            );
          })}
        </nav>
      </aside>
      {render(activeItem)}
    </div>
  );
}

function Article({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <article className="min-w-0">
      {subtitle ? <p className="text-xs uppercase tracking-[0.18em] text-aviation-cyan">{subtitle}</p> : null}
      <h2 className="mt-2 text-3xl font-semibold tracking-normal text-white">{title}</h2>
      <div className="mt-5 max-w-5xl space-y-5 text-base leading-8 text-slate-300">{children}</div>
    </article>
  );
}

function SpecLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <Gauge className="mt-1 h-4 w-4 shrink-0 text-aviation-cyan" />
      <div>
        <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{label}</p>
        <p className="mt-1 text-sm font-semibold leading-6 text-slate-100">{value}</p>
      </div>
    </div>
  );
}

function SystemDetailBlocks({ system }: { system: AircraftSystemDocument }) {
  const blocks = [
    { title: "Componentes", items: system.components },
    { title: "Controles", items: system.controls },
    { title: "Indicações", items: system.indications },
    { title: "Avisos", items: system.warnings },
    { title: "Cuidados", items: system.cautions },
    { title: "Notas", items: system.notes }
  ].filter((block) => block.items?.length);

  const textBlocks = [
    { title: "Operação normal", body: system.normalOperation },
    { title: "Considerações anormais", body: system.abnormalConsiderations }
  ].filter((block) => block.body);

  if (!blocks.length && !textBlocks.length && !system.subsections?.length) {
    return null;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {blocks.map((block) => (
        <div key={block.title} className="overflow-hidden rounded-md border border-white/[0.08] bg-white/[0.035]">
          <div className="p-4">
            <p className="font-semibold text-white">{block.title}</p>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
              {block.items?.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
      {textBlocks.map((block) => (
        <div key={block.title} className="rounded-md border border-white/[0.08] bg-white/[0.035] p-4">
          <p className="font-semibold text-white">{block.title}</p>
          <p className="mt-3 text-sm leading-6 text-slate-300">{block.body}</p>
        </div>
      ))}
      {system.subsections?.map((section) => (
        <div key={section.id} className="rounded-md border border-white/[0.08] bg-white/[0.035] p-4">
          <p className="font-semibold text-white">{section.title}</p>
          <p className="mt-3 text-sm leading-6 text-slate-300">{section.body}</p>
        </div>
      ))}
    </div>
  );
}

function Timeline({ items }: { items: Array<{ id: string; text: string }> }) {
  return (
    <ol className="space-y-4">
      {items.map((item, index) => (
        <li key={item.id} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-4">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-aviation-cyan text-xs font-semibold text-aviation-ink">{index + 1}</span>
          <p className="border-b border-white/[0.08] pb-4 text-sm leading-7 text-slate-300">{item.text}</p>
        </li>
      ))}
    </ol>
  );
}

function ChecklistTable({ items }: { items: string[] }) {
  return (
    <div className="overflow-hidden rounded-md border border-white/[0.08]">
      <div className="grid grid-cols-[minmax(0,1fr)_12rem] bg-white/[0.035] px-4 py-3 text-xs uppercase tracking-[0.16em] text-slate-500">
        <span>Ação</span>
        <span>Status</span>
      </div>
      {items.map((item) => (
        <div key={item} className="grid grid-cols-[minmax(0,1fr)_12rem] border-t border-white/[0.08] px-4 py-3 text-sm text-slate-300">
          <span>{item}</span>
          <span className="text-slate-500">Pendente</span>
        </div>
      ))}
    </div>
  );
}

function categoryLabel(value?: string) {
  if (!value) {
    return "Capítulo";
  }

  const labels: Record<string, string> = {
    electrical: "Elétrico",
    fuel: "Combustível",
    hydraulic: "Hidráulico",
    pneumatic: "Pneumático",
    environmental: "Climatização",
    flightControls: "Controles de voo",
    landingGear: "Trem de pouso",
    brakes: "Freios",
    iceProtection: "Proteção contra gelo",
    fireProtection: "Proteção contra fogo",
    propulsion: "Propulsão",
    avionics: "Aviônicos",
    navigation: "Navegação",
    communication: "Comunicação",
    lighting: "Iluminação",
    warningSystems: "Alertas",
    airspeed: "Velocidade",
    altitude: "Altitude",
    weight: "Peso",
    centerOfGravity: "Centro de gravidade",
    engine: "Motor",
    propeller: "Hélice",
    temperature: "Temperatura",
    loadFactor: "Fator de carga",
    runway: "Pista",
    weather: "Meteorologia",
    icing: "Gelo",
    autopilot: "Piloto automático",
    operational: "Operacional",
    other: "Outros"
  };

  return labels[value] ?? value;
}
