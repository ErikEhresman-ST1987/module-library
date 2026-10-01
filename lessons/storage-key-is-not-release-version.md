# Storage Key Is Not the Release Version

## Proven lesson

A local application's storage key is its data namespace. Do not rename that key merely because the application release, cache version, or UI version changes.

Personal Dashboard explicitly protects this distinction, and the same separation between durable data identity and release/cache identity is present across the local-first projects.

## Why it matters

Changing a localStorage key without a migration can make existing user data appear to disappear even though the old data remains in the browser.

## Rule

- App/PWA release version may change frequently.
- Service-worker cache version may change whenever cached shell files change.
- Data/schema version changes only when the stored data contract changes.
- Storage key changes only when an intentional namespace change is required and a migration/recovery plan exists.

Keep these version concepts separate.
