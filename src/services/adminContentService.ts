"use client";

import {
  collection,
  deleteDoc,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  type QueryConstraint,
  runTransaction,
  setDoc,
  updateDoc,
  where
} from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable, type UploadTask } from "firebase/storage";
import { adminEntityConfigs } from "@/features/admin/entityConfig";
import type {
  AdminAuditAction,
  AdminAuditLogDocument,
  AdminCollectionName,
  AdminContentPayload,
  AdminContentRevisionDocument,
  AdminContentSummary,
  AdminDashboardMetrics,
  AdminEntityType,
  AdminListFilters,
  AdminRole,
  AdminSaveResult,
  AdminUploadResult
} from "@/features/admin/types";
import { validateAdminPayload } from "@/features/admin/validation";
import { getFirebaseAuth, getFirebaseDb, getFirebaseStorage } from "@/lib/firebase/client";
import { isFirebaseStorageEnabled } from "@/lib/firebase/config";
import { getFirebaseDataErrorMessage } from "@/lib/firebase/errors";

type AdminContext = {
  uid: string;
  role: AdminRole;
};

const contentCollections: AdminCollectionName[] = [
  "courses",
  "modules",
  "lessons",
  "exercises",
  "aircraft",
  "aircraftSystems",
  "aircraftLimitations",
  "aircraftProcedures",
  "aircraftPerformance",
  "avionics",
  "checklists",
  "trainings"
];
const maxListSize = 80;
const maxUploadBytesByFolder = {
  courseImages: 5 * 1024 * 1024,
  lessonImages: 5 * 1024 * 1024,
  aircraftImages: 8 * 1024 * 1024,
  avionicsImages: 8 * 1024 * 1024
};

export async function getAdminContext(): Promise<AdminContext> {
  const user = getFirebaseAuth().currentUser;

  if (!user) {
    throw new Error("Sua sessão expirou. Faça login novamente.");
  }

  const token = await user.getIdTokenResult(true);
  const claimRole = token.claims.role;

  if (claimRole === "admin" || claimRole === "instructor") {
    return { uid: user.uid, role: claimRole };
  }

  const profile = await getDoc(doc(getFirebaseDb(), "users", user.uid));
  const profileRole = profile.data()?.role;

  if (profileRole === "admin" || profileRole === "instructor") {
    return { uid: user.uid, role: profileRole };
  }

  throw new Error("Este painel exige papel de instrutor ou administrador validado pelo Firebase.");
}

export async function getAdminDashboardMetrics(): Promise<AdminDashboardMetrics> {
  try {
    await getAdminContext();
    const db = getFirebaseDb();
    const [
      totalCourses,
      publishedCourses,
      draftCourses,
      totalModules,
      totalLessons,
      totalExercises,
      totalAircraft,
      totalAvionics,
      totalChecklists,
      totalTrainings,
      pendingVerification,
      markedForReview,
      recentChangesSnapshot
    ] = await Promise.all([
      countCollection("courses"),
      countWhere("courses", "publicationState", "published"),
      countWhere("courses", "publicationState", "draft"),
      countCollection("modules"),
      countCollection("lessons"),
      countCollection("exercises"),
      countCollection("aircraft"),
      countCollection("avionics"),
      countCollection("checklists"),
      countCollection("trainings"),
      countPendingVerification(),
      countMarkedForReview(),
      getDocs(query(collection(db, "auditLogs"), orderBy("timestamp", "desc"), limit(8)))
    ]);

    return {
      totalCourses,
      publishedCourses,
      draftCourses,
      totalModules,
      totalLessons,
      totalExercises,
      totalAircraft,
      totalAvionics,
      totalChecklists,
      totalTrainings,
      pendingVerification,
      markedForReview,
      recentChanges: recentChangesSnapshot.docs.map((item) => item.data() as AdminAuditLogDocument)
    };
  } catch (error) {
    throw new Error(getFirebaseDataErrorMessage(error));
  }
}

export async function listAdminContent(entityType: AdminEntityType, filters: AdminListFilters): Promise<AdminContentSummary[]> {
  try {
    await getAdminContext();
    const config = adminEntityConfigs[entityType];
    const constraints: QueryConstraint[] = [orderBy("updatedAt", "desc"), limit(maxListSize)];

    if (filters.publicationState !== "all") {
      constraints.unshift(where("publicationState", "==", filters.publicationState));
    }

    const snapshot = await getDocs(query(collection(getFirebaseDb(), config.collectionName), ...constraints));
    const items = snapshot.docs.map((item) => toSummary(entityType, { id: item.id, ...item.data() }));
    return applyClientFilters(items, filters, config.searchFields);
  } catch (error) {
    throw new Error(getFirebaseDataErrorMessage(error));
  }
}

export async function createAdminContent(entityType: AdminEntityType, payload: AdminContentPayload): Promise<AdminSaveResult> {
  const context = await getAdminContext();
  const config = adminEntityConfigs[entityType];
  const now = new Date().toISOString();
  const id = String(payload.id || crypto.randomUUID());
  const prepared = preparePayload(entityType, {
    ...config.defaultValues,
    ...payload,
    id,
    createdAt: now,
    updatedAt: now,
    createdBy: context.uid,
    updatedBy: context.uid,
    version: 1,
    archivedAt: null
  });

  const issues = validateAdminPayload(config, prepared, context.role);
  if (issues.length) {
    throw new Error(issues.map((issue) => issue.message).join(" "));
  }

  await ensureUniqueSlug(config.collectionName, id, prepared.slug);

  try {
    await setDoc(doc(getFirebaseDb(), config.collectionName, id), prepared);
    const title = titleFor(config.titleField, prepared);
    await writeAuditLog(context, "create", entityType, id, title, [], undefined, String(prepared.publicationState ?? "draft"));
    return { id, title };
  } catch (error) {
    throw new Error(getFirebaseDataErrorMessage(error));
  }
}

export async function updateAdminContent(entityType: AdminEntityType, id: string, payload: AdminContentPayload, action: AdminAuditAction = "update"): Promise<AdminSaveResult> {
  const context = await getAdminContext();
  const config = adminEntityConfigs[entityType];
  const db = getFirebaseDb();
  const targetRef = doc(db, config.collectionName, id);
  const currentSnapshot = await getDoc(targetRef);

  if (!currentSnapshot.exists()) {
    throw new Error("Registro não encontrado.");
  }

  const current = { id: currentSnapshot.id, ...currentSnapshot.data() } as AdminContentPayload;
  const prepared = preparePayload(entityType, {
    ...current,
    ...payload,
    id,
    createdAt: current.createdAt,
    createdBy: current.createdBy,
    updatedAt: new Date().toISOString(),
    updatedBy: context.uid,
    version: Number(current.version ?? 1) + (action === "publish" || action === "unpublish" ? 1 : 0)
  });

  const issues = validateAdminPayload(config, prepared, context.role);
  if (issues.length) {
    throw new Error(issues.map((issue) => issue.message).join(" "));
  }

  await ensureUniqueSlug(config.collectionName, id, prepared.slug);

  try {
    await runTransaction(db, async (transaction) => {
      const latest = await transaction.get(targetRef);
      if (!latest.exists()) {
        throw new Error("Registro não encontrado.");
      }
      const latestData = latest.data() as AdminContentPayload;
      transaction.set(targetRef, { ...prepared, createdAt: latestData.createdAt, createdBy: latestData.createdBy }, { merge: false });
    });

    const changedFields = diffFields(current, prepared);
    const title = titleFor(config.titleField, prepared);
    await writeAuditLog(context, action, entityType, id, title, changedFields, String(current.publicationState ?? ""), String(prepared.publicationState ?? ""));
    await writeRevision(context, action, entityType, id, title, changedFields, prepared);
    return { id, title };
  } catch (error) {
    throw new Error(getFirebaseDataErrorMessage(error));
  }
}

export async function duplicateAdminContent(entityType: AdminEntityType, id: string): Promise<AdminSaveResult> {
  const context = await getAdminContext();
  const config = adminEntityConfigs[entityType];
  const snapshot = await getDoc(doc(getFirebaseDb(), config.collectionName, id));

  if (!snapshot.exists()) {
    throw new Error("Registro não encontrado.");
  }

  const now = new Date().toISOString();
  const current = { id: snapshot.id, ...snapshot.data() } as AdminContentPayload;
  const copyId = `${id}-copy-${Date.now()}`;
  const copyTitle = `${titleFor(config.titleField, current)} (cópia)`;
  const payload: AdminContentPayload = {
    ...current,
    id: copyId,
    [config.titleField]: copyTitle,
    publicationState: "draft",
    createdAt: now,
    updatedAt: now,
    createdBy: context.uid,
    updatedBy: context.uid,
    version: 1,
    archivedAt: null
  };

  if (config.slugField && typeof current[config.slugField] === "string") {
    payload[config.slugField] = `${current[config.slugField]}-copia-${Date.now().toString(36)}`;
  }

  await setDoc(doc(getFirebaseDb(), config.collectionName, copyId), payload);
  await writeAuditLog(context, "duplicate", entityType, copyId, copyTitle, Object.keys(payload));
  return { id: copyId, title: copyTitle };
}

export async function archiveAdminContent(entityType: AdminEntityType, id: string) {
  const dependencies = await getDependencySummary(entityType, id);
  const archivedAt = new Date().toISOString();
  const revisionNotes = dependencies.length ? `Arquivado com dependências preservadas: ${dependencies.join(", ")}.` : "Arquivado sem dependências detectadas.";
  return updateAdminContent(entityType, id, { archivedAt, publicationState: "draft", revisionNotes }, "archive");
}

export async function publishAdminContent(entityType: AdminEntityType, id: string) {
  return updateAdminContent(entityType, id, { publicationState: "published", publishedAt: new Date().toISOString() }, "publish");
}

export async function unpublishAdminContent(entityType: AdminEntityType, id: string) {
  return updateAdminContent(entityType, id, { publicationState: "draft" }, "unpublish");
}

export async function deleteAdminContent(entityType: AdminEntityType, id: string) {
  const context = await getAdminContext();
  if (context.role !== "admin") {
    throw new Error("Somente administrador pode excluir conteúdos críticos.");
  }

  const dependencies = await getDependencySummary(entityType, id);
  if (dependencies.length) {
    throw new Error(`Prefira arquivar este conteúdo. Dependências encontradas: ${dependencies.join(", ")}.`);
  }

  const config = adminEntityConfigs[entityType];
  const snapshot = await getDoc(doc(getFirebaseDb(), config.collectionName, id));
  const title = snapshot.exists() ? titleFor(config.titleField, { id: snapshot.id, ...snapshot.data() }) : id;
  await deleteDoc(doc(getFirebaseDb(), config.collectionName, id));
  await writeAuditLog(context, "delete", entityType, id, title, []);
}

export function uploadAdminImage(entityType: AdminEntityType, entityId: string, file: File, alt: string, onProgress: (progress: number) => void): UploadTask {
  if (!isFirebaseStorageEnabled()) {
    throw new Error("Uploads estão desativados no modo sem custos. O conteúdo pode ser salvo sem imagem e o Storage pode ser ativado futuramente.");
  }

  const config = adminEntityConfigs[entityType];

  if (!config.uploadFolder) {
    throw new Error("Esta entidade ainda não possui área de upload configurada.");
  }

  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
    throw new Error("Envie apenas imagens JPG, PNG ou WebP.");
  }

  if (file.size > maxUploadBytesByFolder[config.uploadFolder]) {
    throw new Error("Arquivo maior que o limite permitido para esta área.");
  }

  const safeName = `${Date.now()}-${file.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-")}`;
  const storagePath = `${config.uploadFolder}/${entityId}/${safeName}`;
  const storageRef = ref(getFirebaseStorage(), storagePath);
  const task = uploadBytesResumable(storageRef, file, {
    contentType: file.type,
    customMetadata: { alt }
  });

  task.on("state_changed", (snapshot) => {
    onProgress(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100));
  });

  return task;
}

export async function completeAdminUpload(entityType: AdminEntityType, entityId: string, task: UploadTask, alt: string): Promise<AdminUploadResult> {
  if (!isFirebaseStorageEnabled()) {
    throw new Error("Uploads estão desativados no modo sem custos.");
  }

  const context = await getAdminContext();
  const config = adminEntityConfigs[entityType];
  const uploadSnapshot = await task;
  const url = await getDownloadURL(uploadSnapshot.ref);
  const storagePath = uploadSnapshot.ref.fullPath;
  const payload = imagePayloadFor(entityType, entityId, url, storagePath, alt);

  await updateDoc(doc(getFirebaseDb(), config.collectionName, entityId), {
    ...payload,
    updatedAt: new Date().toISOString(),
    updatedBy: context.uid
  });
  await writeAuditLog(context, "upload", entityType, entityId, entityId, ["image", "storagePath"]);
  return { url, storagePath, alt };
}

export async function deleteAdminStorageFile(storagePath: string) {
  if (!isFirebaseStorageEnabled()) {
    throw new Error("Firebase Storage está desativado neste ambiente.");
  }

  await deleteObject(ref(getFirebaseStorage(), storagePath));
}

export async function listAuditLogs(entityType?: AdminEntityType, entityId?: string) {
  await getAdminContext();
  const db = getFirebaseDb();
  const constraints = entityType && entityId
    ? [where("entityType", "==", entityType), where("entityId", "==", entityId), orderBy("timestamp", "desc"), limit(30)]
    : [orderBy("timestamp", "desc"), limit(30)];
  const snapshot = await getDocs(query(collection(db, "auditLogs"), ...constraints));
  return snapshot.docs.map((item) => item.data() as AdminAuditLogDocument);
}

async function countCollection(collectionName: AdminCollectionName) {
  const snapshot = await getCountFromServer(collection(getFirebaseDb(), collectionName));
  return snapshot.data().count;
}

async function countWhere(collectionName: AdminCollectionName, field: string, value: string) {
  const snapshot = await getCountFromServer(query(collection(getFirebaseDb(), collectionName), where(field, "==", value)));
  return snapshot.data().count;
}

async function countPendingVerification() {
  const counts = await Promise.all(
    contentCollections.map(async (collectionName) => {
      const snapshot = await getCountFromServer(query(collection(getFirebaseDb(), collectionName), where("technicalMetadata.verificationStatus", "==", "pending_verification")));
      return snapshot.data().count;
    })
  );
  return counts.reduce((total, item) => total + item, 0);
}

async function countMarkedForReview() {
  const counts = await Promise.all(
    contentCollections.map(async (collectionName) => {
      const snapshot = await getCountFromServer(query(collection(getFirebaseDb(), collectionName), where("technicalMetadata.markedForReview", "==", true)));
      return snapshot.data().count;
    })
  );
  return counts.reduce((total, item) => total + item, 0);
}

function toSummary(entityType: AdminEntityType, payload: AdminContentPayload): AdminContentSummary {
  const config = adminEntityConfigs[entityType];
  const title = titleFor(config.titleField, payload);
  const subtitle = [payload.category, payload.level, payload.manufacturer, payload.aircraftName, payload.courseId, payload.moduleId]
    .map((item) => (typeof item === "string" ? item : ""))
    .filter(Boolean)
    .join(" · ");

  return {
    id: String(payload.id),
    entityType,
    collectionName: config.collectionName,
    title,
    subtitle,
    slug: typeof payload.slug === "string" ? payload.slug : undefined,
    publicationState: payload.publicationState === "published" ? "published" : "draft",
    archivedAt: typeof payload.archivedAt === "string" ? payload.archivedAt : null,
    order: typeof payload.order === "number" ? payload.order : undefined,
    updatedAt: typeof payload.updatedAt === "string" ? payload.updatedAt : undefined,
    updatedBy: typeof payload.updatedBy === "string" ? payload.updatedBy : undefined,
    createdBy: typeof payload.createdBy === "string" ? payload.createdBy : undefined,
    technicalMetadata: payload.technicalMetadata,
    raw: payload
  };
}

function applyClientFilters(items: AdminContentSummary[], filters: AdminListFilters, fields: string[]) {
  const normalizedQuery = filters.query.trim().toLocaleLowerCase("pt-BR");
  return items.filter((item) => {
    const haystack = fields.map((field) => String(item.raw[field] ?? "")).join(" ").toLocaleLowerCase("pt-BR");
    const metadata = item.technicalMetadata;
    return (
      (!normalizedQuery || haystack.includes(normalizedQuery)) &&
      (filters.classification === "all" || metadata?.contentClassification === filters.classification) &&
      (filters.verificationStatus === "all" || metadata?.verificationStatus === filters.verificationStatus) &&
      (!filters.updatedBy.trim() || item.updatedBy === filters.updatedBy.trim())
    );
  });
}

function preparePayload(entityType: AdminEntityType, payload: AdminContentPayload): AdminContentPayload {
  const config = adminEntityConfigs[entityType];
  const prepared: AdminContentPayload = { ...payload };

  if (config.technical && !prepared.technicalMetadata) {
    prepared.technicalMetadata = config.defaultValues.technicalMetadata;
  }

  if (!prepared.publicationState) {
    prepared.publicationState = "draft";
  }

  if (prepared.archivedAt === undefined) {
    prepared.archivedAt = null;
  }

  return prepared;
}

async function ensureUniqueSlug(collectionName: AdminCollectionName, id: string, slug: unknown) {
  if (typeof slug !== "string" || !slug.trim()) {
    return;
  }

  const snapshot = await getDocs(query(collection(getFirebaseDb(), collectionName), where("slug", "==", slug), limit(2)));
  const duplicated = snapshot.docs.some((item) => item.id !== id);

  if (duplicated) {
    throw new Error("Já existe um conteúdo com este slug.");
  }
}

async function getDependencySummary(entityType: AdminEntityType, id: string) {
  const checks: Array<[AdminCollectionName, string, string]> = [];
  if (entityType === "course") {
    checks.push(["modules", "courseId", "módulos"], ["exercises", "courseId", "exercícios"], ["trainings", "relatedCourseId", "treinamentos"]);
  }
  if (entityType === "module") {
    checks.push(["lessons", "moduleId", "aulas"], ["exercises", "moduleId", "exercícios"]);
  }
  if (entityType === "lesson") {
    checks.push(["exercises", "lessonId", "exercícios"]);
  }
  if (entityType === "aircraft") {
    checks.push(
      ["aircraftSystems", "aircraftId", "sistemas"],
      ["aircraftLimitations", "aircraftId", "limitações"],
      ["aircraftProcedures", "aircraftId", "procedimentos"],
      ["aircraftPerformance", "aircraftId", "performance"],
      ["checklists", "aircraftId", "checklists"],
      ["trainings", "aircraftId", "treinamentos"]
    );
  }
  if (entityType === "aircraftSystem") {
    checks.push(["aircraftSystems", "relatedSystemIds", "sistemas relacionados"]);
  }

  const results = await Promise.all(
    checks.map(async ([collectionName, field, label]) => {
      const operator: "array-contains" | "==" = field === "relatedSystemIds" ? "array-contains" : "==";
      const snapshot = await getCountFromServer(query(collection(getFirebaseDb(), collectionName), where(field, operator, id)));
      return snapshot.data().count > 0 ? label : "";
    })
  );
  return results.filter(Boolean);
}

function titleFor(titleField: string, payload: AdminContentPayload) {
  return String(payload[titleField] || payload.title || payload.name || payload.id || "Conteúdo sem título");
}

function diffFields(previous: AdminContentPayload, next: AdminContentPayload) {
  const fields = new Set([...Object.keys(previous), ...Object.keys(next)]);
  return [...fields].filter((field) => JSON.stringify(previous[field]) !== JSON.stringify(next[field])).slice(0, 60);
}

async function writeAuditLog(
  context: AdminContext,
  action: AdminAuditAction,
  entityType: AdminEntityType,
  entityId: string,
  entityTitle: string,
  changedFields: string[],
  previousStatus?: string,
  newStatus?: string
) {
  const id = `${Date.now()}-${crypto.randomUUID()}`;
  const payload: AdminAuditLogDocument = {
    id,
    action,
    entityType,
    entityId,
    entityTitle,
    userId: context.uid,
    userRole: context.role,
    timestamp: new Date().toISOString(),
    previousStatus,
    newStatus,
    changedFields
  };
  await setDoc(doc(getFirebaseDb(), "auditLogs", id), payload);
}

async function writeRevision(
  context: AdminContext,
  action: AdminAuditAction,
  entityType: AdminEntityType,
  entityId: string,
  entityTitle: string,
  changedFields: string[],
  snapshot: AdminContentPayload
) {
  const id = `${entityType}-${entityId}-${Date.now()}`;
  const payload: AdminContentRevisionDocument = {
    id,
    action,
    entityType,
    entityId,
    entityTitle,
    userId: context.uid,
    userRole: context.role,
    timestamp: new Date().toISOString(),
    previousStatus: "",
    newStatus: String(snapshot.publicationState ?? ""),
    changedFields,
    revisionNotes: typeof snapshot.revisionNotes === "string" ? snapshot.revisionNotes : undefined,
    snapshot
  };
  await setDoc(doc(getFirebaseDb(), "contentRevisions", id), payload);
}

function imagePayloadFor(entityType: AdminEntityType, entityId: string, url: string, storagePath: string, alt: string) {
  const now = new Date().toISOString();
  if (entityType === "aircraft") {
    return {
      mainImage: {
        id: `${entityId}-main-image`,
        aircraftId: entityId,
        kind: "main",
        alt,
        storagePath,
        url,
        publicationState: "draft",
        createdAt: now,
        updatedAt: now
      }
    };
  }

  if (entityType === "avionic") {
    return {
      image: {
        id: `${entityId}-main-image`,
        avionicId: entityId,
        kind: "main",
        alt,
        storagePath,
        url,
        publicationState: "draft",
        createdAt: now,
        updatedAt: now
      }
    };
  }

  return {
    imageUrl: url,
    imageStoragePath: storagePath,
    imageAlt: alt
  };
}
