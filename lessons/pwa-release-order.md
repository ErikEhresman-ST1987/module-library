# PWA Shell Release Order

## Proven lesson

When a service worker pre-caches an application shell, do not publish the new service worker before the files it expects are available.

The Personal Dashboard release procedure established the safer order:

1. Make and test the bounded application change.
2. Advance the service-worker cache version when an app-shell file changed.
3. Confirm the shell list is complete.
4. Publish the changed application files first.
5. Publish the updated service worker last.
6. Re-fetch/verify the deployed files and version markers.
7. Open the installed PWA online so the new worker can update.
8. Close/reopen and verify the new version.
9. Verify offline reopening.

## Why it matters

A newly activated worker should not attempt to populate a new shell from files that have not reached the host yet.

## Boundary

A documentation-only change outside the cached shell does not require a cache-version increment.
