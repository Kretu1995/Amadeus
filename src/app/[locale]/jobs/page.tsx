import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/shared/page-hero";
import { AnimatedSection } from "@/components/shared/animated-section";
import { JobApplicationForm } from "@/components/jobs/job-application-form";
import { generatePageMetadata } from "@/lib/metadata";
import { MapPin } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "jobs.meta" });
  return generatePageMetadata({
    locale,
    title: t("title"),
    description: t("description"),
    path: "/jobs",
  });
}

const positionKeys = ["server", "kitchen", "bartender"] as const;

export default async function JobsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "jobs" });

  return (
    <>
      <PageHero title={t("heroTitle")} subtitle={t("heroSubtitle")} />

      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <p className="text-muted-foreground text-lg leading-relaxed mb-12">
              {t("intro")}
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8">
              {t("positions.title")}
            </h2>
          </AnimatedSection>

          <div className="space-y-4">
            {positionKeys.map((key) => (
              <AnimatedSection key={key}>
                <div className="p-6 rounded-lg bg-card border border-border hover:border-primary/20 transition-colors">
                  <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                    {t(`positions.${key}.title`)}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    {t(`positions.${key}.description`)}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-accent">
                    <MapPin size={12} />
                    <span>{t(`positions.${key}.locations`)}</span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Application Form */}
          <AnimatedSection>
            <div className="mt-16 p-8 rounded-lg bg-card border border-border">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-3">
                {t("form.title")}
              </h2>
              <p className="text-muted-foreground text-sm mb-8">
                {t("form.subtitle")}
              </p>
              <JobApplicationForm />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
