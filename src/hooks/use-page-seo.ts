import { useEffect } from "react";

interface PageSeo {
  title: string;
  description: string;
}

export function usePageSeo({ title, description }: PageSeo) {
  useEffect(() => {
    document.title = title;

    const metaDescription = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = description;
    }

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
  }, [title, description]);
}
