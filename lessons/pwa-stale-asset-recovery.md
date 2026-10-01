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
