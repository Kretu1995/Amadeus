import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/shared/page-hero";
import { LocationsOverview } from "@/components/home/locations-overview";
import { ReservationBanner } from "@/components/home/reservation-banner";
import { generatePageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "locations.meta" });
  return generatePageMetadata({
    locale,
    title: t("title"),
    description: t("description"),
    path: "/locaties",
  });
}

export default async function LocationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "locations" });

  return (
    <>
      <PageHero title={t("heroTitle")} subtitle={t("heroSubtitle")} />
      <LocationsOverview />
      <ReservationBanner />
    </>
  );
}
