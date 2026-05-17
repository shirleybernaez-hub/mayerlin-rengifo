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
  const overlayRef   = useRef(null);
  const introLogoRef = useRef(null);
  const glowRef      = useRef(null);
  const navRef       = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (overlayRef.current) {
          overlayRef.current.style.pointerEvents = "none";
          overlayRef.current.style.display = "none";
        }
      },
    });

    tl
      /* 1. Logo aparece en centro — fade + escala desde abajo */
      .fromTo(introLogoRef.current,
        { opacity: 0, scale: 0.72, y: 28 },
        { opacity: 1, scale: 1,    y: 0,  duration: 1.5, ease: "expo.out" }
      )
      /* 2. Brillo radial detrás del logo */
      .fromTo(glowRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1,   duration: 1.0, ease: "power2.out" },
        "<+0.2"
      )
      /* 3. Flotación suave */
      .to(introLogoRef.current,
        { y: -12, duration: 1.1, ease: "sine.inOut", yoyo: true, repeat: 1 },
        "+=0.7"
      )
      /* 4. Logo se eleva y desaparece hacia el navbar */
      .to(introLogoRef.current,
        { opacity: 0, scale: 0.55, y: -90, duration: 1.0, ease: "power3.in" },
        "+=0.2"
      )
      /* 5. Overlay se desvanece */
      .to(overlayRef.current,
        { opacity: 0, duration: 0.85, ease: "power2.inOut" },
        "<+0.1"
      )
      /* 6. Navbar entra desde arriba */
      .fromTo(navRef.current,
        { opacity: 0, y: -28, scale: 0.95 },
        { opacity: 1, y: 0,   scale: 1,    duration: 1.0, ease: "expo.out" },
        "<+0.25"
      );
  }, []);

  return (
    <>
      {/* ── Overlay intro ── */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[200] flex items-center justify-center"
        style={{ background: "rgba(3,3,7,0.97)" }}
      >
        {/* Glow radial */}
        <div
          ref={glowRef}
          className="absolute pointer-events-none"
          style={{
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(226,6,19,0.13) 0%, transparent 70%)",
            filter: "blur(55px)",
            opacity: 0,
          }}
        />

        {/* Tarjeta glass con logo */}
        <div
          ref={introLogoRef}
          className="relative"
          style={{ opacity: 0 }}
        >
          <div
            className="px-16 py-12 rounded-[2rem]"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.03) 100%)",
              border: "1px solid rgba(255,255,255,0.14)",
              boxShadow: [
                "0 40px 100px rgba(0,0,0,0.55)",
                "inset 0 1px 0 rgba(255,255,255,0.18)",
                "inset 0 -1px 0 rgba(0,0,0,0.12)",
                "0 0 80px rgba(226,6,19,0.07)",
              ].join(", "),
              backdropFilter: "blur(28px)",
              WebkitBackdropFilter: "blur(28px)",
            }}
          >
            <img
              src="/rentahouse-maye.svg"
              alt="Rent-A-House"
              className="h-28 md:h-36 w-auto"
              draggable="false"
            />
          </div>
        </div>
      </div>

      {/* ── Navbar flotante glassmorphism ── */}
      <header
        ref={navRef}
        className="fixed top-5 inset-x-0 z-[100] flex justify-center px-4"
        style={{ opacity: 0 }}
      >
        <div
          className="flex items-center gap-6 px-6 py-3 rounded-full"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.11) 0%, rgba(255,255,255,0.05) 100%)",
            border: "1px solid rgba(255,255,255,0.18)",
            boxShadow: [
              "0 8px 40px rgba(0,0,0,0.28)",
              "inset 0 1px 0 rgba(255,255,255,0.22)",
              "inset 0 -1px 0 rgba(0,0,0,0.08)",
            ].join(", "),
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
          }}
        >
          {/* Logo */}
          <a href="#inicio" className="shrink-0">
            <img
              src="/rentahouse_transp.png"
              alt="Rent-A-House"
              className="h-9 w-auto"
              draggable="false"
            />
          </a>

          <div className="h-5 w-px shrink-0" style={{ background: "rgba(255,255,255,0.15)" }} />

          {/* Links */}
          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="relative text-[9px] font-black uppercase tracking-[0.35em] text-white/70 hover:text-white transition-colors duration-300 group"
              >
                {label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px rounded-full bg-white/80 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          <div className="h-5 w-px shrink-0" style={{ background: "rgba(255,255,255,0.15)" }} />

          {/* CTA */}
          <a
            href="https://wa.me/584141210496"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-[9px] font-black uppercase tracking-[0.3em] px-6 py-2.5 rounded-full text-white whitespace-nowrap transition-all duration-300 hover:brightness-110 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #E20613 0%, #b00410 100%)",
              boxShadow: "0 0 20px rgba(226,6,19,0.38)",
            }}
          >
            Contactar
          </a>
        </div>
      </header>
    </>
  );
}
