# Local-First PWA Release Verification

Reusable release checks extracted from the verification procedures used by Personal Dashboard, Follow-Up Tracker, Hall Cleaning List, Simple Notebook, and Stranded Colony.

Use only the checks relevant to the host project.

## Before deployment

- Run JavaScript syntax/tests available for the project.
- Check the proposed diff for accidental unrelated changes.
- Confirm the service-worker shell still lists every file required for offline startup.
- If an app-shell file changed, advance the cache version according to the project's release policy.
- Preserve the application's data/storage namespace unless an intentional data migration requires otherwise.

## Online deployment check

- Open/reload the deployed application while online.
- Confirm the intended new version is actually being served.
- Confirm existing saved data loads and normalizes/migrates correctly.
- Exercise the changed behavior and one or two nearby unaffected behaviors.

## Persistence check

- Make a representative state change.
- Close/reopen or reload.
- Confirm the state returns unchanged.
- For destructive or restore operations, test both confirmation and cancellation paths.

## Installed PWA / real-device check

- Open the installed application on its primary real device.
- Confirm touch targets, scrolling, text entry, and layout remain usable.
- After one successful online refresh, close the application.
- Disable network access / use Airplane Mode.
- Reopen and confirm the application shell loads.
- Make a local state change offline when applicable.
- Close/reopen again and confirm the offline change persisted.

## Release recovery point

Do not treat deployment alone as verification. A release becomes a dependable recovery point only after the relevant online, persistence, and real-device/offline checks pass.
