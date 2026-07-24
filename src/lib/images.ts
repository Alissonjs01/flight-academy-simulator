export const localImagePrefix = "/images/";
export const placeholderImagePath = "/images/placeholder.svg";

export type ImageSourceKind = "empty" | "https" | "local" | "invalid";

export function getImageSourceKind(value: unknown): ImageSourceKind {
  const source = String(value ?? "").trim();

  if (!source) {
    return "empty";
  }

  if (/[\u0000-\u001f\\]/.test(source) || source.includes("../") || source.includes("..\\")) {
    return "invalid";
  }

  if (source.startsWith(localImagePrefix)) {
    return source.startsWith("//") ? "invalid" : "local";
  }

  try {
    const url = new URL(source);
    if (url.protocol !== "https:" || url.username || url.password) {
      return "invalid";
    }
    return "https";
  } catch {
    return "invalid";
  }
}

export function isAllowedImageSource(value: unknown) {
  const kind = getImageSourceKind(value);
  return kind === "https" || kind === "local";
}

export function getImageValidationMessage(value: unknown) {
  const source = String(value ?? "").trim();
  const kind = getImageSourceKind(source);

  if (kind === "empty" || kind === "https" || kind === "local") {
    return undefined;
  }

  return "Use uma URL HTTPS ou uma imagem local dentro de /images/. Não use javascript:, data:, ../ ou URLs inseguras.";
}

export function resolveSafeImageSource(value: unknown) {
  return isAllowedImageSource(value) ? String(value).trim() : placeholderImagePath;
}

export function getInitials(value: unknown) {
  const words = String(value ?? "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (!words.length) {
    return "";
  }

  return words.slice(0, 2).map((word) => word[0]?.toUpperCase()).join("");
}
