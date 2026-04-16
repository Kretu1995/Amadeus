"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { NAV_ITEMS, FOOTER_NAV } from "@/lib/constants";
import { LanguageSwitcher } from "./language-switcher";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const t = useTranslations();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-[300px] bg-background border-l border-border lg:hidden"
          >
            <div className="flex flex-col h-full pt-20 px-6 pb-6">
              <nav className="flex flex-col gap-1">
                {FOOTER_NAV.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href as "/"}
                    onClick={onClose}
                    className="px-4 py-3 text-base font-medium text-foreground/80 hover:text-foreground hover:bg-muted rounded-md transition-colors"
                  >
                    {t(item.labelKey)}
                  </Link>
                ))}
              </nav>

              <div className="mt-auto space-y-4">
                <LanguageSwitcher />
                <Link
                  href="/reserveren"
                  onClick={onClose}
                  className="flex items-center justify-center w-full px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition-colors"
                >
                  {t("nav.reserve")}
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
