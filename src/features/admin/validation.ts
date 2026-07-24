import type { AdminContentPayload, AdminEntityConfig } from "@/features/admin/types";

export type AdminValidationIssue = {
  field: string;
  message: string;
};

const validSlug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function validateAdminPayload(config: AdminEntityConfig, payload: AdminContentPayload, role: "admin" | "instructor") {
  const issues: AdminValidationIssue[] = [];
  const titleValue = String(payload[config.titleField] ?? "").trim();

  if (!titleValue) {
    issues.push({ field: config.titleField, message: "Informe um título ou nome." });
  }

  if (config.slugField) {
    const slug = String(payload[config.slugField] ?? "").trim();
    if (!slug) {
      issues.push({ field: config.slugField, message: "Informe um slug." });
    } else if (!validSlug.test(slug)) {
      issues.push({ field: config.slugField, message: "Use apenas letras minúsculas, números e hífens." });
    }
  }

  if (payload.publicationState !== "draft" && payload.publicationState !== "published") {
    issues.push({ field: "publicationState", message: "Selecione rascunho ou publicado." });
  }

  if (config.technical && payload.publicationState === "published") {
    const metadata = payload.technicalMetadata;
    if (!metadata?.contentClassification) {
      issues.push({ field: "technicalMetadata.contentClassification", message: "Conteúdo técnico publicado precisa de classificação." });
    }
    if (!metadata?.verificationStatus) {
      issues.push({ field: "technicalMetadata.verificationStatus", message: "Conteúdo técnico publicado precisa de status de verificação." });
    }
  }

  if (role === "instructor" && payload.technicalMetadata?.verificationStatus === "verified") {
    issues.push({ field: "technicalMetadata.verificationStatus", message: "Somente administrador pode marcar conteúdo como verificado." });
  }

  if (role === "instructor" && payload.technicalMetadata?.contentClassification === "official_real_world") {
    issues.push({ field: "technicalMetadata.contentClassification", message: "Somente administrador pode classificar conteúdo como procedimento real oficial." });
  }

  validateTechnicalSource(payload, issues);

  if (config.type === "aircraftLimitation") {
    validateAircraftLimitation(payload, issues);
  }

  if (config.type === "aircraftProcedure") {
    validateAircraftProcedure(payload, issues);
  }

  if (config.type === "aircraftPerformance") {
    validateAircraftPerformance(payload, issues);
  }

  if (config.type === "lesson") {
    validateLessonBlocks(payload, issues);
  }

  return issues;
}

export function slugifyTitle(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

function validateTechnicalSource(payload: AdminContentPayload, issues: AdminValidationIssue[]) {
  const metadata = payload.technicalMetadata;
  if (!metadata) {
    return;
  }

  const sourceText = [
    metadata.sourceTitle,
    metadata.sourceOrganization,
    metadata.sourceDocumentId,
    metadata.revisionNotes
  ].map((item) => String(item ?? "").toLocaleLowerCase("pt-BR")).join(" ");

  if (/(^|\b)(chatgpt|inteligência artificial|inteligencia artificial|\bia\b|modelo de linguagem|llm)(\b|$)/i.test(sourceText)) {
    issues.push({ field: "technicalMetadata.sourceTitle", message: "IA pode auxiliar a redação, mas não pode ser cadastrada como fonte técnica." });
  }

  if (metadata.verificationStatus === "verified" && !String(metadata.sourceTitle ?? "").trim()) {
    issues.push({ field: "technicalMetadata.sourceTitle", message: "Conteúdo verificado precisa de fonte identificável." });
  }
}

function validateAircraftLimitation(payload: AdminContentPayload, issues: AdminValidationIssue[]) {
  if (payload.publicationState === "published" && !String(payload.aircraftVariant ?? "").trim()) {
    issues.push({ field: "aircraftVariant", message: "Limitação publicada precisa informar a variante real aplicável." });
  }

  if (payload.publicationState === "published" && !String(payload.category ?? "").trim()) {
    issues.push({ field: "category", message: "Limitação publicada precisa de categoria." });
  }

  const implementation = String(payload.simulatorImplementation ?? "unknown");
  const hasDivergence = implementation === "partial" || implementation === "not_implemented";
  const metadataNotes = String(payload.technicalMetadata?.knownSimulatorDifferences ?? payload.technicalMetadata?.simulatorAdaptationNotes ?? "");
  if (hasDivergence && !String(payload.note ?? metadataNotes).trim()) {
    issues.push({ field: "note", message: "Explique a divergência quando a limitação não existir ou for parcial no simulador." });
  }
}

function validateAircraftProcedure(payload: AdminContentPayload, issues: AdminValidationIssue[]) {
  if (payload.type === "emergency" && payload.technicalMetadata?.verificationStatus !== "verified") {
    const classification = payload.technicalMetadata?.contentClassification ?? "provisional_unverified";
    if (classification !== "provisional_unverified") {
      issues.push({ field: "technicalMetadata.contentClassification", message: "Procedimento de emergência sem fonte confirmada deve permanecer provisório não verificado." });
    }
  }

  if (!Array.isArray(payload.steps)) {
    return;
  }

  const missingIds = payload.steps.some((step, index) => {
    if (typeof step === "string") {
      return !step.trim();
    }
    const record = step as Record<string, unknown>;
    return !String(record.id ?? "").trim() || !String(record.action ?? "").trim() || Number(record.order ?? index + 1) < 1;
  });

  if (missingIds) {
    issues.push({ field: "steps", message: "Cada passo precisa de ID estável, ordem e ação." });
  }
}

function validateAircraftPerformance(payload: AdminContentPayload, issues: AdminValidationIssue[]) {
  const table = payload.table as { headers?: unknown[]; rows?: Array<{ cells?: unknown[] }> } | undefined;
  if (!table || !Array.isArray(table.headers) || !Array.isArray(table.rows)) {
    return;
  }

  if (table.rows.length > 120 || table.headers.length > 16) {
    issues.push({ field: "table", message: "Tabela muito grande para esta etapa. Limite: 16 colunas e 120 linhas." });
  }

  const invalidRow = table.rows.some((row) => Array.isArray(row.cells) && row.cells.length > table.headers!.length);
  if (invalidRow) {
    issues.push({ field: "table", message: "Há linhas com mais células do que cabeçalhos." });
  }
}

function validateLessonBlocks(payload: AdminContentPayload, issues: AdminValidationIssue[]) {
  if (!Array.isArray(payload.content)) {
    return;
  }

  const ids = new Set<string>();
  for (const block of payload.content) {
    const record = block as Record<string, unknown>;
    const id = String(record.id ?? "").trim();
    if (!id) {
      issues.push({ field: "content", message: "Cada bloco de aula precisa de ID estável." });
      return;
    }
    if (ids.has(id)) {
      issues.push({ field: "content", message: "Há blocos de aula com ID duplicado." });
      return;
    }
    ids.add(id);
  }
}
