/*
  HTML Escape
  Extracted from repeated utility functions in Personal Dashboard,
  Follow-Up Tracker, and Haven's Reach.
*/

const HTML_ESCAPES = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};

export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => HTML_ESCAPES[character]);
}
