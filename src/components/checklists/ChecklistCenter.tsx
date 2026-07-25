import clsx from "clsx";
import { ClipboardList, Plane } from "lucide-react";
import { SafeImage } from "@/components/ui/SafeImage";
import { EmptyState } from "@/components/ui/StateMessage";
import type { AircraftDocument } from "@/features/aircraft/types";
import type { ChecklistDocument } from "@/features/checklists/types";
import { getFlightPhaseLabel, operationalFlightPhaseOrder } from "@/features/checklists/statusLabels";

type ChecklistCenterProps = {
  aircraft: AircraftDocument;
  checklists: ChecklistDocument[];
};

type CockpitRegion = "overhead" | "frontal" | "pedestal";

const regionLabels: Record<CockpitRegion, string> = {
  overhead: "OVERHEAD",
  frontal: "FRONTAL",
  pedestal: "PEDESTAL"
};

const regionStyles: Record<CockpitRegion, { dot: string; border: string; text: string }> = {
  overhead: {
    dot: "bg-aviation-cyan",
    border: "border-l-aviation-cyan",
    text: "text-aviation-cyan"
  },
  frontal: {
    dot: "bg-sky-300",
    border: "border-l-sky-300",
    text: "text-sky-300"
  },
  pedestal: {
    dot: "bg-emerald-300",
    border: "border-l-emerald-300",
    text: "text-emerald-300"
  }
};

export function ChecklistCenter({ aircraft, checklists }: ChecklistCenterProps) {
  const orderedChecklists = orderChecklists(checklists);
  const totalItems = orderedChecklists.reduce((total, checklist) => total + checklist.items.length, 0);

  if (!orderedChecklists.length) {
    return (
      <EmptyState
        title="Nenhum checklist disponível"
        description="Esta aeronave ainda não possui checklists publicados para consulta rápida."
      />
    );
  }

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-md border border-white/[0.08] bg-[#07111d]">
        <div className="grid gap-0 lg:grid-cols-[minmax(19rem,0.82fr)_minmax(0,1.18fr)]">
          <div className="relative min-h-56 overflow-hidden border-b border-white/[0.08] lg:border-b-0 lg:border-r lg:border-white/[0.08]">
            <SafeImage
              src={aircraft.mainImage.url}
              alt={aircraft.mainImage.alt}
              fallbackLabel={aircraft.fullName}
              className="h-full min-h-56 w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#06101c]/45 via-transparent to-transparent" />
          </div>
          <div className="flex flex-col justify-center p-5 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-aviation-cyan">Checklist de consulta rápida</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">{aircraft.fullName}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
              Todos os procedimentos ficam em uma única página, na ordem do voo, para consulta rápida no tablet ou em uma segunda tela.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Metric label="Seções" value={orderedChecklists.length} />
              <Metric label="Itens rápidos" value={totalItems} />
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-md border border-white/[0.08] bg-white/[0.026] p-4 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-base font-semibold text-white">Legenda do cockpit</h2>
            <p className="mt-1 text-sm leading-6 text-slate-400">A etiqueta indica onde procurar o comando ou referência principal.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {(["overhead", "frontal", "pedestal"] as CockpitRegion[]).map((region) => (
              <span key={region} className="inline-flex items-center gap-2 rounded-md border border-white/[0.08] bg-[#07111d] px-3 py-2 text-xs font-semibold text-slate-200">
                <span className={clsx("h-2.5 w-2.5 rounded-full", regionStyles[region].dot)} />
                {regionLabels[region]}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="grid gap-4 xl:grid-cols-2">
        {orderedChecklists.map((checklist) => (
          <section key={checklist.id} className="overflow-hidden rounded-md border border-white/[0.08] bg-[#07111d]/92">
            <div className="border-b border-white/[0.08] px-4 py-4 sm:px-5">
              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-aviation-cyan/25 bg-aviation-cyan/10 text-aviation-cyan">
                  <ClipboardList className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-aviation-cyan">
                    {String(checklist.order).padStart(2, "0")} · {getFlightPhaseLabel(checklist.flightPhase)}
                  </p>
                  <h2 className="mt-1 text-xl font-semibold text-white">{checklist.title}</h2>
                </div>
              </div>
            </div>

            <div className="divide-y divide-white/[0.07]">
              {checklist.items.map((item) => {
                const region = getCockpitRegion(checklist, item.text);
                const style = regionStyles[region];

                return (
                  <div key={item.id} className={clsx("grid gap-2 border-l-2 px-4 py-3 sm:grid-cols-[6rem_minmax(0,1fr)_minmax(7rem,0.38fr)] sm:items-start sm:px-5", style.border)}>
                    <span className={clsx("text-[0.66rem] font-semibold tracking-[0.14em]", style.text)}>{regionLabels[region]}</span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white">{item.text}</p>
                      {item.observation ? <p className="mt-1 text-xs leading-5 text-slate-500">{item.observation}</p> : null}
                    </div>
                    <p className="text-sm font-semibold text-slate-300 sm:text-right">{item.expectedResponse}</p>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <div className="rounded-md border border-white/[0.08] bg-white/[0.026] p-4 text-sm leading-6 text-slate-400">
        <div className="flex items-start gap-3">
          <Plane className="mt-0.5 h-5 w-5 shrink-0 text-aviation-cyan" />
          <p>
            Consulta rápida para simulador. Ela não registra conclusão, não salva marcações e não interfere no progresso dos cursos.
          </p>
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-md border border-white/[0.08] bg-white/[0.035] p-3">
      <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className="mt-1 text-xl font-semibold text-white">{value}</p>
    </div>
  );
}

function orderChecklists(checklists: ChecklistDocument[]) {
  return [...checklists].sort((a, b) => {
    const phaseA = operationalFlightPhaseOrder.indexOf(a.flightPhase);
    const phaseB = operationalFlightPhaseOrder.indexOf(b.flightPhase);
    const safePhaseA = phaseA === -1 ? Number.MAX_SAFE_INTEGER : phaseA;
    const safePhaseB = phaseB === -1 ? Number.MAX_SAFE_INTEGER : phaseB;

    return safePhaseA - safePhaseB || a.order - b.order;
  });
}

function getCockpitRegion(checklist: ChecklistDocument, itemText: string): CockpitRegion {
  const text = `${checklist.title} ${itemText}`.toLocaleLowerCase("pt-BR");

  if (
    matchesAny(text, [
      "battery",
      "beacon",
      "lights",
      "landing lights",
      "taxi light",
      "generators",
      "generator",
      "avionics",
      "ice protection"
    ])
  ) {
    return "overhead";
  }

  if (
    matchesAny(text, [
      "parking brake",
      "power",
      "power levers",
      "prop",
      "condition",
      "fuel",
      "flaps",
      "trim",
      "brakes",
      "start",
      "engine 1 start",
      "engine 2 start",
      "beta"
    ])
  ) {
    return "pedestal";
  }

  return "frontal";
}

function matchesAny(value: string, terms: string[]) {
  return terms.some((term) => value.includes(term));
}
