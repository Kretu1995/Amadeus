"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { getActiveLocations } from "@/data/locations";
import { fadeUp, staggerContainer } from "@/lib/motion-variants";
import { Check, MapPin } from "lucide-react";

export function ReservationForm() {
  const t = useTranslations("reservations.form");
  const locations = getActiveLocations();
  const [selectedLocation, setSelectedLocation] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    // Simulate submission
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitting(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12 px-6 bg-card rounded-lg border border-border"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 mb-4">
          <Check size={32} className="text-green-500" />
        </div>
        <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
          {t("success")}
        </h3>
        <p className="text-muted-foreground">{t("successMessage")}</p>
      </motion.div>
    );
  }

  return (
    <motion.form
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Location Selection */}
      <motion.div variants={fadeUp}>
        <label className="block text-sm font-semibold text-foreground mb-3">
          {t("location")}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {locations.map((location) => (
            <button
              key={location.id}
              type="button"
              onClick={() => setSelectedLocation(location.id)}
              className={`flex items-center gap-2 p-3 rounded-md border text-left text-sm transition-all ${
                selectedLocation === location.id
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-border/80"
              }`}
            >
              <MapPin size={14} className="shrink-0" />
              <span className="font-medium">{location.shortName}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Date & Time Row */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            {t("date")}
          </label>
          <input
            type="date"
            required
            className="w-full px-4 py-3 rounded-md bg-card border border-border text-foreground text-sm focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            {t("time")}
          </label>
          <select
            required
            className="w-full px-4 py-3 rounded-md bg-card border border-border text-foreground text-sm focus:border-primary focus:ring-1 focus:ring-primary"
          >
            <option value="">--</option>
            {["18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"].map(
              (time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              )
            )}
          </select>
        </div>
      </motion.div>

      {/* Guests */}
      <motion.div variants={fadeUp}>
        <label className="block text-sm font-semibold text-foreground mb-2">
          {t("guests")}
        </label>
        <select
          required
          className="w-full px-4 py-3 rounded-md bg-card border border-border text-foreground text-sm focus:border-primary focus:ring-1 focus:ring-primary"
        >
          <option value="">--</option>
          {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>
              {n} {t("guestsSuffix")}
            </option>
          ))}
        </select>
      </motion.div>

      {/* Name & Email */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            {t("name")}
          </label>
          <input
            type="text"
            required
            className="w-full px-4 py-3 rounded-md bg-card border border-border text-foreground text-sm focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            {t("email")}
          </label>
          <input
            type="email"
            required
            className="w-full px-4 py-3 rounded-md bg-card border border-border text-foreground text-sm focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
      </motion.div>

      {/* Phone */}
      <motion.div variants={fadeUp}>
        <label className="block text-sm font-semibold text-foreground mb-2">
          {t("phone")}
        </label>
        <input
          type="tel"
          required
          className="w-full px-4 py-3 rounded-md bg-card border border-border text-foreground text-sm focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </motion.div>

      {/* Special Requests */}
      <motion.div variants={fadeUp}>
        <label className="block text-sm font-semibold text-foreground mb-2">
          {t("specialRequests")}
        </label>
        <textarea
          rows={3}
          placeholder={t("specialRequestsPlaceholder")}
          className="w-full px-4 py-3 rounded-md bg-card border border-border text-foreground text-sm focus:border-primary focus:ring-1 focus:ring-primary resize-none placeholder:text-muted-foreground"
        />
      </motion.div>

      {/* Submit */}
      <motion.div variants={fadeUp}>
        <button
          type="submit"
          disabled={submitting || !selectedLocation}
          className="w-full px-8 py-4 bg-primary text-primary-foreground font-bold text-base rounded-md hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? t("submitting") : t("submit")}
        </button>
      </motion.div>
    </motion.form>
  );
}
