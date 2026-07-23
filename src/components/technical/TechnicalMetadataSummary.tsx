import clsx from "clsx";
import { AlertTriangle, FileText, ShieldCheck, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { classificationLabels, platformTechnicalDisclaimer, provisionalTechnicalMetadata, verificationStatusLabels } from "@/features/technical/defaults";
import type { TechnicalMetadata } from "@/features/technical/types";

type TechnicalMetadataSummaryProps = {
  metadata?: TechnicalMetadata;
  compact?: boolean;
};

export function TechnicalMetadataSummary({ metadata, compact = false }: TechnicalMetadataSummaryProps) {
  const resolved = metadata ?? provisionalTechnicalMetadata({ revisionNotes: "Metadados técnicos ainda não cadastrados para este conteúdo." });
  const isProvisional = resolved.contentClassification === "provisional_unverified" || resolved.verificationStatus === "pending_verification";
  const isSimulatorAdaptation = resolved.contentClassification === "simulator_adaptation";
  const hasDifferences = Boolean(resolved.knownSimulatorDifferences);

  return (
    <section className={clsx("rounded-md border border-white/10 bg-white/[0.035]", compact ? "mt-3 p-3" : "p-4")}>
      <div className="flex flex-wrap gap-2">
        <Badge tone={isProvisional ? "amber" : "cyan"} label={classificationLabels[resolved.contentClassification]} />
        <Badge tone={resolved.verificationStatus === "verified" ? "mint" : "amber"} label={verificationStatusLabels[resolved.verificationStatus]} />
        {resolved.markedForReview ? <Badge tone="amber" label="Marcado para revisão" /> : null}
      </div>

      {!compact ? (
        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          <MetaLine icon={FileText} label="Fonte" value={sourceLabel(resolved)} />
          <MetaLine icon={ShieldCheck} label="Variante" value={variantLabel(resolved)} />
          <MetaLine icon={Wrench} label="Simulador/Add-on" value={simulatorLabel(resolved)} />
        </div>
      ) : (
        <p className="mt-3 text-xs leading-5 text-slate-400">{sourceLabel(resolved)}</p>
      )}

      {resolved.lastReviewedAt ? <p className="mt-3 text-xs text-slate-500">Última revisão: {formatDate(resolved.lastReviewedAt)}</p> : null}

      {isProvisional ? (
        <Notice tone="amber" text="Conteúdo provisório ou pendente de verificação. Não trate este material como referência operacional real." />
      ) : null}

      {isSimulatorAdaptation ? <Notice tone="cyan" text={resolved.simulatorAdaptationNotes ?? "Conteúdo adaptado para uso em simulador."} /> : null}
      {hasDifferences ? <Notice tone="amber" text={`Diferenças conhecidas do simulador: ${resolved.knownSimulatorDifferences}`} /> : null}
      <p className="mt-3 text-xs leading-5 text-slate-500">{resolved.technicalDisclaimer ?? platformTechnicalDisclaimer}</p>
    </section>
  );
}

function Badge({ label, tone }: { label: string; tone: "amber" | "cyan" | "mint" }) {
  return (
    <span
      className={clsx(
        "rounded-sm border px-2 py-1 text-xs font-semibold",
        tone === "amber" && "border-aviation-amber/25 bg-aviation-amber/[0.08] text-aviation-amber",
        tone === "cyan" && "border-aviation-cyan/25 bg-aviation-cyan/[0.08] text-aviation-cyan",
        tone === "mint" && "border-aviation-mint/25 bg-aviation-mint/[0.08] text-aviation-mint"
      )}
    >
      {label}
    </span>
  );
}

function MetaLine({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="flex gap-3 rounded-md border border-white/10 bg-aviation-ink/35 p-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-aviation-cyan" />
      <div>
        <p className="text-xs uppercase tracking-[0.14em] text-slate-500">{label}</p>
        <p className="mt-1 text-sm leading-6 text-slate-200">{value}</p>
      </div>
    </div>
  );
}

function Notice({ text, tone }: { text: string; tone: "amber" | "cyan" }) {
  return (
    <div
      className={clsx(
        "mt-3 flex gap-2 rounded-md border p-3 text-sm leading-6",
        tone === "amber" && "border-aviation-amber/25 bg-aviation-amber/[0.08] text-slate-200",
        tone === "cyan" && "border-aviation-cyan/25 bg-aviation-cyan/[0.08] text-slate-200"
      )}
    >
      <AlertTriangle className={clsx("mt-0.5 h-4 w-4 shrink-0", tone === "amber" ? "text-aviation-amber" : "text-aviation-cyan")} />
      <p>{text}</p>
    </div>
  );
}

function sourceLabel(metadata: TechnicalMetadata) {
  const parts = [metadata.sourceTitle, metadata.sourceOrganization, metadata.sourceEdition, metadata.sourceRevision, metadata.sourcePage ? `p. ${metadata.sourcePage}` : undefined].filter(Boolean);
  return parts.length ? parts.join(" · ") : "Fonte ainda não cadastrada.";
}

function variantLabel(metadata: TechnicalMetadata) {
  const parts = [metadata.aircraftManufacturer, metadata.aircraftModel, metadata.aircraftVariant].filter(Boolean);
  return parts.length ? parts.join(" ") : "Variante real ainda não informada.";
}

function simulatorLabel(metadata: TechnicalMetadata) {
  const parts = [metadata.simulatorPlatform, metadata.simulatorAircraftVariant, metadata.simulatorDeveloper, metadata.addonVersion].filter(Boolean);
  return parts.length ? parts.join(" · ") : "Versão do simulador/add-on ainda não informada.";
}

function formatDate(date: string) {
  const [year, month, day] = date.split("-");
  return day && month && year ? `${day}/${month}/${year}` : date;
}
