"use client";

import { AlertTriangle, ArrowDown, ArrowUp, Copy, FileSearch, GitCompare, Layers, Plus, RotateCcw, Trash2 } from "lucide-react";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { Panel } from "@/components/ui/Panel";
import type { AdminContentPayload, AdminEntityType } from "@/features/admin/types";
import { classificationLabels, verificationStatusLabels } from "@/features/technical/defaults";
import type { ContentClassification, SourceType, TechnicalMetadata, VerificationStatus } from "@/features/technical/types";

type EditorProps = {
  entityType: AdminEntityType;
  payload: AdminContentPayload;
  initialPayload?: AdminContentPayload;
  setField: (field: string, value: unknown) => void;
};

const specializedEntities: AdminEntityType[] = [
  "aircraftSystem",
  "aircraftLimitation",
  "aircraftProcedure",
  "aircraftPerformance",
  "lesson",
  "checklist"
];

const systemCategories = [
  "electrical",
  "fuel",
  "hydraulic",
  "pneumatic",
  "environmental",
  "flightControls",
  "landingGear",
  "brakes",
  "iceProtection",
  "fireProtection",
  "propulsion",
  "avionics",
  "navigation",
  "communication",
  "lighting",
  "warningSystems",
  "other"
] as const;

const limitationCategories = [
  "airspeed",
  "altitude",
  "weight",
  "centerOfGravity",
  "engine",
  "propeller",
  "temperature",
  "fuel",
  "loadFactor",
  "runway",
  "weather",
  "icing",
  "autopilot",
  "avionics",
  "operational",
  "other"
] as const;

const procedureTypes = ["normal", "abnormal", "emergency", "supplementary", "simulatorAdaptation", "trainingOnly"] as const;
const procedurePhases = [
  "preflight",
  "cockpitPreparation",
  "beforeStart",
  "engineStart",
  "afterStart",
  "taxi",
  "beforeTakeoff",
  "takeoff",
  "climb",
  "cruise",
  "descent",
  "approach",
  "landing",
  "afterLanding",
  "shutdown",
  "securing",
  "goAround",
  "rejectedTakeoff",
  "emergency"
] as const;

const performanceTypes = [
  "takeoffDistance",
  "landingDistance",
  "climbPerformance",
  "cruisePerformance",
  "fuelFlow",
  "endurance",
  "range",
  "ceiling",
  "weightAndBalance",
  "runwayCorrection",
  "temperatureCorrection",
  "windCorrection",
  "other"
] as const;

const lessonBlockTypes = [
  "heading",
  "paragraph",
  "bulletList",
  "numberedList",
  "image",
  "simpleTable",
  "callout",
  "warning",
  "caution",
  "note",
  "definition",
  "example",
  "commonMistake",
  "simulatorApplication",
  "technicalSource",
  "simulatorDifference",
  "checklistReference",
  "exerciseReference",
  "aircraftReference",
  "avionicsReference",
  "summary",
  "knowledgeCheck"
] as const;

const sourceTypeOptions: SourceType[] = [
  "afm_poh",
  "fcom",
  "qrh",
  "sop",
  "manufacturer_documentation",
  "avionics_manual",
  "simulator_developer_documentation",
  "official_aeronautical_publication",
  "trusted_technical_reference",
  "internal_training_material",
  "not_applicable",
  "other"
];

const classificationOptions = Object.keys(classificationLabels) as ContentClassification[];
const verificationOptions = Object.keys(verificationStatusLabels) as VerificationStatus[];

export function hasSpecializedTechnicalEditor(entityType: AdminEntityType) {
  return specializedEntities.includes(entityType);
}

export function SpecializedTechnicalEditor({ entityType, payload, initialPayload, setField }: EditorProps) {
  return (
    <div className="space-y-4">
      <TechnicalGuardrailPanel />
      {entityType === "aircraftSystem" ? <AircraftSystemEditor payload={payload} setField={setField} /> : null}
      {entityType === "aircraftLimitation" ? <AircraftLimitationEditor payload={payload} setField={setField} /> : null}
      {entityType === "aircraftProcedure" ? <AircraftProcedureEditor payload={payload} setField={setField} /> : null}
      {entityType === "aircraftPerformance" ? <AircraftPerformanceEditor payload={payload} setField={setField} /> : null}
      {entityType === "lesson" ? <LessonBlockEditor payload={payload} setField={setField} /> : null}
      {entityType === "checklist" ? <ChecklistVersionEditor payload={payload} initialPayload={initialPayload} setField={setField} /> : null}
      <SourceMetadataEditor payload={payload} setField={setField} />
      <VerificationWorkflowEditor payload={payload} setField={setField} />
    </div>
  );
}

export function RevisionComparator({ previous, current }: { previous?: AdminContentPayload; current: AdminContentPayload }) {
  const changes = useMemo(() => comparePayloads(previous, current), [previous, current]);
  return (
    <Panel>
      <div className="flex items-center gap-2 text-sm font-semibold text-white">
        <GitCompare className="h-4 w-4 text-aviation-cyan" />
        Comparador de revisão
      </div>
      <p className="mt-2 text-xs leading-5 text-slate-400">Compara campos por nome e listas ordenadas por ID estável sempre que disponível.</p>
      <div className="mt-4 max-h-72 space-y-2 overflow-auto pr-1">
        {changes.length ? changes.map((change) => (
          <div key={`${change.field}-${change.kind}`} className="rounded-md border border-white/10 bg-white/[0.035] p-3 text-xs">
            <p className="font-semibold text-white">{change.field}</p>
            <p className="mt-1 text-slate-400">{change.kind}</p>
          </div>
        )) : <p className="text-sm text-slate-400">Nenhuma alteração detectada nesta sessão.</p>}
      </div>
    </Panel>
  );
}

export function DeletionImpactPanel({ entityType, payload }: { entityType: AdminEntityType; payload: AdminContentPayload }) {
  const impacts = getPotentialImpacts(entityType, payload);
  return (
    <Panel className="border-aviation-amber/20">
      <div className="flex items-center gap-2 text-sm font-semibold text-white">
        <FileSearch className="h-4 w-4 text-aviation-amber" />
        Impacto antes de excluir
      </div>
      <p className="mt-2 text-xs leading-5 text-slate-400">Exclusões críticas devem ser evitadas quando houver progresso, sessões, revisões ou referências. Prefira arquivar.</p>
      <ul className="mt-4 space-y-2 text-xs text-slate-300">
        {impacts.map((impact) => (
          <li key={impact} className="rounded-md border border-white/10 bg-white/[0.035] p-2">{impact}</li>
        ))}
      </ul>
    </Panel>
  );
}

function TechnicalGuardrailPanel() {
  return (
    <Panel className="border-aviation-amber/20 bg-aviation-amber/[0.04]">
      <div className="flex items-start gap-3">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-aviation-amber" />
        <div>
          <h4 className="text-sm font-semibold text-white">Guarda-corpo técnico</h4>
          <p className="mt-1 text-sm leading-6 text-slate-300">
            Não preencha limitações, procedimentos ou performance por aproximação. Dados sem fonte continuam provisórios e pendentes; adaptações do simulador devem ficar identificadas.
          </p>
        </div>
      </div>
    </Panel>
  );
}

function AircraftSystemEditor({ payload, setField }: Pick<EditorProps, "payload" | "setField">) {
  return (
    <Panel>
      <h4 className="text-sm font-semibold text-white">Editor de sistemas da aeronave</h4>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <RelationshipSelector label="Aeronave" value={stringValue(payload.aircraftId)} onChange={(value) => setField("aircraftId", value)} placeholder="ID da aeronave, ex.: aircraft-c408-skycourier" />
        <TextField label="Variante real" value={stringValue(payload.aircraftVariant)} onChange={(value) => setField("aircraftVariant", value)} />
        <TextField label="Variante no simulador" value={stringValue(payload.simulatorAircraftVariant)} onChange={(value) => setField("simulatorAircraftVariant", value)} />
        <SelectField label="Categoria" value={stringValue(payload.category, "other")} options={systemCategories.map((item) => [item, item])} onChange={(value) => setField("category", value)} />
        <TextAreaField label="Resumo" value={stringValue(payload.summary)} onChange={(value) => setField("summary", value)} />
        <TextAreaField label="Descrição estruturada" value={stringValue(payload.description ?? payload.details)} onChange={(value) => setField("description", value)} />
        <TagListEditor label="Componentes" values={stringArray(payload.components)} onChange={(value) => setField("components", value)} />
        <TagListEditor label="Controles" values={stringArray(payload.controls)} onChange={(value) => setField("controls", value)} />
        <TagListEditor label="Indicações" values={stringArray(payload.indications)} onChange={(value) => setField("indications", value)} />
        <TagListEditor label="Warnings" values={stringArray(payload.warnings)} onChange={(value) => setField("warnings", value)} />
        <TagListEditor label="Cautions" values={stringArray(payload.cautions)} onChange={(value) => setField("cautions", value)} />
        <TagListEditor label="Notes" values={stringArray(payload.notes)} onChange={(value) => setField("notes", value)} />
        <TextAreaField label="Operação normal" value={stringValue(payload.normalOperation)} onChange={(value) => setField("normalOperation", value)} />
        <TextAreaField label="Considerações anormais" value={stringValue(payload.abnormalConsiderations)} onChange={(value) => setField("abnormalConsiderations", value)} />
        <TagListEditor label="Sistemas relacionados (IDs)" values={stringArray(payload.relatedSystemIds)} onChange={(value) => setField("relatedSystemIds", value)} className="md:col-span-2" />
        <SubsectionEditor sections={objectArray(payload.subsections)} onChange={(value) => setField("subsections", value)} />
      </div>
    </Panel>
  );
}

function AircraftLimitationEditor({ payload, setField }: Pick<EditorProps, "payload" | "setField">) {
  return (
    <Panel>
      <h4 className="text-sm font-semibold text-white">Editor de limitações</h4>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <RelationshipSelector label="Aeronave" value={stringValue(payload.aircraftId)} onChange={(value) => setField("aircraftId", value)} placeholder="ID da aeronave" />
        <SelectField label="Categoria" value={stringValue(payload.category, "other")} options={limitationCategories.map((item) => [item, item])} onChange={(value) => setField("category", value)} />
        <TextField label="Variante real aplicável" value={stringValue(payload.aircraftVariant)} onChange={(value) => setField("aircraftVariant", value)} />
        <TextField label="Variante no simulador" value={stringValue(payload.simulatorAircraftVariant)} onChange={(value) => setField("simulatorAircraftVariant", value)} />
        <TextField label="Valor original" value={stringValue(payload.value)} onChange={(value) => setField("value", value)} />
        <TextField label="Unidade original" value={stringValue(payload.unit)} onChange={(value) => setField("unit", value)} />
        <TextField label="Valor mínimo" value={stringValue(payload.minValue)} onChange={(value) => setField("minValue", value)} />
        <TextField label="Valor máximo" value={stringValue(payload.maxValue)} onChange={(value) => setField("maxValue", value)} />
        <TextField label="Condição" value={stringValue(payload.condition)} onChange={(value) => setField("condition", value)} />
        <TextField label="Configuração da aeronave" value={stringValue(payload.aircraftConfiguration)} onChange={(value) => setField("aircraftConfiguration", value)} />
        <TextField label="Fase de voo" value={stringValue(payload.flightPhase)} onChange={(value) => setField("flightPhase", value)} />
        <SelectField label="Implementação no simulador" value={stringValue(payload.simulatorImplementation, "unknown")} options={[["unknown", "Não avaliado"], ["implemented", "Implementado"], ["partial", "Parcial"], ["not_implemented", "Não implementado"]]} onChange={(value) => setField("simulatorImplementation", value)} />
        <TextAreaField label="Aplicabilidade" value={stringValue(payload.applicability)} onChange={(value) => setField("applicability", value)} />
        <TextAreaField label="Observação" value={stringValue(payload.note)} onChange={(value) => setField("note", value)} />
        <TextAreaField label="Warning" value={stringValue(payload.warning)} onChange={(value) => setField("warning", value)} />
        <TextAreaField label="Caution" value={stringValue(payload.caution)} onChange={(value) => setField("caution", value)} />
      </div>
    </Panel>
  );
}

function AircraftProcedureEditor({ payload, setField }: Pick<EditorProps, "payload" | "setField">) {
  const steps = normalizeSteps(payload.steps);
  return (
    <Panel>
      <h4 className="text-sm font-semibold text-white">Editor de procedimentos</h4>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <RelationshipSelector label="Aeronave" value={stringValue(payload.aircraftId)} onChange={(value) => setField("aircraftId", value)} placeholder="ID da aeronave" />
        <SelectField label="Tipo" value={stringValue(payload.type, "trainingOnly")} options={procedureTypes.map((item) => [item, item])} onChange={(value) => setField("type", value)} />
        <SelectField label="Fase" value={stringValue(payload.phase, "preflight")} options={procedurePhases.map((item) => [item, item])} onChange={(value) => setField("phase", value)} />
        <TextField label="Variante real" value={stringValue(payload.aircraftVariant)} onChange={(value) => setField("aircraftVariant", value)} />
        <TextAreaField label="Aplicabilidade" value={stringValue(payload.applicability)} onChange={(value) => setField("applicability", value)} />
        <TextAreaField label="Condições de entrada" value={stringValue(payload.entryConditions)} onChange={(value) => setField("entryConditions", value)} />
        <TextAreaField label="Resultado esperado" value={stringValue(payload.expectedResult)} onChange={(value) => setField("expectedResult", value)} />
        <TextAreaField label="Nota de segurança" value={stringValue(payload.safetyNote)} onChange={(value) => setField("safetyNote", value)} />
        <SelectField label="Memória ou referência" value={stringValue(payload.memoryOrReference, "reference")} options={[["memory", "Memória"], ["reference", "Referência"], ["both", "Memória e referência"]]} onChange={(value) => setField("memoryOrReference", value)} />
        <TextField label="Versão" value={stringValue(payload.versionLabel, "0.1")} onChange={(value) => setField("versionLabel", value)} />
        <TagListEditor label="Warnings" values={stringArray(payload.warnings)} onChange={(value) => setField("warnings", value)} />
        <TagListEditor label="Cautions" values={stringArray(payload.cautions)} onChange={(value) => setField("cautions", value)} />
        <TagListEditor label="Notes" values={stringArray(payload.notes)} onChange={(value) => setField("notes", value)} />
        <TextAreaField label="Adaptação ao simulador" value={stringValue(payload.simulatorAdaptation)} onChange={(value) => setField("simulatorAdaptation", value)} />
        <TextAreaField label="Diferenças conhecidas do simulador" value={stringValue(payload.knownSimulatorDifferences)} onChange={(value) => setField("knownSimulatorDifferences", value)} />
      </div>
      <ProcedureStepEditor steps={steps} onChange={(value) => setField("steps", value)} />
    </Panel>
  );
}

function AircraftPerformanceEditor({ payload, setField }: Pick<EditorProps, "payload" | "setField">) {
  const table = normalizeTable(payload.table);
  return (
    <Panel>
      <h4 className="text-sm font-semibold text-white">Editor de performance</h4>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <RelationshipSelector label="Aeronave" value={stringValue(payload.aircraftId)} onChange={(value) => setField("aircraftId", value)} placeholder="ID da aeronave" />
        <SelectField label="Tipo" value={stringValue(payload.type, "other")} options={performanceTypes.map((item) => [item, item])} onChange={(value) => setField("type", value)} />
        <TextField label="Variante" value={stringValue(payload.aircraftVariant)} onChange={(value) => setField("aircraftVariant", value)} />
        <TextField label="Motor" value={stringValue(payload.engine)} onChange={(value) => setField("engine", value)} />
        <TextField label="Configuração" value={stringValue(payload.configuration)} onChange={(value) => setField("configuration", value)} />
        <TextField label="Peso ou massa" value={stringValue(payload.weightOrMass)} onChange={(value) => setField("weightOrMass", value)} />
        <TextField label="Altitude" value={stringValue(payload.altitude)} onChange={(value) => setField("altitude", value)} />
        <TextField label="Temperatura" value={stringValue(payload.temperature)} onChange={(value) => setField("temperature", value)} />
        <TextField label="Vento" value={stringValue(payload.wind)} onChange={(value) => setField("wind", value)} />
        <TextField label="Condição da pista" value={stringValue(payload.runwayCondition)} onChange={(value) => setField("runwayCondition", value)} />
        <TextField label="Potência" value={stringValue(payload.powerSetting)} onChange={(value) => setField("powerSetting", value)} />
        <TextField label="Velocidade" value={stringValue(payload.speed)} onChange={(value) => setField("speed", value)} />
        <TextField label="Combustível" value={stringValue(payload.fuel)} onChange={(value) => setField("fuel", value)} />
        <TextField label="Distância" value={stringValue(payload.distance)} onChange={(value) => setField("distance", value)} />
        <TextField label="Unidade original" value={stringValue(payload.unit)} onChange={(value) => setField("unit", value)} />
        <TextAreaField label="Condições" value={stringValue(payload.conditions)} onChange={(value) => setField("conditions", value)} />
        <TextAreaField label="Observações" value={stringValue(payload.note)} onChange={(value) => setField("note", value)} />
      </div>
      <PerformanceTableEditor table={table} onChange={(value) => setField("table", value)} />
    </Panel>
  );
}

function LessonBlockEditor({ payload, setField }: Pick<EditorProps, "payload" | "setField">) {
  const blocks = normalizeBlocks(payload.content);
  return (
    <Panel>
      <h4 className="text-sm font-semibold text-white">Editor estruturado de aulas</h4>
      <p className="mt-1 text-xs leading-5 text-slate-400">Use blocos em vez de HTML arbitrário. A reorganização funciona por botões para iPad e teclado.</p>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <RelationshipSelector label="Módulo relacionado" value={stringValue(payload.moduleId)} onChange={(value) => setField("moduleId", value)} placeholder="ID do módulo" />
        <TextField label="Duração estimada" value={stringValue(payload.estimatedDuration)} onChange={(value) => setField("estimatedDuration", value)} />
        <TextField label="Aula anterior" value={stringValue(payload.previousLessonId)} onChange={(value) => setField("previousLessonId", value)} />
        <TextField label="Próxima aula" value={stringValue(payload.nextLessonId)} onChange={(value) => setField("nextLessonId", value)} />
        <TextAreaField label="Resumo" value={stringValue(payload.summary)} onChange={(value) => setField("summary", value)} />
        <TextAreaField label="Objetivo" value={stringValue(payload.objective)} onChange={(value) => setField("objective", value)} />
        <TagListEditor label="Conceitos principais" values={stringArray(payload.keyConcepts)} onChange={(value) => setField("keyConcepts", value)} className="md:col-span-2" />
      </div>
      <div className="mt-5 space-y-3">
        {blocks.map((block, index) => (
          <BlockCard
            key={block.id}
            block={block}
            index={index}
            total={blocks.length}
            onChange={(next) => setField("content", replaceAt(blocks, index, next))}
            onMove={(direction) => setField("content", moveItem(blocks, index, direction))}
            onDuplicate={() => setField("content", insertAt(blocks, index + 1, { ...block, id: stableId("block"), order: index + 2 }))}
            onRemove={() => confirm("Remover este bloco da aula?") && setField("content", blocks.filter((item) => item.id !== block.id).map(withOrder))}
          />
        ))}
        <button type="button" onClick={() => setField("content", [...blocks, { id: stableId("block"), type: "paragraph", text: "", order: blocks.length + 1 }])} className="focus-ring inline-flex items-center gap-2 rounded-md bg-aviation-cyan px-3 py-2 text-sm font-semibold text-aviation-ink">
          <Plus className="h-4 w-4" />
          Adicionar bloco
        </button>
      </div>
    </Panel>
  );
}

function ChecklistVersionEditor({ payload, initialPayload, setField }: Pick<EditorProps, "payload" | "initialPayload" | "setField">) {
  const items = normalizeChecklistItems(payload.items);
  const sections = objectArray(payload.sections);
  const editingPublished = initialPayload?.publicationState === "published";
  return (
    <Panel>
      <h4 className="text-sm font-semibold text-white">Editor de checklists e versões</h4>
      {editingPublished ? (
        <div className="mt-3 rounded-md border border-aviation-amber/25 bg-aviation-amber/[0.06] p-3 text-sm leading-6 text-aviation-amber">
          Você está editando um checklist já publicado. Crie uma nova versão para não alterar silenciosamente a versão usada por alunos.
        </div>
      ) : null}
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <RelationshipSelector label="Aeronave" value={stringValue(payload.aircraftId)} onChange={(value) => setField("aircraftId", value)} placeholder="ID da aeronave" />
        <TextField label="Nome da aeronave" value={stringValue(payload.aircraftName)} onChange={(value) => setField("aircraftName", value)} />
        <TextField label="Variante" value={stringValue(payload.aircraftVariant)} onChange={(value) => setField("aircraftVariant", value)} />
        <TextField label="Fase do voo" value={stringValue(payload.flightPhase, "preparacao")} onChange={(value) => setField("flightPhase", value)} />
        <TextField label="Versão ativa" value={stringValue(payload.version, "0.1")} onChange={(value) => setField("version", value)} />
        <TextField label="Data de vigência" value={stringValue(payload.effectiveDate)} onChange={(value) => setField("effectiveDate", value)} />
        <TextAreaField label="Descrição" value={stringValue(payload.description)} onChange={(value) => setField("description", value)} />
        <TextAreaField label="Motivo da revisão" value={stringValue(payload.revisionReason)} onChange={(value) => setField("revisionReason", value)} />
        <TextAreaField label="Observações" value={stringValue(payload.notes)} onChange={(value) => setField("notes", value)} className="md:col-span-2" />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" onClick={() => setField("version", nextVersion(stringValue(payload.version, "0.1")))} className="focus-ring inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white">
          <Copy className="h-4 w-4" />
          Criar nova versão
        </button>
      </div>
      <SectionEditor sections={sections} onChange={(value) => setField("sections", value)} />
      <ChecklistItemStructuredEditor items={items} onChange={(value) => setField("items", value)} />
    </Panel>
  );
}

function SourceMetadataEditor({ payload, setField }: Pick<EditorProps, "payload" | "setField">) {
  const metadata: Partial<TechnicalMetadata> = payload.technicalMetadata ?? {};
  const update = (field: string, value: unknown) => setField("technicalMetadata", { ...metadata, [field]: value });
  return (
    <Panel>
      <h4 className="text-sm font-semibold text-white">Fontes técnicas</h4>
      <p className="mt-1 text-xs leading-5 text-slate-400">Registre somente documentos, publicações ou materiais identificáveis. IA não é fonte técnica.</p>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <SelectField label="Tipo de fonte" value={stringValue(metadata.sourceType, "internal_training_material")} options={sourceTypeOptions.map((item) => [item, item])} onChange={(value) => update("sourceType", value)} />
        <TextField label="Título" value={stringValue(metadata.sourceTitle)} onChange={(value) => update("sourceTitle", value)} />
        <TextField label="Organização" value={stringValue(metadata.sourceOrganization)} onChange={(value) => update("sourceOrganization", value)} />
        <TextField label="Edição" value={stringValue(metadata.sourceEdition)} onChange={(value) => update("sourceEdition", value)} />
        <TextField label="Revisão" value={stringValue(metadata.sourceRevision)} onChange={(value) => update("sourceRevision", value)} />
        <TextField label="Data" value={stringValue(metadata.sourceDate)} onChange={(value) => update("sourceDate", value)} />
        <TextField label="Página" value={stringValue(metadata.sourcePage)} onChange={(value) => update("sourcePage", value)} />
        <TextField label="URL" value={stringValue(metadata.sourceUrl)} onChange={(value) => update("sourceUrl", value)} />
        <TextField label="ID do documento" value={stringValue(metadata.sourceDocumentId)} onChange={(value) => update("sourceDocumentId", value)} />
        <TextAreaField label="Notas da fonte" value={stringValue(metadata.revisionNotes)} onChange={(value) => update("revisionNotes", value)} />
      </div>
    </Panel>
  );
}

function VerificationWorkflowEditor({ payload, setField }: Pick<EditorProps, "payload" | "setField">) {
  const metadata: Partial<TechnicalMetadata> = payload.technicalMetadata ?? {};
  const update = (field: string, value: unknown) => setField("technicalMetadata", { ...metadata, [field]: value });
  return (
    <Panel>
      <h4 className="text-sm font-semibold text-white">Fluxo de verificação</h4>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <SelectField label="Classificação" value={stringValue(metadata.contentClassification, "provisional_unverified")} options={classificationOptions.map((item) => [item, classificationLabels[item]])} onChange={(value) => update("contentClassification", value)} />
        <SelectField label="Status de verificação" value={stringValue(metadata.verificationStatus, "pending_verification")} options={verificationOptions.map((item) => [item, verificationStatusLabels[item]])} onChange={(value) => update("verificationStatus", value)} />
        <TextField label="Verificado por" value={stringValue(metadata.verifiedBy)} onChange={(value) => update("verifiedBy", value)} />
        <TextField label="Verificado em" value={stringValue(metadata.verifiedAt)} onChange={(value) => update("verifiedAt", value)} />
        <TextField label="Última revisão" value={stringValue(metadata.lastReviewedAt)} onChange={(value) => update("lastReviewedAt", value)} />
        <label className="flex items-center gap-3 rounded-md border border-white/10 bg-white/[0.035] p-3 text-sm text-slate-200">
          <input type="checkbox" checked={Boolean(metadata.markedForReview)} onChange={(event) => update("markedForReview", event.target.checked)} className="h-4 w-4 accent-aviation-cyan" />
          Marcar para revisão técnica
        </label>
        <TextAreaField label="Notas de adaptação ao simulador" value={stringValue(metadata.simulatorAdaptationNotes)} onChange={(value) => update("simulatorAdaptationNotes", value)} />
        <TextAreaField label="Diferenças conhecidas do simulador" value={stringValue(metadata.knownSimulatorDifferences)} onChange={(value) => update("knownSimulatorDifferences", value)} />
        <TextAreaField label="Aviso técnico" value={stringValue(metadata.technicalDisclaimer)} onChange={(value) => update("technicalDisclaimer", value)} />
        <TextAreaField label="Motivo/observação de revisão" value={stringValue(metadata.reviewReason)} onChange={(value) => update("reviewReason", value)} />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <WorkflowButton label="Enviar para revisão" onClick={() => update("markedForReview", true)} />
        <WorkflowButton label="Marcar conflito" onClick={() => update("verificationStatus", "conflicting_sources")} />
        <WorkflowButton label="Voltar para provisório" onClick={() => setField("technicalMetadata", { ...metadata, contentClassification: "provisional_unverified", verificationStatus: "pending_verification" })} icon={<RotateCcw className="h-4 w-4" />} />
      </div>
    </Panel>
  );
}

function ProcedureStepEditor({ steps, onChange }: { steps: ProcedureStep[]; onChange: (steps: ProcedureStep[]) => void }) {
  return (
    <div className="mt-5 space-y-3">
      <h5 className="text-sm font-semibold text-white">Passos ordenados</h5>
      {steps.map((step, index) => (
        <div key={step.id} className="rounded-md border border-white/10 bg-white/[0.035] p-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Passo {index + 1}</span>
            <MoveButtons index={index} total={steps.length} onMove={(direction) => onChange(moveItem(steps, index, direction))} onDuplicate={() => onChange(insertAt(steps, index + 1, { ...step, id: stableId("step") }).map(withOrder))} onRemove={() => confirm("Remover este passo?") && onChange(steps.filter((item) => item.id !== step.id).map(withOrder))} />
          </div>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <TextAreaField label="Ação" value={step.action} onChange={(value) => onChange(replaceAt(steps, index, { ...step, action: value }))} />
            <TextField label="Controle/equipamento" value={step.controlOrEquipment ?? ""} onChange={(value) => onChange(replaceAt(steps, index, { ...step, controlOrEquipment: value }))} />
            <TextField label="Posição ou valor esperado" value={step.expectedPositionOrValue ?? ""} onChange={(value) => onChange(replaceAt(steps, index, { ...step, expectedPositionOrValue: value }))} />
            <TextField label="Resposta esperada" value={step.expectedResponse ?? ""} onChange={(value) => onChange(replaceAt(steps, index, { ...step, expectedResponse: value }))} />
            <TextField label="Condição" value={step.condition ?? ""} onChange={(value) => onChange(replaceAt(steps, index, { ...step, condition: value }))} />
            <TextField label="Referência técnica" value={step.technicalReference ?? ""} onChange={(value) => onChange(replaceAt(steps, index, { ...step, technicalReference: value }))} />
            <TextAreaField label="Observação" value={step.note ?? ""} onChange={(value) => onChange(replaceAt(steps, index, { ...step, note: value }))} />
            <label className="flex items-center gap-3 rounded-md border border-white/10 bg-white/[0.035] p-3 text-sm text-slate-200">
              <input type="checkbox" checked={step.critical} onChange={(event) => onChange(replaceAt(steps, index, { ...step, critical: event.target.checked }))} className="h-4 w-4 accent-aviation-cyan" />
              Item crítico
            </label>
          </div>
        </div>
      ))}
      <button type="button" onClick={() => onChange([...steps, { id: stableId("step"), order: steps.length + 1, action: "", critical: false }])} className="focus-ring inline-flex items-center gap-2 rounded-md bg-aviation-cyan px-3 py-2 text-sm font-semibold text-aviation-ink">
        <Plus className="h-4 w-4" />
        Adicionar passo
      </button>
    </div>
  );
}

function PerformanceTableEditor({ table, onChange }: { table: PerformanceTable; onChange: (table: PerformanceTable) => void }) {
  const [csv, setCsv] = useState("");
  const [csvError, setCsvError] = useState<string | undefined>();
  return (
    <div className="mt-5 space-y-4">
      <h5 className="text-sm font-semibold text-white">Tabela estruturada</h5>
      <div className="grid gap-4 md:grid-cols-2">
        <TagListEditor label="Cabeçalhos" values={table.headers} onChange={(headers) => onChange({ ...table, headers })} />
        <TagListEditor label="Unidades por coluna" values={table.units} onChange={(units) => onChange({ ...table, units })} />
        <TextField label="Unidade original geral" value={table.originalUnit ?? ""} onChange={(value) => onChange({ ...table, originalUnit: value })} />
      </div>
      <TextAreaField label="Importar CSV controlado" value={csv} onChange={setCsv} />
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            const parsed = parseCsv(csv);
            if (parsed.error) {
              setCsvError(parsed.error);
              return;
            }
            if (confirm("Substituir a tabela atual pelos dados do CSV?")) {
              setCsvError(undefined);
              onChange(parsed.table);
            }
          }}
          className="focus-ring rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white"
        >
          Pré-visualizar e substituir
        </button>
        {csvError ? <span className="text-sm text-aviation-amber">{csvError}</span> : null}
      </div>
      <div className="overflow-x-auto rounded-md border border-white/10">
        <table className="min-w-full divide-y divide-white/10 text-sm">
          <thead className="bg-white/[0.035]">
            <tr>{table.headers.map((header) => <th key={header} className="px-3 py-2 text-left font-semibold text-slate-300">{header}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {table.rows.map((row) => (
              <tr key={row.id}>{row.cells.map((cell, index) => <td key={`${row.id}-${index}`} className="px-3 py-2 text-slate-300">{cell || "-"}</td>)}</tr>
            ))}
          </tbody>
        </table>
        {!table.rows.length ? <p className="p-3 text-sm text-slate-400">Nenhuma tabela carregada.</p> : null}
      </div>
    </div>
  );
}

function BlockCard({ block, index, total, onChange, onMove, onDuplicate, onRemove }: {
  block: LessonBlock;
  index: number;
  total: number;
  onChange: (block: LessonBlock) => void;
  onMove: (direction: -1 | 1) => void;
  onDuplicate: () => void;
  onRemove: () => void;
}) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="rounded-md border border-white/10 bg-white/[0.035] p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-aviation-cyan" />
          <span className="text-sm font-semibold text-white">Bloco {index + 1}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setCollapsed((value) => !value)} className="focus-ring rounded-md border border-white/10 px-2 py-1 text-xs text-slate-200">{collapsed ? "Expandir" : "Recolher"}</button>
          <MoveButtons index={index} total={total} onMove={onMove} onDuplicate={onDuplicate} onRemove={onRemove} />
        </div>
      </div>
      {!collapsed ? (
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <SelectField label="Tipo de bloco" value={block.type} options={lessonBlockTypes.map((item) => [item, item])} onChange={(value) => onChange({ ...block, type: value })} />
          <TextField label="Texto alternativo/label" value={block.alt ?? ""} onChange={(value) => onChange({ ...block, alt: value })} />
          <TextField label="Título" value={block.title ?? ""} onChange={(value) => onChange({ ...block, title: value })} />
          <TextField label="Referência interna" value={block.referenceId ?? ""} onChange={(value) => onChange({ ...block, referenceId: value })} />
          <TextAreaField label="Conteúdo" value={block.text ?? ""} onChange={(value) => onChange({ ...block, text: value })} className="md:col-span-2" />
          <TagListEditor label="Itens de lista" values={block.items ?? []} onChange={(value) => onChange({ ...block, items: value })} className="md:col-span-2" />
        </div>
      ) : null}
    </div>
  );
}

function SectionEditor({ sections, onChange }: { sections: Array<Record<string, unknown>>; onChange: (sections: Array<Record<string, unknown>>) => void }) {
  return (
    <div className="mt-5 space-y-3">
      <h5 className="text-sm font-semibold text-white">Seções</h5>
      {sections.map((section, index) => (
        <div key={String(section.id)} className="grid gap-3 rounded-md border border-white/10 bg-white/[0.035] p-3 md:grid-cols-2">
          <TextField label="Título da seção" value={stringValue(section.title)} onChange={(value) => onChange(replaceAt(sections, index, { ...section, title: value }))} />
          <TextField label="Observação" value={stringValue(section.observation)} onChange={(value) => onChange(replaceAt(sections, index, { ...section, observation: value }))} />
          <MoveButtons index={index} total={sections.length} onMove={(direction) => onChange(moveItem(sections, index, direction))} onDuplicate={() => onChange(insertAt(sections, index + 1, { ...section, id: stableId("section") }).map(withOrder))} onRemove={() => confirm("Remover seção?") && onChange(sections.filter((item) => item.id !== section.id).map(withOrder))} />
        </div>
      ))}
      <button type="button" onClick={() => onChange([...sections, { id: stableId("section"), title: "", observation: "", order: sections.length + 1 }])} className="focus-ring inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white">
        <Plus className="h-4 w-4" />
        Adicionar seção
      </button>
    </div>
  );
}

function SubsectionEditor({ sections, onChange }: { sections: Array<Record<string, unknown>>; onChange: (sections: Array<Record<string, unknown>>) => void }) {
  return (
    <div className="md:col-span-2">
      <SectionEditor sections={sections} onChange={onChange} />
    </div>
  );
}

function ChecklistItemStructuredEditor({ items, onChange }: { items: ChecklistItem[]; onChange: (items: ChecklistItem[]) => void }) {
  return (
    <div className="mt-5 space-y-3">
      <h5 className="text-sm font-semibold text-white">Itens do checklist</h5>
      {items.map((item, index) => (
        <div key={item.id} className="rounded-md border border-white/10 bg-white/[0.035] p-3">
          <div className="flex flex-wrap justify-between gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Item {index + 1}</span>
            <MoveButtons index={index} total={items.length} onMove={(direction) => onChange(moveItem(items, index, direction))} onDuplicate={() => onChange(insertAt(items, index + 1, { ...item, id: stableId("item") }).map(withOrder))} onRemove={() => confirm("Remover item?") && onChange(items.filter((current) => current.id !== item.id).map(withOrder))} />
          </div>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <TextAreaField label="Desafio ou ação" value={item.text} onChange={(value) => onChange(replaceAt(items, index, { ...item, text: value }))} />
            <TextField label="Resposta esperada" value={item.expectedResponse} onChange={(value) => onChange(replaceAt(items, index, { ...item, expectedResponse: value }))} />
            <TextField label="Controle" value={item.control ?? ""} onChange={(value) => onChange(replaceAt(items, index, { ...item, control: value }))} />
            <TextField label="Posição" value={item.position ?? ""} onChange={(value) => onChange(replaceAt(items, index, { ...item, position: value }))} />
            <TextField label="Condição" value={item.condition ?? ""} onChange={(value) => onChange(replaceAt(items, index, { ...item, condition: value }))} />
            <TextField label="Fonte específica" value={item.sourceReference ?? ""} onChange={(value) => onChange(replaceAt(items, index, { ...item, sourceReference: value }))} />
            <TextAreaField label="Observação" value={item.observation} onChange={(value) => onChange(replaceAt(items, index, { ...item, observation: value }))} />
            <TextAreaField label="Explicação" value={item.explanation ?? ""} onChange={(value) => onChange(replaceAt(items, index, { ...item, explanation: value }))} />
            <label className="flex items-center gap-3 rounded-md border border-white/10 bg-white/[0.035] p-3 text-sm text-slate-200">
              <input type="checkbox" checked={item.kind === "critical"} onChange={(event) => onChange(replaceAt(items, index, { ...item, kind: event.target.checked ? "critical" : "normal" }))} className="h-4 w-4 accent-aviation-cyan" />
              Item crítico
            </label>
            <label className="flex items-center gap-3 rounded-md border border-white/10 bg-white/[0.035] p-3 text-sm text-slate-200">
              <input type="checkbox" checked={Boolean(item.memory)} onChange={(event) => onChange(replaceAt(items, index, { ...item, memory: event.target.checked }))} className="h-4 w-4 accent-aviation-cyan" />
              Item de memória
            </label>
          </div>
        </div>
      ))}
      <button type="button" onClick={() => onChange([...items, { id: stableId("item"), checklistId: "", text: "", expectedResponse: "", observation: "", order: items.length + 1, kind: "normal", status: "pending" }])} className="focus-ring inline-flex items-center gap-2 rounded-md bg-aviation-cyan px-3 py-2 text-sm font-semibold text-aviation-ink">
        <Plus className="h-4 w-4" />
        Adicionar item
      </button>
    </div>
  );
}

function RelationshipSelector({ label, value, placeholder, onChange }: { label: string; value: string; placeholder?: string; onChange: (value: string) => void }) {
  return (
    <label className="block text-sm text-slate-300">
      {label}
      <input value={value} onChange={(event) => onChange(event.target.value.trim())} placeholder={placeholder} className="focus-ring mt-2 h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 text-sm text-white placeholder:text-slate-500" />
      <span className="mt-1 block text-xs text-slate-500">Seletor preparado para busca paginada no Firestore; nesta etapa aceita IDs estáveis.</span>
    </label>
  );
}

function TextField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block text-sm text-slate-300">
      {label}
      <input value={value} onChange={(event) => onChange(event.target.value)} className="focus-ring mt-2 h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 text-sm text-white placeholder:text-slate-500" />
    </label>
  );
}

function SelectField({ label, value, options, onChange }: { label: string; value: string; options: Array<readonly [string, string]>; onChange: (value: string) => void }) {
  return (
    <label className="block text-sm text-slate-300">
      {label}
      <select value={value} onChange={(event) => onChange(event.target.value)} className="focus-ring mt-2 h-10 w-full rounded-md border border-white/10 bg-aviation-ink px-3 text-sm text-white">
        {options.map(([optionValue, optionLabel]) => <option key={optionValue} value={optionValue}>{optionLabel}</option>)}
      </select>
    </label>
  );
}

function TextAreaField({ label, value, className = "", onChange }: { label: string; value: string; className?: string; onChange: (value: string) => void }) {
  return (
    <label className={`block text-sm text-slate-300 ${className}`}>
      {label}
      <textarea value={value} onChange={(event) => onChange(event.target.value)} rows={4} className="focus-ring mt-2 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm leading-6 text-white placeholder:text-slate-500" />
    </label>
  );
}

function TagListEditor({ label, values, className = "", onChange }: { label: string; values: string[]; className?: string; onChange: (values: string[]) => void }) {
  return <TextAreaField label={`${label} (um por linha)`} value={values.join("\n")} onChange={(value) => onChange(value.split(/\r?\n/).map((item) => item.trim()).filter(Boolean))} className={className} />;
}

function WorkflowButton({ label, icon, onClick }: { label: string; icon?: ReactNode; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="focus-ring inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white">
      {icon}
      {label}
    </button>
  );
}

function MoveButtons({ index, total, onMove, onDuplicate, onRemove }: { index: number; total: number; onMove: (direction: -1 | 1) => void; onDuplicate: () => void; onRemove: () => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      <button type="button" disabled={index === 0} onClick={() => onMove(-1)} className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white disabled:opacity-40" aria-label="Mover para cima">
        <ArrowUp className="h-4 w-4" />
      </button>
      <button type="button" disabled={index >= total - 1} onClick={() => onMove(1)} className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white disabled:opacity-40" aria-label="Mover para baixo">
        <ArrowDown className="h-4 w-4" />
      </button>
      <button type="button" onClick={onDuplicate} className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white" aria-label="Duplicar">
        <Copy className="h-4 w-4" />
      </button>
      <button type="button" onClick={onRemove} className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/5 text-aviation-amber" aria-label="Remover">
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}

type ProcedureStep = {
  id: string;
  order: number;
  action: string;
  controlOrEquipment?: string;
  expectedPositionOrValue?: string;
  expectedResponse?: string;
  condition?: string;
  note?: string;
  critical: boolean;
  technicalReference?: string;
};

type PerformanceTable = {
  id: string;
  headers: string[];
  units: string[];
  rows: Array<{ id: string; cells: string[] }>;
  originalUnit?: string;
};

type LessonBlock = {
  id: string;
  type: string;
  text?: string;
  title?: string;
  alt?: string;
  items?: string[];
  referenceId?: string;
  order?: number;
};

type ChecklistItem = {
  id: string;
  checklistId: string;
  text: string;
  expectedResponse: string;
  observation: string;
  order: number;
  kind: "critical" | "normal";
  status: "completed" | "pending";
  explanation?: string;
  control?: string;
  position?: string;
  condition?: string;
  memory?: boolean;
  sourceReference?: string;
};

function stringValue(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function stringArray(value: unknown) {
  return Array.isArray(value) ? value.map(String) : [];
}

function objectArray(value: unknown) {
  return Array.isArray(value) ? value.filter((item): item is Record<string, unknown> => typeof item === "object" && item !== null) : [];
}

function stableId(prefix: string) {
  return `${prefix}-${crypto.randomUUID()}`;
}

function replaceAt<T>(items: T[], index: number, next: T) {
  return items.map((item, currentIndex) => (currentIndex === index ? next : item)).map(withOrder);
}

function insertAt<T>(items: T[], index: number, next: T) {
  return [...items.slice(0, index), next, ...items.slice(index)].map(withOrder);
}

function moveItem<T>(items: T[], index: number, direction: -1 | 1) {
  const target = index + direction;
  if (target < 0 || target >= items.length) {
    return items;
  }
  const next = [...items];
  const [item] = next.splice(index, 1);
  next.splice(target, 0, item);
  return next.map(withOrder);
}

function withOrder<T>(item: T, index: number) {
  return typeof item === "object" && item !== null ? { ...item, order: index + 1 } : item;
}

function normalizeSteps(value: unknown): ProcedureStep[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.map((step, index) => {
    if (typeof step === "string") {
      return { id: stableId("step"), order: index + 1, action: step, critical: false };
    }
    const record = step as Record<string, unknown>;
    return {
      id: stringValue(record.id, stableId("step")),
      order: Number(record.order ?? index + 1),
      action: stringValue(record.action),
      controlOrEquipment: stringValue(record.controlOrEquipment),
      expectedPositionOrValue: stringValue(record.expectedPositionOrValue),
      expectedResponse: stringValue(record.expectedResponse),
      condition: stringValue(record.condition),
      note: stringValue(record.note),
      critical: Boolean(record.critical),
      technicalReference: stringValue(record.technicalReference)
    };
  });
}

function normalizeTable(value: unknown): PerformanceTable {
  if (typeof value === "object" && value !== null) {
    const record = value as Record<string, unknown>;
    return {
      id: stringValue(record.id, "table-main"),
      headers: stringArray(record.headers),
      units: stringArray(record.units),
      rows: Array.isArray(record.rows)
        ? record.rows.map((row, index) => {
            const rowRecord = row as Record<string, unknown>;
            return { id: stringValue(rowRecord.id, `row-${index + 1}`), cells: stringArray(rowRecord.cells) };
          })
        : [],
      originalUnit: stringValue(record.originalUnit)
    };
  }
  return { id: "table-main", headers: [], units: [], rows: [], originalUnit: "" };
}

function normalizeBlocks(value: unknown): LessonBlock[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.map((block, index) => {
    const record = block as Record<string, unknown>;
    return {
      id: stringValue(record.id, stableId("block")),
      type: stringValue(record.type, "paragraph"),
      text: stringValue(record.text),
      title: stringValue(record.title),
      alt: stringValue(record.alt),
      items: stringArray(record.items),
      referenceId: stringValue(record.referenceId),
      order: Number(record.order ?? index + 1)
    };
  });
}

function normalizeChecklistItems(value: unknown): ChecklistItem[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.map((item, index) => {
    const record = typeof item === "object" && item !== null ? item as Record<string, unknown> : { text: String(item) };
    return {
      id: stringValue(record.id, `item-${index + 1}`),
      checklistId: stringValue(record.checklistId),
      text: stringValue(record.text),
      expectedResponse: stringValue(record.expectedResponse),
      observation: stringValue(record.observation),
      order: Number(record.order ?? index + 1),
      kind: record.kind === "critical" ? "critical" : "normal",
      status: record.status === "completed" ? "completed" : "pending",
      explanation: stringValue(record.explanation),
      control: stringValue(record.control),
      position: stringValue(record.position),
      condition: stringValue(record.condition),
      memory: Boolean(record.memory),
      sourceReference: stringValue(record.sourceReference)
    };
  });
}

function parseCsv(value: string): { table: PerformanceTable; error?: undefined } | { table: PerformanceTable; error: string } {
  const lines = value.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  if (lines.length < 2) {
    return { table: { id: "table-main", headers: [], units: [], rows: [] }, error: "Informe pelo menos cabeçalho e uma linha." };
  }
  if (lines.length > 121) {
    return { table: { id: "table-main", headers: [], units: [], rows: [] }, error: "CSV acima do limite de 120 linhas." };
  }
  const headers = lines[0].split(",").map((item) => item.trim());
  if (headers.length > 16 || headers.some((item) => !item)) {
    return { table: { id: "table-main", headers: [], units: [], rows: [] }, error: "Cabeçalhos inválidos ou acima do limite de 16 colunas." };
  }
  const rows = lines.slice(1).map((line, index) => ({ id: `row-${index + 1}`, cells: line.split(",").map((item) => item.trim()) }));
  if (rows.some((row) => row.cells.length > headers.length)) {
    return { table: { id: "table-main", headers: [], units: [], rows: [] }, error: "Há linhas com mais colunas que o cabeçalho." };
  }
  return { table: { id: "table-main", headers, units: headers.map(() => ""), rows } };
}

function nextVersion(value: string) {
  const numberValue = Number(value);
  if (Number.isFinite(numberValue)) {
    return (numberValue + 0.1).toFixed(1);
  }
  return `${value || "0.1"}-rev-${new Date().toISOString().slice(0, 10)}`;
}

function comparePayloads(previous: AdminContentPayload | undefined, current: AdminContentPayload) {
  if (!previous) {
    return [{ field: "documento", kind: "Novo conteúdo; nenhuma versão anterior neste formulário." }];
  }
  const fields = new Set([...Object.keys(previous), ...Object.keys(current)]);
  return [...fields].flatMap((field) => {
    const before = previous[field];
    const after = current[field];
    if (JSON.stringify(before) === JSON.stringify(after)) {
      return [];
    }
    if (Array.isArray(before) || Array.isArray(after)) {
      return compareLists(field, Array.isArray(before) ? before : [], Array.isArray(after) ? after : []);
    }
    return [{ field, kind: "Conteúdo modificado." }];
  }).slice(0, 80);
}

function compareLists(field: string, previous: unknown[], current: unknown[]) {
  const previousIds = new Map(previous.map((item, index) => [stableItemKey(item, index), index]));
  const currentIds = new Map(current.map((item, index) => [stableItemKey(item, index), index]));
  const changes: Array<{ field: string; kind: string }> = [];
  previousIds.forEach((oldIndex, id) => {
    const newIndex = currentIds.get(id);
    if (newIndex === undefined) {
      changes.push({ field, kind: `Item removido: ${id}.` });
    } else if (oldIndex !== newIndex) {
      changes.push({ field, kind: `Item movido: ${id}.` });
    }
  });
  currentIds.forEach((_newIndex, id) => {
    if (!previousIds.has(id)) {
      changes.push({ field, kind: `Item adicionado: ${id}.` });
    }
  });
  return changes.length ? changes : [{ field, kind: "Lista modificada." }];
}

function stableItemKey(item: unknown, index: number) {
  if (typeof item === "object" && item !== null && "id" in item) {
    return String((item as { id?: unknown }).id);
  }
  return `index-${index}`;
}

function getPotentialImpacts(entityType: AdminEntityType, payload: AdminContentPayload) {
  const base = ["Auditoria e revisões devem ser preservadas.", "Exclusão em cascata silenciosa não é permitida."];
  if (entityType === "aircraft") {
    return ["Sistemas, limitações, procedimentos e performance vinculados.", "Checklists, treinamentos e cursos relacionados.", "Progresso de alunos por aeronave no futuro.", ...base];
  }
  if (entityType === "checklist") {
    return ["Sessões de checklist podem apontar para esta versão.", "Versões publicadas não devem ser sobrescritas silenciosamente.", ...base];
  }
  if (entityType === "lesson") {
    return ["Progresso de aulas, tentativas de exercícios e itens de revisão podem depender desta aula.", ...base];
  }
  if (entityType.startsWith("aircraft")) {
    return [`Conteúdo técnico vinculado à aeronave ${stringValue(payload.aircraftId, "não informada")}.`, "Não arquivar sem verificar páginas públicas e relações.", ...base];
  }
  return base;
}
