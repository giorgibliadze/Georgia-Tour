
import Navbar              from "@/components/layout/navbar";
import Footer              from "@/components/layout/footer";
import LandingPage         from "@/components/ui/landing-page";
import DestinationsSection from "@/components/sections/destinations";
import ToursSection        from "@/components/sections/tours";
import ContactForm         from "@/components/sections/contact-form";


// ─── SEO metadata ─────────────────────────────────────────────────────────────
// Default Georgian locale metadata; switch to user-preferred locale
// via cookies/headers in a production multilingual App Router setup.



// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-[#060606] overflow-x-hidden">
      {/* Fixed navigation */}
      <Navbar />

      {/*
        LandingPage renders:
          - Fixed globe (scroll-driven position)
          - Fixed progress bar
          - Fixed dot navigation
          - #hero section
          - #about section
        It owns these two sections because they share the globe context.
      */}
      <LandingPage />

      {/* Individual page sections */}
      <DestinationsSection />
      <ToursSection />
      <ContactForm />

      {/* Footer */}
      <Footer />
    </main>
  );
}
