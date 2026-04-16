"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { getActiveLocations } from "@/data/locations";
import { MapPin, Utensils, ChevronLeft } from "lucide-react";

export function ReservationForm() {
  const t = useTranslations("reservations.form");
  const locations = getActiveLocations();
  const [selectedLocation, setSelectedLocation] = useState("");

  const selectedLoc = locations.find((l) => l.id === selectedLocation);

  return (
    <div className="bg-[#0f1923] rounded-2xl overflow-hidden shadow-2xl">
      {/* Header bar */}
      <div className="bg-gradient-to-r from-[#1a7a5b] to-[#1a9a6b] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Utensils size={20} className="text-white/90" />
          <span className="text-white font-semibold text-lg tracking-wide">
            RestoManager
          </span>
        </div>
        {selectedLoc && (
          <button
            type="button"
            onClick={() => setSelectedLocation("")}
            className="flex items-center gap-1.5 text-white/80 hover:text-white text-sm transition-colors"
          >
            <ChevronLeft size={16} />
            <span>{t("back")}</span>
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {!selectedLocation ? (
          <motion.div
            key="select"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="px-6 sm:px-10 py-8"
          >
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-5">
              <MapPin size={15} className="text-[#1a9a6b]" />
              {t("location")}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {locations.map((loc) => (
                <button
                  key={loc.id}
                  type="button"
                  onClick={() => setSelectedLocation(loc.id)}
                  className="flex items-center gap-3 px-5 py-4 rounded-xl text-left transition-all border bg-[#162230] border-[#1e2d3d] text-gray-300 hover:border-[#1a9a6b] hover:text-white hover:bg-[#162230]/80 group"
                >
                  <MapPin
                    size={18}
                    className="text-gray-500 group-hover:text-[#1a9a6b] transition-colors shrink-0"
                  />
                  <div>
                    <div className="font-semibold text-sm">{loc.shortName}</div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {loc.address.street}, {loc.address.city}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="booking"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.25 }}
          >
            {/* Location info bar */}
            <div className="px-6 sm:px-10 py-3 bg-[#162230] border-b border-[#1e2d3d] flex items-center gap-2 text-sm text-gray-400">
              <MapPin size={14} className="text-[#1a9a6b]" />
              <span className="text-white font-medium">
                {selectedLoc?.shortName}
              </span>
              <span className="text-gray-600">&mdash;</span>
              <span>
                {selectedLoc?.address.street}, {selectedLoc?.address.city}
              </span>
            </div>

            {/* RestoManager iframe */}
            {selectedLoc?.bookingUrl && (
              <iframe
                src={selectedLoc.bookingUrl}
                title={`RestoManager - ${selectedLoc.shortName}`}
                className="w-full border-0"
                style={{ minHeight: "750px" }}
                allow="payment"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-[#1e2d3d] flex items-center justify-center gap-2 text-xs text-gray-600">
        <span>Powered by</span>
        <span className="font-semibold text-gray-500">RestoManager</span>
      </div>
    </div>
  );
}
