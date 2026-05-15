"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const FieldBox = ({ label, children }) => (
  <div
    className="flex-1 flex flex-col gap-1.5 rounded-xl px-3 py-2.5 min-w-0"
    style={{
      background: "rgba(255,255,255,0.08)",
      border: "1px solid rgba(255,255,255,0.22)",
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
    }}
  >
    <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white/90 whitespace-nowrap">
      {label}
    </span>
    {children}
  </div>
);

const SelectBox = ({ label, options }) => (
  <FieldBox label={label}>
    <div className="relative flex items-center">
      <select
        className="w-full bg-transparent text-[10px] text-white/75 outline-none appearance-none cursor-pointer pr-6 leading-tight"
        style={{ WebkitAppearance: "none" }}
      >
        <option value="" className="text-neutral-900 bg-white">{label}</option>
        {options.map((o) => (
          <option key={o} value={o.toLowerCase()} className="text-neutral-900 bg-white">{o}</option>
        ))}
      </select>
      <svg
        className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none shrink-0"
        width="14" height="14" viewBox="0 0 24 24"
        fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2.5"
      >
        <polyline points="6 9 12 15 18 9"/>
      </svg>
    </div>
  </FieldBox>
);

const InputBox = ({ label, placeholder }) => (
  <FieldBox label={label}>
    <input
      type="text"
      placeholder={placeholder}
      className="w-full bg-transparent text-[10px] text-white/75 placeholder-white/35 outline-none leading-tight"
    />
  </FieldBox>
);

export default function HeroSection() {
  const sectionRef = useRef(null);
  const skyRef     = useRef(null);
  const houseRef   = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const searchRef  = useRef(null);
  const verMasRef  = useRef(null);
  const arrowRef   = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl
        .fromTo(skyRef.current,
          { scale: 1.12, filter: "brightness(0.5) blur(4px)" },
          { scale: 1.02, filter: "brightness(0.92) blur(0px)", duration: 2.4, ease: "power3.out" }
        )
        .fromTo(houseRef.current,
          { y: 90, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.5, ease: "expo.out" },
          "-=1.8"
        )
        .fromTo(searchRef.current,
          { opacity: 0, y: 36, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: "expo.out" },
          "-=0.3"
        )
        .fromTo(verMasRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.5"
        )
        .fromTo(arrowRef.current,
          { opacity: 0, y: -6 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.35"
        );

      gsap.to(arrowRef.current, {
        y: 7, repeat: -1, yoyo: true,
        duration: 0.9, ease: "power1.inOut", delay: 3.2,
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.6,
        onUpdate(self) {
          const p = self.progress;
          gsap.set(skyRef.current, {
            y: p * 100, scale: 1.02 + p * 0.04,
            filter: `brightness(${0.92 - p * 0.42}) blur(${p * 2}px)`,
          });
          gsap.set(houseRef.current, { y: p * 45 });
          gsap.set(overlayRef.current, { opacity: 0.15 + p * 0.6 });
          gsap.set(contentRef.current, {
            y: p * -80, opacity: Math.max(0, 1 - p * 2.2),
          });
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="inicio" ref={sectionRef} className="relative h-screen w-full overflow-hidden">

      {/* Cielo */}
      <div ref={skyRef} className="absolute inset-0 z-0 will-change-transform" style={{ transformOrigin: "center center" }}>
        <img src="/cielorentahouse.png" alt="" className="w-full h-full object-cover object-top" draggable="false" />
      </div>

      {/* Quinta */}
      <div ref={houseRef} className="absolute inset-x-0 bottom-0 z-10 will-change-transform" style={{ opacity: 0 }}>
        <img src="/quintahouse.png" alt="Rent-A-House" className="w-full object-contain object-bottom" draggable="false" />
      </div>

      {/* Viñeta */}
      <div ref={overlayRef} className="absolute inset-0 z-20 pointer-events-none" style={{ background: "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 20%, rgba(0,0,0,0.65) 100%)", opacity: 0.15 }} />

      {/* Degradado inferior */}
      <div className="absolute inset-x-0 bottom-0 z-20 pointer-events-none h-72" style={{ background: "linear-gradient(to top, rgba(4,4,6,0.92) 0%, transparent 100%)" }} />

      {/* Contenido — centrado verticalmente en la mitad inferior */}
      <div
        ref={contentRef}
        className="absolute z-30 inset-x-0 flex flex-col items-center gap-4 px-4 md:px-10 will-change-transform"
        style={{ top: "50%", transform: "translateY(-10%)" }}
      >

        {/* Buscador */}
        <div ref={searchRef} className="w-full max-w-5xl" style={{ opacity: 0 }}>
          <div
            className="w-full rounded-2xl p-3"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.06) 100%)",
              border: "1px solid rgba(255,255,255,0.22)",
              boxShadow: "0 16px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.28), inset 0 -1px 0 rgba(0,0,0,0.15)",
              backdropFilter: "blur(32px)",
              WebkitBackdropFilter: "blur(32px)",
            }}
          >
            {/* Fila 1 — 5 campos iguales */}
            <div className="flex flex-col md:flex-row gap-2 mb-2">
              <SelectBox label="Tipo de Propiedad" options={["Casa", "Apartamento", "Quinta", "Local Comercial", "Terreno", "Oficina"]} />
              <SelectBox label="Operación" options={["Venta", "Alquiler"]} />
              <SelectBox label="Ciudad" options={["Caracas", "Valencia", "Maracaibo", "Barquisimeto", "Maracay"]} />
              <SelectBox label="Urbanización" options={["La Castellana", "Los Chorros", "Country Club", "Altamira", "Las Mercedes"]} />
              <SelectBox label="Dormitorios" options={["1", "2", "3", "4", "5+"]} />
            </div>

            {/* Fila 2 — 4 campos + botón (mismo ancho que fila 1) */}
            <div className="flex flex-col md:flex-row gap-2">
              <SelectBox label="Baños" options={["1", "2", "3", "4", "5+"]} />
              <InputBox label="Precio Mínimo" placeholder="Precio Mínimo" />
              <InputBox label="Precio Máximo" placeholder="Precio Máximo" />
              <InputBox label="Código Flex" placeholder="Código Flex" />
              <button
                className="flex-1 flex items-center justify-center gap-2 rounded-xl px-6 font-black text-[10px] uppercase tracking-[0.3em] text-white transition-all duration-300 hover:brightness-110 active:scale-95 whitespace-nowrap"
                style={{
                  background: "linear-gradient(135deg, #E20613 0%, #b00410 100%)",
                  boxShadow: "0 0 28px rgba(226,6,19,0.5)",
                  minHeight: "52px",
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                Buscar
              </button>
            </div>
          </div>
        </div>

        {/* Ver más */}
        <div className="flex flex-col items-center gap-2 mt-2">
          <a ref={verMasRef} href="#propiedades" className="text-[9px] uppercase tracking-[0.55em] text-white/70 font-bold hover:text-white transition-colors duration-300" style={{ opacity: 0 }}>
            Ver más
          </a>
          <div ref={arrowRef} style={{ opacity: 0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/50">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </div>
        </div>

      </div>
    </section>
  );
}
