import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["nl", "en", "fr"],
  defaultLocale: "nl",
  localePrefix: "as-needed",
  pathnames: {
    "/": "/",
    "/over-ons": {
      nl: "/over-ons",
      en: "/about",
      fr: "/a-propos",
    },
    "/locaties": {
      nl: "/locaties",
      en: "/locations",
      fr: "/emplacements",
    },
    "/locaties/[slug]": {
      nl: "/locaties/[slug]",
      en: "/locations/[slug]",
      fr: "/emplacements/[slug]",
    },
    "/menu": "/menu",
    "/reserveren": {
      nl: "/reserveren",
      en: "/reservations",
      fr: "/reservations",
    },
    "/groepen": {
      nl: "/groepen",
      en: "/groups",
      fr: "/groupes",
    },
    "/jobs": "/jobs",
    "/contact": "/contact",
    "/faq": "/faq",
  },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];
