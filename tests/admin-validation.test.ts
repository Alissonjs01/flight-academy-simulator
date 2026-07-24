import { describe, expect, it } from "vitest";
import { adminEntityConfigs } from "@/features/admin/entityConfig";
import { validateAdminPayload } from "@/features/admin/validation";

describe("admin specialized aviation validation", () => {
  it("bloqueia limitação publicada sem variante real", () => {
    const issues = validateAdminPayload(adminEntityConfigs.aircraftLimitation, {
      ...adminEntityConfigs.aircraftLimitation.defaultValues,
      id: "lim-a",
      title: "Limitação sem variante",
      slug: "limitacao-sem-variante",
      aircraftId: "aircraft-c408",
      value: "Valor provisório",
      publicationState: "published"
    }, "admin");

    expect(issues.some((issue) => issue.field === "aircraftVariant")).toBe(true);
  });

  it("bloqueia verified sem fonte identificável", () => {
    const issues = validateAdminPayload(adminEntityConfigs.aircraftLimitation, {
      ...adminEntityConfigs.aircraftLimitation.defaultValues,
      id: "lim-b",
      title: "Limitação verificada",
      slug: "limitacao-verificada",
      aircraftId: "aircraft-c408",
      aircraftVariant: "Variante",
      value: "Valor registrado",
      publicationState: "published",
      technicalMetadata: {
        contentClassification: "official_real_world",
        verificationStatus: "verified"
      }
    }, "admin");

    expect(issues.some((issue) => issue.field === "technicalMetadata.sourceTitle")).toBe(true);
  });

  it("bloqueia IA como fonte técnica", () => {
    const issues = validateAdminPayload(adminEntityConfigs.aircraftProcedure, {
      ...adminEntityConfigs.aircraftProcedure.defaultValues,
      id: "proc-a",
      title: "Procedimento",
      slug: "procedimento",
      aircraftId: "aircraft-c408",
      publicationState: "draft",
      technicalMetadata: {
        contentClassification: "provisional_unverified",
        verificationStatus: "pending_verification",
        sourceTitle: "ChatGPT"
      }
    }, "admin");

    expect(issues.some((issue) => issue.message.includes("IA"))).toBe(true);
  });

  it("valida passos com IDs estáveis", () => {
    const issues = validateAdminPayload(adminEntityConfigs.aircraftProcedure, {
      ...adminEntityConfigs.aircraftProcedure.defaultValues,
      id: "proc-b",
      title: "Procedimento",
      slug: "procedimento-b",
      aircraftId: "aircraft-c408",
      steps: [{ order: 1, action: "Executar ação", critical: false }],
      publicationState: "draft"
    }, "admin");

    expect(issues.some((issue) => issue.field === "steps")).toBe(true);
  });

  it("rejeita CSV/tabela de performance inconsistente", () => {
    const issues = validateAdminPayload(adminEntityConfigs.aircraftPerformance, {
      ...adminEntityConfigs.aircraftPerformance.defaultValues,
      id: "perf-a",
      title: "Tabela",
      slug: "tabela",
      aircraftId: "aircraft-c408",
      table: {
        id: "table-main",
        headers: ["Peso"],
        rows: [{ id: "row-a", cells: ["1", "2"] }]
      },
      publicationState: "draft"
    }, "admin");

    expect(issues.some((issue) => issue.field === "table")).toBe(true);
  });

  it("bloqueia blocos de aula com IDs duplicados", () => {
    const issues = validateAdminPayload(adminEntityConfigs.lesson, {
      ...adminEntityConfigs.lesson.defaultValues,
      id: "lesson-a",
      title: "Aula",
      slug: "aula",
      content: [
        { id: "block-a", type: "paragraph", text: "Um" },
        { id: "block-a", type: "paragraph", text: "Dois" }
      ],
      publicationState: "draft"
    }, "admin");

    expect(issues.some((issue) => issue.field === "content")).toBe(true);
  });
});
