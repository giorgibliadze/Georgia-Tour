import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_Georgian } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n";

// ─── Fonts ────────────────────────────────────────────────────────────────────

const inter = Inter({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const notoGeorgian = Noto_Sans_Georgian({
  subsets: ["georgian"],
  variable: "--font-georgian",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

// ─── Metadata ─────────────────────────────────────────────────────────────────
// Default is Georgian; individual pages can override via generateMetadata.

export const metadata: Metadata = {
  metadataBase: new URL("https://georgiatour.ge"),

  title: {
    default: "საქართველოს ტური — პრემიუმ ტურისტული სააგენტო",
    template: "%s | Georgia Tour",
  },
  description:
    "აღმოაჩინე საქართველო პროფესიონალ გიდებთან ერთად. პრემიუმ ტურები მთებში, ზღვაზე, ღვინის რეგიონებსა და ისტორიულ ადგილებში.",
  keywords: [
    "საქართველო",
    "ტური",
    "ტურიზმი",
    "კავკასია",
    "თბილისი",
    "ყაზბეგი",
    "კახეთი",
    "სვანეთი",
    "Georgia",
    "tour",
    "travel",
    "Caucasus",
    "Tbilisi",
    "Gruziya",
    "Грузия",
  ],
  authors: [{ name: "Georgia Tour", url: "https://georgiatour.ge" }],
  creator: "Georgia Tour",
  publisher: "Georgia Tour",

  openGraph: {
    type: "website",
    locale: "ka_GE",
    alternateLocale: ["en_US", "ru_RU"],
    url: "https://georgiatour.ge",
    siteName: "Georgia Tour",
    title: "საქართველოს ტური — დაუვიწყარი მოგზაურობა",
    description:
      "იმოგზაურე საქართველოს ულამაზეს კუთხეებში პროფესიონალ გიდებთან ერთად.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Georgia Tour — Premium Travel Agency",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Georgia Tour — Premium Travel Agency",
    description:
      "Discover Georgia with professional guides. Premium tours across mountains, wine regions and historic sites.",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "https://georgiatour.ge",
    languages: {
      "ka": "https://georgiatour.ge",
      "en": "https://georgiatour.ge/en",
      "ru": "https://georgiatour.ge/ru",
    },
  },

  icons: {
    icon:        "/favicon.ico",
    apple:       "/apple-touch-icon.png",
    shortcut:    "/favicon-32x32.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#060606",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// ─── Layout ───────────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ka"
      dir="ltr"
      className={`${inter.variable} ${notoGeorgian.variable}`}
      suppressHydrationWarning
    >
      <body
        className="font-sans antialiased bg-[#060606] text-white overflow-x-hidden"
        style={{ fontFamily: "var(--font-inter), var(--font-georgian), sans-serif" }}
      >
        <I18nProvider initialLocale="ka">{children}</I18nProvider>
      </body>
    </html>
  );
}
