import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const pages = [
  { name: "home", url: "https://sites.google.com/view/bellozconstruction" },
  { name: "standard", url: "https://sites.google.com/view/bellozconstruction/the-belloz-standard" },
  { name: "homes", url: "https://sites.google.com/view/bellozconstruction/built-by-belloz/custom-built-homes" },
];

const outRoot = path.resolve("public/images");
fs.mkdirSync(outRoot, { recursive: true });

function sanitize(id) {
  return id.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 28);
}

async function collectFromPage(page) {
  return page.evaluate(() => {
    const urls = new Set();
    document.querySelectorAll("img").forEach((img) => {
      if (img.currentSrc) urls.add(img.currentSrc);
      if (img.src) urls.add(img.src);
    });
    document.querySelectorAll("*").forEach((el) => {
      const bg = getComputedStyle(el).backgroundImage;
      const matches = bg.match(/url\("?(.*?)"?\)/g) || [];
      matches.forEach((m) => {
        const u = m.replace(/^url\("?/, "").replace(/"?\)$/, "");
        if (u.startsWith("http")) urls.add(u);
      });
    });
    return [...urls].filter((u) => u.includes("googleusercontent.com"));
  });
}

async function clickThroughCarousels(page) {
  for (let i = 0; i < 40; i++) {
    const next = page.locator('[aria-label="Next"]').first();
    if ((await next.count()) === 0) break;
    try {
      await next.click({ timeout: 800 });
      await page.waitForTimeout(250);
    } catch {
      break;
    }
  }
}

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1600, height: 1200 },
  userAgent:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
});
const page = await context.newPage();

const all = [];

for (const p of pages) {
  console.log("Opening", p.url);
  await page.goto(p.url, { waitUntil: "networkidle", timeout: 90000 });
  await page.waitForTimeout(1500);
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 700) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 200));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(800);
  await clickThroughCarousels(page);
  const urls = await collectFromPage(page);
  console.log(p.name, "urls", urls.length);
  urls.forEach((url, i) => all.push({ page: p.name, index: i + 1, url }));
}

const seen = new Set();
let ok = 0;
let fail = 0;
for (const item of all) {
  const idMatch = item.url.match(/sitesv\/(AG8ngQ[A-Za-z0-9_-]{16,})/);
  const id = idMatch ? sanitize(idMatch[1]) : `img-${item.page}-${item.index}`;
  if (seen.has(id)) continue;
  seen.add(id);
  const dir = path.join(outRoot, item.page);
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, `${String(item.index).padStart(3, "0")}-${id}.jpg`);
  try {
    const res = await context.request.get(item.url, {
      headers: { Referer: "https://sites.google.com/view/bellozconstruction" },
    });
    if (!res.ok()) {
      console.log("FAIL", res.status(), id);
      fail++;
      continue;
    }
    const buf = await res.body();
    if (buf.length < 2000) {
      console.log("TINY", id, buf.length);
      fail++;
      continue;
    }
    fs.writeFileSync(file, buf);
    ok++;
    console.log("OK", file, buf.length);
  } catch (err) {
    console.log("ERR", id, err.message);
    fail++;
  }
}

fs.writeFileSync("content/scraped-images.json", JSON.stringify(all, null, 2));
console.log(JSON.stringify({ unique: seen.size, ok, fail }, null, 2));
await browser.close();
