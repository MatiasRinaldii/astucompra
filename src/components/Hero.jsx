export default function Hero() {
  return (
    <section className="hero">
      {/* Mesh grid overlay */}
      <div className="hero-grid" />

      {/* Glow orbs */}
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />

      {/* Main content */}
      <div className="hero-inner">
        <div className="hero-badge">
          <span className="badge-pill">Probado</span>
          Método validado en +50 sellers reales
        </div>

        {/* Solo UN salto de línea */}
        <h1>
          Escalamos tus ventas en <span className="hero-highlight">Mercado Libre</span><br />
          y tu Tienda Online
        </h1>

        <p className="hero-sub">
          Si en 30 días no detectás mejoras, te devolvemos tu inversión.
        </p>

        <div className="hero-actions">
          <a href="#agenda" className="hero-cta">
            Solicitar diagnóstico sin costo
            <span className="cta-arrow">→</span>
          </a>
          <a href="#presentacion" className="hero-ghost">
            Ver el método
          </a>
          <div style={{ width: '100%', marginTop: '8px', fontSize: '1.2rem' }}>🇦🇷 🇲🇽 🇺🇾</div>
        </div>

        <div className="hero-trust">
          <div className="ht-item"><span className="ht-icon">✓</span>Sin costo</div>
          <div className="ht-sep" />
          <div className="ht-item"><span className="ht-icon">✓</span>Sin compromiso</div>
          <div className="ht-sep" />
          <div className="ht-item"><span className="ht-icon">✓</span>Resultados en 30 días</div>
        </div>
      </div>

      {/* Wave transition to white */}
      <div className="hero-wave">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,60 C360,0 1080,80 1440,20 L1440,80 L0,80 Z" fill="white"/>
        </svg>
      </div>
    </section>
  )
}
