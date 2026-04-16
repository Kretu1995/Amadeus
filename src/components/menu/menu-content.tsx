"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { menuItems } from "@/data/menu";
import type { MenuCategory } from "@/types/menu";
import { fadeUp, staggerContainer, premiumEase } from "@/lib/motion-variants";
import { Flame, Leaf, ChevronLeft, ChevronRight } from "lucide-react";

const categories: { key: MenuCategory }[] = [
  { key: "ribs" },
  { key: "grill" },
  { key: "starters" },
  { key: "salads" },
  { key: "desserts" },
  { key: "drinks" },
];

export function MenuContent() {
  const t = useTranslations("menu");
  const [activePage, setActivePage] = useState(0);
  const activeCategory = categories[activePage].key;
  const filteredItems = menuItems.filter(
    (item) => item.category === activeCategory
  );

  const prevPage = () => setActivePage((p) => Math.max(0, p - 1));
  const nextPage = () =>
    setActivePage((p) => Math.min(categories.length - 1, p + 1));

  return (
    <section className="py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Book Container */}
        <div className="relative">
          {/* Book shadow */}
          <div className="absolute -inset-3 bg-black/30 rounded-2xl blur-2xl" />

          {/* Book cover */}
          <div
            className="relative rounded-xl overflow-hidden"
            style={{
              background:
                "linear-gradient(145deg, hsl(25, 30%, 12%) 0%, hsl(20, 25%, 8%) 50%, hsl(20, 20%, 6%) 100%)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.05), 0 4px 30px rgba(0,0,0,0.5)",
            }}
          >
            {/* Book spine effect - left edge */}
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-r from-black/40 to-transparent z-10" />
            <div className="absolute left-2 top-0 bottom-0 w-px bg-amber-gold/20 z-10" />

            {/* Decorative top border */}
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-amber-gold/40 to-transparent" />

            {/* Inner page area */}
            <div className="px-6 sm:px-10 md:px-16 py-10 md:py-14">
              {/* Top ornament */}
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-gold/30" />
                <div className="w-2 h-2 rotate-45 border border-amber-gold/40" />
                <span className="text-amber-gold/60 text-xs font-semibold uppercase tracking-[0.3em] px-3">
                  Amadeus
                </span>
                <div className="w-2 h-2 rotate-45 border border-amber-gold/40" />
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-gold/30" />
              </div>

              {/* Category Title */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, rotateY: -8 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  exit={{ opacity: 0, rotateY: 8 }}
                  transition={{ duration: 0.4, ease: premiumEase }}
                >
                  <h3 className="font-heading text-3xl md:text-4xl font-bold text-center text-foreground mb-2">
                    {t(`categories.${activeCategory}`)}
                  </h3>
                  <div className="flex items-center justify-center gap-4 mb-10">
                    <div className="h-px w-12 bg-primary/40" />
                    <Flame size={14} className="text-primary/50" />
                    <div className="h-px w-12 bg-primary/40" />
                  </div>

                  {/* Menu Items */}
                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="space-y-0"
                  >
                    {filteredItems.map((item, index) => {
                      const itemKey = item.nameKey
                        .replace("menu.items.", "")
                        .replace(".name", "");
                      return (
                        <motion.div
                          key={item.id}
                          variants={fadeUp}
                          className="group"
                        >
                          <div
                            className={`py-4 ${
                              index < filteredItems.length - 1
                                ? "border-b border-dashed border-border/40"
                                : ""
                            }`}
                          >
                            <div className="flex justify-between items-baseline gap-3">
                              {/* Name + badges */}
                              <div className="flex items-center gap-2 min-w-0">
                                <h4 className="font-heading text-lg font-semibold text-foreground truncate group-hover:text-accent transition-colors">
                                  {t(`items.${itemKey}.name`)}
                                </h4>
                                {item.isSignature && (
                                  <Flame
                                    size={14}
                                    className="text-primary shrink-0"
                                  />
                                )}
                                {item.dietary.includes("vegetarian") && (
                                  <Leaf
                                    size={12}
                                    className="text-green-500 shrink-0"
                                  />
                                )}
                              </div>

                              {/* Dotted line filler */}
                              <div className="flex-1 border-b border-dotted border-muted-foreground/20 mx-2 mb-1 min-w-[40px]" />

                              {/* Price */}
                              <div className="shrink-0 text-right">
                                {item.isAllYouCanEat ? (
                                  <span className="text-xs font-bold text-primary uppercase tracking-wider whitespace-nowrap">
                                    {t("allYouCanEat")}
                                  </span>
                                ) : item.price ? (
                                  <span className="font-heading text-lg font-bold text-accent">
                                    &euro;{item.price.toFixed(2)}
                                  </span>
                                ) : null}
                              </div>
                            </div>

                            {/* Description */}
                            <p className="text-sm text-muted-foreground mt-1 leading-relaxed pr-8 italic">
                              {t(`items.${itemKey}.description`)}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              {/* Bottom ornament */}
              <div className="flex items-center justify-center gap-3 mt-10">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-gold/30" />
                <div className="w-1.5 h-1.5 rotate-45 bg-amber-gold/30" />
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-gold/30" />
              </div>

              {/* Page navigation */}
              <div className="flex items-center justify-between mt-8">
                <button
                  onClick={prevPage}
                  disabled={activePage === 0}
                  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={16} />
                  <span className="hidden sm:inline">
                    {activePage > 0
                      ? t(`categories.${categories[activePage - 1].key}`)
                      : ""}
                  </span>
                </button>

                {/* Page dots */}
                <div className="flex items-center gap-2">
                  {categories.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActivePage(i)}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        i === activePage
                          ? "bg-accent w-4"
                          : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                      }`}
                      aria-label={`Page ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextPage}
                  disabled={activePage === categories.length - 1}
                  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <span className="hidden sm:inline">
                    {activePage < categories.length - 1
                      ? t(
                          `categories.${categories[activePage + 1].key}`
                        )
                      : ""}
                  </span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Decorative bottom border */}
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-amber-gold/40 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
