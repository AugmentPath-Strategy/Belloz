import { company, images } from "../data/content";

/**
 * Single place to update after the real domain is purchased.
 * TODO: replace SITE_URL with the production origin (https://your-domain.com), no trailing slash.
 */
export const SITE_URL = "https://example.com";

export const SITE_NAME = "Belloz Construction LLC";

export const DEFAULT_OG_IMAGE = images.hero;

/** TODO: enable HTTPS-only at the host after TLS is live. Do not hardcode a domain redirect in app code. */
export const HTTPS = {
  enforceAtHost: false,
};

export type SeoPage = {
  path: string;
  title: string;
  description: string;
  ogType: "website" | "article";
  schemaType: "WebPage" | "CollectionPage" | "AboutPage" | "ContactPage";
  breadcrumb: string;
  changefreq: "weekly" | "monthly";
  priority: number;
};

export const pages: SeoPage[] = [
  {
    path: "/",
    title: "Belloz Construction | Custom Homes in Central Texas",
    description:
      "Belloz Construction LLC builds custom homes and remodels from foundation to finish across Central Texas, with craftsmanship, integrity, and exacting detail.",
    ogType: "website",
    schemaType: "WebPage",
    breadcrumb: "Home",
    changefreq: "weekly",
    priority: 1,
  },
  {
    path: "/work",
    title: "Belloz Construction Work | Homes, Kitchens, Trades",
    description:
      "See Belloz Construction work across Central Texas: custom homes, kitchens, baths, concrete, framing, and finish trades, from first pour to final coat.",
    ogType: "website",
    schemaType: "CollectionPage",
    breadcrumb: "Work",
    changefreq: "weekly",
    priority: 0.9,
  },
  {
    path: "/homes",
    title: "Custom Homes by Belloz Construction | Texas Builds",
    description:
      "Explore custom homes built by Belloz Construction in Central Texas, including featured residences finished with precision from foundation to last detail.",
    ogType: "website",
    schemaType: "CollectionPage",
    breadcrumb: "Homes",
    changefreq: "weekly",
    priority: 0.9,
  },
  {
    path: "/standard",
    title: "The Belloz Standard | Craft, Integrity, Excellence",
    description:
      "Read the Belloz Construction story, values, and standard of craft. Founder Enrique Bello on integrity, skilled crews, and why perfection is the standard.",
    ogType: "article",
    schemaType: "AboutPage",
    breadcrumb: "The Standard",
    changefreq: "monthly",
    priority: 0.8,
  },
  {
    path: "/contact",
    title: "Speak With Belloz Construction | Call or Text Today",
    description:
      "Call, text, or email Belloz Construction LLC in Central Texas to discuss a custom home or remodel. Share project details and the team will take it from there.",
    ogType: "website",
    schemaType: "ContactPage",
    breadcrumb: "Contact",
    changefreq: "monthly",
    priority: 0.8,
  },
  {
    path: "/terms",
    title: "Website Terms and Conditions | Belloz Construction",
    description:
      "Terms for using the Belloz Construction LLC website. Covers inquiries, photos, accuracy, third-party links, and how to contact the company in Central Texas.",
    ogType: "website",
    schemaType: "WebPage",
    breadcrumb: "Terms",
    changefreq: "monthly",
    priority: 0.3,
  },
];

export function pageUrl(path: string) {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

export function assetUrl(path: string) {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function pageByPath(pathname: string) {
  const path = pathname.replace(/\/+$/, "") || "/";
  return pages.find((p) => p.path === path) ?? pages[0];
}

export function organizationSchema() {
  return {
    "@type": "GeneralContractor",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    email: company.email,
    telephone: company.phones[0].href.replace("tel:", ""),
    areaServed: company.region,
    image: assetUrl(images.logo),
    logo: assetUrl(images.logo),
    sameAs: company.socials.map((s) => s.href),
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export function jsonLdFor(page: SeoPage) {
  const url = pageUrl(page.path);
  const crumbs = [{ name: "Home", path: "/" }];
  if (page.path !== "/") crumbs.push({ name: page.breadcrumb, path: page.path });

  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema(),
      websiteSchema(),
      {
        "@type": page.schemaType,
        "@id": `${url}#webpage`,
        url,
        name: page.title,
        description: page.description,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: crumbs.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.name,
          item: pageUrl(c.path),
        })),
      },
    ],
  };
}
