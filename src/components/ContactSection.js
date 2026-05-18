"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import {
  User, Phone, Mail, Home, MessageSquare,
  Building2, Key, TrendingUp, ChevronDown,
  MapPin, Shield, Star, Clock,
} from "lucide-react";

/* ── DATA ─────────────────────────────────────────────── */

const REQUEST_TYPES = [
  { id: "Comprar",  label: "Comprar",  Icon: Home },
  { id: "Vender",   label: "Vender",   Icon: Building2 },
  { id: "Alquilar", label: "Alquilar", Icon: Key },
  { id: "Invertir", label: "Invertir", Icon: TrendingUp },
];

const TRUST_ITEMS = [
  { Icon: Shield, text: "Asesoría 100% confidencial" },
  { Icon: Clock,  text: "Respuesta en menos de 24h" },
  { Icon: MapPin, text: "Cobertura en las mejores zonas de Caracas" },
  { Icon: Star,   text: "Especialistas en propiedades de alto nivel" },
];

const FAQS = [
  {
    q: "¿Qué servicios ofrece la asesora inmobiliaria?",
    a: "Ofrecemos asesoría integral para compra, venta y alquiler de propiedades residenciales y comerciales en Caracas. También gestionamos inversiones inmobiliarias, avalúos de mercado y acompañamiento legal en cada transacción, garantizando transparencia y resultados.",
  },
  {
    q: "¿Cuáles son los requisitos para alquilar?",
    a: "Generalmente se requiere: documentos de identidad vigentes, solvencia laboral o financiera demostrable, referencias personales y/o bancarias, y en algunos casos un fiador o garantía patrimonial. Cada propiedad puede tener criterios específicos según el propietario.",
  },
  {
    q: "¿Cómo es el proceso de asesoría?",
    a: "Comenzamos con una consulta inicial gratuita para entender tus necesidades y presupuesto. Luego seleccionamos las opciones más adecuadas, coordinamos visitas, asesoramos en la negociación y acompañamos el proceso hasta el cierre exitoso de la operación.",
  },
  {
    q: "¿Puedo agendar una cita personalizada?",
    a: "Sí. Puedes agendar una cita presencial en nuestras oficinas o de manera virtual según tu disponibilidad. Completa el formulario de contacto o escríbenos directamente por WhatsApp para coordinar el horario que mejor se adapte a ti.",
  },
  {
    q: "¿Trabajan con inversiones inmobiliarias?",
    a: "Absolutamente. Asesoramos a inversores locales e internacionales en la identificación de oportunidades con alto potencial de valorización. Analizamos el mercado, evaluamos riesgos y presentamos las mejores opciones para maximizar tu rendimiento.",
  },
  {
    q: "¿Qué zonas manejan?",
    a: "Trabajamos principalmente en las zonas de mayor exclusividad en Caracas: La Castellana, Altamira, Country Club, Los Chorros, Prados del Este, Valle Arriba, Santa Rosa de Lima, Las Mercedes y otras urbanizaciones de alto nivel.",
  },
  {
    q: "¿La asesoría tiene costo?",
    a: "La consulta y asesoría inicial son completamente gratuitas. Nuestros honorarios profesionales se generan únicamente al concretar exitosamente la operación, por lo que el cliente no asume ningún riesgo ni costo previo. Trabajamos orientados al resultado.",
  },
];

/* ── COMPONENT ────────────────────────────────────────── */

export default function ContactSection() {
  const [selectedType, setSelectedType] = useState("Comprar");
  const [openFaq, setOpenFaq]           = useState(null);

  /* Refs */
  const sectionRef    = useRef(null);
  const bgImgRef      = useRef(null);
  const labelRef      = useRef(null);
  const titleRef      = useRef(null);
  const subtitleRef   = useRef(null);
  const trustRef      = useRef(null);
  const formRef       = useRef(null);
  const faqSectionRef = useRef(null);
  const faqTitleRef   = useRef(null);
  const faqItemsRef   = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const defaults = { ease: "expo.out", duration: 1.1 };

      /* ── PARALLAX IMAGE ── */
      gsap.fromTo(bgImgRef.current,
        { y: "-12%" },
        { y: "12%", ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true } }
      );

      gsap.fromTo(labelRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, ...defaults,
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
      );

      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 60, clipPath: "inset(0 0 100% 0)" },
        { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)", ...defaults,
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }, delay: 0.1 }
      );

      gsap.fromTo(subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, ...defaults,
          scrollTrigger: { trigger: sectionRef.current, start: "top 72%" }, delay: 0.2 }
      );

      gsap.fromTo(trustRef.current?.children ?? [],
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, stagger: 0.1, ...defaults,
          scrollTrigger: { trigger: trustRef.current, start: "top 80%" } }
      );

      gsap.fromTo(formRef.current,
        { opacity: 0, x: 60 },
        { opacity: 1, x: 0, ...defaults,
          scrollTrigger: { trigger: formRef.current, start: "top 82%" } }
      );

      gsap.fromTo(faqTitleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, ...defaults,
          scrollTrigger: { trigger: faqSectionRef.current, start: "top 80%" } }
      );

      faqItemsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(el,
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%" }, delay: i * 0.06 }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ════════════════════════════════════════════
          CONTACT FORM SECTION
      ════════════════════════════════════════════ */}
      <section
        ref={sectionRef}
        id="contacto"
        className="relative py-20 md:py-28 px-6 md:px-16 overflow-hidden"
      >
        {/* Background image — parallax via GSAP */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={bgImgRef}
          src="/parallax_caracas.webp"
          alt=""
          aria-hidden="true"
          draggable="false"
          className="absolute left-0 right-0 w-full object-cover object-center pointer-events-none select-none will-change-transform"
          style={{ zIndex: 0, top: "-12%", height: "124%", willChange: "transform" }}
        />

        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-start" style={{ zIndex: 2 }}>

          {/* ── LEFT COLUMN ── */}
          <div className="flex flex-col">

            {/* Label */}
            <div ref={labelRef} className="opacity-0 flex items-center gap-3 mb-7">
              <div className="h-px w-12 bg-gradient-to-r from-[#E20613] to-transparent" />
              <span className="text-[9px] font-black uppercase tracking-[0.55em] text-[#E20613]/60">
                Contacto Directo
              </span>
            </div>

            {/* Headline */}
            <h2
              ref={titleRef}
              className="opacity-0 text-[clamp(28px,4vw,50px)] font-serif italic leading-tight mb-6"
            >
              <span className="text-white">Encuentra la propiedad ideal</span>
              <br />
              <span className="inline-block text-white">
                con asesoría profesional.
                <span className="block h-[6px] mt-3 bg-gradient-to-r from-[#E20613] to-transparent rounded-sm" />
              </span>
            </h2>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="opacity-0 text-[14px] text-white/90 leading-relaxed max-w-md mb-12"
            >
              Déjanos tus datos y te contactaremos para ayudarte a tomar la mejor decisión
              inmobiliaria, sin compromiso y sin costo inicial.
            </p>

            {/* Trust items */}
            <div ref={trustRef} className="flex flex-col gap-4">
              {TRUST_ITEMS.map(({ Icon, text }) => (
                <div key={text} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full border border-[#E20613]/30 flex items-center justify-center shrink-0 bg-[#E20613]/5">
                    <Icon size={13} className="text-[#E20613]/80" />
                  </div>
                  <p className="text-[13px] text-white/80 font-medium">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT COLUMN: FORM ── */}
          <div
            ref={formRef}
            className="opacity-0 relative bg-white rounded-2xl p-7 md:p-9"
            style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.25)" }}
          >
            {/* Red top accent */}
            <div
              className="absolute top-0 left-10 right-10 h-px pointer-events-none"
              style={{ background: "linear-gradient(90deg, transparent, rgba(226,6,19,0.5), transparent)" }}
            />

            <p className="text-[9px] font-black uppercase tracking-[0.45em] text-neutral-400 mb-6">
              Formulario de solicitud
            </p>

            <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>

              {/* Nombre + Apellido */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput Icon={User}  label="Nombre"   placeholder="Tu nombre" />
                <FormInput Icon={User}  label="Apellido" placeholder="Tu apellido" />
              </div>

              {/* Teléfono + Correo */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput Icon={Phone} label="Teléfono" placeholder="+58 412 000 0000" type="tel" />
                <FormInput Icon={Mail}  label="Correo"   placeholder="tu@correo.com"   type="email" />
              </div>

              {/* Tipo de solicitud */}
              <div>
                <label className="block text-[9px] font-black uppercase tracking-[0.35em] text-neutral-400 mb-3">
                  Tipo de solicitud
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {REQUEST_TYPES.map(({ id, label, Icon }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setSelectedType(id)}
                      className={`relative flex flex-col items-center gap-2 py-4 px-2 rounded-xl border transition-all duration-300 group ${
                        selectedType === id
                          ? "border-[#E20613] bg-[#E20613]/8 shadow-[0_0_16px_rgba(226,6,19,0.12)]"
                          : "border-neutral-200 bg-neutral-50 hover:border-[#E20613]/40 hover:bg-neutral-100"
                      }`}
                    >
                      <Icon
                        size={17}
                        className={`transition-colors duration-300 ${
                          selectedType === id ? "text-[#E20613]" : "text-neutral-400"
                        }`}
                      />
                      <span
                        className={`text-[8px] font-black uppercase tracking-[0.18em] transition-colors duration-300 ${
                          selectedType === id ? "text-[#E20613]" : "text-neutral-400"
                        }`}
                      >
                        {label}
                      </span>
                      {selectedType === id && (
                        <motion.div
                          layoutId="typeIndicator"
                          className="absolute inset-0 rounded-xl border border-[#E20613]/50"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mensaje */}
              <div className="flex flex-col gap-2">
                <label className="text-[9px] font-black uppercase tracking-[0.35em] text-neutral-400">
                  Mensaje
                </label>
                <div className="relative">
                  <MessageSquare size={13} className="absolute top-4 left-4 text-neutral-400 pointer-events-none" />
                  <textarea
                    placeholder="Cuéntanos qué estás buscando..."
                    rows={4}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl pl-10 pr-4 pt-3.5 pb-3.5 text-neutral-700 text-[13px] placeholder-neutral-400 outline-none resize-none focus:border-[#E20613]/50 focus:bg-white transition-all duration-300 leading-relaxed"
                  />
                </div>
              </div>

              {/* CTA */}
              <button
                type="submit"
                className="relative w-full mt-2 py-4 px-6 rounded-xl font-black text-[11px] uppercase tracking-[0.22em] text-white overflow-hidden transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.99]"
                style={{
                  background: "linear-gradient(135deg, #c0040f 0%, #E20613 45%, #f01020 100%)",
                  boxShadow: "0 8px 32px rgba(226,6,19,0.35), inset 0 1px 0 rgba(255,255,255,0.15)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 14px 40px rgba(226,6,19,0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 8px 32px rgba(226,6,19,0.35), inset 0 1px 0 rgba(255,255,255,0.15)";
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2.5">
                  <Star size={14} />
                  Quiero asesoría personalizada
                </span>
              </button>

              {/* Disclaimer */}
              <p className="text-center text-[9px] text-neutral-400 font-medium leading-relaxed">
                Al enviar, aceptas que Mayerlin Rengifo te contacte para brindarte asesoría inmobiliaria.
                <br />Tu información es completamente confidencial.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          FAQ SECTION
      ════════════════════════════════════════════ */}
      <section
        ref={faqSectionRef}
        className="relative bg-[#F9F7F4] py-24 md:py-32 px-6 overflow-hidden"
      >
        {/* Brand corner accents */}
        <div className="absolute top-0 left-0 w-32 h-px bg-gradient-to-r from-[#E20613]/40 to-transparent" />
        <div className="absolute top-0 left-0 h-32 w-px bg-gradient-to-b from-[#E20613]/40 to-transparent" />
        <div className="absolute bottom-0 right-0 w-32 h-px bg-gradient-to-l from-[#E20613]/40 to-transparent" />
        <div className="absolute bottom-0 right-0 h-32 w-px bg-gradient-to-t from-[#E20613]/40 to-transparent" />

        <div className="max-w-3xl mx-auto">

          {/* Title */}
          <div ref={faqTitleRef} className="opacity-0 mb-16 text-center">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-12 bg-gradient-to-l from-[#E20613] to-transparent" />
              <span className="text-[9px] font-black uppercase tracking-[0.55em] text-[#E20613]/80">
                Resolvemos tus dudas
              </span>
              <div className="h-px w-12 bg-gradient-to-r from-[#E20613] to-transparent" />
            </div>
            <h2 className="text-[clamp(30px,4vw,48px)] font-serif italic text-neutral-900 leading-tight">
              Preguntas frecuentes
            </h2>
            <p className="mt-4 text-[13px] text-neutral-400 max-w-sm mx-auto leading-relaxed">
              Todo lo que necesitas saber antes de iniciar tu proceso inmobiliario.
            </p>
          </div>

          {/* Accordion */}
          <div className="flex flex-col">
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  ref={(el) => { faqItemsRef.current[i] = el; }}
                  className="opacity-0 border-b border-neutral-200/80 last:border-b-0"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 py-6 text-left group"
                  >
                    <div className="flex items-center gap-4">
                      <span className="shrink-0 text-[10px] font-black tabular-nums text-[#E20613]/60 w-5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`text-[15px] font-bold leading-snug transition-colors duration-300 ${
                          isOpen
                            ? "text-neutral-900"
                            : "text-neutral-600 group-hover:text-neutral-900"
                        }`}
                      >
                        {faq.q}
                      </span>
                    </div>

                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                      className="shrink-0"
                    >
                      <div
                        className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                          isOpen
                            ? "border-[#E20613] bg-[#E20613]/10"
                            : "border-neutral-200 group-hover:border-neutral-300"
                        }`}
                      >
                        <ChevronDown
                          size={14}
                          className={`transition-colors duration-300 ${
                            isOpen ? "text-[#E20613]" : "text-neutral-400"
                          }`}
                        />
                      </div>
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.42, ease: [0.23, 1, 0.32, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-7 pl-9 pr-10">
                          <div className="flex gap-4 items-start">
                            <div className="w-0.5 shrink-0 min-h-[40px] mt-1 rounded-full bg-gradient-to-b from-[#E20613]/60 to-transparent" />
                            <p className="text-[14px] text-neutral-500 leading-[1.8]">
                              {faq.a}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>
    </>
  );
}

/* ── SHARED FORM INPUT ─────────────────────────────────── */
function FormInput({ Icon, label, placeholder, type = "text" }) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <label className="text-[9px] font-black uppercase tracking-[0.35em] text-neutral-400">
        {label}
      </label>
      <div
        className={`relative rounded-xl border transition-all duration-300 hover:border-[#E20613]/40 ${
          focused
            ? "border-[#E20613]/60 bg-white shadow-[0_0_0_3px_rgba(226,6,19,0.08)]"
            : "border-neutral-200 bg-neutral-50"
        }`}
      >
        <Icon
          size={13}
          className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400"
        />
        <input
          type={type}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-transparent text-neutral-800 text-[13px] h-11 pl-10 pr-4 rounded-xl placeholder-neutral-400 outline-none"
        />
      </div>
    </div>
  );
}
