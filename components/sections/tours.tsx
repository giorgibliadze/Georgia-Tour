"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  User,
  Wine,
  Mountain,
  Landmark,
  Users,
  Briefcase,
  Timer,
  UsersRound,
  LucideIcon,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { cn, scrollToSection } from "@/lib/utils";

interface TourItem {
  id: string;
  icon: string;
  name: string;
  description: string;
  duration: string;
  groupSize: string;
}

// Map icon string keys (from JSON) to Lucide components
const ICON_MAP: Record<string, LucideIcon> = {
  User,
  Wine,
  Mountain,
  Landmark,
  Users,
  Briefcase,
};

const cardVariants = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const ToursSection: React.FC = () => {
  const { t, ts } = useI18n();

  const items = t("tours.items") as TourItem[];

  return (
    <section
      id="tours"
      className="relative py-24 lg:py-32 bg-[#080808] overflow-hidden"
      aria-labelledby="tours-heading"
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 80% 30%, rgba(251,191,36,0.04), transparent)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 lg:mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/25 bg-amber-500/8 text-amber-400 text-xs font-semibold tracking-widest uppercase mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            {ts("tours.badge")}
          </span>

          <h2
            id="tours-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-none tracking-tight"
          >
            <span className="text-white/90">{ts("tours.titleLine1")} </span>
            <span className="bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">
              {ts("tours.titleLine2")}
            </span>
          </h2>

          <p className="mt-5 text-white/40 text-base sm:text-lg font-light leading-relaxed max-w-xl">
            {ts("tours.description")}
          </p>
        </motion.div>

        {/* Tour cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {Array.isArray(items) &&
            items.map((tour, i) => {
              const Icon = ICON_MAP[tour.icon] ?? User;
              return (
                <motion.article
                  key={tour.id}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  className={cn(
                    "group relative p-6 rounded-2xl cursor-pointer",
                    "border border-white/[0.06] bg-white/[0.02]",
                    "hover:bg-white/[0.04] hover:border-amber-500/20",
                    "transition-all duration-400 hover:-translate-y-1",
                    "focus-within:border-amber-500/30"
                  )}
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />

                  <div className="relative">
                    {/* Icon */}
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 group-hover:bg-amber-500/15 flex items-center justify-center mb-5 transition-colors duration-300">
                      <Icon className="w-5 h-5 text-amber-400/70 group-hover:text-amber-400 transition-colors duration-300" />
                    </div>

                    <h3 className="text-white font-bold text-lg mb-2.5 leading-tight">
                      {tour.name}
                    </h3>

                    <p className="text-white/38 text-sm leading-relaxed mb-5">
                      {tour.description}
                    </p>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-white/28 mb-5">
                      <span className="flex items-center gap-1.5">
                        <Timer className="w-3.5 h-3.5 text-amber-400/50" />
                        {ts("tours.durationLabel")}: {tour.duration}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <UsersRound className="w-3.5 h-3.5 text-amber-400/50" />
                        {tour.groupSize}
                      </span>
                    </div>

                    {/* CTA */}
                    <button
                      onClick={() => scrollToSection("contact")}
                      className={cn(
                        "w-full py-2.5 rounded-xl text-sm font-semibold",
                        "border border-amber-500/18 text-amber-400/75",
                        "hover:bg-amber-500/10 hover:border-amber-500/35 hover:text-amber-300",
                        "transition-all duration-200",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40"
                      )}
                    >
                      {ts("tours.bookButton")}
                    </button>
                  </div>
                </motion.article>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default ToursSection;