"use client";

import React, { useState, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  tourType: string;
  dates: string;
  groupSize: string;
  message: string;
}

const EMPTY_FORM: FormState = {
  fullName: "",
  email: "",
  phone: "",
  tourType: "",
  dates: "",
  groupSize: "",
  message: "",
};

const ContactForm: React.FC = () => {
  const { t, ts } = useI18n();
  const uid = useId();

  const [form, setForm]         = useState<FormState>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted]   = useState(false);
  const [errors, setErrors]         = useState<Partial<FormState>>({});

  const tourOptions = t("contact.form.tourOptions") as string[];

  const validate = (): boolean => {
    const next: Partial<FormState> = {};
    if (!form.fullName.trim())   next.fullName  = "required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
                                  next.email     = "required";
    if (!form.tourType.trim())   next.tourType  = "required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    // Replace with real API call — e.g. fetch('/api/contact', { method: 'POST', body: JSON.stringify(form) })
    await new Promise<void>((resolve) => setTimeout(resolve, 1200));
    setSubmitting(false);
    setSubmitted(true);
  };

  const inputClass = (field: keyof FormState) =>
    cn(
      "w-full px-4 py-3 rounded-xl text-sm text-white bg-white/[0.04]",
      "border placeholder:text-white/20 transition-all duration-200",
      "focus:outline-none focus:bg-white/[0.06]",
      errors[field]
        ? "border-red-500/50 focus:border-red-500/70"
        : "border-white/[0.08] focus:border-amber-500/40"
    );

  return (
    <section
      id="contact"
      className="relative py-24 lg:py-32 bg-[#060606] overflow-hidden"
      aria-labelledby="contact-heading"
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 100%, rgba(251,191,36,0.04), transparent)",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/25 bg-amber-500/8 text-amber-400 text-xs font-semibold tracking-widest uppercase mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            {ts("contact.badge")}
          </span>

          <h2
            id="contact-heading"
            className="text-4xl sm:text-5xl font-extrabold leading-none tracking-tight"
          >
            <span className="text-white/90">{ts("contact.titleLine1")} </span>
            <span className="bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">
              {ts("contact.titleLine2")}
            </span>
          </h2>

          <p className="mt-5 text-white/40 text-base sm:text-lg font-light leading-relaxed">
            {ts("contact.description")}
          </p>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="rounded-3xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-6 sm:p-8"
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center py-16 px-4"
              >
                <CheckCircle2 className="w-14 h-14 text-amber-400 mx-auto mb-5" strokeWidth={1.5} />
                <h3 className="text-white font-bold text-2xl mb-3">
                  {ts("contact.form.successTitle")}
                </h3>
                <p className="text-white/40 text-base leading-relaxed max-w-sm mx-auto">
                  {ts("contact.form.successMessage")}
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                noValidate
                className="space-y-4"
              >
                {/* Row 1 */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor={`${uid}-name`}
                      className="block text-white/40 text-xs font-semibold uppercase tracking-wider"
                    >
                      {ts("contact.form.fullName")}
                    </label>
                    <input
                      id={`${uid}-name`}
                      name="fullName"
                      type="text"
                      autoComplete="name"
                      placeholder={ts("contact.form.fullNamePlaceholder")}
                      value={form.fullName}
                      onChange={handleChange}
                      className={inputClass("fullName")}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor={`${uid}-email`}
                      className="block text-white/40 text-xs font-semibold uppercase tracking-wider"
                    >
                      {ts("contact.form.email")}
                    </label>
                    <input
                      id={`${uid}-email`}
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder={ts("contact.form.emailPlaceholder")}
                      value={form.email}
                      onChange={handleChange}
                      className={inputClass("email")}
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor={`${uid}-phone`}
                      className="block text-white/40 text-xs font-semibold uppercase tracking-wider"
                    >
                      {ts("contact.form.phone")}
                    </label>
                    <input
                      id={`${uid}-phone`}
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder={ts("contact.form.phonePlaceholder")}
                      value={form.phone}
                      onChange={handleChange}
                      className={inputClass("phone")}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor={`${uid}-tour`}
                      className="block text-white/40 text-xs font-semibold uppercase tracking-wider"
                    >
                      {ts("contact.form.tourType")}
                    </label>
                    <select
                      id={`${uid}-tour`}
                      name="tourType"
                      value={form.tourType}
                      onChange={handleChange}
                      className={cn(inputClass("tourType"), "cursor-pointer")}
                    >
                      <option value="" disabled>
                        {ts("contact.form.tourTypePlaceholder")}
                      </option>
                      {Array.isArray(tourOptions) &&
                        tourOptions.map((opt) => (
                          <option key={opt} value={opt} className="bg-[#0e0e0e] text-white">
                            {opt}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                {/* Row 3 */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor={`${uid}-dates`}
                      className="block text-white/40 text-xs font-semibold uppercase tracking-wider"
                    >
                      {ts("contact.form.dates")}
                    </label>
                    <input
                      id={`${uid}-dates`}
                      name="dates"
                      type="text"
                      placeholder={ts("contact.form.datesPlaceholder")}
                      value={form.dates}
                      onChange={handleChange}
                      className={inputClass("dates")}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor={`${uid}-group`}
                      className="block text-white/40 text-xs font-semibold uppercase tracking-wider"
                    >
                      {ts("contact.form.groupSize")}
                    </label>
                    <input
                      id={`${uid}-group`}
                      name="groupSize"
                      type="number"
                      min={1}
                      max={200}
                      placeholder={ts("contact.form.groupSizePlaceholder")}
                      value={form.groupSize}
                      onChange={handleChange}
                      className={inputClass("groupSize")}
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label
                    htmlFor={`${uid}-message`}
                    className="block text-white/40 text-xs font-semibold uppercase tracking-wider"
                  >
                    {ts("contact.form.message")}
                  </label>
                  <textarea
                    id={`${uid}-message`}
                    name="message"
                    rows={4}
                    placeholder={ts("contact.form.messagePlaceholder")}
                    value={form.message}
                    onChange={handleChange}
                    className={cn(inputClass("message"), "resize-none")}
                  />
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-2 py-4 rounded-xl",
                      "bg-amber-500 hover:bg-amber-400 active:bg-amber-600",
                      "text-black text-sm font-bold transition-all duration-200",
                      "shadow-lg shadow-amber-500/20 hover:shadow-amber-500/35 hover:scale-[1.01]",
                      "disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                    )}
                  >
                    {submitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : null}
                    {ts("contact.form.submitButton")}
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      (window.location.href = `mailto:${ts("footer.email")}`)
                    }
                    className={cn(
                      "sm:w-auto px-6 py-4 rounded-xl text-sm font-medium",
                      "border border-white/10 bg-transparent text-white/50",
                      "hover:text-white hover:border-white/20 transition-all duration-200",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                    )}
                  >
                    {ts("contact.form.contactButton")}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;