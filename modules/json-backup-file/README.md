# JSON Backup File

## Responsibility

Owns the generic browser/file mechanics around a user-owned JSON backup:

- creating a small versioned backup envelope;
- serializing readable JSON;
- downloading JSON through the browser;
- reading a selected local file;
- enforcing a basic file-size ceiling;
- parsing JSON with a clear failure.

## Does not own

The module deliberately does **not** decide whether restored application data is valid.

The host application owns:

- its data schema;
- schema/data version compatibility;
- normalization;
- duplicate-ID checks;
- required fields;
- privacy warnings;
- replacement confirmation;
- persistence;
- rollback/read-back verification;
- restore UI.

That boundary is important because those rules differ substantially between the proven source applications.

## Proven sources

The underlying mechanics recur in:

- Personal Dashboard
- Follow-Up Tracker
- Simple Notebook

All three create user-owned JSON backups. Personal Dashboard and Follow-Up Tracker independently use the same Blob/object-URL/temporary-link download pattern. Their restore flows parse and validate before replacement. Simple Notebook independently formalized the same versioned-backup and validation approach in a discrete module.

## Interface

`createBackupEnvelope({ appId, formatVersion, data, createdAt })`

Creates a generic envelope. A project may instead construct its own envelope when it has an established format.

`serializeBackup(backup)`

Returns formatted JSON text.

`downloadJsonFile(contents, fileName)`

Downloads either serialized text or an object as a JSON file.

`readTextFile(file, { maxBytes })`

Reads a selected browser File with a default 2 MB safety ceiling and a FileReader fallback.

`parseJsonFile(file, options)`

Reads and parses a JSON file. It does not validate application data.

## Integration principle

Reuse the boring file mechanics; keep meaningful application validation with the application.

That is the smallest boundary supported by the existing projects without forcing unlike data models into one abstraction.

## Verification

For a host application, verify:

1. Export creates a readable JSON file.
2. The filename is supplied by the host and is appropriate.
3. A valid exported file can be selected and parsed.
4. Invalid JSON fails without changing application state.
5. Oversized files fail before parsing.
6. Host validation runs before any persisted data is replaced.
7. Restore/replacement is separately verified by the host application.
