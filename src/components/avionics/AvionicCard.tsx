import { ArrowRight, Gauge } from "lucide-react";
import Link from "next/link";
import type { AvionicDocument } from "@/features/avionics/types";
import { getAvionicStudyStatusLabel } from "@/features/avionics/statusLabels";
import { Panel } from "@/components/ui/Panel";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SafeImage } from "@/components/ui/SafeImage";

export function AvionicCard({ avionic }: { avionic: AvionicDocument }) {
  return (
    <Link href={`/avionicos/${avionic.slug}`} className="focus-ring block h-full">
      <Panel className="group flex h-full flex-col overflow-hidden p-0 transition hover:border-aviation-cyan/45">
        <div className="relative overflow-hidden border-b border-white/[0.08]">
          <SafeImage src={avionic.image.url} alt={avionic.image.alt} className="aspect-[16/9] w-full object-cover opacity-85 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100" fallbackLabel={avionic.image.caption} />
          <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-md border border-aviation-cyan/25 bg-[#06111c]/80 text-aviation-cyan backdrop-blur">
            <Gauge className="h-5 w-5" />
          </div>
        </div>
        <div className="flex flex-1 flex-col p-4">
          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-aviation-cyan">{avionic.manufacturer}</span>
          </div>
          <h3 className="mt-4 text-xl font-semibold text-white">{avionic.name}</h3>
          <p className="mt-1 text-sm text-slate-400">Versão {avionic.version}</p>
          <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-300">{avionic.description}</p>
          <div className="mt-5">
            <ProgressBar value={avionic.progressPercent} label="Progresso de estudo" />
          </div>
          <div className="mt-auto flex items-center justify-between pt-5 text-sm font-semibold text-aviation-cyan">
            <span>{getAvionicStudyStatusLabel(avionic.studyStatus)}</span>
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </div>
        </div>
      </Panel>
    </Link>
  );
}
