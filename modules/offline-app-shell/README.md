# Offline App Shell

## Responsibility

Owns the small service-worker pattern required to cache a static application shell, clean obsolete caches, prefer current network resources when online, and fall back to cached resources when offline.

## Does not own

- the web app manifest;
- project asset selection;
- application state or persistence;
- update UI;
- application-specific cache policy beyond the shell;
- third-party or cross-origin resources.

## Proven sources

This pattern was independently used in:

- Personal Dashboard
- Follow-Up Tracker
- Hall Cleaning List
- Stranded Colony

The implementations share the same core lifecycle and offline strategy, with project-specific cache names and shell lists.

## Interface

This is intentionally a **copy-and-adapt file**, not a framework dependency.

Before use, change:

- `CACHE_NAME` to a project-specific versioned cache name.
- `APP_SHELL` to the minimum files required for offline startup.

Register the resulting service worker from the host application.

## Verification

For the host project:

1. Load once while online.
2. Confirm the service worker becomes active.
3. Reload after deployment and confirm current online assets appear.
4. Test in the actual target browser/device with the network unavailable.
5. Confirm the app shell still opens and navigation fallback works.
6. After changing the cache version, confirm obsolete caches are removed.

## Known adaptation points

Stranded Colony required a larger explicit shell and navigation-aware fallback. Simpler productivity apps used smaller shells. Keep the shell bounded to what the project actually needs.
