import {
  DEFAULT_OG_IMAGE,
  OG_IMAGE_ALT,
  SITE_NAME,
  SITE_URL,
  assetUrl,
  jsonLdFor,
  pageUrl,
  type SeoPage,
} from "./config";

export function headInnerHtml(page: SeoPage) {
  const url = pageUrl(page.path);
  const image = assetUrl(DEFAULT_OG_IMAGE);
  const jsonLd = JSON.stringify(jsonLdFor(page));

  return `
    <title>${escapeHtml(page.title)}</title>
    <meta name="description" content="${escapeHtml(page.description)}" />
    <link rel="canonical" href="${escapeHtml(url)}" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <meta name="author" content="${escapeHtml(SITE_NAME)}" />
    <meta name="geo.region" content="US-TX" />
    <meta name="geo.placename" content="Austin" />
    <meta property="og:title" content="${escapeHtml(page.title)}" />
    <meta property="og:description" content="${escapeHtml(page.description)}" />
    <meta property="og:image" content="${escapeHtml(image)}" />
    <meta property="og:image:alt" content="${escapeHtml(OG_IMAGE_ALT)}" />
    <meta property="og:url" content="${escapeHtml(url)}" />
    <meta property="og:type" content="${page.ogType}" />
    <meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />
    <meta property="og:locale" content="en_US" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(page.title)}" />
    <meta name="twitter:description" content="${escapeHtml(page.description)}" />
    <meta name="twitter:image" content="${escapeHtml(image)}" />
    <meta name="twitter:image:alt" content="${escapeHtml(OG_IMAGE_ALT)}" />
    <link rel="sitemap" type="application/xml" href="${escapeHtml(`${SITE_URL}/sitemap.xml`)}" />
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
