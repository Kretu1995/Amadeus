import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/shared/page-hero";
import { ReservationForm } from "@/components/reservations/reservation-form";
import { generatePageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "reservations.meta" });
  return generatePageMetadata({
    locale,
    title: t("title"),
    description: t("description"),
    path: "/reserveren",
  });
}

export default async function ReservationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "reservations" });

  return (
    <>
      <PageHero title={t("heroTitle")} subtitle={t("heroSubtitle")} />
      <section className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ReservationForm />

          {/* Notes */}
          <div className="mt-8 space-y-4 text-center">
            <p className="text-sm text-muted-foreground bg-card rounded-lg p-4 border border-border">
              {t("note")}
            </p>
            <p className="text-sm text-muted-foreground">
              {t("walkIn")}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
