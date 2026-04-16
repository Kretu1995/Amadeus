"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion-variants";

interface SectionHeadingProps {
  overline?: string;
  title: string;
  subtitle?: string;
  alignment?: "left" | "center";
  theme?: "light" | "dark";
}

export function SectionHeading({
  overline,
  title,
  subtitle,
  alignment = "center",
  theme = "dark",
}: SectionHeadingProps) {
  const textAlign = alignment === "center" ? "text-center" : "text-left";
  const mx = alignment === "center" ? "mx-auto" : "";
  const textColor =
    theme === "dark" ? "text-foreground" : "text-background";
  const mutedColor =
    theme === "dark" ? "text-muted-foreground" : "text-background/70";
  const accentColor = "text-amber-gold";

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={`${textAlign} mb-12 md:mb-16`}
    >
      {overline && (
        <motion.p
          variants={fadeUp}
          className={`${accentColor} text-sm font-semibold uppercase tracking-[0.2em] mb-4`}
        >
          {overline}
        </motion.p>
      )}
      <motion.h2
        variants={fadeUp}
        className={`font-heading text-3xl md:text-4xl lg:text-5xl font-bold ${textColor} mb-4`}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeUp}
          className={`text-lg md:text-xl ${mutedColor} max-w-2xl ${mx} leading-relaxed`}
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        variants={fadeUp}
        className={`mt-6 h-px w-16 bg-primary ${mx} ${alignment === "center" ? "" : ""}`}
      />
    </motion.div>
  );
}
