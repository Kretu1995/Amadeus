import type { Location } from "@/types/location";
import { SITE_URL, SITE_NAME } from "./constants";

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo/amadeus-logo.svg`,
    description:
      "Belgium's iconic all-you-can-eat spareribs restaurant with five unique locations.",
    foundingDate: "1998",
    sameAs: [
      "https://www.facebook.com/AmadeusResto",
      "https://www.instagram.com/amadeus_resto",
    ],
  };
}

export function generateRestaurantSchema(location: Location, locale: string) {
  const dayMapping: Record<string, string> = {
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday",
  };

  const openingHoursSpecification = Object.entries(location.openingHours)
    .filter(([, hours]) => hours !== null)
    .map(([day, hours]) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: dayMapping[day],
      opens: hours!.open,
      closes: hours!.close,
    }));

  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: location.shortName
      ? `Amadeus ${location.shortName}`
      : `Amadeus ${location.city}`,
    url: `${SITE_URL}/${locale === "nl" ? "" : locale + "/"}locaties/${location.slug}`,
    telephone: location.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: location.address.street,
      addressLocality: location.address.city,
      postalCode: location.address.postalCode,
      addressCountry: "BE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: location.coordinates.lat,
      longitude: location.coordinates.lng,
    },
    openingHoursSpecification,
    servesCuisine: ["Ribs", "Belgian", "Grill"],
    priceRange: "$$",
    image: `${SITE_URL}${location.heroImage}`,
    menu: `${SITE_URL}/menu`,
    acceptsReservations: "True",
    currenciesAccepted: "EUR",
    paymentAccepted: "Cash, Credit Card",
  };
}

export function generateFAQSchema(
  items: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}
