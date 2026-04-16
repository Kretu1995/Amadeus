"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { menuItems } from "@/data/menu";
import type { MenuCategory } from "@/types/menu";
import { fadeUp, staggerContainer, premiumEase } from "@/lib/motion-variants";
import { Flame, Leaf } from "lucide-react";

const categories: { key: MenuCategory; icon?: string }[] = [
  { key: "ribs" },
  { key: "grill" },
  { key: "starters" },
  { key: "salads" },
  { key: "desserts" },
  { key: "drinks" },
];

export function MenuContent() {
  const t = useTranslations("menu");
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("ribs");
  const filteredItems = menuItems.filter(
    (item) => item.category === activeCategory
  );

  return (
    <section className="py-12 md:py-16 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(({ key }) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`px-5 py-2.5 text-sm font-medium rounded-md transition-all ${
                activeCategory === key
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
              }`}
            >
              {t(`categories.${key}`)}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {filteredItems.map((item) => {
              const nameKey = item.nameKey.replace("menu.items.", "items.");
              const descKey = item.descriptionKey.replace("menu.items.", "items.");
              return (
                <motion.div
                  key={item.id}
                  variants={fadeUp}
                  className={`p-5 rounded-lg border transition-all ${
                    item.isSignature
                      ? "bg-primary/5 border-primary/20 hover:border-primary/40"
                      : "bg-background border-border hover:border-border/80"
                  }`}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-heading text-lg font-bold text-foreground">
                          {t(nameKey.replace("items.", "items.").replace(".name", "") + ".name")}
                        </h3>
                        {item.isSignature && (
                          <Flame size={16} className="text-primary" />
                        )}
                        {item.dietary.includes("vegetarian") && (
                          <Leaf size={14} className="text-green-500" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                        {t(descKey.replace("items.", "items.").replace(".description", "") + ".description")}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      {item.isAllYouCanEat ? (
                        <span className="text-xs font-bold text-primary uppercase tracking-wider">
                          {t("allYouCanEat")}
                        </span>
                      ) : item.price ? (
                        <span className="font-heading text-lg font-bold text-accent">
                          &euro;{item.price.toFixed(2)}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
