"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Star, ShieldCheck, Clock, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Globe from "@/components/ui/globe";
import { useI18n } from "@/lib/i18n";
import {
  cn,
  GLOBE_POSITIONS,
  SECTION_IDS,
  scrollToSection,
  type SectionId,
} from "@/lib/utils";

// ─── Shared Badge ─────────────────────────────────────────────────────────────

const SectionBadge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/25 bg-amber-500/[0.08] text-amber-400 text-xs font-semibold tracking-widest uppercase mb-5">
    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
    {children}
  </span>
);

// ─── About Feature icons ──────────────────────────────────────────────────────

const FEATURE_ICONS: Record<string, LucideIcon> = {
  Star,
  ShieldCheck,
  Clock,
  Sparkles,
};

interface AboutFeature {
  icon: string;
  title: string;
  description: string;
}

interface AboutStat {
  value: string;
  label: string;
}

// ─── LandingPage ─────────────────────────────────────────────────────────────

const LandingPage: React.FC = () => {
  const { t, ts } = useI18n();

  const [activeSection, setActiveSection]   = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  // Initialise immediately to hero position (index 0) so globe is visible on first paint
  const [globeStyle, setGlobeStyle] = useState<React.CSSProperties>(() => {
    const p = GLOBE_POSITIONS[0];
    return {
      transform: `translate3d(${p.x}vw, ${p.y}vh, 0) translate3d(-50%, -50%, 0) scale3d(${p.scale}, ${p.scale}, 1)`,
      opacity: 0.78,
    };
  });
  const rafRef = useRef<number>(0);
  const activeSectionRef = useRef(0);

  // ─ Globe transform update ─────────────────────────────────────────────────

  const updateGlobe = useCallback((idx: number) => {
    const p = GLOBE_POSITIONS[idx];
    setGlobeStyle({
      transform: `translate3d(${p.x}vw, ${p.y}vh, 0) translate3d(-50%, -50%, 0) scale3d(${p.scale}, ${p.scale}, 1)`,
      opacity: idx === 4 ? 0.45 : 0.78,
    });
  }, []);

  // ─ Scroll handler ─────────────────────────────────────────────────────────

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      rafRef.current = requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docH = document.documentElement.scrollHeight - window.innerHeight;
        setScrollProgress(docH > 0 ? Math.min(scrollTop / docH, 1) : 0);

        const viewMid = window.innerHeight / 2;
        let best = 0;
        let minDist = Infinity;

        SECTION_IDS.forEach((id, idx) => {
          const el = document.getElementById(id);
          if (!el) return;
          const r = el.getBoundingClientRect();
          const dist = Math.abs(r.top + r.height / 2 - viewMid);
          if (dist < minDist) {
            minDist = dist;
            best = idx;
          }
        });

        // Only re-render globe when section actually changes
        if (best !== activeSectionRef.current) {
          activeSectionRef.current = best;
          setActiveSection(best);
          updateGlobe(best);
        }

        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [updateGlobe]);

  // ─ About section data ─────────────────────────────────────────────────────
  const aboutFeatures = t("about.features") as AboutFeature[];
  const yearsStats    = t("about.stats.years")  as AboutStat;
  const guestsStats   = t("about.stats.guests") as AboutStat;
  const routesStats   = t("about.stats.routes") as AboutStat;

  return (
    <>
      {/* ── Fixed: Scroll Progress Bar ────────────────────────────────────── */}
      <div className="fixed top-0 inset-x-0 h-px bg-white/[0.04] z-[60]">
        <div
          className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-500"
          style={{
            transform: `scaleX(${scrollProgress})`,
            transformOrigin: "left center",
            transition: "transform 0.12s ease-out",
            willChange: "transform",
          }}
        />
      </div>

      {/* ── Fixed: Animated Globe ─────────────────────────────────────────── */}
      <div
        className="fixed z-[5] pointer-events-none transition-[transform,opacity] duration-[1400ms] ease-[cubic-bezier(0.23,1,0.32,1)] will-change-transform"
        style={globeStyle}
        aria-hidden="true"
      >
        <div className="scale-75 sm:scale-90 lg:scale-100">
          <Globe size={240} />
        </div>
      </div>

      {/* ── Fixed: Section dot navigation ────────────────────────────────── */}
      <nav
        className="hidden sm:flex fixed right-5 lg:right-8 top-1/2 -translate-y-1/2 z-40 flex-col gap-3"
        aria-label="Page sections"
      >
        {SECTION_IDS.map((id, i) => (
          <button
            key={id}
            onClick={() => scrollToSection(id as SectionId)}
            aria-label={`Go to section ${i + 1}`}
            className={cn(
              "w-2 h-2 rounded-full border-2 transition-all duration-300",
              "hover:scale-125 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50",
              activeSection === i
                ? "bg-amber-400 border-amber-400 shadow-lg shadow-amber-400/30"
                : "bg-transparent border-white/20 hover:border-amber-400/50"
            )}
          />
        ))}
      </nav>

      {/* ══════════════════════════════════════════════════════════════════════
           HERO SECTION
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col justify-center pt-20 overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 70% 50%, rgba(251,191,36,0.04), transparent), #060606",
        }}
      >
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.3) 1px,transparent 1px), linear-gradient(90deg,rgba(255,255,255,.3) 1px,transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-2xl xl:max-w-3xl"
          >
            <SectionBadge>{ts("hero.badge")}</SectionBadge>

            <h1 className="text-[clamp(36px,12vw,104px)] font-black leading-[1.1] tracking-[-0.05em] mb-8">
              <span className="block text-white/90">{ts("hero.titleLine1")}</span>
              <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
                {ts("hero.titleLine2")}
              </span>
            </h1>

            <p className="text-white/45 text-lg sm:text-xl font-light leading-relaxed mb-10 max-w-xl">
              {ts("hero.description")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollToSection("contact")}
                className="px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-base shadow-2xl shadow-amber-500/25 hover:shadow-amber-500/40 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                {ts("hero.ctaPrimary")}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollToSection("destinations")}
                className="px-8 py-4 rounded-xl border border-white/10 bg-white/[0.04] text-white font-medium text-base backdrop-blur-sm hover:bg-white/[0.07] hover:border-white/20 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
              >
                {ts("hero.ctaSecondary")}
              </motion.button>
            </div>

            <div className="flex items-center gap-6 text-xs text-white/22">
              <span className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-amber-400 animate-pulse" />
                {ts("hero.tagInteractive")}
              </span>
              <span className="flex items-center gap-2">
                <span
                  className="w-1 h-1 rounded-full bg-amber-400 animate-pulse"
                  style={{ animationDelay: "0.6s" }}
                />
                {ts("hero.tagScroll")}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20 z-10">
          <div className="w-px h-10 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          <div className="w-1 h-1 rounded-full bg-white/30 animate-bounce" />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
           ABOUT SECTION  (placed inline here, between tours & contact)
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="about"
        className="relative py-24 lg:py-32 bg-[#060606] overflow-hidden"
        aria-labelledby="about-heading"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 70% at 90% 50%, rgba(251,191,36,0.05), transparent)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">

            {/* Left: text */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
            >
              <SectionBadge>{ts("about.badge")}</SectionBadge>

              <h2
                id="about-heading"
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-none tracking-tight mb-6"
              >
                <span className="text-white/90">{ts("about.titleLine1")} </span>
                <span className="bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">
                  {ts("about.titleLine2")}
                </span>
              </h2>

              <p className="text-white/40 text-base sm:text-lg font-light leading-relaxed mb-10">
                {ts("about.description")}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 sm:gap-8">
                {[yearsStats, guestsStats, routesStats].map((stat) =>
                  stat ? (
                    <div key={stat.label}>
                      <div className="text-2xl sm:text-3xl font-black text-amber-400 leading-none">
                        {stat.value}
                      </div>
                      <div className="text-white/28 text-xs mt-1.5 leading-snug">
                        {stat.label}
                      </div>
                    </div>
                  ) : null
                )}
              </div>
            </motion.div>

            {/* Right: feature cards */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="grid sm:grid-cols-2 gap-4"
            >
              {Array.isArray(aboutFeatures) &&
                aboutFeatures.map((feat, i) => {
                  const Icon = FEATURE_ICONS[feat.icon] ?? Star;
                  return (
                    <div
                      key={i}
                      className={cn(
                        "p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02]",
                        "hover:border-amber-500/20 hover:bg-white/[0.04]",
                        "transition-all duration-300 group"
                      )}
                    >
                      <Icon className="w-5 h-5 text-amber-400/50 group-hover:text-amber-400 mb-3 transition-colors duration-300" />
                      <h3 className="text-white font-semibold text-sm mb-1.5">
                        {feat.title}
                      </h3>
                      <p className="text-white/30 text-xs leading-relaxed">
                        {feat.description}
                      </p>
                    </div>
                  );
                })}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;