/*
  Offline App Shell — COPY AND ADAPT.
  Set a unique per-app CACHE_PREFIX and versioned CACHE_NAME.
  List only required offline startup files in APP_SHELL.
  Keep the service-worker registration scope limited to this app.
*/
const CACHE_PREFIX = "your-app-shell-";
const CACHE_NAME = CACHE_PREFIX + "v1";
const APP_SHELL = ["./", "./index.html"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  const scope = new URL(self.registration.scope);
  if (url.origin !== scope.origin || !url.pathname.startsWith(scope.pathname)) return;

  const isNavigation = event.request.mode === "navigate";
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.ok) {
          const copy = response.clone();
          event.waitUntil(
            caches.open(CACHE_NAME)
              .then((cache) => cache.put(isNavigation ? "./index.html" : event.request, copy))
              .catch(() => { /* Cache failure must not hide a successful network response. */ })
          );
        }
        return response;
      })
      .catch(async () => {
        const cache = await caches.open(CACHE_NAME);
        const cached = await cache.match(isNavigation ? "./index.html" : event.request);
        return cached || Response.error();
      })
  );
});
