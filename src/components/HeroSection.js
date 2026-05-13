"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HeroSection() {
  const sectionRef  = useRef(null);
  const skyRef      = useRef(null);
  const brandRef    = useRef(null);
  const houseRef    = useRef(null);
  const contentRef  = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {

      /* ── ENTRANCE ── */
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl
        /* 1. Sky fades in + settles from slight zoom */
        .fromTo(skyRef.current,
          { scale: 1.1, opacity: 0 },
          { scale: 1, opacity: 1, duration: 2.2, ease: "power3.out" }
        )
        /* 2. Brand text rises + unblurs */
        .fromTo(brandRef.current,
          { y: 70, opacity: 0, filter: "blur(14px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.6 },
          "-=1.8"
        )
        /* 3. House slides up from below */
        .fromTo(houseRef.current,
          { y: 160, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.9, ease: "expo.out" },
          "-=1.4"
        )
        /* 4. Content fades in last */
        .fromTo(contentRef.current,
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 1.0, ease: "power2.out" },
          "-=0.9"
        );

      /* ── SCROLL PARALLAX (multi-layer depth) ── */
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.8,
        onUpdate(self) {
          const p = self.progress;
          // Sky moves slowest
          gsap.set(skyRef.current,     { y: p * 55 });
          // Brand text moves medium + fades
          gsap.set(brandRef.current,   { y: p * -35, opacity: Math.max(0, 1 - p * 1.6) });
          // House moves faster than sky, slower than content
          gsap.set(houseRef.current,   { y: p * -75 });
          // Content fades and moves fastest
          gsap.set(contentRef.current, { y: p * -115, opacity: Math.max(0, 1 - p * 2.4) });
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

      {/* ── LAYER 0: Sky background ── */}
      <div
        ref={skyRef}
        className="absolute inset-0 z-0 will-change-transform"
        style={{ opacity: 0 }}
      >
        <img
          src="/cielorentahouse.png"
          alt=""
          className="w-full h-full object-cover"
          draggable="false"
        />
      </div>

      {/* ── LAYER 1: "Rent-A-House" brand text (behind house) ── */}
      <div
        ref={brandRef}
        className="absolute z-10 inset-x-0 will-change-transform"
        style={{ top: "18%", opacity: 0 }}
        aria-hidden="true"
      >
        <img
          src="/rentahouse_transp.png"
          alt=""
          className="w-full"
          style={{ maxWidth: "92vw", margin: "0 auto", display: "block" }}
          draggable="false"
        />
      </div>

      {/* ── LAYER 2: Casa (transparent bg, in front of text) ── */}
      <div
        ref={houseRef}
        className="absolute z-20 inset-x-0 bottom-0 will-change-transform"
        style={{ opacity: 0 }}
      >
        <img
          src="/Casa_rentahouse.png"
          alt="Casa Rent-A-House"
          className="w-full object-contain object-bottom"
          style={{ maxHeight: "68vh" }}
          draggable="false"
        />
      </div>

      {/* ── LAYER 2b: Bottom gradient to blend house into scene ── */}
      <div
        className="absolute inset-x-0 bottom-0 z-[22] pointer-events-none"
        style={{
          height: "28%",
          background: "linear-gradient(to top, rgba(6,6,10,0.55) 0%, transparent 100%)",
        }}
      />

      {/* ── LAYER 3: Content — tagline + CTA ── */}
      <div
        ref={contentRef}
        className="absolute z-30 inset-x-0 bottom-10 flex flex-col items-center gap-4"
        style={{ opacity: 0 }}
      >
        <p className="text-[10px] md:text-[11px] uppercase tracking-[0.65em] text-white/85 font-bold">
          Asesoría inmobiliaria de alto nivel
        </p>
        <a
          href="#contacto"
          className="inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.28em] font-black px-9 py-3.5 rounded-full bg-[#E20613] text-white shadow-[0_4px_28px_rgba(226,6,19,0.5)] hover:bg-[#c00510] hover:shadow-[0_6px_36px_rgba(226,6,19,0.65)] transition-all duration-300 active:scale-95"
        >
          Contactar
        </a>
        <div className="mt-2 opacity-40">
          <div className="w-px h-7 bg-gradient-to-b from-white to-transparent mx-auto" />
        </div>
      </div>

    </section>
  );
}
