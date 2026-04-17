"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { heroTextReveal, heroStagger } from "@/lib/motion-variants";
import { ChevronDown } from "lucide-react";

export function HeroSection() {
  const t = useTranslations("hero");
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[600px] sm:min-h-[700px] h-[100svh] flex items-center justify-center overflow-hidden"
    >
      {/* Parallax Background */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 scale-110"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/images/menu/spareribs-classic.jpg')`,
          }}
        />
        {/* Dark warm overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-background" />
        {/* Warm color tint */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-amber-900/10" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
      >
        <motion.div
          variants={heroStagger}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Overline */}
          <motion.div
            variants={heroTextReveal}
            className="flex items-center justify-center gap-3"
          >
            <div className="h-px w-8 bg-accent" />
            <span className="text-accent text-sm font-semibold uppercase tracking-[0.3em]">
              Since 1998
            </span>
            <div className="h-px w-8 bg-accent" />
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={heroTextReveal}
            className="font-heading text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white text-shadow-hero leading-[1.1]"
          >
            {t("tagline")}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={heroTextReveal}
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed"
          >
            {t("subtitle")}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={heroTextReveal}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 pt-4 max-w-md sm:max-w-none mx-auto"
          >
            <Link
              href="/reserveren"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground text-base font-semibold rounded-md hover:bg-primary/90 transition-all shadow-lg shadow-primary/30 hover:shadow-primary/50"
            >
              {t("cta")}
            </Link>
            <Link
              href="/menu"
              className="inline-flex items-center justify-center px-8 py-4 border border-white/30 text-white text-base font-semibold rounded-md hover:bg-white/10 hover:border-white/50 transition-all"
            >
              {t("ctaMenu")}
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-white/50 text-xs uppercase tracking-widest">
          {t("scrollHint")}
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown size={20} className="text-white/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
