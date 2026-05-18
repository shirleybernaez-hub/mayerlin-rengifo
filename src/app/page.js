import HeroSection from "@/components/HeroSection";
import TextReveal from "@/components/TextReveal";
import PropertyGrid from "@/components/PropertyGrid";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      {/* Scene 1 — Cinematic hero with parallax depth */}
      <HeroSection />

      {/* Scene 2 — Lo más destacado: 6 cards parallax */}
      <PropertyGrid />

      {/* Scene 3 — Client testimonials */}
      <TestimonialsSection />

      {/* Scene 4 — Lead capture form + FAQ */}
      <ContactSection />

      {/* Scene 5 — Mayerlin Rengifo photo + quote (hidden) */}
      <div className="hidden">
        <TextReveal text="Los bienes no son sobre inmuebles, son sobre personas." />
      </div>

      {/* Scene 6 — Dark cinematic footer */}
      <Footer />
    </main>
  );
}
