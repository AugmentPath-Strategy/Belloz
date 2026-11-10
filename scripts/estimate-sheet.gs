/**
 * @OnlyCurrentDoc
 *
 * Belloz estimate webhook. Paste this into the sheet's own Apps Script
 * (Extensions → Apps Script). The annotation above limits the script to
 * that one spreadsheet, so it cannot open any other file in the account.
 */
const HEADERS = ["Timestamp", "Name", "Phone", "Project type", "Project details"];

function sheet() {
  return SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
}

// Website input is untrusted: cap its length, and stop text such as
// "=IMPORTDATA(...)" from being run as a formula when it lands in the sheet.
function clean(value) {
  const text = String(value || "").slice(0, 2000);
  return /^[=+\-@\t\r]/.test(text) ? "'" + text : text;
}

function ensureHeaders() {
  const tab = sheet();
  const existing = tab.getRange(1, 1, 1, HEADERS.length).getValues()[0];
  const empty = existing.every((cell) => String(cell).trim() === "");
  if (!empty) return;
  tab.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  tab.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
  tab.setFrozenRows(1);
}

// Run this once from the editor (pick "setup" in the toolbar, then Run).
// It asks for permission and proves this account can write to the sheet.
function setup() {
  ensureHeaders();
  Logger.log("OK, writing to: " + SpreadsheetApp.getActiveSpreadsheet().getName());
}

function doGet() {
  return ContentService.createTextOutput("Belloz estimate webhook is live.");
}

function doPost(e) {
  ensureHeaders();
  const data = JSON.parse(e.postData.contents);
  sheet().appendRow([
    new Date(),
    clean(data.name),
    clean(data.phone),
    clean(data.type),
    clean(data.message),
  ]);
  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(
    ContentService.MimeType.JSON,
  );
}
