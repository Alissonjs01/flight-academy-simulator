import { ArrowRight, Plane } from "lucide-react";
import Link from "next/link";
import type { AircraftDocument } from "@/features/aircraft/types";
import { getAircraftStudyStatusLabel } from "@/features/aircraft/statusLabels";
import { Panel } from "@/components/ui/Panel";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SafeImage } from "@/components/ui/SafeImage";

type AircraftCardProps = {
  aircraft: AircraftDocument;
};

export function AircraftCard({ aircraft }: AircraftCardProps) {
  const isCurrent = aircraft.studyStatus === "current";

  return (
    <Link href={`/aeronaves/${aircraft.slug}`} className="focus-ring block h-full">
      <Panel className="group flex h-full flex-col overflow-hidden p-0 transition hover:border-aviation-cyan/45">
        <div className="relative overflow-hidden border-b border-white/[0.08]">
          <SafeImage src={aircraft.mainImage.url} alt={aircraft.mainImage.alt} className="aspect-[16/9] w-full object-cover opacity-85 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100" fallbackLabel={aircraft.mainImage.caption} />
          <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-md border border-aviation-cyan/25 bg-[#06111c]/80 text-aviation-cyan backdrop-blur">
            <Plane className="h-5 w-5" />
          </div>
        </div>
        <div className="flex flex-1 flex-col p-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-aviation-cyan">{aircraft.category}</span>
            {isCurrent ? <span className="rounded-sm border border-aviation-mint/30 bg-aviation-mint/[0.08] px-2 py-1 text-xs font-semibold text-aviation-mint">Em estudo</span> : null}
          </div>
          <h3 className="mt-4 text-xl font-semibold text-white">{aircraft.fullName}</h3>
          <p className="mt-1 text-sm text-slate-400">{aircraft.manufacturer} {aircraft.model}</p>
          <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-300">{aircraft.description}</p>
          <div className="mt-5">
            <ProgressBar value={aircraft.progressPercent} label="Progresso de estudo" />
          </div>
          <div className="mt-auto flex items-center justify-between pt-5 text-sm font-semibold text-aviation-cyan">
            <span>{getAircraftStudyStatusLabel(aircraft.studyStatus)}</span>
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </div>
        </div>
      </Panel>
    </Link>
  );
}
