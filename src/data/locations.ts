import type { Location } from "@/types/location";

const defaultHours = {
  monday: null,
  tuesday: { open: "18:00", close: "22:30" },
  wednesday: { open: "18:00", close: "22:30" },
  thursday: { open: "18:00", close: "22:30" },
  friday: { open: "18:00", close: "23:00" },
  saturday: { open: "18:00", close: "23:00" },
  sunday: { open: "12:00", close: "22:00" },
};

export const locations: Location[] = [
  {
    id: "gent-1",
    slug: "gent-1",
    nameKey: "locations.gent1.name",
    shortName: "Gent Patershol",
    address: {
      street: "Plotersgracht 8-10",
      postalCode: "9000",
      city: "Gent",
      country: "BE",
    },
    phone: "+32 497 43 85 71",
    coordinates: { lat: 51.0579, lng: 3.7197 },
    openingHours: defaultHours,
    capacity: 120,
    groupMinSize: 40,
    heroImage: "/images/locations/gent-1-front.jpg",
    galleryImages: [
      "/images/locations/gent-1-interior.jpg",
      "/images/locations/gent-1-interior2.jpg",
    ],
    features: ["historic-building", "terrace", "original-location"],
    isReopening: false,
    googleMapsUrl:
      "https://www.google.com/maps/place/Plotersgracht+8,+9000+Gent",
    city: "Gent",
    bookingUrl:
      "https://book.restomanager.net/reservations/68308785da78d100d97e9294",
  },
  {
    id: "gent-2",
    slug: "gent-2",
    nameKey: "locations.gent2.name",
    shortName: "Gent Belfort",
    address: {
      street: "Gouden Leeuwplein 7",
      postalCode: "9000",
      city: "Gent",
      country: "BE",
    },
    phone: "+32 497 49 51 05",
    coordinates: { lat: 51.0535, lng: 3.7254 },
    openingHours: defaultHours,
    capacity: 150,
    groupMinSize: 40,
    heroImage: "/images/locations/gent-2-front.jpg",
    galleryImages: [
      "/images/locations/gent-2-interior.jpg",
      "/images/locations/gent-2-interior2.jpg",
    ],
    features: ["belfort-view", "large-capacity", "city-center"],
    isReopening: false,
    googleMapsUrl:
      "https://www.google.com/maps/place/Gouden+Leeuwplein+7,+9000+Gent",
    city: "Gent",
    bookingUrl:
      "https://book.restomanager.net/reservations/683087e6e565bde6a9d34e4f",
  },
  {
    id: "brussel",
    slug: "brussel",
    nameKey: "locations.brussel.name",
    shortName: "Brussel",
    address: {
      street: "Sint-Katelijnestraat 26",
      postalCode: "1000",
      city: "Brussel",
      country: "BE",
    },
    phone: "+32 495 16 77 53",
    coordinates: { lat: 50.8524, lng: 4.3462 },
    openingHours: defaultHours,
    capacity: 100,
    groupMinSize: 40,
    heroImage: "/images/locations/brussel-front.jpg",
    galleryImages: [
      "/images/locations/brussel-interior.jpg",
      "/images/locations/brussel-interior2.jpg",
    ],
    features: ["city-center", "near-grand-place"],
    isReopening: false,
    googleMapsUrl:
      "https://www.google.com/maps/place/Sint-Katelijnestraat+26,+1000+Brussel",
    city: "Brussel",
    bookingUrl:
      "https://book.restomanager.net/reservations/68308851da78d100d97e92be",
  },
  {
    id: "antwerpen",
    slug: "antwerpen",
    nameKey: "locations.antwerpen.name",
    shortName: "Antwerpen",
    address: {
      street: "Suikerrui 9",
      postalCode: "2000",
      city: "Antwerpen",
      country: "BE",
    },
    phone: "+32 490 64 39 74",
    coordinates: { lat: 51.2211, lng: 4.3997 },
    openingHours: defaultHours,
    capacity: 130,
    groupMinSize: 40,
    heroImage: "/images/locations/antwerpen-front.jpg",
    galleryImages: [
      "/images/locations/antwerpen-interior.jpg",
      "/images/locations/antwerpen-interior2.jpg",
    ],
    features: ["cathedral-view", "near-sportpaleis", "city-center"],
    isReopening: false,
    googleMapsUrl:
      "https://www.google.com/maps/place/Suikerrui+9,+2000+Antwerpen",
    city: "Antwerpen",
    bookingUrl:
      "https://book.restomanager.net/reservations/683088937b173eeea2c37df3",
  },
  {
    id: "lozer",
    slug: "lozer",
    nameKey: "locations.lozer.name",
    shortName: "Lozer",
    address: {
      street: "Lozerstraat 5",
      postalCode: "9770",
      city: "Kruishoutem",
      country: "BE",
    },
    phone: "+32 497 43 85 71",
    coordinates: { lat: 50.9167, lng: 3.5167 },
    openingHours: {
      monday: null,
      tuesday: null,
      wednesday: null,
      thursday: { open: "18:00", close: "22:30" },
      friday: { open: "18:00", close: "23:00" },
      saturday: { open: "18:00", close: "23:00" },
      sunday: { open: "12:00", close: "22:00" },
    },
    capacity: 200,
    groupMinSize: 40,
    heroImage: "/images/locations/lozer-front.jpg",
    galleryImages: [
      "/images/locations/lozer-interior.jpg",
    ],
    features: ["countryside", "large-capacity", "parking", "garden"],
    isReopening: false,
    googleMapsUrl:
      "https://www.google.com/maps/place/Lozerstraat+5,+9770+Kruishoutem",
    city: "Kruishoutem",
    bookingUrl:
      "https://book.restomanager.net/reservations/683088d17b173eeea2c37e08",
  },
  {
    id: "brugge",
    slug: "brugge",
    nameKey: "locations.brugge.name",
    shortName: "Brugge",
    address: {
      street: "Sint-Amandsstraat 5",
      postalCode: "8000",
      city: "Brugge",
      country: "BE",
    },
    phone: "",
    coordinates: { lat: 51.2093, lng: 3.2247 },
    openingHours: {
      monday: null,
      tuesday: null,
      wednesday: null,
      thursday: null,
      friday: null,
      saturday: null,
      sunday: null,
    },
    capacity: 0,
    groupMinSize: 40,
    heroImage: "/images/locations/exterior-1.jpg",
    galleryImages: [],
    features: ["historic-city", "reopening-2026"],
    isReopening: true,
    reopeningYear: "2026",
    googleMapsUrl:
      "https://www.google.com/maps/place/Sint-Amandsstraat+5,+8000+Brugge",
    city: "Brugge",
  },
];

export function getLocationBySlug(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}

export function getActiveLocations(): Location[] {
  return locations.filter((l) => !l.isReopening);
}
