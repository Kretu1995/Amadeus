import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/shared/page-hero";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionHeading } from "@/components/shared/section-heading";
import { ReservationBanner } from "@/components/home/reservation-banner";
import { generatePageMetadata } from "@/lib/metadata";
import { UtensilsCrossed, Flame, Star, Heart } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about.meta" });
  return generatePageMetadata({
    locale,
    title: t("title"),
    description: t("description"),
    path: "/over-ons",
  });
}

const valueIcons = [UtensilsCrossed, Flame, Star, Heart];
const valueKeys = ["generous", "atmosphere", "quality", "accessible"] as const;

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "about" });

  return (
    <>
      <PageHero title={t("heroTitle")} subtitle={t("heroSubtitle")} />

      {/* Origin Story */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <p className="text-accent text-sm font-semibold uppercase tracking-[0.2em] mb-4">
              {t("origin.overline")}
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8">
              {t("origin.title")}
            </h2>
            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
              <p>{t("origin.p1")}</p>
              <p>{t("origin.p2")}</p>
              <p>{t("origin.p3")}</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Quote */}
      <section className="py-16 bg-card border-y border-border">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <AnimatedSection>
            <blockquote className="font-heading text-2xl md:text-3xl text-foreground italic leading-relaxed">
              {t("quote")}
            </blockquote>
          </AnimatedSection>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            overline={t("values.overline")}
            title={t("values.title")}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {valueKeys.map((key, i) => {
              const Icon = valueIcons[i];
              return (
                <AnimatedSection key={key}>
                  <div className="p-6 rounded-lg bg-card border border-border hover:border-primary/20 transition-colors text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                      <Icon size={22} className="text-primary" />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                      {t(`values.${key}.title`)}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {t(`values.${key}.description`)}
                    </p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      <ReservationBanner />
    </>
  );
}
