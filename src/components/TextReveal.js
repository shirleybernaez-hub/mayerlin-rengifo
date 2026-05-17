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
      id="nosotros"
      ref={sectionRef}
      className="relative overflow-hidden bg-white"
    >
      <div style={{ padding: "56px 133px", display: "flex", flexDirection: "row", alignItems: "center", gap: "56px" }}>

        {/* ── Foto + logo encima ── */}
        <div style={{ flexShrink: 0, width: "148px" }}>
          <div
            ref={photoWrapRef}
            style={{ borderRadius: "14px", height: "196px", overflow: "hidden", position: "relative", clipPath: "inset(0 0 100% 0 round 14px)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={photoRef}
              src="/mayerlin-rengifo.png"
              alt="Mayerlin Rengifo"
              style={{ position: "absolute", inset: 0, width: "100%", height: "118%", top: "-9%", objectFit: "cover", objectPosition: "center 15%", filter: "grayscale(100%) contrast(1.05) brightness(0.82)" }}
              draggable="false"
            />
            {/* overlay oscuro top para legibilidad del logo */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "64px", background: "linear-gradient(to bottom, rgba(0,0,0,0.52) 0%, transparent 100%)", pointerEvents: "none" }} />
            {/* Logo sobre la foto */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/rentahouse-maye.svg"
              alt="Rent-A-House"
              style={{ position: "absolute", top: "12px", left: "50%", transform: "translateX(-50%)", height: "28px", width: "auto", opacity: 0.92 }}
              draggable="false"
            />
            {/* bottom fade */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "60px", background: "linear-gradient(to top, rgba(5,5,5,0.60) 0%, transparent 100%)", pointerEvents: "none" }} />
            <p
              ref={creditRef}
              style={{ position: "absolute", bottom: "9px", left: "10px", opacity: 0, fontFamily: "'Manrope', sans-serif", fontSize: "7px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.38em", color: "rgba(255,255,255,0.40)", margin: 0 }}
            >
              Mayerlin R.
            </p>
          </div>
        </div>

        {/* ── Separador vertical ── */}
        <div style={{ flexShrink: 0, width: "1px", height: "52px", background: "linear-gradient(to bottom, transparent, rgba(26,29,36,0.14), transparent)" }} />

        {/* ── Quote — una sola línea ── */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            ref={lineTopRef}
            style={{ width: "36px", height: "1px", background: "linear-gradient(90deg, #E20613, transparent)", marginBottom: "18px", transform: "scaleX(0)", transformOrigin: "left" }}
          />

          <div
            ref={quoteRef}
            style={{ display: "flex", flexWrap: "nowrap", gap: "0 8px", whiteSpace: "nowrap" }}
          >
            {words.map((word, i) => (
              <span key={i} className="word-unit" style={{ position: "relative", display: "inline-block", lineHeight: 1.25 }}>
                <span
                  className="ghost"
                  aria-hidden="true"
                  style={{ position: "absolute", inset: 0, color: "rgba(0,0,0,0.06)", fontSize: "clamp(16px,1.85vw,26px)", fontWeight: 400, letterSpacing: "-0.015em", fontFamily: "'Newsreader', Georgia, serif", fontStyle: "italic", lineHeight: 1.25, userSelect: "none", pointerEvents: "none" }}
                >{word}</span>
                <span
                  className="vivid"
                  style={{ opacity: 0, filter: "blur(7px)", display: "inline-block", fontSize: "clamp(16px,1.85vw,26px)", fontWeight: 400, letterSpacing: "-0.015em", color: "#1A1D24", fontFamily: "'Newsreader', Georgia, serif", fontStyle: "italic", lineHeight: 1.25 }}
                >{word}</span>
              </span>
            ))}
          </div>

          <div
            ref={lineBottomRef}
            style={{ width: "36px", height: "1px", background: "linear-gradient(90deg, #E20613, transparent)", marginTop: "18px", opacity: 0.7, transform: "scaleX(0)", transformOrigin: "left" }}
          />
        </div>
      </div>
    </section>
  );
}
