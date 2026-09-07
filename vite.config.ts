import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";
import { pages } from "./src/seo/config";
import { headInnerHtml } from "./src/seo/head";
import { buildRobotsTxt, buildSitemapXml } from "./src/seo/staticFiles";

const root = fileURLToPath(new URL(".", import.meta.url));

function writePublicSeoFiles() {
  const dir = resolve(root, "public");
  mkdirSync(dir, { recursive: true });
  writeFileSync(resolve(dir, "sitemap.xml"), buildSitemapXml());
  writeFileSync(resolve(dir, "robots.txt"), buildRobotsTxt());
}

function seoPlugin(): Plugin {
  return {
    name: "belloz-seo",
    buildStart() {
      writePublicSeoFiles();
    },
    configureServer() {
      writePublicSeoFiles();
    },
    transformIndexHtml(html) {
      return html.replace("<!--seo-head-->", headInnerHtml(pages[0]).trim());
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), seoPlugin()],
  // TODO: HTTPS redirect belongs at the host after TLS is live (CDN/nginx/Netlify).
  // Do not hardcode a production domain redirect here.
});
