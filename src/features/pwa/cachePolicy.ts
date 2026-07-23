export const pwaVersion = "0.2.0";

export const publicCacheName = `flight-academy-public-${pwaVersion}`;
export const runtimeCacheName = `flight-academy-runtime-${pwaVersion}`;
export const privateCacheName = `flight-academy-private-${pwaVersion}`;

export const staticAssetPatterns = [
  /^\/_next\/static\//,
  /^\/icons\//,
  /^\/favicon\.ico$/,
  /^\/manifest\.webmanifest$/,
  /^\/offline$/
];

export const publicNavigationPrefixes = [
  "/",
  "/offline",
  "/login",
  "/cadastro",
  "/recuperar-senha",
  "/cursos",
  "/aulas",
  "/aeronaves",
  "/avionicos",
  "/checklists",
  "/treinamentos"
];

export const privateNavigationPrefixes = [
  "/dashboard",
  "/progresso",
  "/revisao",
  "/configuracoes"
];

export const administrativeNavigationPrefixes = ["/admin"];

export const firebaseRequestHosts = [
  "firebaseio.com",
  "firestore.googleapis.com",
  "identitytoolkit.googleapis.com",
  "securetoken.googleapis.com",
  "firebasestorage.googleapis.com",
  "googleapis.com"
];

export function isStaticAsset(pathname: string) {
  return staticAssetPatterns.some((pattern) => pattern.test(pathname));
}

export function isAdministrativeRoute(pathname: string) {
  return administrativeNavigationPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

export function isPrivateRoute(pathname: string) {
  return privateNavigationPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

export function isPublicNavigationRoute(pathname: string) {
  if (pathname === "/") {
    return true;
  }

  return publicNavigationPrefixes.some((prefix) => prefix !== "/" && (pathname === prefix || pathname.startsWith(`${prefix}/`)));
}

export function isFirebaseRequest(url: URL) {
  return firebaseRequestHosts.some((host) => url.hostname === host || url.hostname.endsWith(`.${host}`));
}
