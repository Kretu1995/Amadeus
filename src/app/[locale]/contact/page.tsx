import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/shared/page-hero";
import { AnimatedSection } from "@/components/shared/animated-section";
import { generatePageMetadata } from "@/lib/metadata";
import { locations } from "@/data/locations";
import { MapPin, Phone } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact.meta" });
  return generatePageMetadata({
    locale,
    title: t("title"),
    description: t("description"),
    path: "/contact",
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contact" });
  const activeLocations = locations.filter((l) => !l.isReopening);

  return (
    <>
      <PageHero title={t("heroTitle")} subtitle={t("heroSubtitle")} />

      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <AnimatedSection>
              <div>
                <form className="space-y-5">
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
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      {t("form.subject")}
                    </label>
                    <select className="w-full px-4 py-3 rounded-md bg-card border border-border text-foreground text-sm focus:border-primary focus:ring-1 focus:ring-primary">
                      {["general", "feedback", "complaint", "group", "website"].map(
                        (key) => (
                          <option key={key} value={key}>
                            {t(`form.subjects.${key}`)}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      {t("form.message")}
                    </label>
                    <textarea
                      rows={5}
                      required
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
              </div>
            </AnimatedSection>

            {/* Locations Info */}
            <AnimatedSection>
              <div>
                <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
                  {t("info.title")}
                </h2>
                <div className="space-y-5">
                  {activeLocations.map((location) => (
                    <div
                      key={location.id}
                      className="p-4 rounded-lg bg-card border border-border"
                    >
                      <h3 className="font-heading text-base font-bold text-foreground mb-2">
                        {location.shortName}
                      </h3>
                      <div className="flex items-start gap-2 mb-1">
                        <MapPin
                          size={14}
                          className="text-primary mt-0.5 shrink-0"
                        />
                        <p className="text-sm text-muted-foreground">
                          {location.address.street}, {location.address.postalCode}{" "}
                          {location.address.city}
                        </p>
                      </div>
                      {location.phone && (
                        <div className="flex items-center gap-2">
                          <Phone
                            size={14}
                            className="text-primary shrink-0"
                          />
                          <a
                            href={`tel:${location.phone.replace(/\s/g, "")}`}
                            className="text-sm text-muted-foreground hover:text-foreground"
                          >
                            {location.phone}
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
