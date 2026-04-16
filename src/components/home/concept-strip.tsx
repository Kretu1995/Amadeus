"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Flame, MapPin, Clock } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/motion-variants";

const concepts = [
  { icon: Flame, titleKey: "ribs", descKey: "ribsDesc" },
  { icon: MapPin, titleKey: "locations", descKey: "locationsDesc" },
  { icon: Clock, titleKey: "heritage", descKey: "heritageDesc" },
] as const;

export function ConceptStrip() {
  const t = useTranslations("concept");

  return (
    <section className="relative py-16 md:py-20 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
        >
          {concepts.map(({ icon: Icon, titleKey, descKey }) => (
            <motion.div
              key={titleKey}
              variants={fadeUp}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
                <Icon size={24} className="text-primary" />
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                {t(titleKey)}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                {t(descKey)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
