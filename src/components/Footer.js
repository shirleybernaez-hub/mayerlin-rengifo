"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Instagram } from "lucide-react";

const NAV = ["Inicio", "Nosotros", "Propiedades", "Testimonios"];
const MARQUEE_TEXT = "RENT-A-HOUSE · MAYERLIN RENGIFO · ASESORA INMOBILIARIA · CARACAS, VENEZUELA · ";

export default function Footer() {
  const sectionRef  = useRef(null);
  const megaRef     = useRef(null);
  const glowRef     = useRef(null);
  const shimmerRef  = useRef(null);
  const logoRef     = useRef(null);
  const accentRef   = useRef(null);
  const navRef      = useRef(null);
  const copyrightRef= useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {

      /* ── ENTRANCE TIMELINE ── */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 88%",
          once: true,
        },
        defaults: { ease: "expo.out" },
      });

      tl
        /* 1. Mega background text reveals from below */
        .fromTo(megaRef.current,
          { clipPath: "inset(0 0 100% 0)", opacity: 0 },
          { clipPath: "inset(0 0 0% 0)", opacity: 0.05, duration: 1.6 }
        )

        /* 2. Red shimmer sweeps across (one-shot) */
        .call(() => {
          if (shimmerRef.current) {
            shimmerRef.current.style.animation = "shimmer 1.4s ease-in-out forwards";
          }
        }, [], "-=0.6")

        /* 3. Logo emerges from blur */
        .fromTo(logoRef.current,
          { opacity: 0, scale: 0.82, filter: "blur(20px)" },
          { opacity: 0.93, scale: 1, filter: "blur(0px)", duration: 1.3 },
          "-=0.9"
        )

        /* 4. Red accent line sweeps */
        .fromTo(accentRef.current,
          { scaleX: 0, transformOrigin: "center" },
          { scaleX: 1, duration: 0.8, ease: "power3.out" },
          "-=0.7"
        )

        /* 5. Nav links stagger from below */
        .fromTo(navRef.current?.children ?? [],
          { opacity: 0, y: 22, filter: "blur(4px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", stagger: 0.08, duration: 0.7, ease: "power2.out" },
          "-=0.5"
        )

        /* 6. Copyright */
        .fromTo(copyrightRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          "-=0.3"
        )

        /* 7. After entrance: start continuous drift of mega text */
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
      className="relative bg-[#050505] overflow-hidden pt-28 pb-0 flex flex-col items-center text-white border-t border-white/[0.04]"
    >

      {/* ── LAYER 0: Red atmospheric glow (pulsing) ── */}
      <div
        ref={glowRef}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-[55%] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(226,6,19,0.12) 0%, transparent 70%)",
          animation: "glowPulse 4s ease-in-out infinite",
        }}
      />

      {/* ── LAYER 1: Mega background text ── */}
      <div
        ref={megaRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        style={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
        aria-hidden="true"
      >
        <span
          style={{
            fontSize: "clamp(90px, 17vw, 240px)",
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

      {/* ── LAYER 2: Shimmer sweep (one-shot on enter) ── */}
      <div
        ref={shimmerRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(105deg, transparent 35%, rgba(226,6,19,0.07) 50%, rgba(255,255,255,0.04) 55%, transparent 65%)",
          transform: "translateX(-200%) skewX(-20deg)",
        }}
        aria-hidden="true"
      />

      {/* ── CONTENT ── */}
      <div className="relative z-10 flex flex-col items-center w-full px-6 pb-12">

        {/* Logo */}
        <img
          ref={logoRef}
          src="/rentahouse-maye-blanco.png"
          alt="Rent-A-House Mayerlin Rengifo"
          className="h-[72px] w-auto mb-9"
          style={{ opacity: 0, filter: "brightness(0) invert(1)" }}
          draggable="false"
        />

        {/* Red accent */}
        <div
          ref={accentRef}
          className="w-24 h-px mb-9"
          style={{
            background: "linear-gradient(90deg, transparent, #E20613, transparent)",
            transform: "scaleX(0)",
          }}
        />

        {/* Nav */}
        <nav ref={navRef} className="flex flex-wrap justify-center gap-8 mb-10">
          {NAV.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[8px] uppercase tracking-[0.45em] font-bold text-white/20 hover:text-white/65 hover:tracking-[0.5em] transition-all duration-400"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/mayerlinrengifo.rah"
          target="_blank"
          rel="noopener noreferrer"
          className="mb-9 text-white/50 hover:text-white transition-colors duration-300"
          aria-label="Instagram"
        >
          <Instagram size={28} strokeWidth={1.4} />
        </a>

        {/* Thin separator */}
        <div className="w-full max-w-xs h-px mb-9 bg-white/[0.04]" />

        {/* Copyright */}
        <p
          ref={copyrightRef}
          className="text-[9px] uppercase tracking-[0.55em] font-light text-white/18 mb-16"
          style={{ opacity: 0 }}
        >
          © 2026 Rent-A-House · Mayerlin Rengifo
        </p>
      </div>

      {/* ── LAYER 3: Horizontal marquee — bottom edge ── */}
      <div className="relative w-full overflow-hidden border-t border-white/[0.04] py-3.5 bg-[#040404]">
        <div
          className="flex whitespace-nowrap"
          style={{
            animation: "marquee 17s linear infinite",
            width: "300%",
          }}
          aria-hidden="true"
        >
          {/* Repeated 3× for seamless loop */}
          {[0, 1, 2].map((n) => (
            <span
              key={n}
              className="text-[6px] font-black uppercase tracking-[0.35em] text-white/[0.09] pr-0"
              style={{ flex: "0 0 33.333%" }}
            >
              {MARQUEE_TEXT.repeat(6)}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
