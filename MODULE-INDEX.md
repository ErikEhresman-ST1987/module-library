# Module Index

Fast lookup for modules that have passed the Module Library's Six-Point Module Gate.

| Module | Function | Useful when | Proven source projects |
|---|---|---|---|
| [Offline App Shell](modules/offline-app-shell/) | Provides a small network-first service worker with app-shell caching, old-cache cleanup, and navigation fallback. | A static browser app or game needs dependable offline startup and refreshed online assets. | Personal Dashboard; Follow-Up Tracker; Hall Cleaning List; Stranded Colony |
| [JSON Backup File](modules/json-backup-file/) | Handles generic JSON backup envelope creation, serialization, browser download, and safe file reading/parsing. | A local-first app needs user-owned export/restore files without coupling the module to the app's data schema. | Personal Dashboard; Follow-Up Tracker; Simple Notebook |
| [Local JSON State](modules/local-json-state/) | Loads, saves, and clears JSON state in localStorage while leaving defaults/normalization to the host. | A lightweight app or game needs simple durable on-device state. | Personal Dashboard; Follow-Up Tracker; Hall Cleaning List; Little Field Farm; Haven's Reach |
| [HTML Escape](modules/html-escape/) | Escapes HTML-sensitive characters for values interpolated into generated HTML strings. | A project builds HTML strings containing dynamic text. | Personal Dashboard; Follow-Up Tracker; Haven's Reach |

## How to use this index

Start here when a new project needs a capability that may already have been solved. Open the module folder, read its short contract, and decide whether it fits the current project's actual requirements.

Presence in this index means the capability has already shown repeated real-world use. It does **not** mean every future project should use it.

Project-specific validation, state shape, UI, naming, and policy stay with the project unless they independently earn reuse.
