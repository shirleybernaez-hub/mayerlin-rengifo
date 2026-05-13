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

      {/* Scene 2 — Word illumination on black */}
      <TextReveal text="Los bienes raíces no son sobre casas, son sobre personas." />

      {/* Scene 3 — Property showcase with parallax cards */}
      <PropertyGrid />

      {/* Scene 4 — Client testimonials with floating depth */}
      <TestimonialsSection />

      {/* Scene 5 — Lead capture form + FAQ */}
      <ContactSection />

      {/* Scene 6 — Dark cinematic footer */}
      <Footer />
    </main>
  );
}
