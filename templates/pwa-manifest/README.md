# PWA Manifest Template

## Responsibility

Provides the proven baseline manifest shape repeatedly used by installable local-first projects.

## Proven sources

Equivalent manifest structures are used by:

- Personal Dashboard
- Follow-Up Tracker
- Simple Notebook
- Hall Cleaning List
- Stranded Colony

The projects consistently use a relative start URL, standalone display, application colors, and project-owned icon metadata. Several also explicitly define relative scope and ID.

## Adapt before use

Change the application name, short name, description, colors, and icon paths. Keep relative GitHub-Pages-safe paths unless the host project has a concrete reason to use something else.

An SVG icon may be used instead of PNG sizes when that is the project's proven asset choice.

## Verification

Install/add the deployed application to the target device home screen. Confirm its name/icon are correct, it opens at the intended route, and standalone presentation works.
