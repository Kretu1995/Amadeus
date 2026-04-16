"use client";

import { motion, type Variants } from "framer-motion";
import { fadeUp, fadeIn, slideInLeft, slideInRight, staggerContainer } from "@/lib/motion-variants";

interface AnimatedSectionProps {
  children: React.ReactNode;
  variant?: "fadeUp" | "fadeIn" | "slideInLeft" | "slideInRight" | "staggerChildren";
  delay?: number;
  className?: string;
}

const variantMap: Record<string, Variants> = {
  fadeUp,
  fadeIn,
  slideInLeft,
  slideInRight,
  staggerChildren: staggerContainer,
};

export function AnimatedSection({
  children,
  variant = "fadeUp",
  className,
}: AnimatedSectionProps) {
  return (
    <motion.div
      variants={variantMap[variant]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
