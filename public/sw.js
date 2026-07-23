/* Flight Academy Simulator PWA service worker.
 * Cache somente arquivos públicos/estáticos. Firebase Auth, Firestore e Storage não são cacheados manualmente.
 */

const VERSION = "0.2.0";
const PUBLIC_CACHE = `flight-academy-public-${VERSION}`;
const RUNTIME_CACHE = `flight-academy-runtime-${VERSION}`;
const PRIVATE_CACHE = `flight-academy-private-${VERSION}`;
const CACHE_PREFIXES = ["flight-academy-public", "flight-academy-runtime", "flight-academy-private", "flight-academy-user", "flight-academy-admin"];

const PRECACHE_URLS = [
  "/",
  "/offline",
  "/manifest.webmanifest",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/maskable-192.png",
  "/icons/maskable-512.png",
  "/icons/apple-touch-icon.png"
];

const PUBLIC_NAVIGATION_PREFIXES = ["/", "/offline", "/login", "/cadastro", "/recuperar-senha", "/cursos", "/aulas", "/aeronaves", "/avionicos", "/checklists", "/treinamentos"];
const PRIVATE_NAVIGATION_PREFIXES = ["/dashboard", "/progresso", "/revisao", "/configuracoes"];
const ADMIN_PREFIXES = ["/admin"];
const FIREBASE_HOSTS = ["firebaseio.com", "firestore.googleapis.com", "identitytoolkit.googleapis.com", "securetoken.googleapis.com", "firebasestorage.googleapis.com", "googleapis.com"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(PUBLIC_CACHE).then((cache) =>
      cache.addAll(PRECACHE_URLS.map((url) => new Request(url, { cache: "reload" }))).catch(() => undefined)
    )
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names
          .filter((name) => CACHE_PREFIXES.some((prefix) => name.startsWith(prefix)))
          .filter((name) => ![PUBLIC_CACHE, RUNTIME_CACHE, PRIVATE_CACHE].includes(name))
          .map((name) => caches.delete(name))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("message", (event) => {
  const type = event.data?.type;

  if (type === "SKIP_WAITING") {
    self.skipWaiting();
    return;
  }

  if (type === "CLEAR_PRIVATE_CACHES") {
    event.waitUntil(deleteCaches(["flight-academy-private", "flight-academy-user", "flight-academy-admin"]));
    return;
  }

  if (type === "CLEAR_PUBLIC_CACHES") {
    event.waitUntil(deleteCaches(["flight-academy-public", "flight-academy-runtime"]));
    return;
  }

  if (type === "CLEAR_ALL_CACHES") {
    event.waitUntil(deleteCaches(CACHE_PREFIXES));
  }
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);

  if (url.origin !== self.location.origin || isFirebaseRequest(url)) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(handleNavigation(request, url));
    return;
  }

  if (isStaticAsset(url.pathname)) {
    event.respondWith(cacheFirst(request, PUBLIC_CACHE));
    return;
  }

  if (request.destination === "image" || request.destination === "font" || request.destination === "style" || request.destination === "script") {
    event.respondWith(staleWhileRevalidate(request, RUNTIME_CACHE));
  }
});

async function handleNavigation(request, url) {
  if (isAdminRoute(url.pathname) || isPrivateRoute(url.pathname)) {
    try {
      return await fetch(request);
    } catch {
      return offlineFallback();
    }
  }

  if (!isPublicNavigationRoute(url.pathname)) {
    try {
      return await fetch(request);
    } catch {
      return offlineFallback();
    }
  }

  try {
    const response = await fetch(request);
    if (response.ok && response.type === "basic") {
      const cache = await caches.open(RUNTIME_CACHE);
      await cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    return cached || offlineFallback();
  }
}

async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) {
    return cached;
  }

  const response = await fetch(request);
  if (response.ok) {
    const cache = await caches.open(cacheName);
    await cache.put(request, response.clone());
  }
  return response;
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const network = fetch(request)
    .then((response) => {
      if (response.ok && response.type === "basic") {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => undefined);

  return cached || (await network) || offlineFallback();
}

async function offlineFallback() {
  return (await caches.match("/offline")) || Response.error();
}

async function deleteCaches(prefixes) {
  const names = await caches.keys();
  await Promise.all(names.filter((name) => prefixes.some((prefix) => name.startsWith(prefix))).map((name) => caches.delete(name)));
}

function isStaticAsset(pathname) {
  return pathname.startsWith("/_next/static/") || pathname.startsWith("/icons/") || pathname === "/manifest.webmanifest" || pathname === "/favicon.ico";
}

function isAdminRoute(pathname) {
  return ADMIN_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

function isPrivateRoute(pathname) {
  return PRIVATE_NAVIGATION_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

function isPublicNavigationRoute(pathname) {
  if (pathname === "/") {
    return true;
  }
  return PUBLIC_NAVIGATION_PREFIXES.some((prefix) => prefix !== "/" && (pathname === prefix || pathname.startsWith(`${prefix}/`)));
}

function isFirebaseRequest(url) {
  return FIREBASE_HOSTS.some((host) => url.hostname === host || url.hostname.endsWith(`.${host}`));
}
