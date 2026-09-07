import { HTTPS, SITE_URL, pages, pageUrl } from "./config";

/** Generated from src/seo/config.ts. Do not edit domain here. */
export function buildSitemapXml() {
  const urls = pages
    .map(
      (p) => `  <url>
    <loc>${pageUrl(p.path)}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority.toFixed(1)}</priority>
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

export function buildRobotsTxt() {
  const httpsNote = HTTPS.enforceAtHost
    ? ""
    : "# TODO: after TLS is live, enforce HTTPS at the host (CDN/nginx/Netlify). Do not hardcode a domain redirect here.\n";

  return `${httpsNote}User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
}
