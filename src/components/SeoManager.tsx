import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { absoluteUrl, getSeoData, getStructuredData, siteConfig } from "../seo";
import { trackPageView } from "@/utils/analytics";

const setMeta = (
  selector: string,
  attribute: "name" | "property",
  key: string,
  content: string,
) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.append(element);
  }
  element.content = content;
};

const SeoManager = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const seo = getSeoData(pathname);
    document.title = seo.title;
    document.documentElement.lang = siteConfig.language;

    setMeta('meta[name="description"]', "name", "description", seo.description);
    setMeta(
      'meta[name="robots"]',
      "name",
      "robots",
      "index, follow, max-image-preview:large, max-video-preview:-1",
    );
    setMeta('meta[property="og:title"]', "property", "og:title", seo.title);
    setMeta(
      'meta[property="og:description"]',
      "property",
      "og:description",
      seo.description,
    );
    setMeta('meta[property="og:type"]', "property", "og:type", seo.type);
    setMeta('meta[property="og:url"]', "property", "og:url", seo.canonical);
    setMeta(
      'meta[property="og:image"]',
      "property",
      "og:image",
      absoluteUrl(seo.image),
    );
    setMeta(
      'meta[property="og:locale"]',
      "property",
      "og:locale",
      siteConfig.locale,
    );
    setMeta(
      'meta[name="twitter:card"]',
      "name",
      "twitter:card",
      "summary_large_image",
    );
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", seo.title);
    setMeta(
      'meta[name="twitter:description"]',
      "name",
      "twitter:description",
      seo.description,
    );
    setMeta(
      'meta[name="twitter:image"]',
      "name",
      "twitter:image",
      absoluteUrl(seo.image),
    );

    let canonical = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.append(canonical);
    }
    canonical.href = seo.canonical;

    let jsonLd = document.head.querySelector<HTMLScriptElement>(
      "script[data-seo-json-ld]",
    );
    if (!jsonLd) {
      jsonLd = document.createElement("script");
      jsonLd.type = "application/ld+json";
      jsonLd.dataset.seoJsonLd = "true";
      document.head.append(jsonLd);
    }
    jsonLd.text = JSON.stringify(getStructuredData(pathname, seo)).replace(
      /</g,
      "\\u003c",
    );
    trackPageView(pathname);
  }, [pathname]);

  return null;
};

export default SeoManager;
