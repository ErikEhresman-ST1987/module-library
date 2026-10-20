# Versioned Offline Build (Vite / GitHub Pages)

## Responsibility
Builds a **complete, versioned offline asset cache** for a Vite-generated static application and serves HTML from the same release as its compiled JS/CSS. A separate browser registration helper checks for updates when online.

## Proven source
[Pop Squadron](https://github.com/ErikEhresman-ST1987/pop-squadron), increment 9.2.1. The installed iPhone game initially displayed a static hangar without JavaScript initialization during a release transition. After the cache transition correction was deployed, the user confirmed successful launch, persistent purchases and wallet, and Airplane Mode play.

This is an **alternative** to [Offline App Shell](../offline-app-shell/), not its replacement. Choose the strategy based on the project's build and update needs.

## Files
- [prepare-offline.mjs](prepare-offline.mjs): original, working Pop Squadron build script; hashes built assets, emits `dist/sw.js`, precaches the build and serves cached navigation HTML.
- [offline-registration.js](offline-registration.js): original browser registration helper; checks for updated service workers on online launch.

Both files are preserved as source implementations. They are **copy-and-adapt**, not a plug-and-play dependency.

## Integration
1. Use a Vite build that outputs `dist/index.html`, `dist/manifest.webmanifest` and hashed compiled assets.
2. Adapt the hardcoded `/pop-squadron/` prefix and service-worker scope to the host application's deployment base path.
3. Run the adapted `prepare-offline.mjs` **after** Vite's production build; publish the entire resulting `dist` together.
4. Import and call `setupOffline()` from the application's startup after the app's required UI initialization. Preserve application data keys independently of release/cache versions.
5. Do not change the cache strategy to network-first without separately validating version consistency and offline operation.

## Critical release behavior
- The navigation handler returns HTML from the worker's **own** precached release. A fresh network HTML response referencing newer compiled assets could break an older worker's offline bundle.
- Do **not** immediately delete previous versioned caches when a new worker activates. Existing clients may still request hashed assets from their prior release.
- When an asset is missing from the current cache, look in retained older caches before fetching it from the network.
- The online registration helper calls `registration.update()` to request an update check; it does not guarantee an immediate refresh of an already-open tab.
- Old-cache retention trades storage for safe transition. This source does **not** implement bounded pruning; future adopters must evaluate storage pressure and a safe eviction policy rather than assuming indefinite retention is ideal.

## Verification
1. Run the project's automated tests and production build. **Confirm deployment success**, not merely that a commit was pushed.
2. On the real target device, load the deployed app online and confirm its JavaScript actually initializes: populated dynamic controls, not just static HTML/CSS.
3. Verify the changed UI and saved state; close and reopen.
4. Switch to Airplane Mode and confirm launch and gameplay or application use.
5. Check saved state again after restarting offline.
6. Test an update while an old client exists; ensure its hashed JS/CSS remain retrievable during transition.

## Evidence and boundaries
Pop Squadron's successful device verification covers its observed release transition, persistent wallet/loadout/progress, and offline launch. It does **not** establish that this approach is optimal for all PWAs or that every browser and update scenario has been tested. The original incident also involved a failed CI deployment: always inspect test and deploy status before attributing a persistent old version solely to caching.
