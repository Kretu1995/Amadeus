"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { faqItems } from "@/data/faq";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { premiumEase } from "@/lib/motion-variants";

const categoryKeys = [
  "all",
  "reservations",
  "menu",
  "locations",
  "events",
  "practical",
] as const;

export function FaqAccordion() {
  const t = useTranslations("faq");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered =
    activeCategory === "all"
      ? faqItems
      : faqItems.filter((item) => item.category === activeCategory);

  return (
    <div>
      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categoryKeys.map((key) => (
          <button
            key={key}
            onClick={() => {
              setActiveCategory(key);
              setOpenIndex(null);
            }}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-md transition-all",
              activeCategory === key
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            {t(`categories.${key}`)}
          </button>
        ))}
      </div>

      {/* Accordion */}
      <div className="space-y-2">
        {filtered.map((item, index) => {
          const isOpen = openIndex === index;
          const qKey = item.questionKey.replace("faq.", "");
          const aKey = item.answerKey.replace("faq.", "");
          return (
            <div
              key={item.questionKey}
              className="rounded-lg border border-border overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/50 transition-colors"
              >
                <span className="font-medium text-foreground pr-4">
                  {t(qKey)}
                </span>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: premiumEase }}
                >
                  <ChevronDown size={18} className="text-muted-foreground shrink-0" />
                </motion.div>
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: premiumEase }}
                  >
                    <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                      {t(aKey)}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
