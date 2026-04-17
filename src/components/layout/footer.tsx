"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FOOTER_NAV, SOCIAL_LINKS } from "@/lib/constants";
import { locations } from "@/data/locations";
import { Globe, ExternalLink, MapPin, Phone } from "lucide-react";

export function Footer() {
  const t = useTranslations();
  const currentYear = new Date().getFullYear();
  const activeLocations = locations.filter((l) => !l.isReopening);

  return (
    <footer className="bg-card border-t border-border">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="font-heading text-2xl font-bold text-foreground tracking-wide">
                AMADEUS
              </span>
            </Link>
            <p className="text-accent text-sm font-medium mb-3">
              {t("footer.tagline")}
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t("footer.description")}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Facebook"
              >
                <Globe size={18} />
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Instagram"
              >
                <ExternalLink size={18} />
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              {t("footer.navigation")}
            </h3>
            <ul className="space-y-2">
              {FOOTER_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href as "/"}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t(item.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations Column */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              {t("footer.ourLocations")}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeLocations.map((location) => (
                <div key={location.id} className="flex gap-3">
                  <MapPin
                    size={16}
                    className="text-primary mt-0.5 shrink-0"
                  />
                  <div>
                    <Link
                      href={{ pathname: "/locaties/[slug]", params: { slug: location.slug } }}
                      className="text-sm font-medium text-foreground hover:text-accent transition-colors"
                    >
                      {location.shortName}
                    </Link>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {location.address.street}
                    </p>
                    {location.phone && (
                      <div className="flex items-center gap-1 mt-0.5">
                        <Phone size={10} className="text-muted-foreground" />
                        <a
                          href={`tel:${location.phone.replace(/\s/g, "")}`}
                          className="text-xs text-muted-foreground hover:text-foreground"
                        >
                          {location.phone}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <p className="text-xs text-muted-foreground">
              {t("footer.copyright", { year: currentYear })}
            </p>
            <p className="text-xs text-muted-foreground">
              Gemaakt door{" "}
              <a
                href="https://wdstudio.be"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors underline-offset-4 hover:underline"
              >
                WD Studio
              </a>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
              {t("footer.privacy")}
            </span>
            <span className="text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
              {t("footer.cookies")}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
