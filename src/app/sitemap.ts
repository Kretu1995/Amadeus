import type { MetadataRoute } from "next";
import { locations } from "@/data/locations";

const BASE_URL = "https://amadeus-resto.be";

const staticPages = [
  { path: "", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/over-ons", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/locaties", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/menu", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/reserveren", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/groepen", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/jobs", priority: 0.5, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.5, changeFrequency: "monthly" as const },
  { path: "/faq", priority: 0.6, changeFrequency: "monthly" as const },
];

const locales = ["nl", "en", "fr"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Static pages
  for (const page of staticPages) {
    for (const locale of locales) {
      const prefix = locale === "nl" ? "" : `/${locale}`;
      entries.push({
        url: `${BASE_URL}${prefix}${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: {
            nl: `${BASE_URL}${page.path}`,
            en: `${BASE_URL}/en${page.path}`,
            fr: `${BASE_URL}/fr${page.path}`,
          },
        },
      });
    }
  }

  // Location pages
  for (const location of locations) {
    for (const locale of locales) {
      const prefix = locale === "nl" ? "" : `/${locale}`;
      entries.push({
        url: `${BASE_URL}${prefix}/locaties/${location.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
        alternates: {
          languages: {
            nl: `${BASE_URL}/locaties/${location.slug}`,
            en: `${BASE_URL}/en/locaties/${location.slug}`,
            fr: `${BASE_URL}/fr/locaties/${location.slug}`,
          },
        },
      });
    }
  }

  return entries;
}
