"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const NAV_LINKS = [
  { label: "Inicio",      href: "#inicio" },
  { label: "Nosotros",    href: "#nosotros" },
  { label: "Propiedades", href: "#propiedades" },
  { label: "Testimonios", href: "#testimonios" },
];

export default function Navbar() {
  const headerRef          = useRef(null);
  const floatingLogoRef    = useRef(null);
  const navPillRef         = useRef(null);
  const navLogoWrapperRef  = useRef(null);
  const separatorRef       = useRef(null);

  useEffect(() => {
    /* ── Entrada inicial del header ── */
    gsap.fromTo(headerRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1.0, ease: "expo.out", delay: 0.4 }
    );

    /* ── Animación en scroll ── */
    const onScroll = () => {
      const p = Math.min(window.scrollY / 280, 1); // 0 → 1 en los primeros 280px

      /* Logo flotante: desaparece y sube */
      gsap.set(floatingLogoRef.current, {
        opacity:  Math.max(0, 1 - p * 2.2),
        scale:    1 - p * 0.12,
        y:        -p * 16,
      });

      /* Logo dentro del navbar: aparece con slide desde la izquierda */
      const logoProgress = Math.max(0, Math.min(1, (p - 0.35) * 3));
      gsap.set(navLogoWrapperRef.current, {
        maxWidth: `${logoProgress * 130}px`,
        opacity:   logoProgress,
      });

      /* Separador junto al logo interno */
      gsap.set(separatorRef.current, {
        opacity: logoProgress,
        maxWidth: `${logoProgress * 20}px`,
      });

      /* Navbar: glass → blanco sólido */
      if (p < 0.65) {
        navPillRef.current.style.background =
          `linear-gradient(135deg, rgba(255,255,255,${0.11 + p * 0.1}) 0%, rgba(255,255,255,${0.05 + p * 0.08}) 100%)`;
        navPillRef.current.style.backdropFilter  = `blur(${28 + p * 10}px)`;
        navPillRef.current.style.WebkitBackdropFilter = `blur(${28 + p * 10}px)`;
        navPillRef.current.style.border = "1px solid rgba(255,255,255,0.18)";
        navPillRef.current.style.boxShadow =
          `0 ${8 + p * 8}px ${40 + p * 20}px rgba(0,0,0,${0.28 + p * 0.12})`;
      } else {
        navPillRef.current.style.background    = "rgba(255,255,255,0.97)";
        navPillRef.current.style.backdropFilter = "blur(40px)";
        navPillRef.current.style.WebkitBackdropFilter = "blur(40px)";
        navPillRef.current.style.border        = "1px solid rgba(0,0,0,0.07)";
        navPillRef.current.style.boxShadow     = "0 4px 32px rgba(0,0,0,0.12)";
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 inset-x-0 z-[100] flex flex-col items-center pt-5 gap-2"
      style={{ opacity: 0 }}
    >
      {/* ── Logo flotante — protagonista ── */}
      <div ref={floatingLogoRef}>
        <img
          src="/rentahouse-maye.svg"
          alt="Rent-A-House"
          className="h-16 md:h-20 w-auto"
          style={{ filter: "drop-shadow(0 4px 24px rgba(0,0,0,0.45))" }}
          draggable="false"
        />
      </div>

      {/* ── Navbar pill — soporte visual ── */}
      <div
        ref={navPillRef}
        className="flex items-center gap-5 px-5 py-2.5 rounded-2xl transition-[box-shadow] duration-500"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.11) 0%, rgba(255,255,255,0.05) 100%)",
          border: "1px solid rgba(255,255,255,0.18)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.22)",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
        }}
      >
        {/* Logo interno — entra en scroll */}
        <div
          ref={navLogoWrapperRef}
          className="overflow-hidden shrink-0"
          style={{ maxWidth: 0, opacity: 0 }}
        >
          <img
            src="/rentahouse-maye.svg"
            alt="Rent-A-House"
            className="h-8 w-auto pr-1"
            draggable="false"
          />
        </div>

        {/* Separador logo interno / links */}
        <div
          ref={separatorRef}
          className="h-5 w-px shrink-0 overflow-hidden"
          style={{ maxWidth: 0, opacity: 0, background: "rgba(0,0,0,0.10)" }}
        />

        {/* Links */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="relative text-[9px] font-black uppercase tracking-[0.35em] transition-colors duration-300 group nav-link"
              style={{ color: "rgba(255,255,255,0.72)" }}
              onMouseEnter={e => { e.currentTarget.style.color = "white"; }}
              onMouseLeave={e => {
                const p = Math.min(window.scrollY / 280, 1);
                e.currentTarget.style.color = p > 0.65 ? "rgba(30,30,30,0.78)" : "rgba(255,255,255,0.72)";
              }}
            >
              {label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px rounded-full bg-current group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        <div className="h-5 w-px shrink-0" style={{ background: "rgba(255,255,255,0.15)" }} />

        {/* CTA — oscuro, discreto */}
        <a
          href="https://wa.me/584141210496"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-[8.5px] font-black uppercase tracking-[0.3em] px-5 py-2 rounded-xl text-white whitespace-nowrap transition-all duration-300 active:scale-95"
          style={{
            background: "linear-gradient(135deg, #7C1D1D 0%, #6B1A1A 100%)",
            boxShadow: "0 0 10px rgba(100,20,20,0.25)",
          }}
          onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 18px rgba(100,20,20,0.45)"; }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 0 10px rgba(100,20,20,0.25)"; }}
        >
          Contactar
        </a>
      </div>
    </header>
  );
}
