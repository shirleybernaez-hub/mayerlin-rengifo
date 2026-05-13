"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ── DATA ────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    id: "t-1",
    name: "Carlos Méndez",
    role: "Propietario · Vendedor",
    rating: 5,
    text: "Mayerlin logró vender mi apartamento en menos de 30 días. Su profesionalismo y conocimiento del mercado caraqueño son verdaderamente incomparables.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&fit=crop",
  },
  {
    id: "t-2",
    name: "Valeria Torres",
    role: "Compradora · Primera vivienda",
    rating: 5,
    text: "Mayerlin me guió en cada paso. Encontramos el apartamento ideal en Altamira dentro de mi presupuesto y sin complicaciones.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&fit=crop",
  },
  {
    id: "t-3",
    name: "Rafael Blanco",
    role: "Inversor · Cartera múltiple",
    rating: 5,
    text: "Tres propiedades adquiridas a través de Mayerlin y cada operación fue impecable. Su visión estratégica del mercado es excepcional.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&fit=crop",
  },
  {
    id: "t-4",
    name: "Ana Luisa Parra",
    role: "Propietaria · Country Club",
    rating: 5,
    text: "Excelente gestión de mi propiedad en alquiler. Consiguió inquilinos de alto perfil y manejó los trámites con total discreción.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&fit=crop",
  },
];

const STAR_PATH = "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z";

function ReviewStars({ rating }) {
  const filled = Math.floor(rating);
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(filled)].map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" fill="#E20613" className="w-4 h-4">
          <path d={STAR_PATH} />
        </svg>
      ))}
    </div>
  );
}

/* ── MAIN SECTION ─────────────────────────────────── */
export default function TestimonialsSection() {
  const sectionRef = useRef(null);
  const labelRef   = useRef(null);
  const headingRef = useRef(null);
  const deckRef    = useRef(null);
  const cardsRef   = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {

      /* ── HEADING ENTRANCE ── */
      gsap.fromTo(labelRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.9, ease: "expo.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
      );
      gsap.fromTo(headingRef.current,
        { y: 80, opacity: 0, clipPath: "inset(0 0 100% 0)" },
        { y: 0, opacity: 1, clipPath: "inset(0 0 0% 0)", duration: 1.2, ease: "expo.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }, delay: 0.1 }
      );

      /* ── CARD DECK ANIMATION ── */
      const cards = cardsRef.current.filter(Boolean);
      const total = cards.length;

      // Card 0 is front (highest zIndex). Cards fan slightly to the right behind it.
      cards.forEach((card, i) => {
        gsap.set(card, {
          rotation:        i === 0 ? -3 : i * 3 - 3,
          x:               i * 18,
          y:               i * 6,
          zIndex:          total - i,
          opacity:         1 - i * 0.2,
          transformOrigin: "center bottom",
          scale:           1 - i * 0.03,
        });
      });

      // 2 time units per card: 1 hold + 1 exit
      const HOLD = 1;
      const EXIT = 1;
      const SEG  = HOLD + EXIT;

      const tl = gsap.timeline({ paused: true });

      cards.forEach((card, i) => {
        const next     = cards[i + 1];
        const segStart = i * SEG;

        // After HOLD, card sweeps to the RIGHT and rotates away
        tl.to(card, {
          xPercent: 140,
          rotation: 18,
          opacity:  0,
          ease:     "power2.in",
          duration: EXIT,
        }, segStart + HOLD);

        // Next card simultaneously settles to the front position
        if (next) {
          tl.to(next, {
            x:        0,
            y:        0,
            rotation: -3,
            opacity:  1,
            scale:    1,
            ease:     "power2.out",
            duration: EXIT,
          }, segStart + HOLD);
        }
      });

      // 300 px of scroll per time unit → each card gets 300px hold + 300px exit
      ScrollTrigger.create({
        trigger:    deckRef.current,
        start:      "top top",
        end:        `+=${total * SEG * 300}`,
        pin:        true,
        pinSpacing: true,
        scrub:      1.4,
        animation:  tl,
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-white">


      {/* ── Section header ── */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-16 pt-20 md:pt-28 pb-8">
        <div ref={labelRef} className="opacity-0 flex items-center gap-3 mb-6">
          <div className="h-px w-12 bg-gradient-to-r from-[#E20613] to-transparent" />
          <span className="text-[9px] font-black uppercase tracking-[0.65em] text-neutral-400">
            Testimonios · Clientes satisfechos
          </span>
        </div>
        <h2
          ref={headingRef}
          className="opacity-0 text-[clamp(34px,5.5vw,66px)] font-serif italic text-neutral-900 leading-tight tracking-tight"
        >
          Lo que dicen<br />
          <span className="inline-block text-neutral-900">
            nuestros clientes.
            <span className="block h-[6px] mt-3 bg-gradient-to-r from-[#E20613] to-transparent rounded-sm" />
          </span>
        </h2>
      </div>

      {/* ── Card deck — GSAP pins this element to the viewport top ── */}
      <div
        ref={deckRef}
        className="relative flex items-center justify-center min-h-screen"
      >
        {/* Overflow clip so swept cards don't spill into other sections */}
        <div className="relative h-[460px] w-[330px] sm:w-[390px]" style={{ overflow: "visible" }}>
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.id}
              ref={(el) => { cardsRef.current[i] = el; }}
              style={{ zIndex: TESTIMONIALS.length - i }}
              className="absolute inset-0 will-change-transform flex flex-col items-center justify-between gap-5 rounded-2xl border border-neutral-200/80 bg-white p-7 shadow-[0_16px_48px_rgba(0,0,0,0.1)]"
            >
              {/* Red top accent */}
              <div className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-[#E20613]/40 to-transparent" />

              <ReviewStars rating={t.rating} />

              <blockquote className="flex-1 flex items-center text-center">
                <p className="text-[14px] sm:text-[15px] font-serif italic text-neutral-600 leading-[1.8]">
                  &ldquo;{t.text}&rdquo;
                </p>
              </blockquote>

              <div className="w-full flex items-center gap-3 pt-4 border-t border-neutral-100">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover shrink-0 border border-neutral-200"
                />
                <div>
                  <p className="text-[13px] font-black text-neutral-900 tracking-tight leading-tight">{t.name}</p>
                  <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-neutral-400 mt-0.5">{t.role}</p>
                </div>
                <div className="ml-auto shrink-0 w-6 h-6 rounded-full bg-[#E20613]/10 border border-[#E20613]/25 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#E20613]/60" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Card counter */}
        <p className="absolute bottom-10 left-0 right-0 text-center text-[8px] font-black uppercase tracking-[0.4em] text-neutral-300">
          desplaza para ver más
        </p>
      </div>

    </section>
  );
}
