"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HeroSection() {
  const sectionRef   = useRef(null);
  const bgRef        = useRef(null);
  const vignetteRef  = useRef(null);
  const dustRef      = useRef(null);
  const contentRef   = useRef(null);
  const titleRef     = useRef(null);
  const taglineRef   = useRef(null);
  const lineRef      = useRef(null);
  const filterRef    = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {

      /* ── ENTRANCE: Camera settles from deep zoom ── */
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl
        .fromTo(bgRef.current,
          { scale: 1.22, filter: "brightness(0.2) blur(8px)" },
          { scale: 1.06, filter: "brightness(0.65) blur(0px)", duration: 2.8 }
        )
        .fromTo(titleRef.current,
          { opacity: 0, y: 90, filter: "blur(12px)" },
          { opacity: 1, y: 0,  filter: "blur(0px)",  duration: 1.6, ease: "expo.out" },
          "-=2.2"
        )
        .fromTo(taglineRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0,  duration: 0.9 },
          "-=0.9"
        )
        .fromTo(lineRef.current,
          { scaleY: 0, opacity: 0, transformOrigin: "top center" },
          { scaleY: 1, opacity: 0.45, duration: 0.7 },
          "-=0.5"
        )
        .fromTo(filterRef.current,
          { opacity: 0, y: 42 },
          { opacity: 1, y: 0,  duration: 0.85 },
          "-=0.3"
        );

      /* ── SCROLL: Multi-layer cinematic parallax ── */
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.8,
        onUpdate(self) {
          const p       = self.progress;
          const scrollY = self.scroll();

          // Layer 0 — background: scale + parallax using scroll-driven formula
          gsap.set(bgRef.current, {
            scale:  1 + scrollY * 0.0005,
            y:      scrollY * 0.1,
            filter: `brightness(${0.65 - p * 0.35}) blur(${p * 2}px)`,
          });

          // Layer 1 — cinematic vignette deepens
          gsap.set(vignetteRef.current, {
            opacity: 0.25 + p * 0.65,
          });

          // Layer 2 — dust/depth haze moves mid-speed
          gsap.set(dustRef.current, {
            y:       p * 100,
            opacity: p * 0.18,
          });

          // Layer 3 — foreground content floats up & fades (fastest layer)
          gsap.set(contentRef.current, {
            y:       p * -90,
            opacity: Math.max(0, 1 - p * 1.8),
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
      className="relative h-[115vh] w-full overflow-hidden flex items-center justify-center text-center px-6"
    >
      {/* ── LAYER 0: Background image ── */}
      <div
        ref={bgRef}
        className="absolute inset-[-8%] z-0 will-change-transform"
        style={{ transformOrigin: "center center" }}
      >
        <img
          src="/hero_caracas.webp"
          alt="Caracas"
          className="w-full h-full object-cover"
          draggable="false"
        />
      </div>

      {/* ── LAYER 1: Cinematic vignette (radial dark edges) ── */}
      <div
        ref={vignetteRef}
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 40%, transparent 10%, rgba(0,0,0,0.72) 100%)",
          opacity: 0.25,
        }}
      />

      {/* ── LAYER 1b: Base dark overlay ── */}
      <div className="absolute inset-0 z-[1] bg-black/20 pointer-events-none" />

      {/* ── LAYER 2: Depth haze / dust ── */}
      <div
        ref={dustRef}
        className="absolute inset-0 z-[3] pointer-events-none will-change-transform"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.55) 100%)",
          opacity: 0,
        }}
      />

      {/* ── LAYER 3: Foreground content ── */}
      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-6xl mt-24 will-change-transform"
      >
        {/* GHOST HEADLINE */}
        <h1
          ref={titleRef}
          className="opacity-0 text-[clamp(52px,9vw,110px)] font-serif italic text-white tracking-tighter leading-[0.88]"
          style={{ textShadow: "0 4px 60px rgba(0,0,0,0.5)" }}
        >
          Tu próximo <br />
          <span className="text-white/35">capítulo comienza aquí.</span>
        </h1>

        {/* TAGLINE */}
        <p
          ref={taglineRef}
          className="opacity-0 mt-9 text-[10px] md:text-[11px] uppercase tracking-[0.65em] text-white/80 font-bold"
        >
          Asesoría inmobiliaria de alto nivel
        </p>

        {/* VERTICAL LINE */}
        <div ref={lineRef} className="flex justify-center mt-12 opacity-0">
          <div className="w-px h-20 bg-gradient-to-b from-white via-white/40 to-transparent" />
        </div>

        {/* SEARCH FILTER */}
        <div
          ref={filterRef}
          className="opacity-0 w-full rounded-2xl mt-10 overflow-hidden"
          style={{
            background: "rgba(8,8,16,0.55)",
            backdropFilter: "blur(28px) saturate(1.4)",
            WebkitBackdropFilter: "blur(28px) saturate(1.4)",
            border: "1px solid rgba(255,255,255,0.13)",
            boxShadow: "0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          {/* Top shimmer line */}
          <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)" }} />
          <div className="p-6 md:p-7">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-y-5 gap-x-4">
              <FilterField label="Tipo de Propiedad" />
              <FilterField label="Operación" />
              <FilterField label="Ciudad" />
              <FilterField label="Urbanización" />
              <FilterField label="Dormitorios" />
              <FilterField label="Baños" />
              <FilterField label="Precio Mínimo" />
              <FilterField label="Precio Máximo" />
              <FilterField label="Código Flex" />
              <div className="flex items-end">
                <button className="w-full bg-[#E20613] text-white font-black uppercase text-[10px] tracking-[0.2em] h-11 rounded-xl hover:bg-[#c00510] transition-all duration-300 active:scale-95 shadow-[0_0_24px_rgba(226,6,19,0.45)]">
                  Buscar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FilterField({ label }) {
  return (
    <div className="flex flex-col gap-1.5 text-left">
      <label className="text-[8px] font-black uppercase tracking-[0.25em] text-white/45">
        {label}
      </label>
      <div className="relative">
        <select
          className="w-full text-white/90 text-[11px] h-10 px-3 pr-7 rounded-xl outline-none appearance-none cursor-pointer transition-all duration-200 focus:ring-1 focus:ring-white/20"
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.14)",
          }}
          onFocus={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.14)"; e.currentTarget.style.border = "1px solid rgba(255,255,255,0.28)"; }}
          onBlur={(e)  => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.border = "1px solid rgba(255,255,255,0.14)"; }}
        >
          <option style={{ background: "#101018", color: "#fff" }} value="">{label}</option>
        </select>
        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-white/40 text-[7px]">
          ▼
        </div>
      </div>
    </div>
  );
}
