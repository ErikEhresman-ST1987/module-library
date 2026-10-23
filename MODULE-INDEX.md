# Module Index

For the complete retrieval, contribution, and Improvement Record procedure, begin with [START HERE](START-HERE.md).

Fast lookup for reusable parts admitted through the Module Library's Proven Value and Reuse Test.

## Problems We've Solved

**Start with the problem, not a technical name.** These are examples of everyday descriptions a user might give. Follow the links to examine the solution, its verification and limitations; a match is a starting point, not proof that it fits every project.

| Problem or goal in everyday language | Where to look |
|---|---|
| **“My installed app is stuck on an old version,” “updates aren't showing up,” or “an older installed game won't refresh.”** | [Versioned Offline Build](modules/versioned-offline-build/) and [Stale-Asset Recovery](lessons/pwa-stale-asset-recovery.md); [Release Verification](verification/local-first-pwa-release.md) |
| **“I want the app to open without internet,” or “it should load reliably after I add it to my phone.”** | [Offline App Shell](modules/offline-app-shell/), [PWA Manifest Template](templates/pwa-manifest/), and [Release Verification](verification/local-first-pwa-release.md) |
| **“An app update broke the offline version,” or “the new version seems to be mixing old and new files.”** | [PWA Shell Release Order](lessons/pwa-release-order.md), [Versioned Offline Build](modules/versioned-offline-build/), and [Stale-Asset Recovery](lessons/pwa-stale-asset-recovery.md) |
| **“I need to back up my app's information to a file and restore it later.”** | [JSON Backup File](modules/json-backup-file/) |
| **“My app forgets what I entered after I close or reopen it.”** | [Local JSON State](modules/local-json-state/) — assess whether persistence is the actual cause before applying |
| **“An update should not erase my saved information,” or “I don't want app versions confused with saved-data versions.”** | [Storage Key Is Not the Release Version](lessons/storage-key-is-not-release-version.md) and [Local JSON State](modules/local-json-state/) |
| **“A name or note containing special characters displays incorrectly in generated page content.”** | [HTML Escape](modules/html-escape/) — applies to text inserted into generated HTML strings |
| **“The app shows the wrong day around midnight,” or “daily items reset on the wrong date.”** | [Local Date Key](modules/local-date-key/) |
| **“GitHub says I pushed an update, but I don't know whether the website actually deployed.”** | [GitHub Actions Deployment Verification](verification/github-actions-deployment-verification.md) |
| **“I have an app idea but need to define what it should become and what it should not do.”** | [Goal Box Base](planning/goal-box-base.md) |
| **“We've agreed on the goal; how do we choose the technical foundation and first useful piece?”** | [Project Foundation Base](planning/project-foundation-base.md) and [AI Project Planning Instructions](planning/ai-project-planning-instructions.md) |
| **“We're building tiny technical steps that aren't meaningful to test,” or “the project keeps drifting away from the agreed plan.”** | [AI Project Planning Instructions](planning/ai-project-planning-instructions.md) |

**For future contributions:** Add or refine a plain-language problem entry whenever a verified solution or lesson addresses a problem not already discoverable here. Multiple descriptions may point to the same item. Keep this table concise and link to the existing authoritative source; do not duplicate implementations or invent symptoms not supported by project experience.

| Module | Function | Useful when | Proven source projects |
|---|---|---|---|
| [Versioned Offline Build](modules/versioned-offline-build/) | Generates a coherent versioned offline cache plus a network-only release probe, build-identified service-worker refresh, release-specific navigation, and retryable manual Check for Updates control, retaining older hashed assets for safe transitions. | A compiled static game needs same-release HTML/JS/CSS offline and safe installed-PWA updates, including an older installed client stuck on a previous release; use this version-aware method for new Vite/GitHub Pages PWAs when appropriate. | Pop Squadron (device-tested; specialized variant) |
| [Offline App Shell](modules/offline-app-shell/) | Provides a small network-first service worker with app-shell caching, old-cache cleanup, and navigation fallback. | A static browser app or game needs dependable offline startup and refreshed online assets. | Personal Dashboard; Follow-Up Tracker; Hall Cleaning List; Stranded Colony |
| [JSON Backup File](modules/json-backup-file/) | Handles generic JSON backup envelope creation, serialization, browser download, and safe file reading/parsing. | A local-first app needs user-owned export/restore files without coupling the module to the app's data schema. | Personal Dashboard; Follow-Up Tracker; Simple Notebook |
| [Local JSON State](modules/local-json-state/) | Loads, saves, and clears JSON state in localStorage while leaving defaults/normalization to the host. | A lightweight app or game needs simple durable on-device state. | Personal Dashboard; Follow-Up Tracker; Hall Cleaning List; Little Field Farm; Haven's Reach |
| [HTML Escape](modules/html-escape/) | Escapes HTML-sensitive characters for values interpolated into generated HTML strings. | A project builds HTML strings containing dynamic text. | Personal Dashboard; Follow-Up Tracker; Haven's Reach |
| [Local Date Key](modules/local-date-key/) | Returns the device-local calendar date as YYYY-MM-DD without UTC rollover mistakes. | Local-first scheduling, daily reset, reporting, or dated filenames. | Personal Dashboard; Follow-Up Tracker |

## How to use this index

Start with the **Problems We've Solved** section using the user's symptoms or goal in everyday language; then consult the technical index below for other plausible matches. Open the module folder, read its short contract, and decide whether it fits the current project's actual requirements.

Presence in this index means the item has demonstrated value, potentially in just one real project. It does **not** mean every future project should use it.

Project-specific validation, state shape, UI, naming, and policy stay with the project unless they independently earn reuse.


## Proven Templates and Configurations

| Item | Function | Proven in |
|---|---|---|
| [PWA Manifest Template](templates/pwa-manifest/) | Baseline installable-PWA manifest using relative GitHub-Pages-safe routing and project-owned appearance/icon metadata. | Personal Dashboard; Follow-Up Tracker; Simple Notebook; Hall Cleaning List; Stranded Colony |

## Verification Recipes

| Item | Function | Proven in |
|---|---|---|
| [Local-First PWA Release Verification](verification/local-first-pwa-release.md) | Reusable online, persistence, installed-device, and offline release checks. | Personal Dashboard; Follow-Up Tracker; Simple Notebook; Hall Cleaning List; Stranded Colony |
| [GitHub Actions Deployment Verification](verification/github-actions-deployment-verification.md) | Verify push-triggered GitHub Pages workflow runs by matching commit SHA, status, job steps, and actual publish outcome using connected GitHub fetch. | Pop Squadron (confirmed Mission 23 deployment) |

## Proven Fixes and Lessons

| Item | Function | Proven source |
|---|---|---|
| [Installed PWA Stale-Asset Recovery](lessons/pwa-stale-asset-recovery.md) | Recovery procedures for stale installed-PWA releases: preserved hashed assets, visible-client refresh, and physical renaming only when needed. | Stranded Colony; Pop Squadron |
| [PWA Shell Release Order](lessons/pwa-release-order.md) | Publish changed shell files before the new service worker so a new cache does not activate against unavailable files. | Personal Dashboard |
| [Storage Key Is Not the Release Version](lessons/storage-key-is-not-release-version.md) | Keeps durable data namespace, schema version, application release, and service-worker cache version conceptually separate. | Personal Dashboard; reinforced across local-first projects |

## Project Planning

| Item | Function | Proven across |
|---|---|---|
| [Goal Box Base](planning/goal-box-base.md) | Defines the reusable backbone for establishing a project's mature destination, protected experience, boundaries, known requirements, non-goals, and intentionally open decisions without forcing a fixed document size. | Follow-Up Tracker; Fire Ambience; Haven's Reach; Stranded Colony planning evolution |
| [Project Foundation Base](planning/project-foundation-base.md) | Translates an approved Goal Box into durable ownership, technology, data/recovery, conditional project contracts, verification, and a bounded next meaningful slice. | Follow-Up Tracker; Fire Ambience; Haven's Reach; Stranded Colony |
| [AI Project Planning Instructions](planning/ai-project-planning-instructions.md) | Governs how the AI authors and applies Goal Boxes and Foundations, including re-grounding and the corrected Smallest Meaningful Slice rule: determine meaning first, then minimize while preserving diagnosability. | Repeated cross-project planning and increment-sizing experience |

