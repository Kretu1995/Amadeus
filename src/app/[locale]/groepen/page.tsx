import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/shared/page-hero";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionHeading } from "@/components/shared/section-heading";
import { generatePageMetadata } from "@/lib/metadata";
import { Users, UtensilsCrossed, MapPin, HeartHandshake } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "groups.meta" });
  return generatePageMetadata({
    locale,
    title: t("title"),
    description: t("description"),
    path: "/groepen",
  });
}

const featureKeys = ["capacity", "menus", "locations", "service"] as const;
const featureIcons = [Users, UtensilsCrossed, MapPin, HeartHandshake];

export default async function GroupsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "groups" });

  return (
    <>
      <PageHero title={t("heroTitle")} subtitle={t("heroSubtitle")} />

      {/* Intro */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
              {t("intro.title")}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              {t("intro.description")}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={t("features.title")} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featureKeys.map((key, i) => {
              const Icon = featureIcons[i];
              return (
                <AnimatedSection key={key}>
                  <div className="p-6 rounded-lg bg-background border border-border text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                      <Icon size={22} className="text-primary" />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                      {t(`features.${key}.title`)}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {t(`features.${key}.description`)}
                    </p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 md:py-28">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              {t("form.title")}
            </h2>
            <form className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    {t("form.name")}
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-md bg-card border border-border text-foreground text-sm focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    {t("form.email")}
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-md bg-card border border-border text-foreground text-sm focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    {t("form.phone")}
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 rounded-md bg-card border border-border text-foreground text-sm focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    {t("form.guests")}
                  </label>
                  <input
                    type="number"
                    min="10"
                    className="w-full px-4 py-3 rounded-md bg-card border border-border text-foreground text-sm focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  {t("form.message")}
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 rounded-md bg-card border border-border text-foreground text-sm focus:border-primary focus:ring-1 focus:ring-primary resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full px-8 py-4 bg-primary text-primary-foreground font-bold rounded-md hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
              >
                {t("form.submit")}
              </button>
            </form>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
