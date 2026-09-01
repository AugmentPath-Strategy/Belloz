import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: 1600, height: 1400 },
});

await page.goto("https://sites.google.com/view/bellozconstruction", {
  waitUntil: "networkidle",
  timeout: 90000,
});
await page.waitForTimeout(2000);

const headings = [
  "Kitchens",
  "Bathrooms",
  "Demolition",
  "Concrete",
  "Framing",
  "Plumbing",
  "HVAC",
  "Electrical",
  "Drywall",
  "Painting",
  "Flooring",
  "Cabinets",
  "Tile",
  "Welding",
];

const result = {};

for (const heading of headings) {
  const loc = page.getByText(heading, { exact: true }).first();
  if ((await loc.count()) === 0) {
    result[heading] = [];
    continue;
  }
  await loc.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);

  const urls = await loc.evaluate((el) => {
    const grab = (root) => {
      const found = [];
      root.querySelectorAll("*").forEach((node) => {
        const bg = getComputedStyle(node).backgroundImage;
        if (bg && bg.includes("googleusercontent.com")) {
          const m = bg.match(/url\("?(https:\/\/lh3\.googleusercontent\.com[^")]+)"?\)/);
          if (m) found.push(m[1]);
        }
        if (node.tagName === "IMG" && node.currentSrc) found.push(node.currentSrc);
      });
      return found;
    };

    let node = el;
    for (let i = 0; i < 8 && node; i++) node = node.parentElement;
    const section = node || el.parentElement;
    let imgs = grab(section);

    if (imgs.length < 2) {
      let sib = section.nextElementSibling;
      for (let i = 0; i < 6 && sib; i++) {
        imgs = imgs.concat(grab(sib));
        sib = sib.nextElementSibling;
      }
    }
    return [...new Set(imgs)];
  });

  result[heading] = urls;
  console.log(heading, urls.length);
}

fs.writeFileSync("content/gallery-map.json", JSON.stringify(result, null, 2));
await browser.close();
