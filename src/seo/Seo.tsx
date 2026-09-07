import { useEffect } from "react";
import { DEFAULT_OG_IMAGE, SITE_NAME, assetUrl, jsonLdFor, pageByPath, pageUrl } from "./config";

type Props = {
  pathname: string;
};

export function Seo({ pathname }: Props) {
  useEffect(() => {
    const page = pageByPath(pathname);
    const url = pageUrl(page.path);
    const image = assetUrl(DEFAULT_OG_IMAGE);

    document.title = page.title;
    setMeta("description", page.description);
    setMeta("robots", "index, follow");
    setLink("canonical", url);

    setMeta("og:title", page.title, "property");
    setMeta("og:description", page.description, "property");
    setMeta("og:image", image, "property");
    setMeta("og:url", url, "property");
    setMeta("og:type", page.ogType, "property");
    setMeta("og:site_name", SITE_NAME, "property");

    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", page.title);
    setMeta("twitter:description", page.description);
    setMeta("twitter:image", image);

    setJsonLd(jsonLdFor(page));
  }, [pathname]);

  return null;
}

function setMeta(key: string, content: string, attr: "name" | "property" = "name") {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function setJsonLd(data: object) {
  let el = document.head.querySelector<HTMLScriptElement>('script[type="application/ld+json"][data-seo="page"]');
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.dataset.seo = "page";
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}
