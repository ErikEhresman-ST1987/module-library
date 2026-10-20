# Version-Aware Offline Build (Vite / GitHub Pages)

## Responsibility
Produces a complete versioned offline bundle with same-release HTML/JS/CSS, retains older hashed assets for transitioning clients, and checks a separately published release identifier so installed iPhone PWAs can detect new deployments reliably.

## Proven source and status
[Pop Squadron](https://github.com/ErikEhresman-ST1987/pop-squadron), October 2026. The initial cached-build implementation preserved offline operation and saved game data, but a later Wing Guns release stayed stale in the installed iPhone app despite successful GitHub Pages deployment and repeated force-closing. The version-aware update system was deployed with successful automated tests/build/deployment; the user reported that the installed app pulled the update down almost immediately. **One successful observed transition is not yet evidence of repeated multi-release reliability.**

This is a specialized **copy-and-adapt** Vite/GitHub Pages module, not a generic drop-in or mandatory replacement for [Offline App Shell](../offline-app-shell/).

## Canonical source files
- [prepare-offline.mjs](prepare-offline.mjs) — builds `dist/release.json`, hashes and precaches a coherent build, generates `dist/sw.js`, bypasses cache for release probes, identifies its own build via `BUILD_VERSION` messages, and retains older caches.
- [offline-registration.js](offline-registration.js) — registers with `updateViaCache: 'none'`, checks release metadata using `cache: 'no-store'`, checks on launch/resume/online and by manual action, compares worker build identity, and reloads when the new worker is active.

The files above are synchronized with Pop Squadron's working source. Keep them together: the worker message protocol and release identifiers must agree.

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
- A precached navigation page is served from the worker's **own** build, avoiding an old HTML/new JS or new HTML/old JS mismatch.
- A **network-only release probe** bypasses service-worker interception and HTTP cache, so a running old app can learn that a new deployment exists without first updating its own cached HTML.
- The client calls `registration.update()`, verifies the controlling worker's **build identifier** via `MessageChannel`, and reloads on a genuinely newer activated build. The old script-URL-based sessionStorage guard was flawed because `sw.js` has the same URL for every release.
- A new worker precaches its entire bundle before activation. It also navigates visible older clients, helping clients whose old JavaScript predates the new update logic.
- Old versioned caches are retained to serve in-flight requests for older hashed assets. The module currently does **not** prune caches.

## Verification for every integration
1. Confirm GitHub Actions **tests, build, and deploy** all pass; a pushed commit alone is not deployment.
2. Install release A on the actual target iPhone and confirm dynamic JavaScript initializes and saved state survives reopening.
3. Deploy release B; open the existing installed PWA online. Verify the new build appears, the version/status is meaningful, and Check for Updates can report results.
4. Deploy release C and repeat **without reinstalling or clearing storage**. The repeated-release test is important because the previous script-URL guard appeared to work once but failed later.
5. Verify offline launch after each transition and wallet/ownership/loadout/progress or equivalent local state before and after updates.
6. Verify failed or interrupted update still leaves the previous complete offline build playable.

## Limitations
- Safari controls service-worker scheduling and page lifetime. The update cannot be guaranteed to be instantaneous in every browser or connection condition.
- The old-client `client.navigate()` activation fallback can refresh a visible game unexpectedly; projects with active editing or long sessions should adapt this to a safe update prompt.
- Release metadata is included in the precache but explicitly bypassed in the worker's fetch handler; verify the network probe on the deployment host.
- The current source retains older caches indefinitely; evaluate bounded safe cleanup when storage pressure becomes material.
- The observed iPhone success verifies the transition to this new method, not the full three-release test sequence.
