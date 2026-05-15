"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HeroSection() {
  const sectionRef = useRef(null);
  const skyRef     = useRef(null);
  const houseRef   = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const searchRef  = useRef(null);
  const verMasRef  = useRef(null);
  const arrowRef   = useRef(null);

  const [operacion, setOperacion] = useState("venta");

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
        /* 3. Buscador liquid glass entra después de la quinta */
        .fromTo(searchRef.current,
          { opacity: 0, y: 36, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: "expo.out" },
          "-=0.3"
        )
        /* 4. Ver más */
        .fromTo(verMasRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.5"
        )
        /* 5. Flecha */
        .fromTo(arrowRef.current,
          { opacity: 0, y: -6 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.35"
        );

      /* Flecha rebota */
      gsap.to(arrowRef.current, {
        y: 7,
        repeat: -1,
        yoyo: true,
        duration: 0.9,
        ease: "power1.inOut",
        delay: 3.2,
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

          gsap.set(houseRef.current, { y: p * 45 });

          gsap.set(overlayRef.current, { opacity: 0.15 + p * 0.6 });

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
        className="absolute inset-x-0 bottom-0 z-20 pointer-events-none h-64"
        style={{ background: "linear-gradient(to top, rgba(4,4,6,0.85) 0%, transparent 100%)" }}
      />

      {/* ── Contenido ── */}
      <div
        ref={contentRef}
        className="absolute z-30 inset-x-0 bottom-6 flex flex-col items-center gap-5 px-4 md:px-8 will-change-transform"
      >

        {/* ── Buscador Liquid Glass ── */}
        <div
          ref={searchRef}
          className="w-full max-w-4xl"
          style={{ opacity: 0 }}
        >
          {/* Toggle Venta / Alquiler */}
          <div className="flex gap-1 mb-3 justify-center">
            {["venta", "alquiler"].map((op) => (
              <button
                key={op}
                onClick={() => setOperacion(op)}
                className="px-5 py-1.5 rounded-full text-[9px] uppercase tracking-[0.35em] font-black transition-all duration-300"
                style={{
                  background: operacion === op
                    ? "rgba(226,6,19,0.85)"
                    : "rgba(255,255,255,0.1)",
                  color: "white",
                  border: operacion === op
                    ? "1px solid rgba(226,6,19,0.6)"
                    : "1px solid rgba(255,255,255,0.15)",
                  backdropFilter: "blur(12px)",
                }}
              >
                {op}
              </button>
            ))}
          </div>

          {/* Panel glass */}
          <div
            className="w-full flex flex-col md:flex-row overflow-hidden rounded-2xl md:rounded-full"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.07) 100%)",
              border: "1px solid rgba(255,255,255,0.22)",
              boxShadow: "0 12px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.28), inset 0 -1px 0 rgba(0,0,0,0.12)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }}
          >
            {/* Tipo de inmueble */}
            <div
              className="flex-1 flex items-center gap-2 px-5 py-4 border-b md:border-b-0 md:border-r"
              style={{ borderColor: "rgba(255,255,255,0.12)" }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              <select
                className="w-full bg-transparent text-[9px] uppercase tracking-[0.25em] text-white/80 outline-none cursor-pointer appearance-none"
                style={{ WebkitAppearance: "none" }}
              >
                <option value="" className="text-neutral-900 bg-neutral-100">Tipo de inmueble</option>
                <option value="casa" className="text-neutral-900 bg-neutral-100">Casa</option>
                <option value="apartamento" className="text-neutral-900 bg-neutral-100">Apartamento</option>
                <option value="quinta" className="text-neutral-900 bg-neutral-100">Quinta</option>
                <option value="local" className="text-neutral-900 bg-neutral-100">Local comercial</option>
                <option value="terreno" className="text-neutral-900 bg-neutral-100">Terreno</option>
              </select>
            </div>

            {/* Ubicación */}
            <div
              className="flex-1 flex items-center gap-2 px-5 py-4 border-b md:border-b-0 md:border-r"
              style={{ borderColor: "rgba(255,255,255,0.12)" }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <input
                type="text"
                placeholder="Ubicación"
                className="w-full bg-transparent text-[9px] uppercase tracking-[0.25em] text-white/80 placeholder-white/35 outline-none"
              />
            </div>

            {/* Botón buscar */}
            <button
              className="flex items-center justify-center gap-2 px-8 py-4 font-black text-[9px] uppercase tracking-[0.3em] text-white transition-all duration-300 hover:brightness-110 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #E20613 0%, #b00410 100%)",
                boxShadow: "0 0 24px rgba(226,6,19,0.5)",
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              Buscar
            </button>
          </div>
        </div>

        {/* Ver más */}
        <div className="flex flex-col items-center gap-2">
          <a
            ref={verMasRef}
            href="#propiedades"
            className="text-[9px] uppercase tracking-[0.55em] text-white/70 font-bold hover:text-white transition-colors duration-300"
            style={{ opacity: 0 }}
          >
            Ver más
          </a>
          <div ref={arrowRef} style={{ opacity: 0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/50">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>

      </div>

    </section>
  );
}
