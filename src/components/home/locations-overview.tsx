"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { locations } from "@/data/locations";
import { fadeUp, staggerContainer } from "@/lib/motion-variants";
import { SectionHeading } from "@/components/shared/section-heading";
import { MapPin, ArrowRight, Clock } from "lucide-react";

export function LocationsOverview() {
  const t = useTranslations("locationsSection");

  return (
    <section className="py-20 md:py-28 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          overline={t("overline")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {locations.map((location) => (
            <motion.div key={location.id} variants={fadeUp}>
              {location.isReopening ? (
                <div className="group relative rounded-lg overflow-hidden bg-muted/50 border border-border h-full">
                  <div className="aspect-[16/10] relative bg-muted flex items-center justify-center">
                    <div className="text-center p-6">
                      <Clock size={32} className="text-accent mx-auto mb-3" />
                      <p className="font-heading text-lg font-bold text-foreground">
                        {location.shortName}
                      </p>
                      <p className="text-accent text-sm font-medium mt-1">
                        {t("reopening", { year: location.reopeningYear ?? "2026" })}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <Link href={{ pathname: "/locaties/[slug]", params: { slug: location.slug } }}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="group relative rounded-lg overflow-hidden bg-muted/30 border border-border hover:border-primary/30 transition-all h-full"
                  >
                    {/* Image */}
                    <div className="aspect-[16/10] relative overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                        style={{
                          backgroundImage: `url('${location.heroImage}')`,
                          backgroundColor: "hsl(20, 14%, 12%)",
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="font-heading text-lg font-bold text-foreground group-hover:text-accent transition-colors">
                        {location.shortName}
                      </h3>
                      <div className="flex items-center gap-1.5 mt-2 text-muted-foreground text-sm">
                        <MapPin size={14} className="shrink-0" />
                        <span>{location.address.street}, {location.address.city}</span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-3 text-primary text-sm font-medium group-hover:gap-2.5 transition-all">
                        <span>View Restaurant</span>
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* View All CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/locaties"
            className="inline-flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all"
          >
            {t("viewAll")}
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
