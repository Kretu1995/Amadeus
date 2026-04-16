"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { getActiveLocations } from "@/data/locations";
import type { Location } from "@/types/location";
import {
  MapPin,
  Phone,
  Clock,
  ChevronLeft,
  ExternalLink,
  CalendarDays,
} from "lucide-react";

const dayKeys = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

const dayLabels: Record<string, string> = {
  monday: "Maandag",
  tuesday: "Dinsdag",
  wednesday: "Woensdag",
  thursday: "Donderdag",
  friday: "Vrijdag",
  saturday: "Zaterdag",
  sunday: "Zondag",
};

function LocationSidebar({ location }: { location: Location }) {
  const t = useTranslations("reservations");

  return (
    <div className="space-y-6">
      <div className="p-5 rounded-xl bg-card border border-border">
        <h3 className="font-heading text-lg font-bold text-foreground mb-4">
          {location.shortName}
        </h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <MapPin size={16} className="text-primary mt-0.5 shrink-0" />
            <p className="text-sm text-muted-foreground">
              {location.address.street}
              <br />
              {location.address.postalCode} {location.address.city}
            </p>
          </div>
          {location.phone && (
            <div className="flex items-center gap-3">
              <Phone size={16} className="text-primary shrink-0" />
              <a
                href={`tel:${location.phone.replace(/\s/g, "")}`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {location.phone}
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="p-5 rounded-xl bg-card border border-border">
        <div className="flex items-center gap-2 mb-4">
          <Clock size={16} className="text-primary" />
          <h3 className="font-heading text-lg font-bold text-foreground">
            {t("openingHours")}
          </h3>
        </div>
        <div className="space-y-2">
          {dayKeys.map((day) => {
            const hours = location.openingHours[day];
            const today = new Date()
              .toLocaleDateString("en-US", { weekday: "long" })
              .toLowerCase();
            const isToday = day === today;

            return (
              <div
                key={day}
                className={`flex items-center justify-between text-sm py-1.5 ${
                  isToday
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground"
                }`}
              >
                <span className="flex items-center gap-2">
                  {isToday && (
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  )}
                  {dayLabels[day]}
                </span>
                <span>
                  {hours ? `${hours.open} – ${hours.close}` : t("closed")}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-4 rounded-xl bg-primary/5 border border-primary/15">
        <p className="text-xs text-muted-foreground leading-relaxed">
          {t("note")}
        </p>
      </div>
    </div>
  );
}

export function ReservationForm() {
  const t = useTranslations("reservations.form");
  const locations = getActiveLocations();
  const [selectedLocation, setSelectedLocation] = useState("");

  const selectedLoc = locations.find((l) => l.id === selectedLocation);

  return (
    <AnimatePresence mode="wait">
      {!selectedLocation ? (
        <motion.div
          key="select"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-4">
            <MapPin size={16} className="text-primary" />
            {t("location")}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {locations.map((loc) => (
              <button
                key={loc.id}
                type="button"
                onClick={() => setSelectedLocation(loc.id)}
                className="flex items-start gap-3 p-4 rounded-xl text-left transition-all border bg-card border-border hover:border-primary/40 hover:shadow-md hover:shadow-primary/5 group"
              >
                <MapPin
                  size={18}
                  className="text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-0.5"
                />
                <div>
                  <div className="font-heading font-bold text-sm text-foreground">
                    {loc.shortName}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {loc.address.street}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {loc.address.postalCode} {loc.address.city}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="booking"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            onClick={() => setSelectedLocation("")}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ChevronLeft size={16} />
            <span>{t("back")}</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
            {/* Booking card with link to RestoManager */}
            <div className="p-8 md:p-10 rounded-xl bg-card border border-border">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-5">
                  <CalendarDays size={28} className="text-primary" />
                </div>
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-2">
                  {selectedLoc?.shortName}
                </h3>
                <p className="text-muted-foreground text-sm mb-8">
                  {selectedLoc?.address.street},{" "}
                  {selectedLoc?.address.postalCode}{" "}
                  {selectedLoc?.address.city}
                </p>

                {selectedLoc?.bookingUrl && (
                  <a
                    href={selectedLoc.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-primary text-primary-foreground font-bold text-lg rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                  >
                    {t("submit")}
                    <ExternalLink size={18} />
                  </a>
                )}

                <p className="text-xs text-muted-foreground mt-4">
                  Powered by RestoManager
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <LocationSidebar location={selectedLoc!} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
