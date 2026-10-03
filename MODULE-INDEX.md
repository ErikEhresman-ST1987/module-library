# Module Index

Fast lookup for modules that have passed the Module Library's Six-Point Module Gate.

| Module | Function | Useful when | Proven source projects |
|---|---|---|---|
| [Offline App Shell](modules/offline-app-shell/) | Provides a small network-first service worker with app-shell caching, old-cache cleanup, and navigation fallback. | A static browser app or game needs dependable offline startup and refreshed online assets. | Personal Dashboard; Follow-Up Tracker; Hall Cleaning List; Stranded Colony |
| [JSON Backup File](modules/json-backup-file/) | Handles generic JSON backup envelope creation, serialization, browser download, and safe file reading/parsing. | A local-first app needs user-owned export/restore files without coupling the module to the app's data schema. | Personal Dashboard; Follow-Up Tracker; Simple Notebook |
| [Local JSON State](modules/local-json-state/) | Loads, saves, and clears JSON state in localStorage while leaving defaults/normalization to the host. | A lightweight app or game needs simple durable on-device state. | Personal Dashboard; Follow-Up Tracker; Hall Cleaning List; Little Field Farm; Haven's Reach |
| [HTML Escape](modules/html-escape/) | Escapes HTML-sensitive characters for values interpolated into generated HTML strings. | A project builds HTML strings containing dynamic text. | Personal Dashboard; Follow-Up Tracker; Haven's Reach |
| [Local Date Key](modules/local-date-key/) | Returns the device-local calendar date as YYYY-MM-DD without UTC rollover mistakes. | Local-first scheduling, daily reset, reporting, or dated filenames. | Personal Dashboard; Follow-Up Tracker |

## How to use this index

Start here when a new project needs a capability that may already have been solved. Open the module folder, read its short contract, and decide whether it fits the current project's actual requirements.

Presence in this index means the capability has already shown repeated real-world use. It does **not** mean every future project should use it.

Project-specific validation, state shape, UI, naming, and policy stay with the project unless they independently earn reuse.


## Proven Templates and Configurations

| Item | Function | Proven in |
|---|---|---|
| [PWA Manifest Template](templates/pwa-manifest/) | Baseline installable-PWA manifest using relative GitHub-Pages-safe routing and project-owned appearance/icon metadata. | Personal Dashboard; Follow-Up Tracker; Simple Notebook; Hall Cleaning List; Stranded Colony |

## Verification Recipes

| Item | Function | Proven in |
|---|---|---|
| [Local-First PWA Release Verification](verification/local-first-pwa-release.md) | Reusable online, persistence, installed-device, and offline release checks. | Personal Dashboard; Follow-Up Tracker; Simple Notebook; Hall Cleaning List; Stranded Colony |

## Proven Fixes and Lessons

| Item | Function | Proven source |
|---|---|---|
| [Installed PWA Stale-Asset Recovery](lessons/pwa-stale-asset-recovery.md) | Recovery procedure for a reproduced mixed/stale installed-PWA release, including physical asset renaming when ordinary cache busting fails. | Stranded Colony |
| [PWA Shell Release Order](lessons/pwa-release-order.md) | Publish changed shell files before the new service worker so a new cache does not activate against unavailable files. | Personal Dashboard |
| [Storage Key Is Not the Release Version](lessons/storage-key-is-not-release-version.md) | Keeps durable data namespace, schema version, application release, and service-worker cache version conceptually separate. | Personal Dashboard; reinforced across local-first projects |

## Project Planning

| Item | Function | Proven across |
|---|---|---|
| [Goal Box Base](planning/goal-box-base.md) | Defines the reusable backbone for establishing a project's mature destination, protected experience, boundaries, known requirements, non-goals, and intentionally open decisions without forcing a fixed document size. | Follow-Up Tracker; Fire Ambience; Haven's Reach; Stranded Colony planning evolution |
| [Project Foundation Base](planning/project-foundation-base.md) | Translates an approved Goal Box into durable ownership, technology, data/recovery, conditional project contracts, verification, and a bounded next meaningful slice. | Follow-Up Tracker; Fire Ambience; Haven's Reach; Stranded Colony |
| [AI Project Planning Instructions](planning/ai-project-planning-instructions.md) | Governs how the AI authors and applies Goal Boxes and Foundations, including re-grounding and the corrected Smallest Meaningful Slice rule: determine meaning first, then minimize while preserving diagnosability. | Repeated cross-project planning and increment-sizing experience |

