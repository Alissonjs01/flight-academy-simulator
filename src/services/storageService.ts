import { getFirebaseStorage } from "@/lib/firebase/client";
import { isFirebaseStorageEnabled } from "@/lib/firebase/config";

const maxProfilePhotoBytes = 2 * 1024 * 1024;
const allowedImageTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

export async function uploadProfilePhoto(uid: string, file: File) {
  assertStorageEnabled();
  validateImageFile(file, maxProfilePhotoBytes);
  const extension = getSafeImageExtension(file.type);
  const [{ getDownloadURL, ref, uploadBytes }, storage] = await Promise.all([import("firebase/storage"), getFirebaseStorage()]);
  const objectRef = ref(storage, `profilePhotos/${uid}/avatar.${extension}`);
  await uploadBytes(objectRef, file, { contentType: file.type, customMetadata: { ownerUid: uid } });
  return getDownloadURL(objectRef);
}

export async function deleteProfilePhoto(uid: string) {
  if (!isFirebaseStorageEnabled()) {
    return;
  }

  const [{ deleteObject, ref }, storage] = await Promise.all([import("firebase/storage"), getFirebaseStorage()]);
  await deleteObject(ref(storage, `profilePhotos/${uid}/avatar.jpg`));
}

export function getCourseImagePath(courseSlug: string, fileName: string) {
  return `courseImages/${safeSegment(courseSlug)}/${safeFileName(fileName)}`;
}

export function getAircraftImagePath(aircraftSlug: string, fileName: string) {
  return `aircraftImages/${safeSegment(aircraftSlug)}/${safeFileName(fileName)}`;
}

export function getAvionicImagePath(avionicSlug: string, fileName: string) {
  return `avionicsImages/${safeSegment(avionicSlug)}/${safeFileName(fileName)}`;
}

function validateImageFile(file: File, maxBytes: number) {
  if (!allowedImageTypes.has(file.type)) {
    throw new Error("Tipo de imagem não permitido. Use JPEG, PNG ou WebP.");
  }

  if (file.size > maxBytes) {
    throw new Error("Arquivo maior que o limite permitido.");
  }
}

function assertStorageEnabled() {
  if (!isFirebaseStorageEnabled()) {
    throw new Error("Uploads de imagem estão desativados no modo Spark atual.");
  }
}

function getSafeImageExtension(contentType: string) {
  if (contentType === "image/png") {
    return "png";
  }

  if (contentType === "image/webp") {
    return "webp";
  }

  return "jpg";
}

function safeSegment(value: string) {
  return value.toLocaleLowerCase("pt-BR").replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
}

function safeFileName(value: string) {
  const normalized = value.toLocaleLowerCase("pt-BR").replace(/[^a-z0-9._-]/g, "-");
  return normalized.length ? normalized.slice(0, 96) : "arquivo";
}
