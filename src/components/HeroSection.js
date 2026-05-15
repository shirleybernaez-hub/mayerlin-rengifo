"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HeroSection() {
  const sectionRef = useRef(null);
  const skyRef     = useRef(null);
  const houseRef   = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const verMasRef  = useRef(null);
  const arrowRef   = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {

      /* ── ENTRANCE ── */
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl
        /* 1. Cielo */
        .fromTo(skyRef.current,
          { scale: 1.12, filter: "brightness(0.5) blur(4px)" },
          { scale: 1.02, filter: "brightness(0.92) blur(0px)", duration: 2.4, ease: "power3.out" }
        )
        /* 2. Quinta sube con fade-in */
        .fromTo(houseRef.current,
          { y: 90, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.5, ease: "expo.out" },
          "-=1.8"
        )
        /* 3. Texto "Ver más" */
        .fromTo(verMasRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1.0 },
          "-=0.7"
        )
        /* 4. Flecha aparece */
        .fromTo(arrowRef.current,
          { opacity: 0, y: -8 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        );

      /* Flecha rebota continuamente */
      gsap.to(arrowRef.current, {
        y: 8,
        repeat: -1,
        yoyo: true,
        duration: 0.9,
        ease: "power1.inOut",
        delay: 2.8,
      });

      /* ── PARALLAX ON SCROLL ── */
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.6,
        onUpdate(self) {
          const p = self.progress;

          gsap.set(skyRef.current, {
            y:      p * 100,
            scale:  1.02 + p * 0.04,
            filter: `brightness(${0.92 - p * 0.42}) blur(${p * 2}px)`,
          });

          gsap.set(houseRef.current, {
            y: p * 45,
          });

          gsap.set(overlayRef.current, {
            opacity: 0.15 + p * 0.6,
          });

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

      {/* ── Capa 1: Cielo ── */}
      <div
        ref={skyRef}
        className="absolute inset-0 z-0 will-change-transform"
        style={{ transformOrigin: "center center" }}
      >
        <img
          src="/cielorentahouse.png"
          alt=""
          className="w-full h-full object-cover object-top"
          draggable="false"
        />
      </div>

      {/* ── Capa 2: Quinta ── */}
      <div
        ref={houseRef}
        className="absolute inset-x-0 bottom-0 z-10 will-change-transform"
        style={{ opacity: 0 }}
      >
        <img
          src="/quintahouse.png"
          alt="Rent-A-House"
          className="w-full object-contain object-bottom"
          draggable="false"
        />
      </div>

      {/* ── Viñeta ── */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 20%, rgba(0,0,0,0.65) 100%)",
          opacity: 0.15,
        }}
      />

      {/* ── Degradado inferior ── */}
      <div
        className="absolute inset-x-0 bottom-0 z-20 pointer-events-none h-52"
        style={{ background: "linear-gradient(to top, rgba(4,4,6,0.75) 0%, transparent 100%)" }}
      />

      {/* ── Contenido ── */}
      <div
        ref={contentRef}
        className="absolute z-30 inset-x-0 bottom-10 flex flex-col items-center gap-3 px-6 will-change-transform"
      >
        <a
          ref={verMasRef}
          href="#propiedades"
          className="text-[10px] md:text-[11px] uppercase tracking-[0.55em] text-white/80 font-bold hover:text-white transition-colors duration-300"
          style={{ opacity: 0 }}
        >
          Ver más
        </a>

        <div ref={arrowRef} style={{ opacity: 0 }}>
          <svg
            width="18" height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white/60"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

    </section>
  );
}
