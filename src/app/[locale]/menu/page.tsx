import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/shared/page-hero";
import { MenuContent } from "@/components/menu/menu-content";
import { ReservationBanner } from "@/components/home/reservation-banner";
import { generatePageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "menu.meta" });
  return generatePageMetadata({
    locale,
    title: t("title"),
    description: t("description"),
    path: "/menu",
  });
}

export default async function MenuPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "menu" });

  return (
    <>
      <PageHero title={t("heroTitle")} subtitle={t("heroSubtitle")} />

      {/* Signature Ribs Highlight */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-accent text-sm font-semibold uppercase tracking-[0.2em] mb-4">
            {t("signatureOverline")}
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {t("signatureTitle")}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            {t("signatureDescription")}
          </p>
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-lg bg-primary/10 border border-primary/20">
            <span className="font-heading text-2xl font-bold text-primary">
              {t("allYouCanEat")}
            </span>
          </div>
        </div>
      </section>

      <MenuContent />
      <ReservationBanner />
    </>
  );
}
