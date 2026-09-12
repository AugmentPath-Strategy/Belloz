import { HTTPS, SITE_URL, assetUrl, pages, pageUrl, sitemapLastmod } from "./config";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

/** Generated from src/seo/config.ts. Do not edit domain here. */
export function buildSitemapXml() {
  const lastmod = sitemapLastmod();
  const urls = pages
    .map((p) => {
      const images = (p.images ?? [])
        .map(
          (img) => `    <image:image>
      <image:loc>${escapeXml(assetUrl(img.path))}</image:loc>
      <image:title>${escapeXml(img.title)}</image:title>
    </image:image>`,
        )
        .join("\n");

      return `  <url>
    <loc>${escapeXml(pageUrl(p.path))}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority.toFixed(1)}</priority>${images ? `\n${images}` : ""}
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
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
