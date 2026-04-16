import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/shared/page-hero";
import { FaqAccordion } from "@/components/faq/faq-accordion";
import { StructuredData } from "@/components/shared/structured-data";
import { generateFAQSchema } from "@/lib/structured-data";
import { generatePageMetadata } from "@/lib/metadata";
import { faqItems } from "@/data/faq";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faq.meta" });
  return generatePageMetadata({
    locale,
    title: t("title"),
    description: t("description"),
    path: "/faq",
  });
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "faq" });

  // Build FAQ schema data
  const faqSchemaItems = faqItems.map((item) => ({
    question: t(item.questionKey.replace("faq.", "")),
    answer: t(item.answerKey.replace("faq.", "")),
  }));

  return (
    <>
      <StructuredData data={generateFAQSchema(faqSchemaItems)} />
      <PageHero title={t("heroTitle")} subtitle={t("heroSubtitle")} />
      <section className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FaqAccordion />
        </div>
      </section>
    </>
  );
}
