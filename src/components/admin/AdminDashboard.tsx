"use client";

import {
  Archive,
  CheckCircle2,
  Copy,
  Eye,
  FilePenLine,
  History,
  Loader2,
  Plus,
  RefreshCw,
  Save,
  Search,
  ShieldAlert,
  Upload,
  X
} from "lucide-react";
import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { DeletionImpactPanel, hasSpecializedTechnicalEditor, RevisionComparator, SpecializedTechnicalEditor } from "@/components/admin/SpecializedTechnicalEditors";
import { Panel } from "@/components/ui/Panel";
import { SafeImage } from "@/components/ui/SafeImage";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/StateMessage";
import { adminEntityConfigs, adminEntityOrder } from "@/features/admin/entityConfig";
import type { AdminAuditLogDocument, AdminContentPayload, AdminContentSummary, AdminDashboardMetrics, AdminEntityType, AdminListFilters } from "@/features/admin/types";
import { slugifyTitle } from "@/features/admin/validation";
import { classificationLabels, verificationStatusLabels } from "@/features/technical/defaults";
import type { ContentClassification, SourceType, VerificationStatus } from "@/features/technical/types";
import { isFirebaseStorageEnabled } from "@/lib/firebase/config";
import { getImageValidationMessage, resolveSafeImageSource } from "@/lib/images";
import {
  archiveAdminContent,
  completeAdminUpload,
  createAdminContent,
  duplicateAdminContent,
  getAdminDashboardMetrics,
  listAdminContent,
  publishAdminContent,
  unpublishAdminContent,
  updateAdminContent,
  uploadAdminImage
} from "@/services/adminContentService";

const classificationOptions = Object.keys(classificationLabels) as ContentClassification[];
const verificationOptions = Object.keys(verificationStatusLabels) as VerificationStatus[];
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

const emptyFilters: AdminListFilters = {
  query: "",
  publicationState: "all",
  classification: "all",
  verificationStatus: "all",
  updatedBy: ""
};

export function AdminDashboard() {
  const { role } = useAuth();
  const [activeEntity, setActiveEntity] = useState<AdminEntityType>("course");
  const [metrics, setMetrics] = useState<AdminDashboardMetrics | undefined>();
  const [items, setItems] = useState<AdminContentSummary[]>([]);
  const [auditLogs, setAuditLogs] = useState<AdminAuditLogDocument[]>([]);
  const [filters, setFilters] = useState<AdminListFilters>(emptyFilters);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [message, setMessage] = useState<string | undefined>();
  const [editing, setEditing] = useState<AdminContentSummary | undefined>();
  const [isCreating, setIsCreating] = useState(false);
  const [page, setPage] = useState(1);

  const config = adminEntityConfigs[activeEntity];
  const pageSize = 8;
  const pageItems = useMemo(() => items.slice((page - 1) * pageSize, page * pageSize), [items, page]);
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));

  useEffect(() => {
    void loadAll(activeEntity, filters);
  }, [activeEntity, filters]);

  async function loadAll(entity: AdminEntityType, currentFilters: AdminListFilters) {
    setIsLoading(true);
    setError(undefined);
    try {
      const [nextMetrics, nextItems] = await Promise.all([getAdminDashboardMetrics(), listAdminContent(entity, currentFilters)]);
      setMetrics(nextMetrics);
      setItems(nextItems);
      setAuditLogs(nextMetrics.recentChanges);
      setPage(1);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Não foi possível carregar o painel administrativo.");
    } finally {
      setIsLoading(false);
    }
  }

  async function runAction(action: () => Promise<{ title?: string } | void>, successMessage: string) {
    setIsSaving(true);
    setError(undefined);
    setMessage(undefined);
    try {
      await action();
      setMessage(successMessage);
      await loadAll(activeEntity, filters);
      setEditing(undefined);
      setIsCreating(false);
    } catch (actionError) {
      setError(actionError instanceof Error ? actionError.message : "Não foi possível salvar a alteração.");
    } finally {
      setIsSaving(false);
    }
  }

  if (role !== "admin" && role !== "instructor") {
    return (
      <Panel className="border-aviation-amber/30 bg-aviation-amber/[0.08]">
        <ShieldAlert className="h-7 w-7 text-aviation-amber" />
        <h2 className="mt-4 text-xl font-semibold text-white">Acesso negado</h2>
        <p className="mt-2 text-sm leading-6 text-slate-300">O painel administrativo exige papel de instrutor ou administrador validado pelo Firebase.</p>
      </Panel>
    );
  }

  return (
    <div className="space-y-5">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-aviation-cyan">Administração Firebase</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Painel de conteúdo</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
            Gerencie rascunhos, publicações, fontes, revisões e imagens sem editar os arquivos do projeto. As permissões também são validadas pelas Security Rules.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => void loadAll(activeEntity, filters)} className="focus-ring inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white">
            <RefreshCw className="h-4 w-4" />
            Atualizar
          </button>
          <button type="button" onClick={() => setIsCreating(true)} className="focus-ring inline-flex items-center gap-2 rounded-md bg-aviation-cyan px-3 py-2 text-sm font-semibold text-aviation-ink">
            <Plus className="h-4 w-4" />
            Criar conteúdo
          </button>
        </div>
      </section>

      {metrics ? <MetricsGrid metrics={metrics} /> : null}

      <Panel>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {adminEntityOrder.map((entity) => {
            const entityConfig = adminEntityConfigs[entity];
            const active = entity === activeEntity;
            return (
              <button
                key={entity}
                type="button"
                onClick={() => {
                  setActiveEntity(entity);
                  setFilters(emptyFilters);
                }}
                className={`focus-ring shrink-0 rounded-md px-3 py-2 text-sm font-semibold ${active ? "bg-aviation-cyan text-aviation-ink" : "border border-white/10 bg-white/5 text-slate-200"}`}
              >
                {entityConfig.pluralLabel}
              </button>
            );
          })}
        </div>
      </Panel>

      <Panel>
        <div className="flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">{config.pluralLabel}</h3>
            <p className="mt-1 text-sm text-slate-400">{config.description}</p>
          </div>
          <AdminFilters filters={filters} showTechnical={config.technical} onChange={setFilters} />
        </div>
      </Panel>

      {error ? <ErrorState title="Falha no painel administrativo" description={error} /> : null}
      {message ? <Panel className="border-emerald-400/25 bg-emerald-400/[0.06] text-sm text-emerald-100">{message}</Panel> : null}
      {isLoading ? <LoadingState title="Carregando painel" description="Consultando contadores e listagens no Firestore." /> : null}

      {!isLoading && !items.length ? (
        <EmptyState title="Nenhum conteúdo encontrado" description="Ajuste os filtros ou crie um novo registro para esta coleção." />
      ) : null}

      {!isLoading && pageItems.length ? (
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="grid gap-3">
            {pageItems.map((item) => (
              <AdminContentCard
                key={item.id}
                item={item}
                onEdit={() => setEditing(item)}
                onDuplicate={() => void runAction(() => duplicateAdminContent(activeEntity, item.id), "Conteúdo duplicado como rascunho.")}
                onArchive={() => {
                  if (confirm("Arquivar este conteúdo? Ele ficará fora de publicação e preservará referências.")) {
                    void runAction(() => archiveAdminContent(activeEntity, item.id), "Conteúdo arquivado.");
                  }
                }}
                onPublish={() => void runAction(() => publishAdminContent(activeEntity, item.id), "Conteúdo publicado.")}
                onUnpublish={() => {
                  if (confirm("Despublicar este conteúdo? Alunos deixarão de vê-lo.")) {
                    void runAction(() => unpublishAdminContent(activeEntity, item.id), "Conteúdo despublicado.");
                  }
                }}
              />
            ))}
            <div className="flex items-center justify-between rounded-md border border-white/10 bg-white/[0.035] p-3 text-sm text-slate-300">
              <span>{items.length} resultado(s)</span>
              <div className="flex items-center gap-2">
                <button type="button" disabled={page <= 1} onClick={() => setPage((value) => Math.max(1, value - 1))} className="focus-ring rounded-md border border-white/10 px-3 py-2 disabled:opacity-40">
                  Anterior
                </button>
                <span>
                  {page}/{totalPages}
                </span>
                <button type="button" disabled={page >= totalPages} onClick={() => setPage((value) => Math.min(totalPages, value + 1))} className="focus-ring rounded-md border border-white/10 px-3 py-2 disabled:opacity-40">
                  Próxima
                </button>
              </div>
            </div>
          </div>
          <AuditPanel logs={auditLogs} />
        </div>
      ) : null}

      {isCreating || editing ? (
        <AdminForm
          entityType={activeEntity}
          initialPayload={editing?.raw}
          isSaving={isSaving}
          role={role}
          onClose={() => {
            setIsCreating(false);
            setEditing(undefined);
          }}
          onSubmit={(payload) =>
            runAction(
              () => (editing ? updateAdminContent(activeEntity, editing.id, payload) : createAdminContent(activeEntity, payload)),
              editing ? "Conteúdo atualizado." : "Conteúdo criado como rascunho."
            )
          }
        />
      ) : null}
    </div>
  );
}

function MetricsGrid({ metrics }: { metrics: AdminDashboardMetrics }) {
  const cards = [
    ["Cursos", metrics.totalCourses],
    ["Publicados", metrics.publishedCourses],
    ["Rascunhos", metrics.draftCourses],
    ["Módulos", metrics.totalModules],
    ["Aulas", metrics.totalLessons],
    ["Exercícios", metrics.totalExercises],
    ["Aeronaves", metrics.totalAircraft],
    ["Aviônicos", metrics.totalAvionics],
    ["Checklists", metrics.totalChecklists],
    ["Treinamentos", metrics.totalTrainings],
    ["Pendentes", metrics.pendingVerification],
    ["Para revisão", metrics.markedForReview]
  ] as const;

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
      {cards.map(([label, value]) => (
        <Panel key={label} className="p-4">
          <p className="text-xs uppercase tracking-[0.14em] text-slate-500">{label}</p>
          <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
        </Panel>
      ))}
    </div>
  );
}

function AdminFilters({ filters, showTechnical, onChange }: { filters: AdminListFilters; showTechnical: boolean; onChange: (filters: AdminListFilters) => void }) {
  return (
    <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-5">
      <label className="relative block">
        <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-500" />
        <input value={filters.query} onChange={(event) => onChange({ ...filters, query: event.target.value })} placeholder="Buscar" className="focus-ring h-10 w-full rounded-md border border-white/10 bg-white/5 pl-9 pr-3 text-sm text-white placeholder:text-slate-500" />
      </label>
      <select value={filters.publicationState} onChange={(event) => onChange({ ...filters, publicationState: event.target.value as AdminListFilters["publicationState"] })} className="focus-ring h-10 rounded-md border border-white/10 bg-aviation-ink px-3 text-sm text-white">
        <option value="all">Todos os status</option>
        <option value="published">Publicado</option>
        <option value="draft">Rascunho</option>
      </select>
      {showTechnical ? (
        <>
          <select value={filters.classification} onChange={(event) => onChange({ ...filters, classification: event.target.value as AdminListFilters["classification"] })} className="focus-ring h-10 rounded-md border border-white/10 bg-aviation-ink px-3 text-sm text-white">
            <option value="all">Todas as classificações</option>
            {classificationOptions.map((option) => (
              <option key={option} value={option}>
                {classificationLabels[option]}
              </option>
            ))}
          </select>
          <select value={filters.verificationStatus} onChange={(event) => onChange({ ...filters, verificationStatus: event.target.value as AdminListFilters["verificationStatus"] })} className="focus-ring h-10 rounded-md border border-white/10 bg-aviation-ink px-3 text-sm text-white">
            <option value="all">Toda verificação</option>
            {verificationOptions.map((option) => (
              <option key={option} value={option}>
                {verificationStatusLabels[option]}
              </option>
            ))}
          </select>
        </>
      ) : null}
      <input value={filters.updatedBy} onChange={(event) => onChange({ ...filters, updatedBy: event.target.value })} placeholder="Responsável UID" className="focus-ring h-10 rounded-md border border-white/10 bg-white/5 px-3 text-sm text-white placeholder:text-slate-500" />
    </div>
  );
}

function AdminContentCard({
  item,
  onEdit,
  onDuplicate,
  onArchive,
  onPublish,
  onUnpublish
}: {
  item: AdminContentSummary;
  onEdit: () => void;
  onDuplicate: () => void;
  onArchive: () => void;
  onPublish: () => void;
  onUnpublish: () => void;
}) {
  const metadata = item.technicalMetadata;
  const isArchived = Boolean(item.archivedAt);
  return (
    <Panel className={isArchived ? "border-slate-500/20 opacity-75" : ""}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap gap-2">
            <span className={`rounded-md px-2 py-1 text-xs font-semibold ${item.publicationState === "published" ? "bg-emerald-400/10 text-emerald-200" : "bg-aviation-amber/10 text-aviation-amber"}`}>
              {item.publicationState === "published" ? "Publicado" : "Rascunho"}
            </span>
            {isArchived ? <span className="rounded-md bg-slate-500/10 px-2 py-1 text-xs font-semibold text-slate-300">Arquivado</span> : null}
            {metadata ? (
              <>
                <span className="rounded-md bg-white/5 px-2 py-1 text-xs text-slate-300">{classificationLabels[metadata.contentClassification]}</span>
                <span className="rounded-md bg-white/5 px-2 py-1 text-xs text-slate-300">{verificationStatusLabels[metadata.verificationStatus]}</span>
              </>
            ) : null}
          </div>
          <h4 className="mt-3 text-lg font-semibold text-white">{item.title}</h4>
          <p className="mt-1 text-sm text-slate-400">{item.subtitle || item.slug || item.id}</p>
          {metadata?.verificationStatus === "pending_verification" ? (
            <p className="mt-3 rounded-md border border-aviation-amber/25 bg-aviation-amber/[0.06] p-3 text-sm text-aviation-amber">
              Conteúdo pendente de verificação. Não apresentar como fonte operacional real.
            </p>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-2">
          <IconButton label="Editar" onClick={onEdit} icon={<FilePenLine className="h-4 w-4" />} />
          <IconButton label="Duplicar" onClick={onDuplicate} icon={<Copy className="h-4 w-4" />} />
          {item.publicationState === "published" ? <IconButton label="Despublicar" onClick={onUnpublish} icon={<Eye className="h-4 w-4" />} /> : <IconButton label="Publicar" onClick={onPublish} icon={<CheckCircle2 className="h-4 w-4" />} />}
          <IconButton label="Arquivar" onClick={onArchive} icon={<Archive className="h-4 w-4" />} />
        </div>
      </div>
    </Panel>
  );
}

function IconButton({ label, icon, onClick }: { label: string; icon: React.ReactNode; onClick: () => void }) {
  return (
    <button type="button" title={label} aria-label={label} onClick={onClick} className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/5 text-slate-100">
      {icon}
    </button>
  );
}

function AdminForm({
  entityType,
  initialPayload,
  isSaving,
  role,
  onClose,
  onSubmit
}: {
  entityType: AdminEntityType;
  initialPayload?: AdminContentPayload;
  isSaving: boolean;
  role: "admin" | "instructor";
  onClose: () => void;
  onSubmit: (payload: AdminContentPayload) => void;
}) {
  const config = adminEntityConfigs[entityType];
  const [payload, setPayload] = useState<AdminContentPayload>(() => ({ ...config.defaultValues, ...initialPayload }));
  const [isDirty, setIsDirty] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | undefined>();
  const [uploadError, setUploadError] = useState<string | undefined>();
  const storageEnabled = isFirebaseStorageEnabled();

  useEffect(() => {
    if (!isDirty) {
      return undefined;
    }

    const handler = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };

    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isDirty]);

  function setField(field: string, value: unknown) {
    setIsDirty(true);
    setPayload((current) => ({ ...current, [field]: value }));
  }

  function setManualImageReference(field: "imageUrl" | "imageAlt", value: string) {
    setIsDirty(true);
    setPayload((current) => {
      const next = { ...current, [field]: value };
      const imageUrl = field === "imageUrl" ? value : String(current.imageUrl ?? "");
      const imageAlt = field === "imageAlt" ? value : String(current.imageAlt ?? "Imagem do conteúdo");

      if (entityType === "aircraft" && typeof current.mainImage === "object" && current.mainImage) {
        next.mainImage = { ...(current.mainImage as Record<string, unknown>), url: imageUrl, alt: imageAlt };
      }

      if (entityType === "avionic" && typeof current.image === "object" && current.image) {
        next.image = { ...(current.image as Record<string, unknown>), url: imageUrl, alt: imageAlt };
      }

      return next;
    });
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsDirty(false);
    onSubmit(payload);
  }

  function closeSafely() {
    if (isDirty && !confirm("Descartar alterações não salvas?")) {
      return;
    }
    onClose();
  }

  async function handleUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file || !payload.id) {
      setUploadError("Salve o conteúdo antes de enviar imagens.");
      return;
    }

    try {
      setUploadError(undefined);
      const alt = window.prompt("Texto alternativo da imagem")?.trim() || "Imagem do conteúdo";
      const { task } = await uploadAdminImage(entityType, String(payload.id), file, alt, setUploadProgress);
      const result = await completeAdminUpload(entityType, String(payload.id), task, alt);
      setField("imageUrl", result.url);
      setField("imageStoragePath", result.storagePath);
      setField("imageAlt", result.alt);
      setUploadProgress(undefined);
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Não foi possível enviar a imagem.");
      setUploadProgress(undefined);
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 px-4 py-4 backdrop-blur-sm sm:py-8">
      <div className="mx-auto max-w-6xl">
        <Panel className="bg-aviation-ink">
          <form onSubmit={submit} className="space-y-5">
            <div className="flex flex-col gap-3 border-b border-white/10 pb-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-aviation-cyan">{config.label}</p>
                <h3 className="mt-2 text-xl font-semibold text-white">{initialPayload ? "Editar conteúdo" : "Criar conteúdo"}</h3>
                <p className="mt-1 text-sm text-slate-400">Editor seguro com texto, Markdown simples, metadados técnicos e validação antes de salvar.</p>
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={closeSafely} className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white" aria-label="Fechar">
                  <X className="h-4 w-4" />
                </button>
                <button type="submit" disabled={isSaving} className="focus-ring inline-flex items-center gap-2 rounded-md bg-aviation-cyan px-4 py-2 text-sm font-semibold text-aviation-ink disabled:opacity-60">
                  {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  Salvar
                </button>
              </div>
            </div>

            <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_22rem]">
              <div className="space-y-4">
                <CommonFields entityType={entityType} payload={payload} setField={setField} />
                <EntitySpecificFields entityType={entityType} payload={payload} initialPayload={initialPayload} setField={setField} />
                {config.technical && !hasSpecializedTechnicalEditor(entityType) ? <TechnicalMetadataEditor payload={payload} role={role} setField={setField} /> : null}
              </div>
              <div className="space-y-4">
                <PreviewPanel entityType={entityType} payload={payload} />
                <RevisionComparator previous={initialPayload} current={payload} />
                <DeletionImpactPanel entityType={entityType} payload={payload} />
                {config.uploadFolder ? (
                  <ImageReferencePanel
                    storageEnabled={storageEnabled}
                    imageUrl={getPayloadImageUrl(payload)}
                    imageAlt={getPayloadImageAlt(payload)}
                    uploadProgress={uploadProgress}
                    uploadError={uploadError}
                    onImageUrlChange={(value) => setManualImageReference("imageUrl", value)}
                    onImageAltChange={(value) => setManualImageReference("imageAlt", value)}
                    onUpload={handleUpload}
                  />
                ) : null}
              </div>
            </div>
          </form>
        </Panel>
      </div>
    </div>
  );
}

function getPayloadImageUrl(payload: AdminContentPayload) {
  return String(payload.imageUrl ?? readRecordField(payload.mainImage, "url") ?? readRecordField(payload.image, "url") ?? "");
}

function getPayloadImageAlt(payload: AdminContentPayload) {
  return String(payload.imageAlt ?? readRecordField(payload.mainImage, "alt") ?? readRecordField(payload.image, "alt") ?? "");
}

function readRecordField(value: unknown, field: string) {
  return typeof value === "object" && value !== null ? (value as Record<string, unknown>)[field] : undefined;
}

function ImageReferencePanel({
  storageEnabled,
  imageUrl,
  imageAlt,
  uploadProgress,
  uploadError,
  onImageUrlChange,
  onImageAltChange,
  onUpload
}: {
  storageEnabled: boolean;
  imageUrl: string;
  imageAlt: string;
  uploadProgress?: number;
  uploadError?: string;
  onImageUrlChange: (value: string) => void;
  onImageAltChange: (value: string) => void;
  onUpload: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  const validationMessage = getImageValidationMessage(imageUrl);
  const previewSource = resolveSafeImageSource(imageUrl);

  return (
    <Panel>
      <p className="text-sm font-semibold text-white">Imagem</p>
      <p className="mt-1 text-xs leading-5 text-slate-400">O Firebase Storage ainda não está configurado. Utilize uma URL HTTPS ou uma imagem existente na pasta public.</p>

      <div className="mt-4 overflow-hidden rounded-md border border-white/10 bg-white/[0.035]">
        <SafeImage src={previewSource} alt={imageAlt || "Pré-visualização da imagem"} className="h-36 w-full object-cover" fallbackLabel="Imagem local placeholder" />
      </div>

      <div className="mt-4 space-y-3">
        <TextField label="URL HTTPS ou caminho local (/images/...)" value={imageUrl} onChange={onImageUrlChange} />
        <TextField label="Texto alternativo" value={imageAlt} onChange={onImageAltChange} />
      </div>

      {validationMessage ? <p className="mt-3 text-xs leading-5 text-aviation-amber">{validationMessage}</p> : null}

      {storageEnabled ? (
        <>
          <p className="mt-4 text-xs leading-5 text-slate-400">JPG, PNG ou WebP. O arquivo será enviado para uma pasta de Storage vinculada a este conteúdo.</p>
          <label className="mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-white/15 bg-white/[0.035] px-4 py-5 text-sm font-semibold text-slate-200">
            <Upload className="h-4 w-4 text-aviation-cyan" />
            Enviar imagem
            <input type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => void onUpload(event)} className="sr-only" />
          </label>
        </>
      ) : (
        <div className="mt-4 rounded-md border border-aviation-amber/25 bg-aviation-amber/[0.06] p-3 text-xs leading-5 text-aviation-amber">
          Upload desativado no modo Spark atual. Salve o conteúdo com uma URL HTTPS ou um caminho local em `/images/...`.
        </div>
      )}

      {uploadProgress !== undefined ? <p className="mt-3 text-sm text-aviation-cyan">Upload: {uploadProgress}%</p> : null}
      {uploadError ? <p className="mt-3 text-sm text-aviation-amber">{uploadError}</p> : null}
    </Panel>
  );
}

function CommonFields({ entityType, payload, setField }: { entityType: AdminEntityType; payload: AdminContentPayload; setField: (field: string, value: unknown) => void }) {
  const config = adminEntityConfigs[entityType];
  const titleValue = String(payload[config.titleField] ?? "");
  return (
    <Panel>
      <h4 className="text-sm font-semibold text-white">Campos principais</h4>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <TextField label={config.titleField === "name" ? "Nome" : config.titleField === "prompt" ? "Enunciado" : "Título"} value={titleValue} onChange={(value) => setField(config.titleField, value)} required />
        {config.slugField ? (
          <TextField label="Slug" value={String(payload[config.slugField] ?? "")} onChange={(value) => setField(config.slugField!, value || slugifyTitle(titleValue))} required />
        ) : null}
        <SelectField label="Publicação" value={String(payload.publicationState ?? "draft")} onChange={(value) => setField("publicationState", value)} options={[["draft", "Rascunho"], ["published", "Publicado"]]} />
        <NumberField label="Ordem" value={typeof payload.order === "number" ? payload.order : 999} onChange={(value) => setField("order", value)} />
      </div>
    </Panel>
  );
}

function EntitySpecificFields({
  entityType,
  payload,
  initialPayload,
  setField
}: {
  entityType: AdminEntityType;
  payload: AdminContentPayload;
  initialPayload?: AdminContentPayload;
  setField: (field: string, value: unknown) => void;
}) {
  if (hasSpecializedTechnicalEditor(entityType)) {
    return <SpecializedTechnicalEditor entityType={entityType} payload={payload} initialPayload={initialPayload} setField={setField} />;
  }

  if (entityType === "course") {
    return (
      <Panel>
        <h4 className="text-sm font-semibold text-white">Curso</h4>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <TextField label="Categoria" value={String(payload.category ?? "")} onChange={(value) => setField("category", value)} />
          <SelectField label="Nível" value={String(payload.level ?? "Inicial")} onChange={(value) => setField("level", value)} options={[["Inicial", "Inicial"], ["Intermediário", "Intermediário"], ["Avançado", "Avançado"]]} />
          <TextField label="Duração estimada" value={String(payload.estimatedDuration ?? "")} onChange={(value) => setField("estimatedDuration", value)} />
          <TextField label="Curso seguinte" value={String(payload.nextCourseId ?? "")} onChange={(value) => setField("nextCourseId", value)} />
          <TextAreaField label="Descrição" value={String(payload.description ?? "")} onChange={(value) => setField("description", value)} className="md:col-span-2" />
          <TextAreaField label="Pré-requisitos (um por linha)" value={arrayToText(payload.prerequisites)} onChange={(value) => setField("prerequisites", textToArray(value))} />
          <TextAreaField label="Aviso legal" value={String(payload.disclaimer ?? "")} onChange={(value) => setField("disclaimer", value)} />
        </div>
      </Panel>
    );
  }

  if (entityType === "module") {
    return (
      <Panel>
        <h4 className="text-sm font-semibold text-white">Módulo</h4>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <TextField label="Curso relacionado (ID)" value={String(payload.courseId ?? "")} onChange={(value) => setField("courseId", value)} />
          <TextField label="Duração" value={String(payload.duration ?? "")} onChange={(value) => setField("duration", value)} />
          <TextAreaField label="Descrição" value={String(payload.description ?? "")} onChange={(value) => setField("description", value)} className="md:col-span-2" />
          <TextAreaField label="Pré-requisitos (um por linha)" value={arrayToText(payload.prerequisites)} onChange={(value) => setField("prerequisites", textToArray(value))} />
        </div>
      </Panel>
    );
  }

  if (entityType === "lesson") {
    return (
      <Panel>
        <h4 className="text-sm font-semibold text-white">Aula</h4>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <TextField label="Módulo relacionado (ID)" value={String(payload.moduleId ?? "")} onChange={(value) => setField("moduleId", value)} />
          <TextField label="Duração estimada" value={String(payload.estimatedDuration ?? "")} onChange={(value) => setField("estimatedDuration", value)} />
          <TextField label="Aula anterior (ID)" value={String(payload.previousLessonId ?? "")} onChange={(value) => setField("previousLessonId", value)} />
          <TextField label="Próxima aula (ID)" value={String(payload.nextLessonId ?? "")} onChange={(value) => setField("nextLessonId", value)} />
          <TextAreaField label="Resumo" value={String(payload.summary ?? "")} onChange={(value) => setField("summary", value)} />
          <TextAreaField label="Objetivo" value={String(payload.objective ?? "")} onChange={(value) => setField("objective", value)} />
          <TextAreaField label="Conceitos principais (um por linha)" value={arrayToText(payload.keyConcepts)} onChange={(value) => setField("keyConcepts", textToArray(value))} />
          <TextAreaField label="Conteúdo em Markdown simples" value={String(payload.markdownContent ?? payload.didacticExplanation ?? "")} onChange={(value) => setField("markdownContent", value)} />
          <TextAreaField label="Exemplo" value={String(payload.example ?? "")} onChange={(value) => setField("example", value)} />
          <TextAreaField label="Erro comum" value={String(payload.commonMistake ?? "")} onChange={(value) => setField("commonMistake", value)} />
          <TextAreaField label="Aplicação no simulador" value={String(payload.simulatorApplication ?? "")} onChange={(value) => setField("simulatorApplication", value)} />
          <TextAreaField label="Conclusão" value={String(payload.conclusion ?? "")} onChange={(value) => setField("conclusion", value)} />
        </div>
      </Panel>
    );
  }

  if (entityType === "exercise") {
    return (
      <Panel>
        <h4 className="text-sm font-semibold text-white">Exercício</h4>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <SelectField label="Tipo" value={String(payload.type ?? "multiple_choice")} onChange={(value) => setField("type", value)} options={[["multiple_choice", "Múltipla escolha"], ["true_false", "Verdadeiro ou falso"], ["open_answer", "Resposta aberta"]]} />
          <SelectField label="Dificuldade" value={String(payload.difficulty ?? "facil")} onChange={(value) => setField("difficulty", value)} options={[["facil", "Fácil"], ["medio", "Médio"], ["dificil", "Difícil"]]} />
          <NumberField label="Pontos" value={Number(payload.points ?? 1)} onChange={(value) => setField("points", value)} />
          <TextField label="Aula relacionada (ID)" value={String(payload.lessonId ?? "")} onChange={(value) => setField("lessonId", value)} />
          <TextAreaField label="Alternativas (id | texto, uma por linha)" value={alternativesToText(payload.alternativeOptions, payload.alternatives)} onChange={(value) => setField("alternativeOptions", textToAlternatives(value))} />
          <TextField label="Resposta correta" value={String(payload.correctAnswer ?? "")} onChange={(value) => setField("correctAnswer", value)} />
          <TextAreaField label="Resposta esperada" value={String(payload.expectedAnswer ?? "")} onChange={(value) => setField("expectedAnswer", value)} />
          <TextAreaField label="Explicação" value={String(payload.explanation ?? "")} onChange={(value) => setField("explanation", value)} />
        </div>
      </Panel>
    );
  }

  if (entityType === "aircraft" || entityType === "avionic") {
    return (
      <Panel>
        <h4 className="text-sm font-semibold text-white">{entityType === "aircraft" ? "Aeronave" : "Aviônico"}</h4>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <TextField label="Fabricante" value={String(payload.manufacturer ?? "")} onChange={(value) => setField("manufacturer", value)} />
          <TextField label={entityType === "aircraft" ? "Modelo" : "Versão"} value={String((entityType === "aircraft" ? payload.model : payload.version) ?? "")} onChange={(value) => setField(entityType === "aircraft" ? "model" : "version", value)} />
          {entityType === "aircraft" ? <TextField label="Categoria" value={String(payload.category ?? "")} onChange={(value) => setField("category", value)} /> : null}
          <SelectField label="Status de estudo" value={String(payload.studyStatus ?? "planned")} onChange={(value) => setField("studyStatus", value)} options={[["current", "Em estudo"], ["available", "Disponível"], ["planned", "Planejado"], ["paused", "Pausado"]]} />
          <TextAreaField label="Descrição" value={String(payload.description ?? "")} onChange={(value) => setField("description", value)} className="md:col-span-2" />
          <TextAreaField label="Cursos relacionados (IDs)" value={arrayToText(entityType === "aircraft" ? payload.relatedCourseIds : payload.courseIds)} onChange={(value) => setField(entityType === "aircraft" ? "relatedCourseIds" : "courseIds", textToArray(value))} />
          <TextAreaField label="Aeronaves/Aviônicos relacionados (IDs)" value={arrayToText(entityType === "aircraft" ? payload.installedAvionicIds : payload.compatibleAircraftIds)} onChange={(value) => setField(entityType === "aircraft" ? "installedAvionicIds" : "compatibleAircraftIds", textToArray(value))} />
        </div>
      </Panel>
    );
  }

  if (entityType === "checklist") {
    return (
      <Panel>
        <h4 className="text-sm font-semibold text-white">Checklist</h4>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <TextField label="Aeronave relacionada (ID)" value={String(payload.aircraftId ?? "")} onChange={(value) => setField("aircraftId", value)} />
          <TextField label="Nome da aeronave" value={String(payload.aircraftName ?? "")} onChange={(value) => setField("aircraftName", value)} />
          <TextField label="Fase do voo" value={String(payload.flightPhase ?? "preparacao")} onChange={(value) => setField("flightPhase", value)} />
          <TextField label="Versão" value={String(payload.version ?? "0.1")} onChange={(value) => setField("version", value)} />
          <TextAreaField label="Descrição" value={String(payload.description ?? "")} onChange={(value) => setField("description", value)} />
          <TextAreaField label="Observações" value={String(payload.notes ?? "")} onChange={(value) => setField("notes", value)} />
          <TextAreaField label="Itens (texto | resposta esperada | crítico)" value={checklistItemsToText(payload.items)} onChange={(value) => setField("items", textToChecklistItems(value))} className="md:col-span-2" />
        </div>
      </Panel>
    );
  }

  return (
    <Panel>
      <h4 className="text-sm font-semibold text-white">Treinamento</h4>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <TextField label="Aeronave relacionada (ID)" value={String(payload.aircraftId ?? "")} onChange={(value) => setField("aircraftId", value)} />
        <TextField label="Nome da aeronave" value={String(payload.aircraftName ?? "")} onChange={(value) => setField("aircraftName", value)} />
        <SelectField label="Dificuldade" value={String(payload.difficulty ?? "Inicial")} onChange={(value) => setField("difficulty", value)} options={[["Inicial", "Inicial"], ["Intermediário", "Intermediário"], ["Avançado", "Avançado"]]} />
        <TextField label="Duração" value={String(payload.duration ?? "")} onChange={(value) => setField("duration", value)} />
        <TextField label="Origem" value={String(payload.departureAirport ?? "")} onChange={(value) => setField("departureAirport", value)} />
        <TextField label="Destino" value={String(payload.destinationAirport ?? "")} onChange={(value) => setField("destinationAirport", value)} />
        <TextAreaField label="Condições" value={String(payload.conditions ?? "")} onChange={(value) => setField("conditions", value)} />
        <TextAreaField label="Objetivo" value={String(payload.objective ?? "")} onChange={(value) => setField("objective", value)} />
        <TextAreaField label="Instruções (uma por linha)" value={arrayToText(payload.instructions)} onChange={(value) => setField("instructions", textToArray(value))} />
        <TextAreaField label="Critérios de conclusão (um por linha)" value={arrayToText(payload.completionCriteria)} onChange={(value) => setField("completionCriteria", textToArray(value))} />
      </div>
    </Panel>
  );
}

function TechnicalMetadataEditor({ payload, role, setField }: { payload: AdminContentPayload; role: "admin" | "instructor"; setField: (field: string, value: unknown) => void }) {
  const metadata = payload.technicalMetadata ?? adminEntityConfigs.lesson.defaultValues.technicalMetadata;

  function setMetadata(field: string, value: unknown) {
    setField("technicalMetadata", { ...metadata, [field]: value });
  }

  return (
    <Panel className="border-aviation-amber/20">
      <h4 className="text-sm font-semibold text-white">Fidelidade técnica e fontes</h4>
      <p className="mt-1 text-xs leading-5 text-slate-400">IA não deve ser registrada como fonte. Dados sem fonte confirmada permanecem provisórios e pendentes.</p>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <SelectField label="Classificação" value={metadata?.contentClassification ?? "provisional_unverified"} onChange={(value) => setMetadata("contentClassification", value)} options={classificationOptions.map((option) => [option, classificationLabels[option]])} />
        <SelectField label="Verificação" value={metadata?.verificationStatus ?? "pending_verification"} onChange={(value) => setMetadata("verificationStatus", value)} disabled={role !== "admin" && metadata?.verificationStatus === "verified"} options={verificationOptions.map((option) => [option, verificationStatusLabels[option]])} />
        <SelectField label="Tipo de fonte" value={metadata?.sourceType ?? "internal_training_material"} onChange={(value) => setMetadata("sourceType", value)} options={sourceTypeOptions.map((option) => [option, option])} />
        <TextField label="Título da fonte" value={metadata?.sourceTitle ?? ""} onChange={(value) => setMetadata("sourceTitle", value)} />
        <TextField label="Organização" value={metadata?.sourceOrganization ?? ""} onChange={(value) => setMetadata("sourceOrganization", value)} />
        <TextField label="Edição" value={metadata?.sourceEdition ?? ""} onChange={(value) => setMetadata("sourceEdition", value)} />
        <TextField label="Revisão" value={metadata?.sourceRevision ?? ""} onChange={(value) => setMetadata("sourceRevision", value)} />
        <TextField label="Data da fonte" value={metadata?.sourceDate ?? ""} onChange={(value) => setMetadata("sourceDate", value)} />
        <TextField label="Página" value={metadata?.sourcePage ?? ""} onChange={(value) => setMetadata("sourcePage", value)} />
        <TextField label="URL" value={metadata?.sourceUrl ?? ""} onChange={(value) => setMetadata("sourceUrl", value)} />
        <TextField label="Fabricante" value={metadata?.aircraftManufacturer ?? ""} onChange={(value) => setMetadata("aircraftManufacturer", value)} />
        <TextField label="Modelo" value={metadata?.aircraftModel ?? ""} onChange={(value) => setMetadata("aircraftModel", value)} />
        <TextField label="Variante real" value={metadata?.aircraftVariant ?? ""} onChange={(value) => setMetadata("aircraftVariant", value)} />
        <TextField label="Variante no simulador" value={metadata?.simulatorAircraftVariant ?? ""} onChange={(value) => setMetadata("simulatorAircraftVariant", value)} />
        <TextField label="Plataforma" value={metadata?.simulatorPlatform ?? ""} onChange={(value) => setMetadata("simulatorPlatform", value)} />
        <TextField label="Desenvolvedor do add-on" value={metadata?.simulatorDeveloper ?? ""} onChange={(value) => setMetadata("simulatorDeveloper", value)} />
        <TextField label="Versão do add-on" value={metadata?.addonVersion ?? ""} onChange={(value) => setMetadata("addonVersion", value)} />
        <TextField label="Última revisão" value={metadata?.lastReviewedAt ?? ""} onChange={(value) => setMetadata("lastReviewedAt", value)} />
        <TextAreaField label="Notas de adaptação ao simulador" value={metadata?.simulatorAdaptationNotes ?? ""} onChange={(value) => setMetadata("simulatorAdaptationNotes", value)} />
        <TextAreaField label="Diferenças conhecidas do simulador" value={metadata?.knownSimulatorDifferences ?? ""} onChange={(value) => setMetadata("knownSimulatorDifferences", value)} />
        <TextAreaField label="Aviso técnico" value={metadata?.technicalDisclaimer ?? ""} onChange={(value) => setMetadata("technicalDisclaimer", value)} />
        <TextAreaField label="Notas de revisão" value={metadata?.revisionNotes ?? ""} onChange={(value) => setMetadata("revisionNotes", value)} />
        <label className="flex items-center gap-3 rounded-md border border-white/10 bg-white/[0.035] p-3 text-sm text-slate-200">
          <input type="checkbox" checked={Boolean(metadata?.markedForReview)} onChange={(event) => setMetadata("markedForReview", event.target.checked)} className="h-4 w-4 accent-aviation-cyan" />
          Marcar para revisão
        </label>
      </div>
    </Panel>
  );
}

function PreviewPanel({ entityType, payload }: { entityType: AdminEntityType; payload: AdminContentPayload }) {
  const config = adminEntityConfigs[entityType];
  return (
    <Panel>
      <div className="flex items-center gap-2 text-sm font-semibold text-white">
        <Eye className="h-4 w-4 text-aviation-cyan" />
        Pré-visualização
      </div>
      <h4 className="mt-4 text-lg font-semibold text-white">{String(payload[config.titleField] || "Sem título")}</h4>
      <p className="mt-2 text-sm leading-6 text-slate-400">{String(payload.description || payload.summary || payload.objective || payload.prompt || "Preencha os campos para visualizar o conteúdo.")}</p>
      <div className="mt-4 rounded-md border border-white/10 bg-white/[0.035] p-3 text-xs text-slate-400">
        <pre className="max-h-72 overflow-auto whitespace-pre-wrap">{JSON.stringify(payload, null, 2)}</pre>
      </div>
    </Panel>
  );
}

function AuditPanel({ logs }: { logs: AdminAuditLogDocument[] }) {
  return (
    <Panel>
      <div className="flex items-center gap-2">
        <History className="h-4 w-4 text-aviation-cyan" />
        <h3 className="text-sm font-semibold text-white">Alterações recentes</h3>
      </div>
      <div className="mt-4 space-y-3">
        {logs.length ? logs.map((log) => (
          <div key={log.id} className="rounded-md border border-white/10 bg-white/[0.035] p-3">
            <p className="text-sm font-semibold text-white">{log.entityTitle}</p>
            <p className="mt-1 text-xs text-slate-400">{log.action} · {log.entityType} · {new Date(log.timestamp).toLocaleString("pt-BR")}</p>
          </div>
        )) : <p className="text-sm text-slate-400">Nenhum histórico recente encontrado.</p>}
      </div>
    </Panel>
  );
}

function TextField({ label, value, required, onChange }: { label: string; value: string; required?: boolean; onChange: (value: string) => void }) {
  return (
    <label className="block text-sm text-slate-300">
      {label}
      <input required={required} value={value} onChange={(event) => onChange(event.target.value)} className="focus-ring mt-2 h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 text-sm text-white placeholder:text-slate-500" />
    </label>
  );
}

function NumberField({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  return (
    <label className="block text-sm text-slate-300">
      {label}
      <input type="number" value={value} onChange={(event) => onChange(Number(event.target.value))} className="focus-ring mt-2 h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 text-sm text-white" />
    </label>
  );
}

function SelectField({ label, value, disabled, options, onChange }: { label: string; value: string; disabled?: boolean; options: Array<readonly [string, string]>; onChange: (value: string) => void }) {
  return (
    <label className="block text-sm text-slate-300">
      {label}
      <select disabled={disabled} value={value} onChange={(event) => onChange(event.target.value)} className="focus-ring mt-2 h-10 w-full rounded-md border border-white/10 bg-aviation-ink px-3 text-sm text-white disabled:opacity-60">
        {options.map(([optionValue, labelValue]) => (
          <option key={optionValue} value={optionValue}>{labelValue}</option>
        ))}
      </select>
    </label>
  );
}

function TextAreaField({ label, value, className = "", onChange }: { label: string; value: string; className?: string; onChange: (value: string) => void }) {
  return (
    <label className={`block text-sm text-slate-300 ${className}`}>
      {label}
      <textarea value={value} onChange={(event) => onChange(event.target.value)} rows={5} className="focus-ring mt-2 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm leading-6 text-white placeholder:text-slate-500" />
    </label>
  );
}

function arrayToText(value: unknown) {
  return Array.isArray(value) ? value.map(String).join("\n") : "";
}

function textToArray(value: string) {
  return value.split(/\r?\n/).map((item) => item.trim()).filter(Boolean);
}

function alternativesToText(options: unknown, fallback: unknown) {
  if (Array.isArray(options)) {
    return options.map((item) => {
      if (typeof item === "object" && item && "id" in item && "text" in item) {
        return `${String(item.id)} | ${String(item.text)}`;
      }
      return String(item);
    }).join("\n");
  }
  return arrayToText(fallback);
}

function textToAlternatives(value: string) {
  return textToArray(value).map((line, index) => {
    const [id, ...textParts] = line.split("|").map((part) => part.trim());
    return {
      id: id || `option-${index + 1}`,
      text: textParts.join(" | ") || id
    };
  });
}

function checklistItemsToText(value: unknown) {
  if (!Array.isArray(value)) {
    return "";
  }
  return value.map((item) => {
    if (typeof item === "object" && item) {
      const record = item as Record<string, unknown>;
      return [record.text, record.expectedResponse, record.kind === "critical" ? "critico" : "normal"].map((part) => String(part ?? "")).join(" | ");
    }
    return String(item);
  }).join("\n");
}

function textToChecklistItems(value: string) {
  return textToArray(value).map((line, index) => {
    const [text, expectedResponse = "", kind = "normal"] = line.split("|").map((part) => part.trim());
    return {
      id: `item-${index + 1}`,
      checklistId: "",
      text,
      expectedResponse,
      observation: "",
      order: index + 1,
      kind: kind === "critico" || kind === "critical" ? "critical" : "normal",
      status: "pending"
    };
  });
}
