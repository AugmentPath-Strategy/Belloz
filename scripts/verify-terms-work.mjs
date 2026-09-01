import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://127.0.0.1:5173/work", { waitUntil: "networkidle" });
await page.screenshot({ path: "content/verify/work-filters.png", clip: { x: 0, y: 0, width: 1440, height: 520 } });
await page.goto("http://127.0.0.1:5173/terms", { waitUntil: "networkidle" });
await page.screenshot({ path: "content/verify/terms.png", fullPage: true });
const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mobile.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle" });
await mobile.evaluate(() => window.scrollTo(0, 1400));
await mobile.waitForTimeout(400);
await mobile.screenshot({ path: "content/verify/home-about-mobile.png" });
await browser.close();
console.log("ok");
