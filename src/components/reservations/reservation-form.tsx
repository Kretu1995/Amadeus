"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { getActiveLocations } from "@/data/locations";
import type { Location } from "@/types/location";
import { MapPin, Phone, Clock, ChevronLeft } from "lucide-react";

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
      <div className="p-5 rounded-xl bg-white/5 border border-white/10">
        <h3 className="font-heading text-lg font-bold text-gray-900 mb-4">
          {location.shortName}
        </h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <MapPin size={16} className="text-red-600 mt-0.5 shrink-0" />
            <p className="text-sm text-gray-600">
              {location.address.street}
              <br />
              {location.address.postalCode} {location.address.city}
            </p>
          </div>
          {location.phone && (
            <div className="flex items-center gap-3">
              <Phone size={16} className="text-red-600 shrink-0" />
              <a
                href={`tel:${location.phone.replace(/\s/g, "")}`}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                {location.phone}
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="p-5 rounded-xl bg-white/5 border border-white/10">
        <div className="flex items-center gap-2 mb-4">
          <Clock size={16} className="text-red-600" />
          <h3 className="font-heading text-lg font-bold text-gray-900">
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
                    ? "text-gray-900 font-semibold"
                    : "text-gray-500"
                }`}
              >
                <span className="flex items-center gap-2">
                  {isToday && (
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
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

      <div className="p-4 rounded-xl bg-red-50 border border-red-100">
        <p className="text-xs text-gray-600 leading-relaxed">
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
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-4">
            <MapPin size={16} className="text-red-600" />
            {t("location")}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {locations.map((loc) => (
              <button
                key={loc.id}
                type="button"
                onClick={() => setSelectedLocation(loc.id)}
                className="flex items-start gap-3 p-4 rounded-xl text-left transition-all border bg-white border-gray-200 hover:border-red-300 hover:shadow-md group"
              >
                <MapPin
                  size={18}
                  className="text-gray-400 group-hover:text-red-600 transition-colors shrink-0 mt-0.5"
                />
                <div>
                  <div className="font-heading font-bold text-sm text-gray-900">
                    {loc.shortName}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {loc.address.street}
                  </div>
                  <div className="text-xs text-gray-500">
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
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-6"
          >
            <ChevronLeft size={16} />
            <span>{t("back")}</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
            {/* RestoManager iframe */}
            <div className="rounded-xl overflow-hidden">
              {selectedLoc?.bookingUrl && (
                <iframe
                  src={selectedLoc.bookingUrl}
                  title={`RestoManager - ${selectedLoc.shortName}`}
                  className="w-full border-0"
                  style={{ height: "1000px" }}
                  allow="payment"
                  scrolling="no"
                />
              )}
            </div>

            {/* Sidebar */}
            <LocationSidebar location={selectedLoc!} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
