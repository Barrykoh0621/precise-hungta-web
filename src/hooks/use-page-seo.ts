import { useEffect } from "react";

interface PageSeo {
  title: string;
  description: string;
  canonicalPath?: string;
}

function getCanonicalUrl(canonicalPath?: string) {
  const rawPath = canonicalPath || window.location.pathname;
  const path = rawPath.replace(/^\/precise-hungta-web/, "") || "/";
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const baseUrl = window.location.hostname.endsWith("github.io")
    ? "https://barrykoh0621.github.io/precise-hungta-web"
    : "https://www.hungtainstrument.com.my";

  return `${baseUrl}${normalizedPath === "/" ? "/" : normalizedPath}`;
}

function upsertMeta(selector: string, attribute: "name" | "property", key: string, content: string) {
  let meta = document.querySelector<HTMLMetaElement>(selector);
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute(attribute, key);
    document.head.appendChild(meta);
  }
  meta.content = content;
}

export function usePageSeo({ title, description, canonicalPath }: PageSeo) {
  useEffect(() => {
    document.title = title;
    const canonicalUrl = getCanonicalUrl(canonicalPath);

    const metaDescription = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = description;
    }

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    const ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.content = title;
    }

    const ogDescription = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.content = description;
    }

    const twitterTitle = document.querySelector<HTMLMetaElement>('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.content = title;
    }

    const twitterDescription = document.querySelector<HTMLMetaElement>('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.content = description;
    }

    upsertMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl);
  }, [title, description, canonicalPath]);
}
