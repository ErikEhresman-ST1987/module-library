# Version-Aware Offline Build (Vite / GitHub Pages)

## Responsibility
Produces a complete versioned offline bundle with same-release HTML/JS/CSS, retains older hashed assets for transitioning clients, and checks a separately published release identifier so installed iPhone PWAs can detect new deployments reliably.

## Proven source and status
[Pop Squadron](https://github.com/ErikEhresman-ST1987/pop-squadron), October 2026. The initial cached-build implementation preserved offline operation and saved game data, but a later Wing Guns release stayed stale in the installed iPhone app despite successful GitHub Pages deployment and repeated force-closing. The version-aware update system was deployed with successful automated tests/build/deployment; the user reported that the installed app pulled the update down almost immediately. A subsequent Missiles release again stuck on old content and displayed an update/reload warning. The corrected manual-retry implementation then reached **Up to date · Version 50bba0d73** on the installed iPhone, matching the deployed release. **These observed recoveries do not establish uninterrupted reliability across all future releases.**

This is a specialized **copy-and-adapt** Vite/GitHub Pages module, not a generic drop-in or mandatory replacement for [Offline App Shell](../offline-app-shell/).

## Canonical source files
- [prepare-offline.mjs](prepare-offline.mjs) — builds `dist/release.json`, hashes and precaches a coherent build, generates `dist/sw.js`, bypasses cache for release probes, identifies its own build via `BUILD_VERSION` messages, and retains older caches.
- [offline-registration.js](offline-registration.js) — registers with `updateViaCache: 'none'`, checks release metadata using `cache: 'no-store'`, checks on launch/resume/online and by manual action, compares worker build identity, and navigates to a release-specific URL when the new worker is active. Explicit user-triggered retries remain available even if an earlier automatic refresh did not complete.

The files above are synchronized byte-for-byte with Pop Squadron's user-tested artwork milestone (`6cd2075ed92ac530e9b5fd233e70b599b5a1197d`, October 20, 2026). The installed iPhone app reported the matching build after earlier release failures; the next release's balloon artwork was also reported working. This is evidence of successful recovery and further operation, **not** proof that every future update will succeed. Keep them together: the worker message protocol and release identifiers must agree.

## Required host integration
1. Configure Vite's base for the host path and define a **build-time constant** `__POP_BUILD_ID__` using the same release identifier as the postbuild script. For Pop Squadron:
   ```js
   const buildId = process.env.GITHUB_SHA || process.env.POP_BUILD_ID || 'local-development';
   export default defineConfig({ base: '/pop-squadron/', define: { __POP_BUILD_ID__: JSON.stringify(buildId) } });
   ```
   Replace the constant name and base path for other applications, consistently in both files.
2. Ensure the production build environment exposes the same immutable build ID (GitHub Actions supplies `GITHUB_SHA`). Do not generate separate random values in Vite and the offline postbuild step.
3. Run Vite first, then the adapted `prepare-offline.mjs` so the published `dist` includes `index.html`, compiled assets, `manifest.webmanifest`, `release.json`, and `sw.js`.
4. Update the hardcoded `/pop-squadron/` prefix and scope in the script; the registration helper uses `import.meta.env.BASE_URL`.
5. Add `<p id="offline-status" aria-live="polite"></p>` and `<button id="check-updates" type="button">Check for Updates</button>` to the application's UI. Import and call `setupOffline()` from the application startup. The update control is optional only if the corresponding listener is deliberately adapted.
6. Publish the whole build together. Preserve localStorage keys and durable state independently of build/cache versions. Never clear browser storage to force an update.

## Why this design
- Normal/offline navigation serves the worker's **own** precached HTML; an explicit `?release=` update navigation attempts a **network `no-store` HTML fetch**, falling back to the cached page if offline. This is designed to break repeated stale-HTML reloads without losing offline startup. Keep hashed assets available for transitioning clients.
- A **network-only release probe** bypasses service-worker interception and HTTP cache, so a running old app can learn that a new deployment exists without first updating its own cached HTML.
- The client calls `registration.update()`, verifies the controlling worker's **build identifier** via `MessageChannel`, and reloads on a genuinely newer activated build. The old script-URL-based sessionStorage guard was flawed because `sw.js` has the same URL for every release.
- **Do not permanently block an update attempt just because it was attempted.** An automatic per-release session guard prevents navigation loops, but the manual Check for Updates action bypasses that guard. Navigation uses `window.location.replace()` with a release-specific query parameter rather than reloading an identical URL. After the running page confirms that its embedded build ID equals the published release ID, the previous refresh guard is cleared.
- A new worker precaches its entire bundle before activation and claims clients. The current implementation **does not** force-navigate visible clients on activation; the page's `controllerchange` and hangar-safe pending-refresh logic handle navigation. This avoids interrupting active gameplay.
- Old versioned caches are retained to serve in-flight requests for older hashed assets. The module currently does **not** prune caches.

## Verification for every integration
1. Confirm GitHub Actions **tests, build, and deploy** all pass; a pushed commit alone is not deployment.
2. Install release A on the actual target iPhone and confirm dynamic JavaScript initializes and saved state survives reopening.
3. Deploy release B; open the existing installed PWA online. Verify the new build appears, the version/status is meaningful, and Check for Updates can report results.
4. Deploy release C and repeat **without reinstalling or clearing storage**. The repeated-release test is important because both the script-URL guard and the first build-ID guard appeared to work once but failed later. If automatic navigation stalls, tap Check for Updates and confirm the installed version changes to the deployed ID.
5. Verify offline launch after each transition and wallet/ownership/loadout/progress or equivalent local state before and after updates.
6. Verify failed or interrupted update still leaves the previous complete offline build playable. Test that a blocked automatic refresh can be retried manually and that an up-to-date page clears the stale retry marker.
7. Keep the regression tests aligned with the intended navigation API: the corrected implementation uses `window.location.replace()`, not `window.location.reload()`. An obsolete assertion caused a failed CI run before it was updated.

## Limitations
- Safari controls service-worker scheduling and page lifetime. The update cannot be guaranteed to be instantaneous in every browser or connection condition.
- An installed iPhone PWA can retain an older service worker, so even a deployed worker-side repair may not affect its very first refresh. Validate the installed device rather than assuming the deployed worker is immediately in control.
- Release metadata is included in the precache but explicitly bypassed in the worker's fetch handler; verify the network probe on the deployment host.
- The current source retains older caches indefinitely; evaluate bounded safe cleanup when storage pressure becomes material.
- The observed iPhone recovery verifies that the corrected release loaded and identified itself as up to date; it does not prove every future automatic update will succeed.

## October 20, 2026 — additional verified incident and current reference

**Observed failure:** After a successful pink-balloon deployment, the installed Home Screen PWA repeatedly said a new version was ready, reloaded when Check for Updates was tapped, and continued to show old content. Force-closing did not resolve it. The deployment itself had succeeded.

**Change:** Pop Squadron's generated service worker was changed to treat a navigation with the `release` query parameter as an explicit online update request: attempt `fetch(request, { cache: 'no-store' })` and use the successful network HTML; if unavailable, use the worker's precached HTML. Ordinary navigations remain cache-first. The page also checks controlling-worker build identity, defers refresh while gameplay is active, and preserves manual retry.

**Device evidence:** The user showed an installed-iPhone screenshot reading `Up to date · Version d6bfb2bdb` with the new pink balloon visible. A later deployment `6cd2075ed92ac530e9b5fd233e70b599b5a1197d` passed GitHub Actions and the user confirmed all balloon artwork worked. The latter confirmation supports the successful installed-app artwork update, although it did not include a screenshot of the displayed build ID. This is a promising multi-release result, not a guarantee of permanent Safari update reliability.

**Stable source:** [Pop Squadron stable artwork/PWA branch](https://github.com/ErikEhresman-ST1987/pop-squadron/tree/stable/artwork-and-pwa-2026-10-20) pins the exact implementation from the user-tested milestone. The library copies of `offline-registration.js` and `prepare-offline.mjs` were synchronized from that commit. Adapt game-specific DOM selectors, active-session guard, base path, build constant, and cache prefix before reusing in other apps.
