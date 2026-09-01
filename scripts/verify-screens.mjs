import { chromium } from "playwright";
import fs from "fs";

fs.mkdirSync("content/verify", { recursive: true });
const browser = await chromium.launch({ headless: true });
const pages = ["/", "/work", "/homes", "/standard", "/contact"];

for (const size of [
  { name: "desktop", width: 1440, height: 1100 },
  { name: "mobile", width: 390, height: 844 },
]) {
  const context = await browser.newContext({ viewport: size });
  const page = await context.newPage();
  for (const path of pages) {
    await page.goto(`http://127.0.0.1:5173${path}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(400);
    const file = `content/verify/${size.name}${path === "/" ? "-home" : path.replace("/", "-")}.png`;
    await page.screenshot({ path: file, fullPage: true });
    console.log("wrote", file);
  }
  await context.close();
}
await browser.close();
