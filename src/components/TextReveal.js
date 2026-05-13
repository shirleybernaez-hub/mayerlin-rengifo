"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function TextReveal({ text }) {
  const sectionRef    = useRef(null);
  const quoteRef      = useRef(null);
  const lineTopRef    = useRef(null);
  const lineBottomRef = useRef(null);
  const creditRef     = useRef(null);
  const photoRef      = useRef(null);
  const photoWrapRef  = useRef(null);

  const words = (text || "").split(" ");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const wordEls = quoteRef.current?.querySelectorAll(".word-unit");
      if (!wordEls?.length) return;

      /* ── WORD-BY-WORD ILLUMINATION ── */
      wordEls.forEach((el, i) => {
        const start = i / wordEls.length;
        const end   = start + 1.2 / wordEls.length;
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 75%",
          end: "center 15%",
          scrub: 1.2,
          onUpdate(self) {
            const p = Math.max(0, Math.min(1, (self.progress - start) / (end - start)));
            const ghost = el.querySelector(".ghost");
            const vivid = el.querySelector(".vivid");
            if (ghost) ghost.style.opacity = String(1 - p * 0.9);
            if (vivid) {
              vivid.style.opacity = String(p);
              vivid.style.filter  = `blur(${(1 - p) * 7}px)`;
            }
          },
        });
      });

      /* ── ENTRANCE ANIMATIONS ── */
      gsap.fromTo(lineTopRef.current,
        { scaleX: 0, transformOrigin: "left" },
        { scaleX: 1, duration: 1, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
      );
      gsap.fromTo(lineBottomRef.current,
        { scaleX: 0, transformOrigin: "left" },
        { scaleX: 1, duration: 1.2, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%" }, delay: 0.15 }
      );
      gsap.fromTo(creditRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 1, ease: "expo.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 60%" } }
      );

      /* ── PHOTO PARALLAX ── */
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.8,
        onUpdate(self) {
          gsap.set(photoRef.current, { y: (self.progress - 0.5) * 110 });
        },
      });

      /* ── PHOTO CONTAINER REVEAL ── */
      gsap.fromTo(photoWrapRef.current,
        { clipPath: "inset(0 0 100% 0 round 25px)" },
        { clipPath: "inset(0 0 0% 0 round 25px)", duration: 1.7, ease: "expo.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" } }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white"
    >
      {/* ── Contenedor alineado con Navbar y PropertyGrid ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 flex flex-col lg:flex-row items-stretch gap-6 lg:gap-12 min-h-screen py-12 lg:py-0">

        {/* ── LEFT COLUMN: Photo ── */}
        <div className="relative w-full h-[60vw] max-h-[520px] lg:max-h-none lg:h-auto lg:flex-none lg:w-[42%] lg:py-12">

          {/* Rounded container with clip-path reveal */}
          <div
            ref={photoWrapRef}
            className="relative h-full overflow-hidden will-change-transform"
            style={{ borderRadius: "25px", clipPath: "inset(0 0 100% 0 round 25px)" }}
          >
            {/* B&W photo */}
            <img
              ref={photoRef}
              src="/mayerlin-rengifo.png"
              alt="Mayerlin Rengifo — Asesora Inmobiliaria"
              className="absolute inset-0 w-full object-cover object-top will-change-transform"
              style={{ height: "115%", top: "-7.5%",
                filter: "grayscale(100%) contrast(1.06) brightness(0.78)" }}
              draggable="false"
            />

            {/* Top dark area for logo legibility */}
            <div
              className="absolute top-0 inset-x-0 h-28 pointer-events-none"
              style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 100%)" }}
            />

            {/* Logo centrado en la parte superior de la foto */}
            <div className="absolute top-6 inset-x-0 flex justify-center z-10">
              <img
                src="/rentahouse-maye.svg"
                alt="Rent-A-House"
                className="h-9 sm:h-11 w-auto"
                style={{ opacity: 0.9 }}
                draggable="false"
              />
            </div>

            {/* Bottom dark backdrop */}
            <div
              className="absolute bottom-0 inset-x-0 h-48 pointer-events-none"
              style={{ background: "linear-gradient(to top, rgba(5,5,5,0.88) 0%, rgba(5,5,5,0.4) 55%, transparent 100%)" }}
            />

            {/* Credit bottom */}
            <div className="absolute bottom-0 inset-x-0 z-10 px-6 pb-6 flex flex-col items-start gap-2">
              <div className="w-12 h-[1px] bg-gradient-to-r from-[#E20613] to-transparent" />
              <p
                ref={creditRef}
                className="opacity-0 text-[8px] uppercase tracking-[0.5em] font-bold text-white/50"
              >
                Rent-A-House · Mayerlin Rengifo
              </p>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN: Quote text ── */}
        <div className="flex-1 flex flex-col justify-center py-10 lg:py-24">

          {/* Top red accent */}
          <div
            ref={lineTopRef}
            className="w-14 h-[1px] bg-gradient-to-r from-[#E20613] to-transparent mb-10 lg:mb-14"
            style={{ transform: "scaleX(0)", transformOrigin: "left" }}
          />

          {/* QUOTE — sentence case, word-by-word reveal */}
          <div
            ref={quoteRef}
            className="flex flex-wrap gap-x-2 sm:gap-x-3 md:gap-x-4"
            style={{ perspective: "900px" }}
          >
            {words.map((word, i) => (
              <span key={i} className="word-unit relative inline-block leading-[1.2]">
                {/* Ghost */}
                <span
                  className="ghost select-none pointer-events-none"
                  aria-hidden="true"
                  style={{
                    position: "absolute", inset: 0,
                    color: "rgba(0,0,0,0.06)",
                    fontSize: "clamp(34px, 5.5vw, 66px)",
                    fontWeight: 400,
                    letterSpacing: "-0.025em",
                    fontFamily: "ui-serif, Georgia, Cambria, 'Times New Roman', serif",
                    fontStyle: "italic",
                    lineHeight: 1.25,
                  }}
                >{word}</span>
                {/* Vivid */}
                <span
                  className="vivid"
                  style={{
                    opacity: 0,
                    filter: "blur(7px)",
                    display: "inline-block",
                    fontSize: "clamp(34px, 5.5vw, 66px)",
                    fontWeight: 400,
                    letterSpacing: "-0.025em",
                    color: "#171717",
                    fontFamily: "ui-serif, Georgia, Cambria, 'Times New Roman', serif",
                    fontStyle: "italic",
                    lineHeight: 1.25,
                  }}
                >{word}</span>
              </span>
            ))}
          </div>

          {/* Bottom red accent */}
          <div
            ref={lineBottomRef}
            className="mt-12 lg:mt-16 w-16 h-[1px] opacity-80"
            style={{
              background: "linear-gradient(90deg, #E20613, transparent)",
              transform: "scaleX(0)",
              transformOrigin: "left",
            }}
          />
        </div>
      </div>
    </section>
  );
}
