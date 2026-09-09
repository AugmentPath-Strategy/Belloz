/** Keep +, digits, and common separators. Works for +1, +91, and other country codes. */
export function normalizePhone(raw: string) {
  const display = raw.trim().replace(/\s+/g, " ");
  const digits = display.replace(/\D/g, "");
  return {
    display,
    digits,
    ok: digits.length >= 8 && digits.length <= 15,
  };
}

/** Leading apostrophe keeps Google Sheets from treating +91 as a formula. */
export function phoneForSheet(display: string) {
  return `'${display}`;
}
