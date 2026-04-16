"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion-variants";
import { Check, Upload, X } from "lucide-react";

const positionKeys = ["server", "kitchen", "bartender", "other"] as const;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export function JobApplicationForm() {
  const t = useTranslations("jobs.form");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFileError("");
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      setFileError(t("fileTypeError"));
      e.target.value = "";
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setFileError(t("fileSizeError"));
      e.target.value = "";
      return;
    }
    setSelectedFile(file);
  }

  function removeFile() {
    setSelectedFile(null);
    setFileError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
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

  const inputClass =
    "w-full px-4 py-3 rounded-md bg-card border border-border text-foreground text-sm focus:border-primary focus:ring-1 focus:ring-primary";

  return (
    <motion.form
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      {/* Name & Email */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            {t("name")}
          </label>
          <input type="text" required className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            {t("email")}
          </label>
          <input type="email" required className={inputClass} />
        </div>
      </motion.div>

      {/* Phone */}
      <motion.div variants={fadeUp}>
        <label className="block text-sm font-semibold text-foreground mb-2">
          {t("phone")}
        </label>
        <input type="tel" required className={inputClass} />
      </motion.div>

      {/* Position */}
      <motion.div variants={fadeUp}>
        <label className="block text-sm font-semibold text-foreground mb-2">
          {t("position")}
        </label>
        <select required className={inputClass}>
          <option value="">{t("positionPlaceholder")}</option>
          {positionKeys.map((key) => (
            <option key={key} value={key}>
              {t(`positions.${key}`)}
            </option>
          ))}
        </select>
      </motion.div>

      {/* Motivation */}
      <motion.div variants={fadeUp}>
        <label className="block text-sm font-semibold text-foreground mb-2">
          {t("motivation")}
        </label>
        <textarea
          rows={4}
          required
          placeholder={t("motivationPlaceholder")}
          className={`${inputClass} resize-none placeholder:text-muted-foreground`}
        />
      </motion.div>

      {/* CV Upload */}
      <motion.div variants={fadeUp}>
        <label className="block text-sm font-semibold text-foreground mb-2">
          {t("cv")}
        </label>
        {!selectedFile ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="w-full px-4 py-8 rounded-md bg-card border-2 border-dashed border-border hover:border-primary/40 transition-colors cursor-pointer flex flex-col items-center gap-2"
          >
            <Upload size={24} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {t("cvUploadText")}
            </span>
            <span className="text-xs text-muted-foreground/60">
              {t("cvFormats")}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-3 px-4 py-3 rounded-md bg-card border border-primary/30">
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground font-medium truncate">
                {selectedFile.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {(selectedFile.size / 1024 / 1024).toFixed(1)} MB
              </p>
            </div>
            <button
              type="button"
              onClick={removeFile}
              className="p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="hidden"
        />
        {fileError && (
          <p className="mt-1.5 text-xs text-destructive">{fileError}</p>
        )}
      </motion.div>

      {/* Submit */}
      <motion.div variants={fadeUp}>
        <button
          type="submit"
          disabled={submitting}
          className="w-full px-8 py-4 bg-primary text-primary-foreground font-bold text-base rounded-md hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? t("submitting") : t("submit")}
        </button>
      </motion.div>
    </motion.form>
  );
}
