"use client";

import React from "react";
import { MapPin, Phone, Mail, Heart } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { cn, scrollToSection } from "@/lib/utils";

interface FooterLink {
  label: string;
  href: string;
}

const Footer: React.FC = () => {
  const { t, ts, locale } = useI18n();

  // Pull typed arrays from translation with a safe cast
  const companyLinks = t("footer.companyLinks") as unknown as FooterLink[];
  const serviceLinks = t("footer.serviceLinks") as unknown as FooterLink[];
  const legalLinks   = t("footer.legalLinks")   as unknown as FooterLink[];

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#") && href.length > 1) {
      e.preventDefault();
      const id = href.slice(1) as Parameters<typeof scrollToSection>[0];
      scrollToSection(id);
    }
  };

  return (
    <footer className="relative bg-[#040404] border-t border-white/[0.06]">
      {/* Top decorative line */}
      <div className="h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-14 pb-10">

        {/* Main grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-10 mb-12">

          {/* Brand column */}
          <div className="col-span-2 sm:col-span-4 lg:col-span-2 space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-black font-black text-sm">
                GE
              </div>
              <span className="text-white font-semibold text-base">Georgia Tour</span>
            </div>

            <p className="text-white/30 text-sm leading-relaxed max-w-xs">
              {ts("footer.tagline")}
            </p>

            <div className="space-y-2.5 text-sm text-white/25">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-amber-500/40" />
                <span>{ts("footer.address")}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 flex-shrink-0 text-amber-500/40" />
                <span dir="ltr">{ts("footer.phone")}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 flex-shrink-0 text-amber-500/40" />
                <a
                  href={`mailto:${ts("footer.email")}`}
                  className="hover:text-white/50 transition-colors"
                >
                  {ts("footer.email")}
                </a>
              </div>
            </div>
          </div>

          {/* Company links */}
          <div>
            <h3 className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-5">
              {ts("footer.companyTitle")}
            </h3>
            <ul className="space-y-3">
              {Array.isArray(companyLinks) &&
                companyLinks.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      onClick={(e) => handleAnchorClick(e, link.href)}
                      className="text-white/30 hover:text-white/60 text-sm transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
            </ul>
          </div>

          {/* Service links */}
          <div>
            <h3 className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-5">
              {ts("footer.servicesTitle")}
            </h3>
            <ul className="space-y-3">
              {Array.isArray(serviceLinks) &&
                serviceLinks.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      onClick={(e) => handleAnchorClick(e, link.href)}
                      className="text-white/30 hover:text-white/60 text-sm transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h3 className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-5">
              {ts("footer.legalTitle")}
            </h3>
            <ul className="space-y-3">
              {Array.isArray(legalLinks) &&
                legalLinks.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      onClick={(e) => handleAnchorClick(e, link.href)}
                      className="text-white/30 hover:text-white/60 text-sm transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs text-center sm:text-left">
            {ts("footer.rights")}
          </p>
          <p className="flex items-center gap-1.5 text-white/20 text-xs">
            <Heart className="w-3 h-3 text-amber-500/40" aria-hidden />
            {ts("footer.madeWith")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;