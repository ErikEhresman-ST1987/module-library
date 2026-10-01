# Local JSON State

## Responsibility

Owns the repeated browser mechanics for loading, saving, and clearing JSON application state in `localStorage`.

## Does not own

The host application owns its state shape, defaults, validation, normalization, migrations, save-status UI, and any domain-specific recovery rules.

## Proven sources

The same basic persistence wheel appears independently in:

- Personal Dashboard
- Follow-Up Tracker
- Hall Cleaning List
- Little Field Farm
- Haven's Reach

Each reads a project-specific key, parses JSON, falls back or normalizes when necessary, and writes JSON back to local storage.

## Why this belongs in the parts bin

This is deliberately boring code. That is the point. The browser storage mechanics are repeatedly rewritten while the meaningful differences live in each project's normalization and state rules.

## Interface

`createLocalJsonState({ key, createDefault, normalize, onError })`

Returns:

- `load()`
- `save(value)`
- `clear()`

## Integration

Supply the project's existing default-state and normalization functions. Do not move project-specific schema logic into this module merely to increase reuse.

## Verification

Verify in the host project that:

1. first run returns defaults;
2. saved state survives reload;
3. malformed JSON falls back safely;
4. normalization still applies;
5. storage failures follow the host's chosen error path;
6. clear removes only the project's own storage key.
