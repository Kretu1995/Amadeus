export const SITE_URL = "https://amadeus-resto.be";
export const SITE_NAME = "Amadeus Restaurant";
export const BRAND_TAGLINE = "The Original Place for Ribs";

export const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/AmadeusResto",
  instagram: "https://www.instagram.com/amadeus_resto",
  tripadvisor: "https://www.tripadvisor.com/Restaurant_Review-Amadeus",
} as const;

export const RESERVATION_PHONE_CUTOFF = "17:00";

export const NAV_ITEMS = [
  { href: "/", labelKey: "nav.home" },
  { href: "/over-ons", labelKey: "nav.about" },
  { href: "/locaties", labelKey: "nav.locations" },
  { href: "/menu", labelKey: "nav.menu" },
  { href: "/groepen", labelKey: "nav.groups" },
  { href: "/reserveren", labelKey: "nav.reserve" },
] as const;

export const FOOTER_NAV = [
  { href: "/over-ons", labelKey: "nav.about" },
  { href: "/locaties", labelKey: "nav.locations" },
  { href: "/menu", labelKey: "nav.menu" },
  { href: "/groepen", labelKey: "nav.groups" },
  { href: "/reserveren", labelKey: "nav.reserve" },
  { href: "/jobs", labelKey: "nav.jobs" },
  { href: "/contact", labelKey: "nav.contact" },
  { href: "/faq", labelKey: "nav.faq" },
] as const;
