import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { locations, getLocationBySlug } from "@/data/locations";
import { PageHero } from "@/components/shared/page-hero";
import { AnimatedSection } from "@/components/shared/animated-section";
import { StructuredData } from "@/components/shared/structured-data";
import { generateRestaurantSchema } from "@/lib/structured-data";
import { generatePageMetadata } from "@/lib/metadata";
import { MapPin, Phone, Clock, ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Link as I18nLink } from "@/i18n/navigation";

export function generateStaticParams() {
  return locations.map((location) => ({ slug: location.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const location = getLocationBySlug(slug);
  if (!location) return {};

  const t = await getTranslations({ locale, namespace: "locations" });
  const slugKey = slug.replace("-", "") as string;

  // Map slug to correct translation key
  const keyMap: Record<string, string> = {
    "gent-1": "gent1",
    "gent-2": "gent2",
    brussel: "brussel",
    antwerpen: "antwerpen",
    lozer: "lozer",
    brugge: "brugge",
  };
  const tKey = keyMap[slug] || slugKey;

  return generatePageMetadata({
    locale,
    title: `${t(`${tKey}.name`)} - Ribs Restaurant ${location.address.city}`,
    description: t(`${tKey}.description`).slice(0, 160),
    path: `/locaties/${slug}`,
  });
}

const dayKeys = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

export default async function LocationDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const location = getLocationBySlug(slug);
  if (!location) notFound();

  const t = await getTranslations({ locale, namespace: "locations" });
  const tc = await getTranslations({ locale, namespace: "common" });

  const keyMap: Record<string, string> = {
    "gent-1": "gent1",
    "gent-2": "gent2",
    brussel: "brussel",
    antwerpen: "antwerpen",
    lozer: "lozer",
    brugge: "brugge",
  };
  const tKey = keyMap[slug] || slug;

  return (
    <>
      <StructuredData
        data={generateRestaurantSchema(location, locale)}
      />

      <PageHero
        title={t(`${tKey}.name`)}
        subtitle={t(`${tKey}.features`)}
        backgroundImage={location.heroImage}
      />

      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <AnimatedSection>
            <I18nLink
              href="/locaties"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              &larr; {tc("backToLocations")}
            </I18nLink>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <AnimatedSection>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
                  {t(`${tKey}.name`)}
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  {t(`${tKey}.description`)}
                </p>
              </AnimatedSection>

              {/* Gallery Placeholder */}
              {location.galleryImages.length > 0 && (
                <AnimatedSection>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                    {location.galleryImages.map((img, i) => (
                      <div
                        key={i}
                        className="aspect-[4/3] rounded-lg overflow-hidden bg-muted"
                        style={{
                          backgroundImage: `url('${img}')`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      >
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground/30 text-xs">
                          Interior {i + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                </AnimatedSection>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Practical Info Card */}
              <AnimatedSection>
                <div className="p-6 rounded-lg bg-card border border-border">
                  {/* Address */}
                  <div className="flex gap-3 mb-5">
                    <MapPin size={20} className="text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-semibold text-foreground mb-1">
                        {t("address")}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {location.address.street}
                        <br />
                        {location.address.postalCode} {location.address.city}
                      </p>
                      <a
                        href={location.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-accent mt-1 hover:underline"
                      >
                        {t("viewOnMap")} <ExternalLink size={10} />
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  {location.phone && (
                    <div className="flex gap-3 mb-5">
                      <Phone size={20} className="text-primary shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-sm font-semibold text-foreground mb-1">
                          {t("phone")}
                        </h3>
                        <a
                          href={`tel:${location.phone.replace(/\s/g, "")}`}
                          className="text-sm text-muted-foreground hover:text-foreground"
                        >
                          {location.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Opening Hours */}
                  <div className="flex gap-3">
                    <Clock size={20} className="text-primary shrink-0 mt-0.5" />
                    <div className="w-full">
                      <h3 className="text-sm font-semibold text-foreground mb-2">
                        {t("openingHours")}
                      </h3>
                      <div className="space-y-1">
                        {dayKeys.map((day) => {
                          const hours =
                            location.openingHours[day as keyof typeof location.openingHours];
                          return (
                            <div
                              key={day}
                              className="flex justify-between text-xs"
                            >
                              <span className="text-muted-foreground">
                                {tc(`days.${day}`)}
                              </span>
                              <span
                                className={
                                  hours
                                    ? "text-foreground"
                                    : "text-muted-foreground"
                                }
                              >
                                {hours
                                  ? `${hours.open} - ${hours.close}`
                                  : t("closed")}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Reserve CTA */}
              <AnimatedSection>
                <I18nLink
                  href="/reserveren"
                  className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                >
                  {t("reserveHere")}
                  <ArrowRight size={16} />
                </I18nLink>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
