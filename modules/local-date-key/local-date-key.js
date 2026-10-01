/*
  Local Date Key
  Proven in Personal Dashboard and Follow-Up Tracker.

  Returns the device-local calendar date as YYYY-MM-DD without accidentally
  using the UTC date from a raw Date#toISOString() call.
*/

export function localDateKey(date = new Date()) {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}
