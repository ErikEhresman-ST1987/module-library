/*
  Local JSON State — host owns schema, normalization and migration.
  A failed read must not masquerade as an empty first run: doing so could
  cause the next save to overwrite recoverable data.
*/
export function createLocalJsonState({
  key,
  createDefault,
  normalize = (value) => value,
  onError = () => {}
}) {
  if (!key || typeof key !== "string") throw new TypeError("A storage key is required.");
  if (typeof createDefault !== "function") throw new TypeError("createDefault must be a function.");
  if (typeof normalize !== "function") throw new TypeError("normalize must be a function.");

  function load() {
    try {
      const stored = localStorage.getItem(key);
      return stored === null
        ? normalize(createDefault())
        : normalize(JSON.parse(stored));
    } catch (error) {
      try { onError(error, "load"); } catch { /* Preserve original error. */ }
      throw error;
    }
  }

  function save(value) {
    try {
      const normalized = normalize(value);
      localStorage.setItem(key, JSON.stringify(normalized));
      return normalized;
    } catch (error) {
      try { onError(error, "save"); } catch { /* Preserve original error. */ }
      throw error;
    }
  }

  function clear() {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      try { onError(error, "clear"); } catch { /* Preserve original error. */ }
      throw error;
    }
  }

  return { load, save, clear };
}
