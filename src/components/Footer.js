"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Instagram, MapPin } from "lucide-react";

const NAV = [
  { label: "Inicio",      id: "inicio" },
  { label: "Nosotros",    id: "nosotros" },
  { label: "Propiedades", id: "propiedades" },
  { label: "Testimonios", id: "testimonios" },
];

export default function Footer() {
  const sectionRef   = useRef(null);
  const megaRef      = useRef(null);
  const glowRef      = useRef(null);
  const shimmerRef   = useRef(null);
  const logoRef      = useRef(null);
  const accentRef    = useRef(null);
  const navRef       = useRef(null);
  const copyrightRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 88%",
          once: true,
        },
        defaults: { ease: "expo.out" },
      });

      tl
        .fromTo(megaRef.current,
          { clipPath: "inset(0 0 100% 0)", opacity: 0 },
          { clipPath: "inset(0 0 0% 0)", opacity: 0.05, duration: 1.6 }
        )
        .call(() => {
          if (shimmerRef.current) {
            shimmerRef.current.style.animation = "shimmer 1.4s ease-in-out forwards";
          }
        }, [], "-=0.6")
        .fromTo(logoRef.current,
          { opacity: 0, scale: 0.82, filter: "blur(20px)" },
          { opacity: 0.93, scale: 1, filter: "blur(0px)", duration: 1.3 },
          "-=0.9"
        )
        .fromTo(accentRef.current,
          { scaleX: 0, transformOrigin: "center" },
          { scaleX: 1, duration: 0.8, ease: "power3.out" },
          "-=0.7"
        )
        .fromTo(navRef.current?.children ?? [],
          { opacity: 0, y: 22, filter: "blur(4px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", stagger: 0.08, duration: 0.7, ease: "power2.out" },
          "-=0.5"
        )
        .fromTo(copyrightRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          "-=0.3"
        )
        .call(() => {
          gsap.to(megaRef.current, {
            x: "-4%",
            duration: 22,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
        });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={sectionRef}
      className="relative overflow-hidden bg-black text-white px-5 sm:px-8 lg:px-[133px] pt-14 pb-12"
    >
      {/* Atmospheric glow */}
      <div
        ref={glowRef}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(226,6,19,0.12) 0%, transparent 70%)",
          animation: "glowPulse 4s ease-in-out infinite",
        }}
      />

      {/* Mega background text */}
      <div
        ref={megaRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        style={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
        aria-hidden="true"
      >
        <span
          style={{
            fontSize: "clamp(60px, 12vw, 180px)",
            fontFamily: "'Georgia', serif",
            fontStyle: "italic",
            fontWeight: 900,
            color: "white",
            whiteSpace: "nowrap",
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          RENT-A-HOUSE
        </span>
      </div>

      {/* Shimmer sweep */}
      <div
        ref={shimmerRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(105deg, transparent 35%, rgba(226,6,19,0.07) 50%, rgba(255,255,255,0.04) 55%, transparent 65%)",
          transform: "translateX(-200%) skewX(-20deg)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center w-full">

        {/* Logo */}
        <img
          ref={logoRef}
          src="/rentahouse-maye-blanco.png"
          alt="Rent-A-House Mayerlin Rengifo"
          className="h-16 w-auto mb-7"
          style={{ opacity: 0, filter: "brightness(0) invert(1)" }}
          draggable="false"
        />

        {/* Red accent */}
        <div
          ref={accentRef}
          className="w-20 h-px mb-7"
          style={{
            background: "linear-gradient(90deg, transparent, #E20613, transparent)",
            transform: "scaleX(0)",
          }}
        />

        {/* Nav */}
        <nav ref={navRef} className="flex flex-wrap justify-center gap-6 mb-8">
          {NAV.map(({ label, id }) => (
            <a
              key={id}
              href={`#${id}`}
              className="text-[11px] uppercase tracking-[0.4em] font-bold text-white/40 hover:text-white/80 hover:tracking-[0.45em] transition-all duration-400"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/mayerlinrengifo.rah"
          target="_blank"
          rel="noopener noreferrer"
          className="mb-7 text-white/50 hover:text-white transition-colors duration-300"
          aria-label="Instagram"
        >
          <Instagram size={24} strokeWidth={1.4} />
        </a>

        {/* Location */}
        <div className="flex items-start gap-2 mb-7 text-white/40 max-w-xs text-center">
          <MapPin size={13} strokeWidth={1.5} className="shrink-0 mt-0.5 text-[#E20613]" />
          <p className="text-[10px] leading-relaxed font-light tracking-wide">
            Caracas, Venezuela<br />
            Calle El Recreo Torre Movilnet<br />
            Piso 10 Ofic. 10-02
          </p>
        </div>

        {/* Thin separator */}
        <div className="w-full max-w-xs h-px mb-7 bg-white/[0.04]" />

        {/* Copyright */}
        <p
          ref={copyrightRef}
          className="text-[9px] uppercase tracking-[0.55em] font-light text-white/30"
          style={{ opacity: 0 }}
        >
          © 2026 Rent-A-House · Mayerlin Rengifo
        </p>

      </div>
    </footer>
  );
}
