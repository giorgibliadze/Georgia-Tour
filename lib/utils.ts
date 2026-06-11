import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * shadcn/ui standard class merge helper.
 * Combines clsx conditionals with Tailwind conflict resolution.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// ─── Destination image map ────────────────────────────────────────────────────
// Unsplash images keyed by destination id defined in locale files.

export const DESTINATION_IMAGES: Record<string, string> = {
  tbilisi:
    "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=600&q=80&auto=format&fit=crop",
  kazbegi:
    "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80&auto=format&fit=crop",
  kakheti:
    "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=80&auto=format&fit=crop",
  svaneti:
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80&auto=format&fit=crop",
  batumi:
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80&auto=format&fit=crop",
  borjomi:
    "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=80&auto=format&fit=crop",
  martvili:
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80&auto=format&fit=crop",
  gudauri:
    "https://images.unsplash.com/photo-1551524164-687a55dd1126?w=600&q=80&auto=format&fit=crop",
};

// ─── Globe scroll positions per section ──────────────────────────────────────

export const GLOBE_POSITIONS = [
  { x: 73, y: 50, scale: 1.35 }, // 0: hero
  { x: 22, y: 32, scale: 1.0  }, // 1: destinations
  { x: 78, y: 28, scale: 1.6  }, // 2: tours
  { x: 18, y: 58, scale: 1.45 }, // 3: about
  { x: 65, y: 62, scale: 0.85 }, // 4: contact
] as const;

export const SECTION_IDS = [
  "hero",
  "destinations",
  "tours",
  "about",
  "contact",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

// ─── Smooth scroll helper ─────────────────────────────────────────────────────

export function scrollToSection(id: SectionId): void {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
