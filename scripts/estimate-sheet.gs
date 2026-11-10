/**
 * @OnlyCurrentDoc
 *
 * Belloz estimate webhook.
 * (Extensions → Apps Script). The annotation above limits the script to
 * that one spreadsheet, so it cannot open any other file in the account.
 */

// Everyone who should get an email for each new lead, separated by commas.
const NOTIFY_EMAILS = "bellozofficial.construction@gmail.com";

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

// Website input is untrusted: trim it and cap its length.
function text(value, max) {
  return String(value || "").trim().slice(0, max);
}

// Stop text such as "=IMPORTDATA(...)" from running as a formula in the sheet.
function forSheet(value) {
  return /^[=+\-@\t\r]/.test(value) ? "'" + value : value;
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function readLead(e) {
  const data = JSON.parse(e.postData.contents);
  return {
    name: text(data.name, 200),
    // The site sends "'+1 512…" so Sheets keeps it as text; drop that here.
    phone: text(data.phone, 40).replace(/^'+/, ""),
    type: text(data.type, 200),
    message: text(data.message, 2000),
  };
}

function saveLead(lead) {
  ensureHeaders();
  sheet().appendRow([
    new Date(),
    forSheet(lead.name),
    forSheet(lead.phone),
    forSheet(lead.type),
    forSheet(lead.message),
  ]);
}

function notifyLead(lead, saved) {
  const name = lead.name || "Someone";
  const subject = (saved ? "" : "[NOT SAVED TO SHEET] ") +
    "New estimate request: " + name + (lead.type ? " (" + lead.type + ")" : "");
  const tel = "tel:" + lead.phone.replace(/[^\d+]/g, "");
  const sheetUrl = SpreadsheetApp.getActiveSpreadsheet().getUrl();
  const warning = saved
    ? ""
    : "This lead could not be written to the sheet. Check the script's Executions page.\n\n";

  const body = warning +
    "Name: " + lead.name + "\n" +
    "Phone: " + lead.phone + "\n" +
    "Project type: " + lead.type + "\n\n" +
    lead.message + "\n\n" +
    "All leads: " + sheetUrl;

  const htmlBody =
    (saved ? "" : "<p style=\"color:#b00020\"><b>" + escapeHtml(warning) + "</b></p>") +
    "<p><b>Name:</b> " + escapeHtml(lead.name) + "<br>" +
    "<b>Phone:</b> <a href=\"" + escapeHtml(tel) + "\">" + escapeHtml(lead.phone) + "</a> (tap to call)<br>" +
    "<b>Project type:</b> " + escapeHtml(lead.type) + "</p>" +
    "<p style=\"white-space:pre-wrap\">" + escapeHtml(lead.message) + "</p>" +
    "<p><a href=\"" + escapeHtml(sheetUrl) + "\">Open all leads</a></p>";

  MailApp.sendEmail({
    to: NOTIFY_EMAILS,
    subject: subject.replace(/[\r\n]+/g, " ").slice(0, 200),
    body: body,
    htmlBody: htmlBody,
    name: "Belloz website",
  });
}

// Run this once from the editor (pick "setup" in the toolbar, then Run).
// It asks for permission, adds the header row, and sends a test alert.
function setup() {
  ensureHeaders();
  MailApp.sendEmail(
    NOTIFY_EMAILS,
    "Belloz lead alerts are on",
    "New estimate requests from the website will be emailed here.\n\n" +
      "Leads sheet: " + SpreadsheetApp.getActiveSpreadsheet().getUrl(),
    { name: "Belloz website" },
  );
  Logger.log("OK: sheet ready, test alert sent to " + NOTIFY_EMAILS);
}

function doGet() {
  return ContentService.createTextOutput("Belloz estimate webhook is live.");
}

// Save to the sheet and email the team. The lead counts as received if
// either one works; the website only shows an error when both fail.
function doPost(e) {
  const lead = readLead(e);

  let saved = false;
  try {
    saveLead(lead);
    saved = true;
  } catch (err) {
    console.error("Sheet save failed", err);
  }

  let emailed = false;
  try {
    notifyLead(lead, saved);
    emailed = true;
  } catch (err) {
    console.error("Lead email failed", err);
  }

  return ContentService.createTextOutput(
    JSON.stringify({ ok: saved || emailed, saved: saved, emailed: emailed }),
  ).setMimeType(ContentService.MimeType.JSON);
}
