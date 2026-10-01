/*
  Offline App Shell
  Proven pattern extracted from Personal Dashboard, Follow-Up Tracker,
  Hall Cleaning List, and Stranded Colony.

  COPY AND ADAPT:
  1. Give CACHE_NAME a project-specific, versioned name.
  2. List only the files required for dependable offline startup in APP_SHELL.
*/

const CACHE_NAME = "your-app-shell-v1";
const APP_SHELL = [
  "./",
  "./index.html"
];

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
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  const isNavigation = event.request.mode === "navigate";

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(isNavigation ? "./index.html" : event.request, copy);
          });
        }
        return response;
      })
      .catch(async () => {
        if (isNavigation) {
          return (await caches.match("./index.html")) || Response.error();
        }
        return (await caches.match(event.request)) || Response.error();
      })
  );
});
