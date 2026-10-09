import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import vm from "node:vm";

async function loadModule(path) {
  const source = await fs.readFile(new URL("../" + path, import.meta.url), "utf8");
  return import("data:text/javascript;base64," + Buffer.from(source).toString("base64"));
}

test("HTML Escape protects HTML-sensitive characters", async () => {
  const { escapeHtml } = await loadModule("modules/html-escape/html-escape.js");
  assert.equal(escapeHtml(`<&>"'`), "&lt;&amp;&gt;&quot;&#39;");
  assert.equal(escapeHtml(42), "42");
});

test("Local Date Key uses local calendar components", async () => {
  const { localDateKey } = await loadModule("modules/local-date-key/local-date-key.js");
  const date = new Date(2026, 9, 9, 23, 45);
  assert.equal(localDateKey(date), "2026-10-09");
});

test("Local JSON State distinguishes first run from corrupt state", async () => {
  const { createLocalJsonState } = await loadModule("modules/local-json-state/local-json-state.js");
  const values = new Map();
  const errors = [];
  const original = globalThis.localStorage;
  globalThis.localStorage = {
    getItem: key => values.has(key) ? values.get(key) : null,
    setItem: (key, value) => values.set(key, value),
    removeItem: key => values.delete(key)
  };
  try {
    const store = createLocalJsonState({
      key: "test-only", createDefault: () => ({ count: 0 }),
      normalize: value => {
        if (!Number.isInteger(value.count)) throw new Error("invalid state");
        return value;
      },
      onError: (error, action) => errors.push(action)
    });
    assert.deepEqual(store.load(), { count: 0 });
    store.save({ count: 3 });
    assert.deepEqual(store.load(), { count: 3 });
    values.set("test-only", "{broken");
    assert.throws(() => store.load(), SyntaxError);
    assert.equal(values.get("test-only"), "{broken");
    assert.deepEqual(errors, ["load"]);
    values.set("test-only", '{"count":"bad"}');
    assert.throws(() => store.load(), /invalid state/);
    store.clear();
    assert.deepEqual(store.load(), { count: 0 });
    globalThis.localStorage.getItem = () => { throw new Error("storage blocked"); };
    assert.throws(() => store.load(), /storage blocked/);
  } finally { globalThis.localStorage = original; }
});

test("JSON Backup File creates and parses without assuming host validation", async () => {
  const { createBackupEnvelope, serializeBackup, parseJsonFile, readTextFile } =
    await loadModule("modules/json-backup-file/backup-file.js");
  const backup = createBackupEnvelope({
    appId: "test-app", data: { count: 3 },
    createdAt: new Date("2026-10-09T12:00:00Z")
  });
  assert.equal(backup.app, "test-app");
  assert.deepEqual(JSON.parse(serializeBackup(backup)).data, { count: 3 });
  const file = { size: 40, text: async () => '{"valid":true}' };
  assert.deepEqual(await parseJsonFile(file), { valid: true });
  await assert.rejects(parseJsonFile({ size: 10, text: async () => "not-json" }), /not valid JSON/);
  await assert.rejects(readTextFile({ size: 100, text: async () => "{}" }, { maxBytes: 20 }), /too large/);
});

test("Offline App Shell limits cache deletion and uses waitUntil for writes", async () => {
  const source = await fs.readFile(
    new URL("../modules/offline-app-shell/service-worker.js", import.meta.url), "utf8"
  );
  const handlers = {};
  const deleted = [];
  const written = [];
  const cache = {
    addAll: async () => {},
    put: async (key) => { written.push(key); },
    match: async () => null
  };
  const context = {
    URL, Response,
    self: {
      registration: { scope: "https://example.test/app/" },
      addEventListener: (type, handler) => { handlers[type] = handler; },
      skipWaiting: async () => {},
      clients: { claim: async () => {} },
      location: { origin: "https://example.test" }
    },
    caches: {
      keys: async () => ["your-app-shell-v0", "your-app-shell-v1", "another-app-v2"],
      delete: async key => { deleted.push(key); return true; },
      open: async () => cache
    },
    fetch: async () => ({ ok: true, clone() { return this; } })
  };
  vm.runInNewContext(source, context);
  const activation = [];
  handlers.activate({ waitUntil: promise => activation.push(promise) });
  await Promise.all(activation);
  assert.deepEqual(deleted, ["your-app-shell-v0"]);
  const request = { method: "GET", url: "https://example.test/app/index.html", mode: "same-origin" };
  const pending = [];
  let response;
  handlers.fetch({
    request,
    waitUntil: promise => pending.push(promise),
    respondWith: promise => { response = promise; }
  });
  await response;
  await Promise.all(pending);
  assert.equal(pending.length, 1);
  assert.equal(written.length, 1);
  let outsideHandled = false;
  handlers.fetch({
    request: { method: "GET", url: "https://example.test/other/index.html" },
    respondWith: () => { outsideHandled = true; }
  });
  assert.equal(outsideHandled, false);
});
