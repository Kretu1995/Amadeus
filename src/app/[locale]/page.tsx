import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/home/hero-section";
import { ConceptStrip } from "@/components/home/concept-strip";
import { RibsShowcase } from "@/components/home/ribs-showcase";
import { LocationsOverview } from "@/components/home/locations-overview";
import { TestimonialsCarousel } from "@/components/home/testimonials-carousel";
import { GroupDiningCTA } from "@/components/home/group-dining-cta";
import { ReservationBanner } from "@/components/home/reservation-banner";
import { StructuredData } from "@/components/shared/structured-data";
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
} from "@/lib/structured-data";
import { generatePageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return generatePageMetadata({
    locale,
    title: "Amadeus - The Original Place for Ribs",
    description:
      "Belgium's iconic all-you-can-eat spareribs restaurant. Five unique locations in Ghent, Brussels, Antwerp and Lozer. Book your table now.",
    path: "",
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <StructuredData data={generateOrganizationSchema()} />
      <StructuredData data={generateWebSiteSchema()} />
      <HeroSection />
      <ConceptStrip />
      <RibsShowcase />
      <LocationsOverview />
      <TestimonialsCarousel />
      <GroupDiningCTA />
      <ReservationBanner />
    </>
  );
}
