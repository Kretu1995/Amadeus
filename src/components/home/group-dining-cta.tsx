"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { fadeUp, slideInLeft, slideInRight } from "@/lib/motion-variants";
import { Users, UtensilsCrossed, MapPin, HeartHandshake } from "lucide-react";

const featureIcons = [Users, UtensilsCrossed, MapPin, HeartHandshake];

export function GroupDiningCTA() {
  const t = useTranslations("groupDining");

  const features: string[] = t.raw("features");

  return (
    <section className="py-20 md:py-28 bg-card relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero/ribs-hero-1.jpg')" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <p className="text-accent text-sm font-semibold uppercase tracking-[0.2em] mb-4">
              {t("overline")}
            </p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              {t("title")}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              {t("description")}
            </p>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/groepen"
                className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
              >
                {t("cta")}
              </Link>
            </motion.div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 gap-4"
          >
            {features.map((feature: string, i: number) => {
              const Icon = featureIcons[i] || Users;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="p-5 rounded-lg bg-muted/50 border border-border hover:border-primary/20 transition-colors"
                >
                  <Icon size={24} className="text-primary mb-3" />
                  <p className="text-sm font-medium text-foreground">
                    {feature}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
