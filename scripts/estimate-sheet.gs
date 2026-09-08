const HEADERS = ["Timestamp", "Name", "Phone", "Project type", "Project details"];

function sheet() {
  return SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
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

function doGet() {
  ensureHeaders();
  return ContentService.createTextOutput("Belloz estimate webhook is live.");
}

function doPost(e) {
  ensureHeaders();
  const data = JSON.parse(e.postData.contents);
  sheet().appendRow([
    new Date(),
    data.name || "",
    data.phone || "",
    data.type || "",
    data.message || "",
  ]);
  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(
    ContentService.MimeType.JSON,
  );
}
