"use client";
import { useState, useEffect } from "react";

const WA_NUMBER = "584141210496";
const WA_MESSAGE = "Hola Mayerlin, me gustaría recibir asesoría inmobiliaria personalizada.";

export default function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);
  const [tooltip, setTooltip] = useState(false);

  /* Aparece tras 1.5s para no competir con el hero */
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(t);
  }, []);

  const href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`;

  return (
    <>
      {/* Keyframes del pulse ring */}
      <style>{`
        @keyframes wa-ring {
          0%   { transform: scale(1);   opacity: 0.6; }
          100% { transform: scale(1.9); opacity: 0; }
        }
        .wa-ring { animation: wa-ring 2s ease-out infinite; }
        .wa-ring-2 { animation: wa-ring 2s ease-out 0.7s infinite; }
      `}</style>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        onMouseEnter={() => setTooltip(true)}
        onMouseLeave={() => setTooltip(false)}
        className="fixed bottom-7 right-7 z-[200] flex items-center justify-center"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1) translateY(0)" : "scale(0.7) translateY(20px)",
          transition: "opacity 0.5s cubic-bezier(0.34,1.56,0.64,1), transform 0.5s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >
        {/* Pulse rings */}
        <span
          className="wa-ring absolute inset-0 rounded-full"
          style={{ background: "rgba(37,211,102,0.35)" }}
          aria-hidden="true"
        />
        <span
          className="wa-ring-2 absolute inset-0 rounded-full"
          style={{ background: "rgba(37,211,102,0.2)" }}
          aria-hidden="true"
        />

        {/* Button */}
        <span
          className="relative flex items-center justify-center w-[58px] h-[58px] rounded-full shadow-[0_8px_30px_rgba(37,211,102,0.45)]"
          style={{
            background: "linear-gradient(135deg, #25D366 0%, #1da851 100%)",
          }}
        >
          {/* WhatsApp SVG */}
          <svg
            viewBox="0 0 32 32"
            fill="white"
            width="28"
            height="28"
            aria-hidden="true"
          >
            <path d="M16.003 2.667C8.637 2.667 2.667 8.637 2.667 16c0 2.357.632 4.663 1.833 6.685L2.667 29.333l6.833-1.79A13.28 13.28 0 0016.003 29.333c7.363 0 13.33-5.97 13.33-13.333S23.366 2.667 16.003 2.667zm0 24.267a11.01 11.01 0 01-5.613-1.534l-.402-.238-4.057 1.063 1.082-3.948-.262-.417A10.97 10.97 0 015.003 16c0-6.065 4.935-11 11-11s11 4.935 11 11-4.935 11-11 11zm6.03-8.237c-.33-.165-1.953-.964-2.257-1.074-.303-.11-.524-.165-.744.165-.22.33-.853 1.074-1.046 1.294-.193.22-.386.247-.716.082-.33-.165-1.394-.514-2.656-1.638-.982-.875-1.645-1.955-1.837-2.285-.193-.33-.021-.508.145-.672.15-.148.33-.386.496-.578.165-.193.22-.33.33-.55.11-.22.055-.413-.028-.578-.082-.165-.744-1.794-1.019-2.456-.268-.645-.54-.557-.744-.568l-.633-.01c-.22 0-.578.082-.882.413-.303.33-1.157 1.13-1.157 2.757s1.185 3.197 1.35 3.417c.165.22 2.333 3.562 5.653 4.997.79.34 1.407.543 1.888.695.793.252 1.515.216 2.086.131.636-.095 1.953-.799 2.229-1.571.275-.771.275-1.433.193-1.571-.082-.138-.303-.22-.633-.385z"/>
          </svg>
        </span>

        {/* Tooltip */}
        <span
          className="absolute right-[70px] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-xl px-4 py-2.5 text-[11px] font-bold text-white pointer-events-none transition-all duration-300"
          style={{
            background: "rgba(10,10,10,0.88)",
            backdropFilter: "blur(8px)",
            opacity: tooltip ? 1 : 0,
            transform: tooltip ? "translateX(0) translateY(-50%)" : "translateX(8px) translateY(-50%)",
          }}
          aria-hidden="true"
        >
          ¡Escríbenos por WhatsApp!
          {/* Arrow */}
          <span
            className="absolute right-[-6px] top-1/2 -translate-y-1/2 border-[6px] border-transparent"
            style={{ borderLeftColor: "rgba(10,10,10,0.88)" }}
          />
        </span>
      </a>
    </>
  );
}
