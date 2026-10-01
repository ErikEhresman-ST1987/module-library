# Local Date Key

## Responsibility

Returns a device-local calendar date in `YYYY-MM-DD` form.

## Proven sources

The same need is implemented in:

- Personal Dashboard, for dated dashboard behavior and backup filenames.
- Follow-Up Tracker, for today's scheduling/reporting date.

## Why this belongs in the parts bin

Using `new Date().toISOString().slice(0, 10)` directly produces a UTC date and can be wrong for the user's local calendar day around midnight. These projects deliberately derive the local date instead.

## Interface

`localDateKey(date = new Date())`

## Boundary

This is a local calendar-date helper, not a general timezone/date library.
