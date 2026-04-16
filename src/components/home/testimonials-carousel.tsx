"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/shared/section-heading";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { premiumEase } from "@/lib/motion-variants";

export function TestimonialsCarousel() {
  const t = useTranslations("testimonials");
  const [current, setCurrent] = useState(0);

  const items = [0, 1, 2, 3].map((i) => ({
    quote: t(`items.${i}.quote`),
    author: t(`items.${i}.author`),
    location: t(`items.${i}.location`),
  }));

  const next = () => setCurrent((c) => (c + 1) % items.length);
  const prev = () => setCurrent((c) => (c - 1 + items.length) % items.length);

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading overline={t("overline")} title={t("title")} />

        <div className="max-w-3xl mx-auto relative">
          <div className="min-h-[200px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: premiumEase }}
                className="text-center"
              >
                <Quote
                  size={40}
                  className="text-primary/30 mx-auto mb-6"
                />
                <blockquote className="text-lg md:text-xl text-foreground leading-relaxed mb-6 italic">
                  &ldquo;{items[current].quote}&rdquo;
                </blockquote>
                <div>
                  <p className="font-semibold text-foreground">
                    {items[current].author}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Amadeus {items[current].location}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-2 rounded-full border border-border hover:border-primary/50 hover:bg-primary/10 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} className="text-foreground" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === current
                      ? "bg-primary w-6"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-2 rounded-full border border-border hover:border-primary/50 hover:bg-primary/10 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} className="text-foreground" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
