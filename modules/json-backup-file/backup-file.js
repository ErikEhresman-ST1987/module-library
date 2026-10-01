/*
  JSON Backup File
  Generic file mechanics extracted from Personal Dashboard,
  Follow-Up Tracker, and Simple Notebook.

  The host application remains responsible for validating its own data.
*/

export function createBackupEnvelope({
  appId,
  formatVersion = 1,
  data,
  createdAt = new Date()
}) {
  if (!appId || typeof appId !== "string") {
    throw new TypeError("A string appId is required.");
  }
  if (!Number.isInteger(formatVersion) || formatVersion < 1) {
    throw new TypeError("formatVersion must be a positive integer.");
  }

  return {
    app: appId,
    formatVersion,
    createdAt: createdAt.toISOString(),
    data: structuredClone(data)
  };
}

export function serializeBackup(backup) {
  return `${JSON.stringify(backup, null, 2)}\n`;
}

export function downloadJsonFile(contents, fileName) {
  const text = typeof contents === "string"
    ? contents
    : serializeBackup(contents);

  const url = URL.createObjectURL(
    new Blob([text], { type: "application/json" })
  );

  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();

  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function readTextFile(file, { maxBytes = 2 * 1024 * 1024 } = {}) {
  if (!file) throw new Error("No backup file was selected.");
  if (file.size > maxBytes) throw new Error("The selected backup file is too large.");

  if (typeof file.text === "function") return file.text();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(String(reader.result ?? "")));
    reader.addEventListener("error", () => reject(reader.error ?? new Error("The backup file could not be read.")));
    reader.readAsText(file);
  });
}

export async function parseJsonFile(file, options) {
  const text = await readTextFile(file, options);

  try {
    return JSON.parse(text);
  } catch {
    throw new Error("The selected file is not valid JSON.");
  }
}
