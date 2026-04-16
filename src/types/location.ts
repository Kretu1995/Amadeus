export type LocationSlug =
  | "gent-1"
  | "gent-2"
  | "brussel"
  | "antwerpen"
  | "lozer"
  | "brugge";

export interface OpeningHours {
  monday: { open: string; close: string } | null;
  tuesday: { open: string; close: string } | null;
  wednesday: { open: string; close: string } | null;
  thursday: { open: string; close: string } | null;
  friday: { open: string; close: string } | null;
  saturday: { open: string; close: string } | null;
  sunday: { open: string; close: string } | null;
}

export interface Address {
  street: string;
  postalCode: string;
  city: string;
  country: "BE";
}

export interface Location {
  id: string;
  slug: LocationSlug;
  nameKey: string;
  shortName: string;
  address: Address;
  phone: string;
  coordinates: { lat: number; lng: number };
  openingHours: OpeningHours;
  capacity: number;
  groupMinSize: number;
  heroImage: string;
  galleryImages: string[];
  features: string[];
  isReopening: boolean;
  reopeningYear?: string;
  googleMapsUrl: string;
  city: string;
}
