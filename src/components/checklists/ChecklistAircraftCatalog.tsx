import { ArrowRight, ClipboardCheck, Plane } from "lucide-react";
import Link from "next/link";
import { SafeImage } from "@/components/ui/SafeImage";
import type { AircraftDocument } from "@/features/aircraft/types";
import type { ChecklistDocument } from "@/features/checklists/types";

type ChecklistAircraftCatalogProps = {
  aircraft: AircraftDocument[];
  checklists: ChecklistDocument[];
};

export function ChecklistAircraftCatalog({ aircraft, checklists }: ChecklistAircraftCatalogProps) {
  const availableAircraft = aircraft
    .filter((item) => item.publicationState === "published" && item.studyStatus === "current")
    .map((item) => ({
      aircraft: item,
      phaseCount: new Set(checklists.filter((checklist) => checklist.aircraftId === item.id && checklist.publicationState === "published").map((checklist) => checklist.flightPhase)).size
    }))
    .filter((item) => item.phaseCount > 0);

  if (!availableAircraft.length) {
    return (
      <div className="rounded-md border border-white/[0.08] bg-white/[0.026] p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md border border-aviation-cyan/25 bg-aviation-cyan/10 text-aviation-cyan">
          <ClipboardCheck className="h-6 w-6" />
        </div>
        <h2 className="mt-4 text-lg font-semibold text-white">Nenhuma aeronave com checklist disponível</h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">Quando uma aeronave tiver checklists publicados, ela aparecerá aqui.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {availableAircraft.map(({ aircraft: item, phaseCount }) => (
        <article key={item.id} className="overflow-hidden rounded-md border border-white/[0.08] bg-[#07111d] transition hover:border-aviation-cyan/35">
          <div className="relative h-48 overflow-hidden">
            <SafeImage
              src={item.mainImage.url}
              alt={item.mainImage.alt}
              fallbackLabel={item.fullName}
              className="h-full w-full object-cover transition duration-500 hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07111d] via-transparent to-transparent" />
          </div>
          <div className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-aviation-cyan">{item.manufacturer}</p>
                <h2 className="mt-2 text-xl font-semibold text-white">{item.fullName}</h2>
              </div>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-aviation-cyan/25 bg-aviation-cyan/10 text-aviation-cyan">
                <Plane className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-400">{item.category}</p>
            <div className="mt-5 flex items-center justify-between rounded-md border border-white/[0.08] bg-white/[0.035] px-3 py-2">
              <span className="text-sm text-slate-400">Fases disponíveis</span>
              <span className="text-sm font-semibold text-white">{phaseCount}</span>
            </div>
            <Link
              href={`/checklists/${item.slug}`}
              className="focus-ring mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-aviation-cyan px-4 py-3 text-sm font-semibold text-[#06101c]"
            >
              Abrir checklist
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
