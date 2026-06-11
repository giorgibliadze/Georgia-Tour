# Georgia Tour — Multilingual Premium Travel Website

A production-ready **Next.js 15** tourism website with Georgian, English and Russian support, animated globe scroll experience, Framer Motion, Tailwind CSS and shadcn/ui.

---

## 1. Initial Setup

Run these commands **exactly in order**:

```bash
# 1. Create Next.js project
npx create-next-app@latest georgia-tour \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir=false \
  --import-alias="@/*"

cd georgia-tour

# 2. Install runtime dependencies
npm install framer-motion lucide-react clsx tailwind-merge \
            class-variance-authority \
            @radix-ui/react-slot \
            @radix-ui/react-dropdown-menu \
            @radix-ui/react-dialog \
            @radix-ui/react-label \
            @radix-ui/react-select

# 3. Initialise shadcn/ui (choose "Default" style, "neutral" base color, YES to CSS variables)
npx shadcn@latest init

# 4. (Optional) add shadcn button/input components you want to extend
npx shadcn@latest add button input label select textarea
```

---

## 2. Folder Structure

Place every file exactly as shown:

```
georgia-tour/
├── app/
│   ├── globals.css          ← Tailwind base + design tokens
│   ├── layout.tsx           ← Root layout, I18nProvider, fonts, SEO
│   └── page.tsx             ← Composes all page sections
│
├── components/
│   ├── language-switcher.tsx   ← Dropdown language selector for navbar
│   ├── layout/
│   │   ├── navbar.tsx          ← Sticky navbar with active-section tracking
│   │   └── footer.tsx          ← Footer with columns + contact info
│   ├── sections/
│   │   ├── destinations.tsx    ← 8-card photo grid with hover effects
│   │   ├── tours.tsx           ← 6 tour cards with icon + meta
│   │   └── contact-form.tsx    ← Booking form with validation + success state
│   └── ui/
│       ├── globe.tsx           ← Rotating Earth sphere component
│       └── landing-page.tsx    ← Hero + About + fixed globe scroll logic
│
├── lib/
│   ├── i18n.ts              ← I18nProvider, useI18n hook, locale types
│   └── utils.ts             ← cn(), DESTINATION_IMAGES, GLOBE_POSITIONS
│
├── locales/
│   ├── ka.json              ← Georgian (default)
│   ├── en.json              ← English
│   └── ru.json              ← Russian
│
├── components.json          ← shadcn/ui config
├── next.config.ts           ← Image domains, security headers, compiler
├── tailwind.config.ts       ← Extended theme (colors, fonts, animations)
└── tsconfig.json            ← Strict TypeScript, @/* path alias
```

---

## 3. File-by-file placement guide

| File | Where to place | Why |
|---|---|---|
| `app/globals.css` | Replace the auto-generated one | Adds design tokens, globe keyframes, scrollbar |
| `app/layout.tsx` | Replace the auto-generated one | I18nProvider wraps entire app |
| `app/page.tsx` | Replace the auto-generated one | Imports and orders all sections |
| `components/ui/globe.tsx` | New file | Rotating Earth sphere |
| `components/ui/landing-page.tsx` | New file | Hero + About + scroll-globe logic |
| `components/layout/navbar.tsx` | Create `components/layout/` folder | Fixed sticky nav |
| `components/layout/footer.tsx` | Same folder | Footer |
| `components/sections/destinations.tsx` | Create `components/sections/` folder | Destinations grid |
| `components/sections/tours.tsx` | Same folder | Tours cards |
| `components/sections/contact-form.tsx` | Same folder | Booking form |
| `components/language-switcher.tsx` | `components/` root | Used inside navbar |
| `lib/i18n.ts` | Create `lib/` (if not present) | i18n context & hook |
| `lib/utils.ts` | Same folder (replaces shadcn's stub) | `cn()` + shared constants |
| `locales/ka.json` | Create `locales/` at project root | Georgian translations |
| `locales/en.json` | Same folder | English translations |
| `locales/ru.json` | Same folder | Russian translations |
| `tailwind.config.ts` | Replace auto-generated | Extended theme |
| `next.config.ts` | Replace auto-generated | Image domains + headers |
| `components.json` | Replace auto-generated | shadcn path config |

---

## 4. Development

```bash
npm run dev     # http://localhost:3000
npm run build   # Production build
npm run start   # Run production build locally
npm run lint    # ESLint check
```

---

## 5. Adding a language (e.g. Arabic)

1. Create `locales/ar.json` mirroring the structure of `ka.json`
2. In `lib/i18n.ts`:
   - Import: `import arRaw from "@/locales/ar.json";`
   - Add to `localeDict`: `ar: arRaw as unknown as TranslationDict`
   - Uncomment the Arabic entry in `LOCALE_OPTIONS`
3. Update `tsconfig.json` if needed (resolveJsonModule is already on)
4. Arabic is RTL — the `dir: "rtl"` in `LOCALE_OPTIONS` and the `setLocale` function handle `document.dir` automatically.

---

## 6. Connecting the contact form to a real backend

In `components/sections/contact-form.tsx`, replace the mock delay in `handleSubmit`:

```ts
// Replace this:
await new Promise<void>((resolve) => setTimeout(resolve, 1200));

// With a real API call:
const res = await fetch("/api/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(form),
});
if (!res.ok) throw new Error("Submission failed");
```

Create `app/api/contact/route.ts` to handle the POST and forward to your email provider (Resend, SendGrid, etc.).

---

## 7. Environment variables

Create `.env.local` (never commit it):

```env
# Example — add your own keys
NEXT_PUBLIC_SITE_URL=https://georgiatour.ge
RESEND_API_KEY=re_xxxxxxxxxxxx
```

---

## 8. Production checklist

- [ ] Replace `/public/og-image.jpg` (1200×630) with real brand photo
- [ ] Replace `/public/favicon.ico` and `/public/apple-touch-icon.png`
- [ ] Update `metadataBase` URL in `app/layout.tsx`
- [ ] Update phone/email/address in all three locale files
- [ ] Wire contact form to real API route
- [ ] Set `NEXT_PUBLIC_SITE_URL` in deployment environment
- [ ] Review `next.config.ts` CSP headers for your CDN

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 + shadcn/ui |
| Animation | Framer Motion 11 |
| Icons | lucide-react |
| Fonts | Inter + Noto Sans Georgian (Google Fonts) |
| i18n | Custom React context (no external library) |
| Images | Next.js `<Image />` + Unsplash |
