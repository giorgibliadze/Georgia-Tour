"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import kaRaw from "@/locales/ka.json";
import enRaw from "@/locales/en.json";
import ruRaw from "@/locales/ru.json";

// ─── Types ────────────────────────────────────────────────────────────────────

export type Locale = "ka" | "en" | "ru";
// Future: add "ar" | "he" when locale files are ready

export type TextDirection = "ltr" | "rtl";

export interface LocaleOption {
  code: Locale;
  label: string;
  nativeLabel: string;
  flag: string;
  dir: TextDirection;
}

export type TranslationDict = typeof kaRaw;

// ─── Locale Registry ──────────────────────────────────────────────────────────

export const LOCALE_OPTIONS: LocaleOption[] = [
  {
    code: "ka",
    label: "Georgian",
    nativeLabel: "ქართული",
    flag: "🇬🇪",
    dir: "ltr",
  },
  {
    code: "en",
    label: "English",
    nativeLabel: "English",
    flag: "🇬🇧",
    dir: "ltr",
  },
  {
    code: "ru",
    label: "Russian",
    nativeLabel: "Русский",
    flag: "🇷🇺",
    dir: "ltr",
  },
  // Uncomment when locale files are ready:
  // { code: "ar", label: "Arabic",  nativeLabel: "العربية", flag: "🇸🇦", dir: "rtl" },
  // { code: "he", label: "Hebrew",  nativeLabel: "עברית",   flag: "🇮🇱", dir: "rtl" },
];

const LOCALE_STORAGE_KEY = "gt_locale";
export const DEFAULT_LOCALE: Locale = "ka";

const localeDict: Record<Locale, TranslationDict> = {
  ka: kaRaw,
  en: enRaw as unknown as TranslationDict,
  ru: ruRaw as unknown as TranslationDict,
};

// ─── Deep-get helper ─────────────────────────────────────────────────────────

function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  const parts = path.split(".");
  let cur: unknown = obj;
  for (const part of parts) {
    if (cur === null || typeof cur !== "object") return path;
    cur = (cur as Record<string, unknown>)[part];
  }
  return cur ?? path;
}

// ─── Context ─────────────────────────────────────────────────────────────────

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => unknown;
  ts: (key: string) => string;
  dir: TextDirection;
  currentOption: LocaleOption;
}

const I18nContext = createContext<I18nContextValue | null>(null);

// ─── Provider ────────────────────────────────────────────────────────────────

export function I18nProvider({
  children,
  initialLocale = DEFAULT_LOCALE,
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  // Lazy initializer — reads localStorage only on the client, avoiding SSR mismatch
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === "undefined") return initialLocale;
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale | null;
    return stored && stored in localeDict ? stored : initialLocale;
  });

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    localStorage.setItem(LOCALE_STORAGE_KEY, next);
    const option = LOCALE_OPTIONS.find((o) => o.code === next);
    if (option && typeof document !== "undefined") {
      document.documentElement.lang = next;
      document.documentElement.dir = option.dir;
    }
  }, []);

  const t = useCallback(
    (key: string): unknown => {
      const dict = localeDict[locale] as unknown as Record<string, unknown>;
      return getNestedValue(dict, key);
    },
    [locale]
  );

  // Convenience helper for keys that are always strings (nav labels, headings, etc.)
  const ts = useCallback(
    (key: string): string => {
      const val = getNestedValue(
        localeDict[locale] as unknown as Record<string, unknown>,
        key
      );
      return typeof val === "string" ? val : String(val ?? key);
    },
    [locale]
  );

  const dir = useMemo<TextDirection>(() => {
    return LOCALE_OPTIONS.find((o) => o.code === locale)?.dir ?? "ltr";
  }, [locale]);

  const currentOption = useMemo(
    () => LOCALE_OPTIONS.find((o) => o.code === locale)!,
    [locale]
  );

  const value = useMemo<I18nContextValue>(
    () => ({ locale, setLocale, t, ts, dir, currentOption }),
    [locale, setLocale, t, ts, dir, currentOption]
  );

  return React.createElement(I18nContext.Provider, { value }, children);
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within an <I18nProvider>.");
  }
  return ctx;
}

// ─── Utility: locale-aware metadata builder ──────────────────────────────────

export function buildMetadata(locale: Locale) {
  const dict = localeDict[locale];
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    keywords: dict.meta.keywords,
    openGraph: {
      title: dict.meta.ogTitle,
      description: dict.meta.ogDescription,
      locale,
      type: "website" as const,
    },
  };
}