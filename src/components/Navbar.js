"use client";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 60);
  });

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      className={`fixed top-0 w-full z-[100] transition-all duration-500 px-6 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-xl py-3 shadow-[0_1px_0_rgba(0,0,0,0.06)]"
          : "bg-transparent py-8"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">

        {/* LOGO */}
        <motion.a
          href="#inicio"
          className="flex-shrink-0"
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {isScrolled ? (
            <img
              src="/rentahouse-maye.svg"
              alt="Logo"
              className="h-12 w-auto"
              draggable="false"
            />
          ) : (
            <img
              src="/rentahouse-maye-blanco.png"
              alt="Logo"
              className="h-14 w-auto drop-shadow-[0_2px_20px_rgba(0,0,0,0.4)]"
              draggable="false"
            />
          )}
        </motion.a>

        {/* NAV */}
        <nav className="hidden md:flex items-center gap-10">
          {[
            { label: "Inicio", id: "inicio" },
            { label: "Nosotros", id: "nosotros" },
            { label: "Propiedades", id: "propiedades" },
            { label: "Testimonios", id: "testimonios" },
          ].map(({ label, id }) => (
            <a
              key={label}
              href={`#${id}`}
              className={`text-[9px] uppercase tracking-[0.35em] font-black transition-colors duration-300 relative group ${
                isScrolled ? "text-neutral-800" : "text-white drop-shadow-md"
              }`}
            >
              {label}
              <span
                className={`absolute -bottom-1 left-0 h-px w-0 group-hover:w-full transition-all duration-300 ${
                  isScrolled ? "bg-[#E20613]" : "bg-white"
                }`}
              />
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex-shrink-0">
          <a
            href="https://wa.me/584141210496"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.3em] font-black px-9 py-3 rounded-full transition-all duration-300 ${
              isScrolled
                ? "bg-[#E20613] text-white shadow-[0_4px_20px_rgba(226,6,19,0.3)] hover:bg-[#c00510]"
                : "bg-white/10 backdrop-blur-md border border-white/30 text-white hover:bg-white/20"
            }`}
          >
            Contactar
          </a>
        </div>

      </div>
    </motion.header>
  );
}
