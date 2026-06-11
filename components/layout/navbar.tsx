"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { cn, scrollToSection, type SectionId } from "@/lib/utils";
import LanguageSwitcher from "@/components/language-switcher";

const NAV_LINKS: { key: string; section: SectionId }[] = [
  { key: "nav.home",         section: "hero"         },
  { key: "nav.destinations", section: "destinations" },
  { key: "nav.tours",        section: "tours"        },
  { key: "nav.about",        section: "about"        },
  { key: "nav.contact",      section: "contact"      },
];

const Navbar: React.FC = () => {
  const { ts: t } = useI18n();
  const [scrolled, setScrolled]       = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("hero");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 48);

      // Highlight active nav section
      const sections: SectionId[] = ["hero", "destinations", "tours", "about", "contact"];
      const viewportMid = window.innerHeight / 2;
      let best: SectionId = "hero";
      let minDist = Infinity;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const dist = Math.abs(rect.top + rect.height / 2 - viewportMid);
        if (dist < minDist) {
          minDist = dist;
          best = id;
        }
      }
      setActiveSection(best);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (section: SectionId) => {
    scrollToSection(section);
    setMobileOpen(false);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-[#080808]/90 backdrop-blur-xl border-b border-white/[0.06] shadow-2xl shadow-black/40"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Logo */}
            <button
              onClick={() => handleNavClick("hero")}
              className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50 rounded-lg"
              aria-label="Georgia Tour — go to top"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-black font-black text-sm shadow-lg shadow-amber-500/25 group-hover:shadow-amber-500/40 transition-shadow">
                GE
              </div>
              <span className="hidden sm:block text-white font-semibold text-base tracking-wide">
                Georgia Tour
              </span>
            </button>

            {/* Desktop nav links */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {NAV_LINKS.map(({ key, section }) => (
                <button
                  key={section}
                  onClick={() => handleNavClick(section)}
                  className={cn(
                    "relative px-4 py-2 text-sm rounded-xl transition-all duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50",
                    activeSection === section
                      ? "text-white"
                      : "text-white/50 hover:text-white/80 hover:bg-white/[0.04]"
                  )}
                >
                  {t(key)}
                  {activeSection === section && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-amber-400"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2 sm:gap-3">
              <LanguageSwitcher />

              <button
                onClick={() => handleNavClick("contact")}
                className={cn(
                  "hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl",
                  "bg-amber-500 hover:bg-amber-400 active:bg-amber-600",
                  "text-black text-sm font-bold transition-all duration-200",
                  "shadow-lg shadow-amber-500/20 hover:shadow-amber-500/35 hover:scale-[1.02] active:scale-[0.98]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                )}
              >
                {t("nav.bookTour")}
              </button>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen((v) => !v)}
                className={cn(
                  "lg:hidden p-2 rounded-xl text-white/60 hover:text-white",
                  "hover:bg-white/[0.06] transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50"
                )}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
              "fixed top-16 inset-x-0 z-40 lg:hidden",
              "bg-[#080808]/96 backdrop-blur-xl border-b border-white/[0.06]",
              "shadow-2xl shadow-black/50 px-5 py-4 space-y-1"
            )}
          >
            {NAV_LINKS.map(({ key, section }) => (
              <button
                key={section}
                onClick={() => handleNavClick(section)}
                className={cn(
                  "block w-full text-left px-4 py-3 rounded-xl text-sm transition-colors",
                  activeSection === section
                    ? "text-amber-400 bg-amber-500/10"
                    : "text-white/60 hover:text-white hover:bg-white/[0.05]"
                )}
              >
                {t(key)}
              </button>
            ))}
            <div className="pt-2">
              <button
                onClick={() => handleNavClick("contact")}
                className="w-full py-3 rounded-xl bg-amber-500 text-black font-bold text-sm text-center transition-colors hover:bg-amber-400"
              >
                {t("nav.bookTour")}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;