import { DEFAULT_OG_IMAGE, SITE_NAME, assetUrl, jsonLdFor, pageUrl, type SeoPage } from "./config";

export function headInnerHtml(page: SeoPage) {
  const url = pageUrl(page.path);
  const image = assetUrl(DEFAULT_OG_IMAGE);
  const jsonLd = JSON.stringify(jsonLdFor(page));

  return `
    <title>${escapeHtml(page.title)}</title>
    <meta name="description" content="${escapeHtml(page.description)}" />
    <link rel="canonical" href="${escapeHtml(url)}" />
    <meta name="robots" content="index, follow" />
    <meta property="og:title" content="${escapeHtml(page.title)}" />
    <meta property="og:description" content="${escapeHtml(page.description)}" />
    <meta property="og:image" content="${escapeHtml(image)}" />
    <meta property="og:url" content="${escapeHtml(url)}" />
    <meta property="og:type" content="${page.ogType}" />
    <meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(page.title)}" />
    <meta name="twitter:description" content="${escapeHtml(page.description)}" />
    <meta name="twitter:image" content="${escapeHtml(image)}" />
    <script type="application/ld+json">${jsonLd}</script>
  `;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
