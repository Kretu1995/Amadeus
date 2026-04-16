"use client";

import { motion } from "framer-motion";
import { heroTextReveal, heroStagger } from "@/lib/motion-variants";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
}

export function PageHero({
  title,
  subtitle,
  backgroundImage = "/images/locations/interior-atmosphere.jpg",
}: PageHeroProps) {
  return (
    <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="absolute inset-0 gradient-overlay-heavy" />

      {/* Content */}
      <motion.div
        variants={heroStagger}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
      >
        <motion.h1
          variants={heroTextReveal}
          className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground text-shadow-hero mb-4"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            variants={heroTextReveal}
            className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        )}
      </motion.div>
    </section>
  );
}
