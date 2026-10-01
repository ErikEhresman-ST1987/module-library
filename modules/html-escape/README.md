# HTML Escape

## Responsibility

Escapes the five HTML-sensitive characters in a value before inserting that value into HTML strings.

## Proven sources

Equivalent `escapeHtml` utilities are independently present in:

- Personal Dashboard
- Follow-Up Tracker
- Haven's Reach

## Use

```js
import { escapeHtml } from "./html-escape.js";

const markup = `<p>${escapeHtml(userSuppliedText)}</p>`;
```

## Boundary

Use this for text interpolated into HTML strings. It is not a general sanitizer and does not make arbitrary HTML safe. Prefer DOM APIs and `textContent` when practical.

## Why this belongs in the parts bin

It is tiny, but it is exactly the kind of solved utility that should not be rewritten slightly differently in every project.
