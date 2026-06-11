"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n, LOCALE_OPTIONS, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  /** Whether to show the native language label (default: true on desktop) */
  showLabel?: boolean;
  className?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  showLabel = true,
  className,
}) => {
  const { locale, setLocale, currentOption } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const handleSelect = (code: Locale) => {
    setLocale(code);
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className={cn("relative", className)}>
      <button
        onClick={() => setIsOpen((v) => !v)}
        className={cn(
          "flex items-center gap-1.5 px-3 py-2 rounded-xl",
          "border border-white/10 bg-white/[0.04]",
          "text-white/70 hover:text-white hover:bg-white/[0.08]",
          "transition-all duration-200 text-sm font-medium",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50"
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Language: ${currentOption.nativeLabel}`}
      >
        <span className="text-base leading-none" aria-hidden="true">
          {currentOption.flag}
        </span>
        {showLabel && (
          <span className="hidden sm:inline">{currentOption.nativeLabel}</span>
        )}
        <ChevronDown
          className={cn(
            "w-3.5 h-3.5 text-white/40 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={cn(
              "absolute top-full right-0 mt-2 min-w-[160px]",
              "bg-[#0e0e0e]/96 backdrop-blur-xl",
              "border border-white/10 rounded-2xl overflow-hidden",
              "shadow-2xl shadow-black/50 z-50"
            )}
            role="listbox"
            aria-label="Select language"
          >
            {LOCALE_OPTIONS.map((option) => {
              const isActive = option.code === locale;
              return (
                <button
                  key={option.code}
                  role="option"
                  aria-selected={isActive}
                  onClick={() => handleSelect(option.code)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3",
                    "text-sm transition-colors duration-150 text-left",
                    isActive
                      ? "bg-amber-500/10 text-amber-400"
                      : "text-white/60 hover:bg-white/[0.05] hover:text-white"
                  )}
                >
                  <span className="text-base leading-none" aria-hidden="true">
                    {option.flag}
                  </span>
                  <span className="flex-1">{option.nativeLabel}</span>
                  {isActive && (
                    <Check className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
