"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { getActiveLocations } from "@/data/locations";
import {
  MapPin,
  CalendarDays,
  Clock,
  Users,
  User,
  Mail,
  Phone,
  MessageSquare,
  Check,
  ChevronRight,
  ChevronLeft,
  Utensils,
} from "lucide-react";

const timeSlots = [
  "12:00", "12:30", "13:00", "13:30",
  "18:00", "18:30", "19:00", "19:30",
  "20:00", "20:30", "21:00", "21:30",
];

export function ReservationForm() {
  const t = useTranslations("reservations.form");
  const locations = getActiveLocations();

  const [step, setStep] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const canProceedStep0 = selectedLocation && date && time && guests;
  const canProceedStep1 = name && email && phone;

  async function handleSubmit() {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1800));
    setSubmitting(false);
    setSubmitted(true);
  }

  const selectedLoc = locations.find((l) => l.id === selectedLocation);

  if (submitted) {
    return (
      <div className="bg-[#0f1923] rounded-2xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1a7a5b] to-[#1a9a6b] px-6 py-4 flex items-center gap-3">
          <Utensils size={20} className="text-white/90" />
          <span className="text-white font-semibold text-lg tracking-wide">RestoManager</span>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="px-6 sm:px-10 py-16 text-center"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#1a9a6b]/20 mb-6">
            <Check size={40} className="text-[#1a9a6b]" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">
            {t("success")}
          </h3>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            {t("successMessage")}
          </p>

          <div className="bg-[#162230] rounded-xl p-6 max-w-sm mx-auto text-left space-y-3">
            <div className="flex items-center gap-3 text-gray-300">
              <MapPin size={16} className="text-[#1a9a6b] shrink-0" />
              <span className="text-sm">{selectedLoc?.shortName}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <CalendarDays size={16} className="text-[#1a9a6b] shrink-0" />
              <span className="text-sm">{new Date(date + "T12:00").toLocaleDateString("nl-BE", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <Clock size={16} className="text-[#1a9a6b] shrink-0" />
              <span className="text-sm">{time}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <Users size={16} className="text-[#1a9a6b] shrink-0" />
              <span className="text-sm">{guests} {t("guestsSuffix")}</span>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-[#0f1923] rounded-2xl overflow-hidden shadow-2xl">
      {/* Header bar */}
      <div className="bg-gradient-to-r from-[#1a7a5b] to-[#1a9a6b] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Utensils size={20} className="text-white/90" />
          <span className="text-white font-semibold text-lg tracking-wide">RestoManager</span>
        </div>
        {/* Step indicator */}
        <div className="flex items-center gap-2">
          {[0, 1].map((s) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all duration-300 ${
                s === step ? "w-8 bg-white" : s < step ? "w-2 bg-white/70" : "w-2 bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="px-6 sm:px-10 py-8">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Location */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-3">
                  <MapPin size={15} className="text-[#1a9a6b]" />
                  {t("location")}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {locations.map((loc) => (
                    <button
                      key={loc.id}
                      type="button"
                      onClick={() => setSelectedLocation(loc.id)}
                      className={`px-4 py-3 rounded-lg text-sm font-medium transition-all border ${
                        selectedLocation === loc.id
                          ? "bg-[#1a9a6b]/15 border-[#1a9a6b] text-white"
                          : "bg-[#162230] border-[#1e2d3d] text-gray-400 hover:border-gray-500 hover:text-gray-300"
                      }`}
                    >
                      {loc.shortName}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-3">
                    <CalendarDays size={15} className="text-[#1a9a6b]" />
                    {t("date")}
                  </label>
                  <input
                    type="date"
                    min={today}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-[#162230] border border-[#1e2d3d] text-white text-sm focus:border-[#1a9a6b] focus:ring-1 focus:ring-[#1a9a6b] outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-3">
                    <Clock size={15} className="text-[#1a9a6b]" />
                    {t("time")}
                  </label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setTime(slot)}
                        className={`py-2.5 rounded-md text-xs font-medium transition-all border ${
                          time === slot
                            ? "bg-[#1a9a6b]/15 border-[#1a9a6b] text-white"
                            : "bg-[#162230] border-[#1e2d3d] text-gray-400 hover:border-gray-500 hover:text-gray-300"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Guests */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-3">
                  <Users size={15} className="text-[#1a9a6b]" />
                  {t("guests")}
                </label>
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setGuests(String(n))}
                      className={`w-12 h-12 rounded-lg text-sm font-semibold transition-all border ${
                        guests === String(n)
                          ? "bg-[#1a9a6b]/15 border-[#1a9a6b] text-white"
                          : "bg-[#162230] border-[#1e2d3d] text-gray-400 hover:border-gray-500 hover:text-gray-300"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              {/* Next button */}
              <button
                type="button"
                onClick={() => setStep(1)}
                disabled={!canProceedStep0}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-[#1a7a5b] to-[#1a9a6b] text-white font-bold text-base rounded-xl hover:from-[#1a8a63] hover:to-[#1aaa73] transition-all shadow-lg shadow-[#1a9a6b]/20 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <span>{t("next")}</span>
                <ChevronRight size={18} />
              </button>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Summary bar */}
              <div className="flex flex-wrap items-center gap-3 p-4 rounded-xl bg-[#162230] border border-[#1e2d3d] text-sm text-gray-400">
                <span className="text-white font-medium">{selectedLoc?.shortName}</span>
                <span className="text-[#1a9a6b]">&bull;</span>
                <span>{new Date(date + "T12:00").toLocaleDateString("nl-BE", { day: "numeric", month: "short" })}</span>
                <span className="text-[#1a9a6b]">&bull;</span>
                <span>{time}</span>
                <span className="text-[#1a9a6b]">&bull;</span>
                <span>{guests} {t("guestsSuffix")}</span>
                <button
                  type="button"
                  onClick={() => setStep(0)}
                  className="ml-auto text-[#1a9a6b] hover:text-[#1aaa73] text-xs font-medium"
                >
                  {t("edit")}
                </button>
              </div>

              {/* Name */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-3">
                  <User size={15} className="text-[#1a9a6b]" />
                  {t("name")}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-[#162230] border border-[#1e2d3d] text-white text-sm focus:border-[#1a9a6b] focus:ring-1 focus:ring-[#1a9a6b] outline-none transition-colors placeholder:text-gray-600"
                />
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-3">
                    <Mail size={15} className="text-[#1a9a6b]" />
                    {t("email")}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-[#162230] border border-[#1e2d3d] text-white text-sm focus:border-[#1a9a6b] focus:ring-1 focus:ring-[#1a9a6b] outline-none transition-colors placeholder:text-gray-600"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-3">
                    <Phone size={15} className="text-[#1a9a6b]" />
                    {t("phone")}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-[#162230] border border-[#1e2d3d] text-white text-sm focus:border-[#1a9a6b] focus:ring-1 focus:ring-[#1a9a6b] outline-none transition-colors placeholder:text-gray-600"
                  />
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-3">
                  <MessageSquare size={15} className="text-[#1a9a6b]" />
                  {t("specialRequests")}
                </label>
                <textarea
                  rows={3}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder={t("specialRequestsPlaceholder")}
                  className="w-full px-4 py-3 rounded-lg bg-[#162230] border border-[#1e2d3d] text-white text-sm focus:border-[#1a9a6b] focus:ring-1 focus:ring-[#1a9a6b] outline-none transition-colors resize-none placeholder:text-gray-600"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(0)}
                  className="flex items-center justify-center gap-1.5 px-5 py-4 bg-[#162230] border border-[#1e2d3d] text-gray-400 font-medium rounded-xl hover:text-white hover:border-gray-500 transition-all"
                >
                  <ChevronLeft size={16} />
                  <span>{t("back")}</span>
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!canProceedStep1 || submitting}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-[#1a7a5b] to-[#1a9a6b] text-white font-bold text-base rounded-xl hover:from-[#1a8a63] hover:to-[#1aaa73] transition-all shadow-lg shadow-[#1a9a6b]/20 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <span className="inline-flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      {t("submitting")}
                    </span>
                  ) : (
                    t("submit")
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="mt-8 pt-5 border-t border-[#1e2d3d] flex items-center justify-center gap-2 text-xs text-gray-600">
          <span>Powered by</span>
          <span className="font-semibold text-gray-500">RestoManager</span>
        </div>
      </div>
    </div>
  );
}
