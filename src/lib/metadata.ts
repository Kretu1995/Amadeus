import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "./constants";

interface MetadataParams {
  locale: string;
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
}

const localeMap: Record<string, string> = {
  nl: "nl_BE",
  en: "en_US",
  fr: "fr_BE",
};

export function generatePageMetadata({
  locale,
  title,
  description,
  path = "",
  ogImage = "/images/og/og-default.jpg",
}: MetadataParams): Metadata {
  const url = `${SITE_URL}${path}`;

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
      languages: {
        nl: `${SITE_URL}${path}`,
        en: `${SITE_URL}/en${path}`,
        fr: `${SITE_URL}/fr${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: localeMap[locale] || "nl_BE",
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${title} - ${SITE_NAME}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
