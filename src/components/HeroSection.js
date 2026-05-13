"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HeroSection() {
  const sectionRef = useRef(null);
  const bgRef      = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const taglineRef = useRef(null);
  const ctaRef     = useRef(null);
  const lineRef    = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {

      /* ── ENTRANCE ── */
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl
        /* 1. Image settles from zoom */
        .fromTo(bgRef.current,
          { scale: 1.18, filter: "brightness(0.3) blur(6px)" },
          { scale: 1.05, filter: "brightness(0.88) blur(0px)", duration: 2.6, ease: "power3.out" }
        )
        /* 2. Tagline rises */
        .fromTo(taglineRef.current,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 1.0 },
          "-=1.0"
        )
        /* 3. CTA fades */
        .fromTo(ctaRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.9 },
          "-=0.6"
        )
        /* 4. Scroll line */
        .fromTo(lineRef.current,
          { scaleY: 0, opacity: 0, transformOrigin: "top center" },
          { scaleY: 1, opacity: 0.5, duration: 0.7 },
          "-=0.4"
        );

      /* ── PARALLAX ON SCROLL ── */
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.6,
        onUpdate(self) {
          const p = self.progress;

          // Background moves slower than scroll (parallax depth)
          gsap.set(bgRef.current, {
            y:      p * 120,
            scale:  1.05 + p * 0.04,
            filter: `brightness(${0.88 - p * 0.38}) blur(${p * 2.5}px)`,
          });

          // Overlay deepens
          gsap.set(overlayRef.current, {
            opacity: 0.15 + p * 0.6,
          });

          // Content floats up and fades faster
          gsap.set(contentRef.current, {
            y:       p * -80,
            opacity: Math.max(0, 1 - p * 2.2),
          });
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
    >

      {/* ── Hero image with parallax ── */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 will-change-transform"
        style={{ transformOrigin: "center center" }}
      >
        <img
          src="/herorentahouse.jpg"
          alt="Rent-A-House"
          className="w-full h-full object-cover object-center"
          draggable="false"
        />
      </div>

      {/* ── Cinematic vignette ── */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 20%, rgba(0,0,0,0.65) 100%)",
          opacity: 0.15,
        }}
      />

      {/* ── Bottom gradient ── */}
      <div
        className="absolute inset-x-0 bottom-0 z-10 pointer-events-none h-52"
        style={{ background: "linear-gradient(to top, rgba(4,4,6,0.75) 0%, transparent 100%)" }}
      />

      {/* ── Content ── */}
      <div
        ref={contentRef}
        className="absolute z-20 inset-x-0 bottom-10 flex flex-col items-center gap-5 px-6 will-change-transform"
      >
        <p
          ref={taglineRef}
          className="text-[10px] md:text-[11px] uppercase tracking-[0.65em] text-white/85 font-bold"
          style={{ opacity: 0 }}
        >
          Asesoría inmobiliaria de alto nivel
        </p>

        <a
          ref={ctaRef}
          href="#contacto"
          className="inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.28em] font-black px-9 py-3.5 rounded-full bg-[#E20613] text-white shadow-[0_4px_28px_rgba(226,6,19,0.55)] hover:bg-[#c00510] hover:shadow-[0_6px_36px_rgba(226,6,19,0.7)] transition-all duration-300 active:scale-95"
          style={{ opacity: 0 }}
        >
          Contactar
        </a>

        <div ref={lineRef} style={{ opacity: 0 }}>
          <div className="w-px h-7 bg-gradient-to-b from-white to-transparent mx-auto" />
        </div>
      </div>

    </section>
  );
}
