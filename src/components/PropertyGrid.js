"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PROPERTIES = [
  {
    id: 1,
    title: "Penthouse La Castellana",
    price: "$250,000",
    tag: "Venta",
    details: "4 Hab · 5 Baños · 350m²",
    image: "https://images.unsplash.com/photo-1600607687940-c52df0bd437b?q=80&w=2070",
  },
  {
    id: 2,
    title: "Villa Moderna Los Chorros",
    price: "$480,000",
    tag: "Venta",
    details: "5 Hab · 6 Baños · 600m²",
    image: "https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?q=80&w=2070",
  },
  {
    id: 3,
    title: "Apartamento Country Club",
    price: "$3,800/mes",
    tag: "Alquiler",
    details: "3 Hab · 3 Baños · 220m²",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070",
  },
  {
    id: 4,
    title: "Casa de Campo Galipán",
    price: "$320,000",
    tag: "Venta",
    details: "6 Hab · 4 Baños · 800m²",
    image: "https://images.unsplash.com/photo-1598928636135-d146006ff4be?q=80&w=2070",
  },
];

export default function PropertyGrid() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const labelRef   = useRef(null);
  const cardsRef   = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {

      /* ── SECTION HEADER: clip-path slide-up ── */
      gsap.fromTo(headingRef.current,
        { y: 80, opacity: 0, clipPath: "inset(0 0 100% 0)" },
        {
          y: 0,
          opacity: 1,
          clipPath: "inset(0 0 0% 0)",
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
        }
      );
      gsap.fromTo(labelRef.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 88%" },
        }
      );

      /* ── CARDS: staggered 3D perspective entrance ── */
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const imgEl = card.querySelector(".parallax-img");

        // Card entrance
        gsap.fromTo(card,
          {
            opacity: 0,
            y: 80,
            rotateX: 10,
            transformOrigin: "center bottom",
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1.1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none none",
            },
            delay: (i % 2) * 0.18,
          }
        );

        // Image parallax inside card
        if (imgEl) {
          ScrollTrigger.create({
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
            onUpdate(self) {
              gsap.set(imgEl, { y: (self.progress - 0.5) * 70 });
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
      className="relative bg-[#f8f6f3] py-28 px-6 md:px-16 overflow-hidden scene-3d"
    >

      {/* Section Header — editorial style */}
      <div className="max-w-7xl mx-auto mb-20">
        {/* Tagline */}
        <div ref={labelRef} className="opacity-0 flex items-center gap-3 mb-6">
          <div className="h-px w-12 bg-gradient-to-r from-[#E20613] to-transparent" />
          <span className="text-[9px] font-black uppercase tracking-[0.65em] text-neutral-400">
            Inmuebles exclusivos · Rent-A-House
          </span>
        </div>

        {/* Heading — serif italic matching Testimonials */}
        <h2
          ref={headingRef}
          className="opacity-0 text-[clamp(34px,5.5vw,66px)] font-serif italic text-neutral-900 leading-tight tracking-tight"
        >
          Inmuebles<br />
          <span className="inline-block">
            destacados.
            <span className="block h-[6px] mt-3 bg-gradient-to-r from-[#E20613] to-transparent rounded-sm" />
          </span>
        </h2>
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
        {PROPERTIES.map((prop, i) => (
          <div
            key={prop.id}
            ref={(el) => { cardsRef.current[i] = el; }}
            className="group cursor-pointer opacity-0"
            style={{ perspective: "1000px" }}
          >
            {/* Image container with overflow for parallax */}
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-neutral-200 shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
              <img
                src={prop.image}
                alt={prop.title}
                className="parallax-img w-full h-[115%] object-cover -top-[7.5%] absolute inset-x-0 grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out will-change-transform"
                draggable="false"
              />

              {/* Cinematic overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Price badge */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg">
                <span className="text-[11px] font-black text-neutral-900 tracking-tight">
                  {prop.price}
                </span>
              </div>

              {/* Tag */}
              <div className="absolute top-4 right-4 bg-[#E20613] px-3 py-1.5 rounded-full shadow-[0_0_20px_rgba(226,6,19,0.4)]">
                <span className="text-[9px] font-black text-white uppercase tracking-widest">
                  {prop.tag}
                </span>
              </div>

              {/* Hover CTA */}
              <div className="absolute bottom-5 left-0 right-0 flex justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                <span className="text-[9px] font-black text-white uppercase tracking-[0.3em] border border-white/50 px-6 py-2.5 rounded-full backdrop-blur-sm">
                  Ver Detalles
                </span>
              </div>
            </div>

            {/* Card footer */}
            <div className="mt-5 flex items-start justify-between">
              <div>
                <h3 className="text-xl font-black uppercase tracking-[-0.02em] text-neutral-900 leading-tight group-hover:text-[#E20613] transition-colors duration-300">
                  {prop.title}
                </h3>
                <p className="mt-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400">
                  {prop.details}
                </p>
              </div>
              <div className="mt-1 h-8 w-8 rounded-full border border-neutral-200 flex items-center justify-center group-hover:bg-[#E20613] group-hover:border-[#E20613] transition-all duration-300 shrink-0">
                <span className="text-neutral-400 group-hover:text-white text-sm transition-colors duration-300">
                  →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="max-w-7xl mx-auto mt-16 flex justify-center">
        <button className="text-[10px] font-black uppercase tracking-[0.35em] border border-neutral-300 px-12 py-4 rounded-full hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-400">
          Ver Todos los Inmuebles
        </button>
      </div>
    </section>
  );
}
