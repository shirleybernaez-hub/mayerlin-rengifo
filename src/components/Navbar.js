"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const NAV_LINKS = [
  { label: "Inicio",      href: "#inicio" },
  { label: "Propiedades", href: "#propiedades" },
  { label: "Nosotros",    href: "#nosotros" },
  { label: "Testimonios", href: "#testimonios" },
  { label: "Referidos",   href: "#referidos" },
];

const GLASS = {
  background:           "rgba(255,255,255,0.10)",
  border:               "1px solid rgba(255,255,255,0.20)",
  backdropFilter:       "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
};

const HERO_PT = "16px";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const headerRef  = useRef(null);
  const navPillRef = useRef(null);
  const ctaRef     = useRef(null);
  const linksRef   = useRef([]);
  const stickyRef  = useRef(false);

  /* ── Lock body scroll when mobile menu is open ── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  /* ── GSAP entrance + scroll state ── */
  useEffect(() => {
    gsap.fromTo(headerRef.current,
      { opacity: 0, y: -16 },
      { opacity: 1, y: 0, duration: 0.9, ease: "expo.out", delay: 0.3 }
    );

    const applyHero = () => {
      if (!headerRef.current) return;
      headerRef.current.style.background           = "transparent";
      headerRef.current.style.boxShadow            = "none";
      headerRef.current.style.backdropFilter       = "none";
      headerRef.current.style.WebkitBackdropFilter = "none";
      headerRef.current.style.paddingTop           = HERO_PT;

      if (navPillRef.current) Object.assign(navPillRef.current.style, GLASS);
      if (ctaRef.current) {
        Object.assign(ctaRef.current.style, GLASS);
        ctaRef.current.style.color     = "rgba(255,255,255,0.90)";
        ctaRef.current.style.boxShadow = "none";
      }
      linksRef.current.forEach(el => {
        if (!el) return;
        el.style.color      = "rgba(255,255,255,0.85)";
        el.style.background = "transparent";
      });
    };

    const applySticky = () => {
      if (!headerRef.current) return;
      headerRef.current.style.background           = "rgba(255,255,255,0.97)";
      headerRef.current.style.boxShadow            = "0 1px 20px rgba(0,0,0,0.08)";
      headerRef.current.style.backdropFilter       = "blur(20px)";
      headerRef.current.style.WebkitBackdropFilter = "blur(20px)";
      headerRef.current.style.paddingTop           = "8px";

      if (navPillRef.current) {
        navPillRef.current.style.background           = "transparent";
        navPillRef.current.style.border               = "none";
        navPillRef.current.style.backdropFilter       = "none";
        navPillRef.current.style.WebkitBackdropFilter = "none";
        navPillRef.current.style.boxShadow            = "none";
      }
      if (ctaRef.current) {
        ctaRef.current.style.background           = "#D11E27";
        ctaRef.current.style.border               = "none";
        ctaRef.current.style.backdropFilter       = "none";
        ctaRef.current.style.WebkitBackdropFilter = "none";
        ctaRef.current.style.color                = "white";
        ctaRef.current.style.boxShadow            = "none";
      }
      linksRef.current.forEach(el => {
        if (!el) return;
        el.style.color      = "rgba(26,29,36,0.70)";
        el.style.background = "transparent";
      });
    };

    const onScroll = () => {
      const past = window.scrollY > window.innerHeight * 0.80;
      if (past && !stickyRef.current)  { stickyRef.current = true;  setIsSticky(true);  applySticky(); }
      if (!past && stickyRef.current)  { stickyRef.current = false; setIsSticky(false); applyHero();   }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const barColor = isSticky ? "#1A1D24" : "white";

  return (
    <>
      {/* ── Header ── */}
      <header
        ref={headerRef}
        className="fixed top-0 inset-x-0 z-[100] flex items-center justify-between px-5 sm:px-8 lg:px-[133px]"
        style={{
          opacity: 0,
          paddingTop: HERO_PT,
          paddingBottom: "8px",
          transition: "background 0.4s ease, box-shadow 0.4s ease, padding-top 0.4s ease",
        }}
      >
        {/* Logo */}
        <img
          src="/rentahouse-maye.svg"
          alt="Rent-A-House"
          className="h-14 sm:h-16 lg:h-[88px] w-auto shrink-0"
          style={{ filter: "drop-shadow(0 2px 16px rgba(0,0,0,0.40))" }}
          draggable="false"
        />

        {/* Nav pill — desktop only */}
        <div
          ref={navPillRef}
          className="hidden lg:flex items-center rounded-full"
          style={{ ...GLASS, padding: "5px" }}
        >
          {NAV_LINKS.map(({ label, href }, i) => (
            <a
              key={label}
              href={href}
              ref={el => { linksRef.current[i] = el; }}
              style={{
                fontFamily:     "'Manrope', sans-serif",
                fontSize:       "11px",
                fontWeight:     600,
                letterSpacing:  "0.14em",
                textTransform:  "uppercase",
                padding:        "9px 18px",
                borderRadius:   "999px",
                color:          "rgba(255,255,255,0.85)",
                background:     "transparent",
                textDecoration: "none",
                display:        "block",
                transition:     "background 0.2s, color 0.2s",
                whiteSpace:     "nowrap",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = isSticky ? "rgba(26,29,36,0.07)" : "rgba(255,255,255,0.14)";
                e.currentTarget.style.color      = isSticky ? "#1A1D24"              : "white";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color      = isSticky ? "rgba(26,29,36,0.70)" : "rgba(255,255,255,0.85)";
              }}
            >
              {label}
            </a>
          ))}
        </div>

        {/* CTA — desktop only */}
        <a
          ref={ctaRef}
          href="https://wa.me/584141210496"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:flex shrink-0 items-center gap-1.5 rounded-full whitespace-nowrap active:scale-95"
          style={{
            ...GLASS,
            fontFamily:     "'Manrope', sans-serif",
            fontSize:       "11px",
            fontWeight:     600,
            letterSpacing:  "0.14em",
            textTransform:  "uppercase",
            padding:        "9px 20px",
            color:          "rgba(255,255,255,0.90)",
            textDecoration: "none",
            transition:     "background 0.2s, color 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.opacity = "0.85"; }}
          onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
        >
          Contactar
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="13 5 19 12 13 19"/>
          </svg>
        </a>

        {/* Hamburger — tablet + mobile */}
        <button
          className="lg:hidden flex flex-col justify-center items-center gap-[5px] w-10 h-10 rounded-full shrink-0"
          style={{
            background:           isSticky ? "rgba(26,29,36,0.06)" : "rgba(255,255,255,0.10)",
            border:               isSticky ? "1px solid rgba(26,29,36,0.12)" : "1px solid rgba(255,255,255,0.20)",
            backdropFilter:       "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            cursor:               "pointer",
            transition:           "background 0.3s, border 0.3s",
          }}
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          <span style={{ display: "block", width: "16px", height: "1.5px", background: barColor, borderRadius: "2px", transition: "transform 0.3s ease, background 0.3s", transform: menuOpen ? "translateY(6.5px) rotate(45deg)" : "none" }} />
          <span style={{ display: "block", width: "16px", height: "1.5px", background: barColor, borderRadius: "2px", transition: "opacity 0.3s ease, background 0.3s",  opacity: menuOpen ? 0 : 1 }} />
          <span style={{ display: "block", width: "16px", height: "1.5px", background: barColor, borderRadius: "2px", transition: "transform 0.3s ease, background 0.3s", transform: menuOpen ? "translateY(-6.5px) rotate(-45deg)" : "none" }} />
        </button>
      </header>

      {/* ── Mobile / Tablet overlay menu ── */}
      <div
        className="lg:hidden fixed inset-0 z-[99] flex flex-col items-center justify-center"
        style={{
          background:           "rgba(10,12,18,0.97)",
          backdropFilter:       "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          opacity:              menuOpen ? 1 : 0,
          pointerEvents:        menuOpen ? "all" : "none",
          transition:           "opacity 0.35s ease",
        }}
      >
        {/* Nav links */}
        <nav style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
          {NAV_LINKS.map(({ label, href }, i) => (
            <a
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily:    "'Newsreader', Georgia, serif",
                fontSize:      "clamp(28px,7vw,44px)",
                fontWeight:    400,
                fontStyle:     "italic",
                color:         "rgba(255,255,255,0.82)",
                textDecoration:"none",
                letterSpacing: "-0.02em",
                lineHeight:    1.35,
                display:       "block",
                textAlign:     "center",
                padding:       "4px 24px",
                opacity:       menuOpen ? 1 : 0,
                transform:     menuOpen ? "translateY(0)" : "translateY(18px)",
                transition:    `opacity 0.4s ease ${i * 0.07}s, transform 0.4s ease ${i * 0.07}s`,
              }}
              onMouseEnter={e => { e.currentTarget.style.color = "white"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.82)"; }}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Divider */}
        <div style={{ width: "40px", height: "1px", background: "linear-gradient(90deg, transparent, rgba(209,30,39,0.55), transparent)", margin: "28px 0" }} />

        {/* CTA */}
        <a
          href="https://wa.me/584141210496"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setMenuOpen(false)}
          style={{
            fontFamily:    "'Manrope', sans-serif",
            fontSize:      "11px",
            fontWeight:    700,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color:         "white",
            textDecoration:"none",
            background:    "#D11E27",
            padding:       "14px 44px",
            borderRadius:  "999px",
            opacity:       menuOpen ? 1 : 0,
            transform:     menuOpen ? "translateY(0)" : "translateY(18px)",
            transition:    `opacity 0.4s ease ${NAV_LINKS.length * 0.07 + 0.08}s, transform 0.4s ease ${NAV_LINKS.length * 0.07 + 0.08}s`,
          }}
        >
          Contactar →
        </a>
      </div>
    </>
  );
}
