import { company, customHomes, founder, images, serviceAreas, services } from "../data/content";

/** Production origin, no trailing slash. */
export const SITE_URL = "https://bellozconstruction.com";

export const SITE_NAME = "Belloz Construction LLC";

export const DEFAULT_OG_IMAGE = images.hero;
export const OG_IMAGE_ALT = "Custom home in Central Texas built by Belloz Construction";

/** TLS is live on the production host. HTTPS redirects stay at the host, not in app code. */
export const HTTPS = {
  enforceAtHost: true,
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
  images?: { path: string; title: string }[];
};

export const pages: SeoPage[] = [
  {
    path: "/",
    title: "Custom Home Builder in Austin, TX | Belloz Construction",
    description:
      "Belloz Construction LLC builds custom homes and remodels in Austin and Central Texas. Same crew from the slab to the last coat of paint. Call for a free estimate.",
    ogType: "website",
    schemaType: "WebPage",
    breadcrumb: "Home",
    changefreq: "weekly",
    priority: 1,
    images: [{ path: images.hero, title: OG_IMAGE_ALT }],
  },
  {
    path: "/work",
    title: "Austin Construction Portfolio | Homes & Remodels | Belloz",
    description:
      "Photos of Belloz Construction jobs in Austin and Central Texas. Custom homes, kitchens, baths, concrete, framing, and finish work. Call for a walkthrough.",
    ogType: "website",
    schemaType: "CollectionPage",
    breadcrumb: "Work",
    changefreq: "weekly",
    priority: 0.9,
  },
  {
    path: "/homes",
    title: "Custom Homes in Austin & Central Texas | Belloz",
    description:
      "Custom homes Belloz Construction built in Austin and Central Texas. Look through the houses, then call if you want to talk through how one of them went.",
    ogType: "website",
    schemaType: "CollectionPage",
    breadcrumb: "Homes",
    changefreq: "weekly",
    priority: 0.9,
    images: customHomes.homes.map((home) => ({ path: home.image, title: `${home.name} by Belloz Construction` })),
  },
  {
    path: "/standard",
    title: "About Belloz Construction | Austin Home Builder",
    description:
      "Enrique Bello started Belloz Construction after too many cheap crews and leftover mistakes. Here is how the Austin company works, and what we will not do on a job.",
    ogType: "article",
    schemaType: "AboutPage",
    breadcrumb: "The Standard",
    changefreq: "monthly",
    priority: 0.8,
  },
  {
    path: "/contact",
    title: "Free Estimate | Austin Custom Homes | Belloz",
    description:
      "Request a free estimate from Belloz Construction in Austin, TX. Call, text, or send your name, phone, and project details. We work Central Texas and we will call you back.",
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
      "Terms for using the Belloz Construction LLC website. Covers inquiries, photos, accuracy, third-party links, and how to contact the company in Austin and Central Texas.",
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

export function sitemapLastmod() {
  return new Date().toISOString().slice(0, 10);
}

export function organizationSchema() {
  return {
    "@type": "GeneralContractor",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: "Belloz Construction",
    url: SITE_URL,
    description:
      "Custom home builder and remodeler serving Austin and Central Texas. Same crew from foundation to finish.",
    email: company.email,
    telephone: company.phones[0].href.replace("tel:", ""),
    image: assetUrl(images.logo),
    logo: assetUrl(images.logo),
    founder: {
      "@type": "Person",
      name: founder.name,
      jobTitle: founder.title,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Austin",
      addressRegion: "TX",
      addressCountry: "US",
    },
    areaServed: serviceAreas.map((city) => ({
      "@type": "City",
      name: `${city}, TX`,
    })),
    knowsAbout: services.map((s) => s.name),
    sameAs: company.socials.map((s) => s.href),
    contactPoint: company.phones.map((phone) => ({
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: phone.href.replace("tel:", ""),
      areaServed: "US",
      availableLanguage: "English",
      name: phone.name,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Construction services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.text,
          provider: { "@id": `${SITE_URL}/#organization` },
          areaServed: company.region,
        },
      })),
    },
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "en-US",
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
        inLanguage: "en-US",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        primaryImageOfPage: { "@type": "ImageObject", url: assetUrl(DEFAULT_OG_IMAGE) },
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
