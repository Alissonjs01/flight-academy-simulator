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
