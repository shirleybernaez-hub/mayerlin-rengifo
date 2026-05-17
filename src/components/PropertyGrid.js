"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const SANS  = "'Manrope', sans-serif";
const SERIF = "'Newsreader', Georgia, serif";
const INK   = "#1A1D24";
const MUTED = "#7A6F63";
const RED   = "#D11E27";
const GREEN = "#1A8E3B";

const PROPERTIES = [
  {
    id: 1,
    zone: "Las Mercedes",
    title: "PH con terraza",
    tag: "Alquiler",
    price: "$1,850/mes",
    beds: 3, baths: 2.5, sqm: 180,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=500&fit=crop",
  },
  {
    id: 2,
    zone: "Los Palos Grandes",
    title: "Loft restaurado",
    tag: "Venta",
    price: "$420,000",
    beds: 2, baths: 2, sqm: 95,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=500&fit=crop",
  },
  {
    id: 3,
    zone: "La Lagunita",
    title: "Casa con jardín",
    tag: "Alquiler",
    price: "$3,200/mes",
    beds: 4, baths: 3, sqm: 280,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=500&fit=crop",
  },
  {
    id: 4,
    zone: "Altamira",
    title: "Local comercial",
    tag: "Venta",
    price: "$295,000",
    sqm: 120, levels: 2,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop",
  },
  {
    id: 5,
    zone: "La Castellana",
    title: "Penthouse ejecutivo",
    tag: "Venta",
    price: "$250,000",
    beds: 4, baths: 5, sqm: 350,
    image: "https://images.unsplash.com/photo-1600607687940-c52df0bd437b?w=800&h=500&fit=crop",
  },
  {
    id: 6,
    zone: "El Rosal",
    title: "Apartamento moderno",
    tag: "Alquiler",
    price: "$1,200/mes",
    beds: 2, baths: 2, sqm: 110,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=500&fit=crop",
  },
];

export default function PropertyGrid() {
  const sectionRef = useRef(null);
  const headerRef  = useRef(null);
  const cardsRef   = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "expo.out",
          scrollTrigger: { trigger: headerRef.current, start: "top bottom", toggleActions: "play none none none" } }
      );

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const imgEl = card.querySelector(".parallax-img");

        gsap.fromTo(card,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0, duration: 1, ease: "expo.out",
            scrollTrigger: { trigger: card, start: "top 92%", toggleActions: "play none none none" },
            delay: (i % 3) * 0.1,
          }
        );

        if (imgEl) {
          ScrollTrigger.create({
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
            onUpdate(self) {
              gsap.set(imgEl, { y: (self.progress - 0.5) * 60 });
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="propiedades"
      ref={sectionRef}
      style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0) 0px, rgba(255,255,255,0.60) 80px, #ffffff 200px)", paddingBottom: "80px", marginTop: "-240px", position: "relative", zIndex: 2 }}
    >
      {/* Header */}
      <div
        ref={headerRef}
        className="flex flex-wrap items-end justify-between gap-3 px-5 sm:px-10 lg:px-[133px] pt-10 pb-7"
        style={{ opacity: 0 }}
      >
        <div>
          <p style={{
            fontFamily: SANS, fontSize: "10px", fontWeight: 700,
            letterSpacing: "0.28em", textTransform: "uppercase",
            color: RED, marginBottom: "6px",
          }}>
            Lo más destacado
          </p>
          <h2 style={{
            fontFamily: SERIF, fontSize: "clamp(28px,3.5vw,46px)",
            fontWeight: 400, fontStyle: "italic",
            color: INK, margin: 0, lineHeight: 1.1,
          }}>
            Explora nuevos inmuebles
          </h2>
        </div>
        <a
          href="#"
          style={{
            fontFamily: SANS, fontSize: "12px", fontWeight: 600,
            color: INK, textDecoration: "none",
            borderBottom: "1px solid rgba(26,29,36,0.25)",
            paddingBottom: "2px",
            whiteSpace: "nowrap",
          }}
        >
          Ver todas →
        </a>
      </div>

      {/* 6-card grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-5 sm:px-10 lg:px-[133px]">
        {PROPERTIES.map((prop, i) => (
          <div
            key={prop.id}
            ref={(el) => { cardsRef.current[i] = el; }}
            style={{
              opacity: 0,
              background: "#fff",
              borderRadius: "14px",
              border: "1px solid rgba(26,29,36,0.07)",
              boxShadow: "0 12px 30px -12px rgba(20,18,15,0.22), 0 1px 0 rgba(26,29,36,0.04)",
              overflow: "hidden",
              cursor: "pointer",
            }}
          >
            {/* Image */}
            <div style={{ position: "relative", overflow: "hidden", height: "180px" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={prop.image}
                alt={prop.title}
                className="parallax-img"
                style={{
                  position: "absolute", inset: 0,
                  width: "100%", height: "115%", top: "-7.5%",
                  objectFit: "cover",
                  willChange: "transform",
                  transition: "transform 0.6s ease",
                }}
                draggable="false"
              />
              {/* Tag */}
              <span style={{
                position: "absolute", top: "10px", left: "10px",
                background: RED, color: "white",
                padding: "4px 10px", borderRadius: "99px",
                fontFamily: SANS, fontSize: "9px", fontWeight: 800,
                textTransform: "uppercase", letterSpacing: "0.10em",
              }}>
                {prop.tag}
              </span>
            </div>

            {/* Card body */}
            <div style={{ padding: "14px 16px 16px" }}>
              <p style={{
                fontFamily: SANS, fontSize: "9px", fontWeight: 700,
                textTransform: "uppercase", letterSpacing: "0.22em",
                color: MUTED, marginBottom: "5px",
              }}>
                {prop.zone}
              </p>
              <p style={{
                fontFamily: SERIF, fontSize: "17px", fontWeight: 400,
                color: INK, marginBottom: "6px", lineHeight: 1.2,
              }}>
                {prop.title}
              </p>
              <p style={{
                fontFamily: SANS, fontSize: "11px", color: MUTED,
                marginBottom: "10px", lineHeight: 1,
              }}>
                {prop.beds ? `${prop.beds} hab · ` : ""}
                {prop.baths ? `${prop.baths} baños · ` : ""}
                {prop.sqm ? `${prop.sqm} m²` : ""}
                {prop.levels ? ` · ${prop.levels} niveles` : ""}
              </p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontFamily: SANS, fontWeight: 700, fontSize: "15px", color: INK }}>
                  {prop.price}
                </span>
                <span style={{
                  display: "flex", alignItems: "center", gap: "5px",
                  fontFamily: SANS, fontSize: "10px", fontWeight: 600, color: GREEN,
                }}>
                  <span style={{
                    width: "6px", height: "6px", borderRadius: "50%",
                    background: GREEN, display: "inline-block",
                    flexShrink: 0,
                  }} />
                  Disponible
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="flex justify-center mt-10 px-5">
        <button style={{
          fontFamily: SANS, fontSize: "10px", fontWeight: 800,
          textTransform: "uppercase", letterSpacing: "0.30em",
          border: "1px solid rgba(26,29,36,0.20)", padding: "14px 48px",
          borderRadius: "999px", cursor: "pointer", background: "transparent",
          color: INK, transition: "background 0.2s, color 0.2s",
        }}
          onMouseEnter={e => { e.currentTarget.style.background = INK; e.currentTarget.style.color = "white"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = INK; }}
        >
          Ver todos los inmuebles
        </button>
      </div>
    </section>
  );
}
