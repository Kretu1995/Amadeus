"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { menuItems } from "@/data/menu";
import type { MenuCategory } from "@/types/menu";
import { premiumEase } from "@/lib/motion-variants";
import { Flame, Leaf, ChevronLeft, ChevronRight } from "lucide-react";

const categories: { key: MenuCategory }[] = [
  { key: "starters" },
  { key: "mains" },
  { key: "specials" },
  { key: "desserts" },
  { key: "aperitifs" },
  { key: "beers" },
  { key: "wines" },
  { key: "drinks" },
];

export function MenuContent() {
  const t = useTranslations("menu");
  const [activePage, setActivePage] = useState(0);
  const [direction, setDirection] = useState(0);
  const activeCategory = categories[activePage].key;
  const filteredItems = menuItems.filter(
    (item) => item.category === activeCategory
  );

  // Split items into left and right pages
  const midpoint = Math.ceil(filteredItems.length / 2);
  const leftItems = filteredItems.slice(0, midpoint);
  const rightItems = filteredItems.slice(midpoint);

  const goToPage = (page: number) => {
    setDirection(page > activePage ? 1 : -1);
    setActivePage(page);
  };
  const prevPage = () => {
    if (activePage > 0) goToPage(activePage - 1);
  };
  const nextPage = () => {
    if (activePage < categories.length - 1) goToPage(activePage + 1);
  };

  const pageVariants = {
    enter: (dir: number) => ({
      rotateY: dir > 0 ? 4 : -4,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: premiumEase },
    },
    exit: (dir: number) => ({
      rotateY: dir > 0 ? -4 : 4,
      opacity: 0,
      scale: 0.98,
      transition: { duration: 0.3, ease: premiumEase },
    }),
  };

  function MenuItemRow({
    item,
    isLast,
  }: {
    item: (typeof filteredItems)[0];
    isLast: boolean;
  }) {
    const itemKey = item.nameKey.replace("menu.items.", "").replace(".name", "");
    return (
      <div
        className={`py-4 ${!isLast ? "border-b border-dashed border-amber-900/20" : ""}`}
      >
        <div className="flex justify-between items-baseline gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <h4 className="font-heading text-lg md:text-xl font-semibold text-amber-950 truncate">
              {t(`items.${itemKey}.name`)}
            </h4>
            {item.isSignature && (
              <Flame size={15} className="text-red-700 shrink-0" />
            )}
            {item.dietary.includes("vegetarian") && (
              <Leaf size={13} className="text-green-700 shrink-0" />
            )}
          </div>
          <div className="flex-1 border-b border-dotted border-amber-900/15 mx-2 mb-1 min-w-[20px]" />
          <div className="shrink-0">
            {item.isAllYouCanEat ? (
              <span className="text-xs font-bold text-red-800 uppercase tracking-wider whitespace-nowrap">
                {t("allYouCanEat")}
              </span>
            ) : item.price ? (
              <span className="font-heading text-lg font-bold text-amber-900">
                &euro;{item.price.toFixed(2)}
              </span>
            ) : null}
          </div>
        </div>
        <p className="text-sm text-amber-900/60 mt-1.5 leading-relaxed italic pr-4">
          {t(`items.${itemKey}.description`)}
        </p>
      </div>
    );
  }

  return (
    <section className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        {/* Book wrapper with perspective */}
        <div className="relative" style={{ perspective: "2000px" }}>
          {/* Book shadow on table */}
          <div className="absolute -inset-4 md:-inset-6 bg-black/40 rounded-2xl blur-3xl -z-10" />

          {/* The Book */}
          <div
            className="relative rounded-sm overflow-hidden"
            style={{
              boxShadow:
                "0 2px 4px rgba(0,0,0,0.3), 0 8px 40px rgba(0,0,0,0.4), inset 0 0 80px rgba(0,0,0,0.1)",
            }}
          >
            {/* Book cover edge - top */}
            <div
              className="h-3 w-full"
              style={{
                background:
                  "linear-gradient(to bottom, hsl(25, 35%, 22%), hsl(25, 30%, 18%))",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)",
              }}
            />

            {/* Pages area */}
            <div className="relative">
              {/* Paper texture background */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, #f5ead0 0%, #efe0c4 25%, #f2e5cc 50%, #ece0c8 75%, #f0e2c6 100%)",
                }}
              />
              {/* Subtle paper grain */}
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
                }}
              />

              {/* Center spine shadow */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-12 z-20 pointer-events-none">
                <div
                  className="w-full h-full"
                  style={{
                    background:
                      "linear-gradient(to right, transparent 0%, rgba(80,50,20,0.12) 35%, rgba(60,35,10,0.22) 50%, rgba(80,50,20,0.12) 65%, transparent 100%)",
                  }}
                />
              </div>

              {/* Page content */}
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activePage}
                  custom={direction}
                  variants={pageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="relative z-10"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 md:min-h-[600px]">
                    {/* LEFT PAGE */}
                    <div className="relative px-4 sm:px-8 md:px-12 py-8 md:py-12 md:border-r border-amber-900/10">
                      {/* Page number */}
                      <div className="text-center mb-8">
                        <p className="text-xs text-amber-800/40 uppercase tracking-[0.3em] mb-3">
                          ~ Amadeus ~
                        </p>
                        <h3 className="font-heading text-3xl md:text-4xl font-bold text-amber-950">
                          {t(`categories.${activeCategory}`)}
                        </h3>
                        <div className="flex items-center justify-center gap-3 mt-2">
                          <div className="h-px w-8 bg-amber-800/20" />
                          <div className="w-1.5 h-1.5 rotate-45 border border-amber-800/30" />
                          <div className="h-px w-8 bg-amber-800/20" />
                        </div>
                      </div>

                      {/* Left page items */}
                      <div>
                        {leftItems.map((item, i) => (
                          <MenuItemRow
                            key={item.id}
                            item={item}
                            isLast={i === leftItems.length - 1}
                          />
                        ))}
                      </div>

                      {/* Left page number */}
                      <div className="absolute bottom-4 left-8 text-xs text-amber-800/30 italic">
                        {activePage * 2 + 1}
                      </div>
                    </div>

                    {/* RIGHT PAGE */}
                    <div className="relative px-4 sm:px-8 md:px-12 pt-0 pb-8 md:py-12">
                      {/* Right page continuation or decoration */}
                      {rightItems.length > 0 ? (
                        <>
                          {/* Subtle continuation marker */}
                          <div className="text-center mb-6 md:mt-0 mt-2">
                            <div className="flex items-center justify-center gap-3">
                              <div className="h-px w-12 bg-amber-800/15" />
                              <Flame size={12} className="text-amber-800/25" />
                              <div className="h-px w-12 bg-amber-800/15" />
                            </div>
                          </div>

                          <div>
                            {rightItems.map((item, i) => (
                              <MenuItemRow
                                key={item.id}
                                item={item}
                                isLast={i === rightItems.length - 1}
                              />
                            ))}
                          </div>
                        </>
                      ) : (
                        /* Decorative page when no right items */
                        <div className="flex items-center justify-center h-full">
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-3 mb-4">
                              <div className="h-px w-10 bg-amber-800/15" />
                              <div className="w-2 h-2 rotate-45 border border-amber-800/20" />
                              <div className="h-px w-10 bg-amber-800/15" />
                            </div>
                            <p className="font-heading text-lg text-amber-900/30 italic">
                              Bon app&eacute;tit
                            </p>
                            <div className="flex items-center justify-center gap-3 mt-4">
                              <div className="h-px w-10 bg-amber-800/15" />
                              <div className="w-2 h-2 rotate-45 border border-amber-800/20" />
                              <div className="h-px w-10 bg-amber-800/15" />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Right page number */}
                      <div className="absolute bottom-4 right-8 text-xs text-amber-800/30 italic">
                        {activePage * 2 + 2}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Page edge effect - right side (stacked pages look) */}
              <div className="absolute right-0 top-3 bottom-3 w-[6px] z-30 pointer-events-none hidden md:block">
                <div className="w-full h-full flex flex-col gap-[1px]">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="flex-1"
                      style={{
                        background: `linear-gradient(to left, hsl(35, 30%, ${78 - i * 3}%), hsl(35, 25%, ${82 - i * 2}%))`,
                        boxShadow:
                          i === 0
                            ? "inset 0 0 1px rgba(0,0,0,0.1)"
                            : "none",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Book cover edge - bottom */}
            <div
              className="h-3 w-full"
              style={{
                background:
                  "linear-gradient(to top, hsl(25, 35%, 22%), hsl(25, 30%, 18%))",
                boxShadow: "inset 0 -1px 0 rgba(255,255,255,0.05)",
              }}
            />
          </div>

          {/* Page turn navigation */}
          <div className="mt-8">
            {/* Category tabs - horizontal scroll on mobile */}
            <div className="overflow-x-auto -mx-2 px-2 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex items-center gap-1.5 lg:flex-wrap justify-start lg:justify-center min-w-max lg:min-w-0">
                {categories.map((cat, i) => (
                  <button
                    key={cat.key}
                    onClick={() => goToPage(i)}
                    className={`px-3 py-1.5 text-sm font-medium rounded whitespace-nowrap transition-all ${
                      i === activePage
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    {t(`categories.${cat.key}`)}
                  </button>
                ))}
              </div>
            </div>

            {/* Prev/Next */}
            <div className="flex items-center justify-between mt-4 px-2">
              <button
                onClick={prevPage}
                disabled={activePage === 0}
                className="flex items-center gap-1.5 px-4 py-2 text-sm text-muted-foreground hover:text-foreground disabled:opacity-20 disabled:cursor-not-allowed transition-colors rounded-md hover:bg-muted/50"
              >
                <ChevronLeft size={16} />
                <span className="hidden sm:inline">
                  {activePage > 0
                    ? t(`categories.${categories[activePage - 1].key}`)
                    : ""}
                </span>
              </button>

              <button
                onClick={nextPage}
                disabled={activePage === categories.length - 1}
                className="flex items-center gap-1.5 px-4 py-2 text-sm text-muted-foreground hover:text-foreground disabled:opacity-20 disabled:cursor-not-allowed transition-colors rounded-md hover:bg-muted/50"
              >
                <span className="hidden sm:inline">
                  {activePage < categories.length - 1
                    ? t(`categories.${categories[activePage + 1].key}`)
                    : ""}
                </span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
