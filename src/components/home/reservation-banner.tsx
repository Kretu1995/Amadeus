"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { fadeUp, staggerContainer } from "@/lib/motion-variants";

export function ReservationBanner() {
  const t = useTranslations("reservationBanner");

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background with warm tint */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: "url('/images/locations/interior-atmosphere.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="text-center"
        >
          <motion.h2
            variants={fadeUp}
            className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            {t("title")}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-lg text-white/70 mb-8"
          >
            {t("subtitle")}
          </motion.p>
          <motion.div variants={fadeUp}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block"
            >
              <Link
                href="/reserveren"
                className="inline-flex items-center px-10 py-4 bg-primary text-primary-foreground text-lg font-bold rounded-md hover:bg-primary/90 transition-all shadow-xl shadow-primary/30 glow-primary"
              >
                {t("cta")}
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
