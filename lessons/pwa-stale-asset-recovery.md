# Installed PWA Stale-Asset Recovery

## Problem

An installed PWA can occasionally present a mixed release: newer HTML is visible while an older cached JavaScript or CSS asset is still executing.

This was observed and corrected during Stranded Colony development on iPad. Advancing the shell cache and adding a query-string version did not fully dislodge the stale JavaScript in that observed case.

## Proven recovery

When normal cache-version advancement has been correctly deployed but a target installed PWA still serves the old asset:

1. Confirm the deployed HTML really references the intended asset.
2. Confirm the new asset is present on the host.
3. Confirm the service-worker cache version and shell list were updated correctly.
4. If the installed PWA still resolves the stale physical asset, publish the changed code under a **new physical filename**.
5. Update HTML and the service-worker shell to reference that new filename.
6. Deploy and verify the hosted files.
7. Open the installed PWA online once, then close/reopen.
8. Repeat the check offline.

## Why preserve this

Stranded Colony encountered this twice around its Phase 2 Increment 3 delivery. The second correction moved from a query-string cache bust to a new physical script filename, preventing collision with the older cached `app.js`.

## Boundary

Do not rename physical assets routinely. Normal versioned cache updates are simpler and should remain the ordinary release path. Use this recovery when a stale installed-PWA asset is actually reproduced.

## Additional proven case: Pop Squadron (iPhone, 2026-10)

A Vite-built installed PWA displayed its static hangar while dynamic JavaScript-generated sections stayed empty. A cache-clearing attempt did not fix the installed experience, although a query-parameter Safari URL loaded the game. Pop Squadron's versioned service worker initially deleted previous build caches immediately on activation. Its corrected variant retained older caches and checked them for requested hashed assets when the current cache missed. The registration helper also requested online update checks.

**Deployment trap:** The first attempted correction never reached the website: CI failed because two tests asserted the old cache implementation. The tests were updated to verify the new intended behavior; only after the corrected deployment did the user confirm normal initialization, saved wallet/equipment/progression, and Airplane Mode operation.

**Reusable lesson:** When an installed PWA appears frozen, distinguish static HTML loading from JavaScript initialization, verify the latest CI deployment actually succeeded, and ensure old clients can still obtain their original hashed assets during worker transitions. Preserve localStorage separately from caches. See [Versioned Offline Build](../modules/versioned-offline-build/) for the working source variant.

This case supports the tested correction, but does not independently prove that cache deletion was the sole cause of every observed startup failure.

## Additional proven case: installed Safari PWA does not refresh after a successful deployment (Pop Squadron, 2026-10)

After adding four Primary Weapons, GitHub Actions passed tests, built, and published the latest Pop Squadron release. Chrome showed the new weapons, but the iPhone Home Screen installation still showed only Forward Cannon and an empty Specialized Weapons section. Opening the installed app online, waiting, force-closing, and reopening did not update it.

**Cause boundary:** The prior registration helper requested `registration.update()` but did not explicitly refresh an already-open page when a new worker activated. This is a plausible explanation consistent with the observed behavior, not a browser-internals proof.

**Correction:** Preserve the existing same-release cached HTML/JS/CSS and older hashed assets. Add a `controllerchange` listener in the registration helper to reload an online, previously controlled client with a sessionStorage guard. In the generated worker's `activate` handler, after `clients.claim()`, enumerate same-scope visible window clients and call `client.navigate(client.url)`. This second path can refresh an old installed client whose JavaScript predates the new listener. No localStorage keys or caches are cleared.

**Verification:** The corrective GitHub Pages deployment completed successfully and the user reported, “That worked!” on the installed iPhone app. This confirms the combined fix for that incident, not independent effectiveness of each component or all future Safari versions. The guard currently uses the service-worker script URL, which may remain stable between versions; future adopters should validate repeated updates across multiple releases and consider a true build-version token.

**Reusable files:** [Versioned Offline Build](../modules/versioned-offline-build/) includes the updated source implementations. Avoid recommending app removal or Safari website-data clearing before preserving local saves.

## Version-aware follow-up: repeated stale Wing Guns release (Pop Squadron, 2026-10)

A later Wing Guns release again deployed successfully to GitHub Pages but stayed absent from the iPhone Home Screen app after several online launches, waiting periods, and forced restarts. The prior `controllerchange` refresh guard keyed on the worker's stable `scriptURL` (`sw.js`), which is not a release identifier and could suppress subsequent refreshes.

**Correction deployed:** Publish `release.json` containing the build ID; make its network fetch bypass service-worker cache and use `cache: 'no-store'`. Embed the same build ID into Vite's application and generated worker. Register the worker with `updateViaCache: 'none'`, check releases on launch/foreground/online and via a manual button, query worker identity through `MessageChannel`, and refresh only for a newer activated build. Preserve same-build navigation HTML and hashed assets, old caches, and all local saved state.

**Observed outcome:** GitHub Actions tests, build, and Pages deploy passed; the user reported the installed iPhone app pulled the new update down almost instantly. This confirms **one** successful device transition. Multiple consecutive release transitions and interrupted-update/offline regression checks remain to be demonstrated.

**Canonical files and integration:** [Version-Aware Offline Build](../modules/versioned-offline-build/). For new Vite/GitHub Pages PWA work, inspect and adapt this method instead of reintroducing the fixed-script-URL guard. Do not infer guaranteed instantaneous updates on all Safari installations.
