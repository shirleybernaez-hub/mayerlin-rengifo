"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// ─── Design tokens ──────────────────────────────────────────────────────────
const BRAND_RED = "#D11E27";
const INK       = "#1A1D24";
const MUTED     = "#7A6F63";
const SERIF     = "'Newsreader', Georgia, serif";
const SANS      = "'Manrope', sans-serif";

// ─── Static data ────────────────────────────────────────────────────────────
const TABS = ["Comprar", "Vender", "Alquilar"];

const DEFAULT_FILTERS = {
  tipo: "Apartamento",
  ciudad: "Caracas",
  urb: "Las Mercedes",
  dorms: "3+",
  banos: "2+",
  precioMin: "",
  precioMax: "",
  codigo: "",
};

const FIELD_OPTIONS = {
  tipo:  ["Apartamento", "Casa", "PH", "Quinta", "Local", "Oficina", "Galpón", "Terreno"],
  ciudad:["Caracas", "Valencia", "Maracaibo", "Barquisimeto", "Maracay"],
  urb:   ["Las Mercedes", "Los Palos Grandes", "Altamira", "La Castellana", "El Rosal", "Chacao", "La Lagunita", "Sebucán", "Chuao", "La Tahona"],
  dorms: ["1", "2", "3", "4", "5+"],
  banos: ["1", "2", "3", "4", "5+"],
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function ChevronDown({ size = 12, color = MUTED }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill={BRAND_RED}
      stroke={BRAND_RED} strokeWidth="1.5">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" fill="white" stroke="white" />
    </svg>
  );
}

function DollarIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
      stroke={BRAND_RED} strokeWidth="2.5" strokeLinecap="round">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
    </svg>
  );
}

function HashIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
      stroke={MUTED} strokeWidth="2.5" strokeLinecap="round">
      <line x1="4" y1="9" x2="20" y2="9" />
      <line x1="4" y1="15" x2="20" y2="15" />
      <line x1="10" y1="3" x2="8" y2="21" />
      <line x1="16" y1="3" x2="14" y2="21" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="white" strokeWidth="2.5" strokeLinecap="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

// Dropdown field with chevron on the right
function SearchField({ label, value, prefixIcon, options, fieldKey, openField, setOpenField, onSelect, noBorder, colSpan }) {
  const isOpen = openField === fieldKey;

  return (
    <div style={{ position: "relative", gridColumn: colSpan ? `span ${colSpan}` : undefined, height: "100%" }}>
      <button
        type="button"
        onClick={e => { e.stopPropagation(); setOpenField(isOpen ? null : fieldKey); }}
        style={{
          display: "flex", flexDirection: "column", justifyContent: "center",
          padding: "12px 16px", height: "100%", width: "100%",
          borderRight: noBorder ? "none" : "1px solid rgba(26,29,36,0.12)",
          background: isOpen ? "rgba(26,29,36,0.03)" : "transparent",
          cursor: "pointer", gap: "4px", textAlign: "left",
        }}
      >
        <span style={{
          fontFamily: SANS, fontSize: "10.5px", fontWeight: 700,
          textTransform: "uppercase", letterSpacing: "0.18em", color: MUTED, lineHeight: 1,
        }}>
          {label}
        </span>
        <span style={{
          fontFamily: SANS, fontSize: "14px", fontWeight: 500, color: INK,
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: "6px",
        }}>
          <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            {prefixIcon}
            {value || <span style={{ color: MUTED, fontWeight: 400 }}>—</span>}
          </span>
          <ChevronDown color={isOpen ? INK : MUTED} />
        </span>
      </button>

      {/* Dropdown */}
      {isOpen && options && (
        <div
          onClick={e => e.stopPropagation()}
          style={{
            position: "absolute", top: "calc(100% + 6px)", left: 0, zIndex: 50,
            minWidth: "100%", background: "white",
            borderRadius: "12px", border: "1px solid rgba(26,29,36,0.10)",
            boxShadow: "0 8px 30px rgba(0,0,0,0.14)",
            overflow: "hidden",
          }}
        >
          {options.map(opt => (
            <button
              key={opt}
              type="button"
              onClick={() => { onSelect(fieldKey, opt); setOpenField(null); }}
              style={{
                display: "block", width: "100%", padding: "10px 16px",
                textAlign: "left", background: opt === value ? "rgba(209,30,39,0.06)" : "transparent",
                color: opt === value ? BRAND_RED : INK,
                fontFamily: SANS, fontSize: "13.5px",
                fontWeight: opt === value ? 600 : 400,
                cursor: "pointer", border: "none",
                transition: "background 0.15s",
              }}
              onMouseEnter={e => { if (opt !== value) e.currentTarget.style.background = "rgba(26,29,36,0.04)"; }}
              onMouseLeave={e => { if (opt !== value) e.currentTarget.style.background = "transparent"; }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────
export default function HeroSection() {
  const [activeTab, setActiveTab] = useState("Comprar");
  const [filters,   setFilters]   = useState(DEFAULT_FILTERS);
  const [openField, setOpenField] = useState(null);

  const handleSelect = (key, val) => setFilters(f => ({ ...f, [key]: val }));

  const headlineRef = useRef(null);
  const searchRef   = useRef(null);

  useEffect(() => {
    const closeDropdown = () => setOpenField(null);
    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.6 });

      tl.fromTo(headlineRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.4 }
      )
        .fromTo(searchRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1.1 },
          "-=0.9"
        );
    });

    return () => ctx.revert();
  }, []);

  function resetFilters() {
    setFilters(DEFAULT_FILTERS);
  }

  return (
    <>
    <style>{`
      .hero-input::placeholder { color: ${MUTED}; opacity: 1; }
    `}</style>
    <section
      id="inicio"
      className="h-[720px] md:h-[960px]"
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        backgroundColor: "#0a0c12",
      }}
    >
      {/* ── Background image ── */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/herorentahouse.jpg"
        alt=""
        draggable="false"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          zIndex: 0,
        }}
      />

      {/* ── Gradient overlay ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(180deg, rgba(10,12,18,0.60) 0%, rgba(10,12,18,0.12) 22%, rgba(10,12,18,0.0) 38%, rgba(244,241,234,0.0) 52%, rgba(244,241,234,0.40) 68%, rgba(244,241,234,0.88) 80%, #f4f1ea 90%, #ffffff 100%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Zone 1: Headline ── */}
      <div
        ref={headlineRef}
        style={{
          position: "absolute",
          top: "16%",
          left: "clamp(20px, 8vw, 133px)",
          right: "clamp(20px, 8vw, 133px)",
          maxWidth: "640px",
          zIndex: 2,
          opacity: 0,
          filter: "drop-shadow(0 4px 48px rgba(0,0,0,0.60))",
        }}
      >
        <h1
          style={{
            fontFamily: SERIF,
            fontSize: "clamp(42px,5vw,66px)",
            lineHeight: 0.96,
            letterSpacing: "-0.025em",
            color: "white",
            fontWeight: 400,
            textShadow: "0 2px 40px rgba(0,0,0,0.55), 0 1px 8px rgba(0,0,0,0.40)",
            margin: 0,
          }}
        >
          Tu historia,
          <br />
          en{" "}
          <em style={{ fontStyle: "italic", fontWeight: 300 }}>cada</em>
          <br />
          metro cuadrado.
        </h1>
        <p
          style={{
            fontFamily: SANS,
            fontWeight: 600,
            fontSize: "clamp(15px, 4vw, 22px)",
            lineHeight: 1.4,
            color: "rgba(255,255,255,0.95)",
            marginTop: "14px",
            margin: "14px 0 0",
          }}
        >
          De la primera visita a las llaves en mano.
        </p>
      </div>

      {/* ── Zone 2: Search bar ── */}
      <div
        ref={searchRef}
        className="hidden md:block"
        style={{
          position: "absolute",
          bottom: "200px",
          left: "clamp(20px, 8vw, 133px)",
          right: "clamp(20px, 8vw, 133px)",
          zIndex: 3,
          opacity: 0,
        }}
      >
        {/* Tabs */}
        <div
          style={{
            display: "inline-flex",
            background: "rgba(255,255,255,0.10)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            border: "1px solid rgba(255,255,255,0.20)",
            borderRadius: "999px",
            padding: "5px",
            marginBottom: "14px",
          }}
        >
          {TABS.map((tab) => {
            const isActive = tab === activeTab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                type="button"
                style={{
                  padding: "9px 20px",
                  borderRadius: "999px",
                  fontSize: "12.5px",
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  fontFamily: SANS,
                  background: isActive ? "white" : "transparent",
                  color: isActive ? INK : "rgba(255,255,255,0.80)",
                  border: "none",
                  cursor: "pointer",
                  transition: "background 0.2s, color 0.2s",
                }}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Bar */}
        <div
          style={{
            background: "rgba(255,255,255,0.96)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderRadius: "20px",
            padding: "8px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
          }}
        >
          {/* Row 1 */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              alignItems: "stretch",
            }}
          >
            <SearchField label="Tipo de propiedad" value={filters.tipo}   fieldKey="tipo"   options={FIELD_OPTIONS.tipo}   openField={openField} setOpenField={setOpenField} onSelect={handleSelect} />
            <SearchField label="Ciudad"            value={filters.ciudad} fieldKey="ciudad" options={FIELD_OPTIONS.ciudad} openField={openField} setOpenField={setOpenField} onSelect={handleSelect} prefixIcon={<PinIcon />} />
            <SearchField label="Urbanización"      value={filters.urb}    fieldKey="urb"    options={FIELD_OPTIONS.urb}    openField={openField} setOpenField={setOpenField} onSelect={handleSelect} />
            <SearchField label="Dormitorios"       value={filters.dorms}  fieldKey="dorms"  options={FIELD_OPTIONS.dorms}  openField={openField} setOpenField={setOpenField} onSelect={handleSelect} />
            <SearchField label="Baños"             value={filters.banos}  fieldKey="banos"  options={FIELD_OPTIONS.banos}  openField={openField} setOpenField={setOpenField} onSelect={handleSelect} noBorder />
          </div>

          {/* Divider */}
          <div style={{ borderTop: "1px solid rgba(26,29,36,0.10)", margin: "0 8px" }} />

          {/* Row 2 */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 2fr 1fr",
              alignItems: "stretch",
            }}
          >
            {/* Precio mínimo */}
            <div style={{ position: "relative", borderRight: "1px solid rgba(26,29,36,0.12)" }}>
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "12px 16px", gap: "4px", height: "100%" }}>
                <span style={{ fontFamily: SANS, fontSize: "10.5px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.18em", color: MUTED, lineHeight: 1 }}>Precio mínimo</span>
                <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <DollarIcon />
                  <input type="text" placeholder="0" value={filters.precioMin}
                    onChange={e => setFilters(f => ({ ...f, precioMin: e.target.value }))}
                    className="hero-input"
                    style={{ fontFamily: SANS, fontSize: "14px", fontWeight: 500, color: INK, background: "transparent", border: "none", outline: "none", width: "100%" }}
                  />
                </span>
              </div>
            </div>
            {/* Precio máximo */}
            <div style={{ position: "relative", borderRight: "1px solid rgba(26,29,36,0.12)" }}>
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "12px 16px", gap: "4px", height: "100%" }}>
                <span style={{ fontFamily: SANS, fontSize: "10.5px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.18em", color: MUTED, lineHeight: 1 }}>Precio máximo</span>
                <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <DollarIcon />
                  <input type="text" placeholder="0" value={filters.precioMax}
                    onChange={e => setFilters(f => ({ ...f, precioMax: e.target.value }))}
                    className="hero-input"
                    style={{ fontFamily: SANS, fontSize: "14px", fontWeight: 500, color: INK, background: "transparent", border: "none", outline: "none", width: "100%" }}
                  />
                </span>
              </div>
            </div>
            {/* Código Flex — span 2 */}
            <div style={{ position: "relative", borderRight: "1px solid rgba(26,29,36,0.12)", gridColumn: "span 1" }}>
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "12px 16px", gap: "4px", height: "100%" }}>
                <span style={{ fontFamily: SANS, fontSize: "10.5px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.18em", color: MUTED, lineHeight: 1 }}>Código Flex</span>
                <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <HashIcon />
                  <input type="text" placeholder="FX-XXXXX" value={filters.codigo}
                    onChange={e => setFilters(f => ({ ...f, codigo: e.target.value }))}
                    className="hero-input"
                    style={{ fontFamily: SANS, fontSize: "14px", fontWeight: 500, color: INK, background: "transparent", border: "none", outline: "none", width: "100%" }}
                  />
                </span>
              </div>
            </div>
            {/* Search button */}
            <div style={{ display: "flex", alignItems: "center", padding: "6px 8px 6px 6px" }}>
              <button
                type="button"
                style={{
                  width: "100%",
                  height: "52px",
                  background: BRAND_RED,
                  color: "white",
                  fontFamily: SANS,
                  fontWeight: 700,
                  fontSize: "13.5px",
                  letterSpacing: "0.04em",
                  border: "none",
                  borderRadius: "999px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "7px",
                  transition: "filter 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(1.1)")}
                onMouseLeave={(e) => (e.currentTarget.style.filter = "brightness(1)")}
              >
                <SearchIcon />
                Buscar propiedades
              </button>
            </div>
          </div>
        </div>

        {/* Clear filters */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
          <button
            type="button"
            onClick={resetFilters}
            style={{
              fontFamily: SANS,
              fontSize: "12.5px",
              fontWeight: 500,
              color: INK,
              opacity: 0.75,
              background: "transparent",
              border: "none",
              cursor: "pointer",
              letterSpacing: "0.01em",
            }}
          >
            ← Limpiar filtros
          </button>
        </div>
      </div>


      {/* ── Mobile filter (hidden on md+) ── */}
      <div
        className="md:hidden"
        style={{ position: "absolute", bottom: "28px", left: "16px", right: "16px", zIndex: 3 }}
      >
        {/* Tabs */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
          <div style={{ display: "inline-flex", background: "rgba(255,255,255,0.12)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,0.22)", borderRadius: "999px", padding: "4px" }}>
            {TABS.map(tab => {
              const isActive = tab === activeTab;
              return (
                <button key={tab} type="button" onClick={() => setActiveTab(tab)}
                  style={{ padding: "7px 16px", borderRadius: "999px", fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: SANS, background: isActive ? "white" : "transparent", color: isActive ? INK : "rgba(255,255,255,0.80)", border: "none", cursor: "pointer", transition: "background 0.2s, color 0.2s" }}>
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bar */}
        <div style={{ background: "rgba(255,255,255,0.96)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderRadius: "16px", padding: "6px", boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}>
          {/* Fila 1: Tipo + Ciudad */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "stretch" }}>
            <SearchField label="Tipo" value={filters.tipo} fieldKey="tipo" options={FIELD_OPTIONS.tipo} openField={openField} setOpenField={setOpenField} onSelect={handleSelect} />
            <SearchField label="Ciudad" value={filters.ciudad} fieldKey="ciudad" options={FIELD_OPTIONS.ciudad} openField={openField} setOpenField={setOpenField} onSelect={handleSelect} prefixIcon={<PinIcon />} noBorder />
          </div>

          <div style={{ borderTop: "1px solid rgba(26,29,36,0.09)", margin: "0 6px" }} />

          {/* Fila 2: Urbanización + Dormitorios */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "stretch" }}>
            <SearchField label="Urbanización" value={filters.urb} fieldKey="urb" options={FIELD_OPTIONS.urb} openField={openField} setOpenField={setOpenField} onSelect={handleSelect} />
            <SearchField label="Dormitorios" value={filters.dorms} fieldKey="dorms" options={FIELD_OPTIONS.dorms} openField={openField} setOpenField={setOpenField} onSelect={handleSelect} noBorder />
          </div>

          <div style={{ borderTop: "1px solid rgba(26,29,36,0.09)", margin: "0 6px" }} />

          {/* Precio mín + máx */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "stretch" }}>
            <div style={{ borderRight: "1px solid rgba(26,29,36,0.10)" }}>
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "10px 14px", gap: "3px" }}>
                <span style={{ fontFamily: SANS, fontSize: "9px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.18em", color: MUTED }}>Precio mín.</span>
                <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <DollarIcon />
                  <input type="text" placeholder="0" value={filters.precioMin} onChange={e => setFilters(f => ({ ...f, precioMin: e.target.value }))} className="hero-input" style={{ fontFamily: SANS, fontSize: "13px", fontWeight: 500, color: INK, background: "transparent", border: "none", outline: "none", width: "100%" }} />
                </span>
              </div>
            </div>
            <div>
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "10px 14px", gap: "3px" }}>
                <span style={{ fontFamily: SANS, fontSize: "9px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.18em", color: MUTED }}>Precio máx.</span>
                <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <DollarIcon />
                  <input type="text" placeholder="0" value={filters.precioMax} onChange={e => setFilters(f => ({ ...f, precioMax: e.target.value }))} className="hero-input" style={{ fontFamily: SANS, fontSize: "13px", fontWeight: 500, color: INK, background: "transparent", border: "none", outline: "none", width: "100%" }} />
                </span>
              </div>
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(26,29,36,0.09)", margin: "0 6px" }} />

          {/* Botón buscar */}
          <div style={{ padding: "6px" }}>
            <button type="button" style={{ width: "100%", height: "46px", background: BRAND_RED, color: "white", fontFamily: SANS, fontWeight: 700, fontSize: "12px", letterSpacing: "0.06em", border: "none", borderRadius: "999px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "7px" }}>
              <SearchIcon />
              Buscar propiedades
            </button>
          </div>
        </div>

        {/* Limpiar filtros */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "8px" }}>
          <button type="button" onClick={resetFilters} style={{ fontFamily: SANS, fontSize: "11px", fontWeight: 500, color: "rgba(255,255,255,0.70)", background: "transparent", border: "none", cursor: "pointer" }}>
            ← Limpiar filtros
          </button>
        </div>
      </div>
    </section>
    </>
  );
}
