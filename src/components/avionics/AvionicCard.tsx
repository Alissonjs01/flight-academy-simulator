import { ArrowRight, Gauge } from "lucide-react";
import Link from "next/link";
import type { AvionicDocument } from "@/features/avionics/types";
import { getAvionicStudyStatusLabel } from "@/features/avionics/statusLabels";
import { Panel } from "@/components/ui/Panel";
import { ProgressBar } from "@/components/ui/ProgressBar";

export function AvionicCard({ avionic }: { avionic: AvionicDocument }) {
  return (
    <Link href={`/avionicos/${avionic.slug}`} className="focus-ring block h-full">
      <Panel className="flex h-full flex-col overflow-hidden p-0 transition hover:border-aviation-cyan/45">
        <div className="flex aspect-[16/9] items-center justify-center border-b border-white/10 bg-gradient-to-br from-slate-950 via-aviation-ink to-slate-800">
          <div className="flex h-16 w-16 items-center justify-center rounded-md border border-aviation-cyan/25 bg-aviation-cyan/[0.08] text-aviation-cyan">
            <Gauge className="h-8 w-8" />
          </div>
        </div>
        <div className="flex flex-1 flex-col p-4">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-sm border border-white/10 bg-white/[0.04] px-2 py-1 text-xs font-semibold text-slate-300">{avionic.manufacturer}</span>
            <span className="rounded-sm border border-aviation-mint/30 bg-aviation-mint/[0.08] px-2 py-1 text-xs font-semibold text-aviation-mint">
              {getAvionicStudyStatusLabel(avionic.studyStatus)}
            </span>
          </div>
          <h3 className="mt-4 text-xl font-semibold text-white">{avionic.name}</h3>
          <p className="mt-1 text-sm text-slate-400">Versão {avionic.version}</p>
          <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-300">{avionic.description}</p>
          <div className="mt-5">
            <ProgressBar value={avionic.progressPercent} label="Progresso de estudo" />
          </div>
          <div className="mt-auto flex items-center justify-between pt-5 text-sm font-semibold text-aviation-cyan">
            <span>{avionic.publicationState === "published" ? "Publicado" : "Rascunho"}</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </Panel>
    </Link>
  );
}
