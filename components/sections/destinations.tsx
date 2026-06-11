"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { cn, DESTINATION_IMAGES } from "@/lib/utils";

interface DestinationItem {
  id: string;
  name: string;
  tagline: string;
}

const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const DestinationsSection: React.FC = () => {
  const { t, ts } = useI18n();

  const items = t("destinations.items") as DestinationItem[];
  const exploreLabel = ts("destinations.exploreLabel");

  return (
    <section
      id="destinations"
      className="relative py-24 lg:py-32 bg-[#060606] overflow-hidden"
      aria-labelledby="destinations-heading"
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 20% 50%, rgba(251,191,36,0.03), transparent)",
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
            {ts("destinations.badge")}
          </span>

          <h2
            id="destinations-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-none tracking-tight"
          >
            <span className="text-white/90">{ts("destinations.titleLine1")} </span>
            <span className="bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">
              {ts("destinations.titleLine2")}
            </span>
          </h2>

          <p className="mt-5 text-white/40 text-base sm:text-lg font-light leading-relaxed max-w-xl">
            {ts("destinations.description")}
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
        >
          {Array.isArray(items) &&
            items.map((dest) => (
              <motion.div
                key={dest.id}
                variants={cardVariants}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer"
                role="article"
                aria-label={dest.name}
              >
                {/* Photo */}
                <Image
                  src={DESTINATION_IMAGES[dest.id] ?? DESTINATION_IMAGES.tbilisi}
                  alt={dest.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
                  loading="lazy"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                {/* Hover tint */}
                <div className="absolute inset-0 bg-amber-500/0 group-hover:bg-amber-500/6 transition-colors duration-500" />

                {/* Border */}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-white/0 group-hover:ring-amber-400/20 transition-all duration-500" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                  <p className="text-white font-bold text-sm sm:text-base leading-tight">
                    {dest.name}
                  </p>
                  <p className="text-amber-400/70 text-xs mt-1">{dest.tagline}</p>

                  <div
                    className={cn(
                      "flex items-center gap-1 text-white/40 text-xs mt-2.5",
                      "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0",
                      "transition-all duration-300"
                    )}
                  >
                    {exploreLabel}
                    <ArrowUpRight className="w-3 h-3" />
                  </div>
                </div>
              </motion.div>
            ))}
        </motion.div>
      </div>
    </section>
  );
};

export default DestinationsSection;