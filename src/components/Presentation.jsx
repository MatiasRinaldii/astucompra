const CheckIcon = () => (
  <svg viewBox="0 0 12 12" width="10" height="10">
    <polyline points="2,6 5,9 10,3" stroke="#fff" strokeWidth="2.5" fill="none" />
  </svg>
)

const logros = [
  {
    t: 'Vendí más de USD 500.000 en un mes en MercadoLibre',
    s: 'Seller top 1% · ASTuCompra · 5+ años de trayectoria',
  },
  {
    t: 'Proceso probado en +50 cuentas reales',
    s: 'Argentina, Uruguay y Chile — resultados medibles desde la primera semana',
  },
  {
    t: 'Ingeniero Industrial · UTN · San Andrés',
    s: 'Metodología basada en datos y sistemas, no en prueba y error',
  },
  {
    t: 'MercadoLíder Platinum certificado',
    s: 'Reputación máxima sostenida durante años en la plataforma',
  },
]

export default function Presentation() {
  return (
    <div className="section-full" id="presentacion">
      <div className="section-inner">
        <div className="pres-grid reveal">

          {/* ── Texto ── */}
          <div className="pres-left">
            <div className="eyebrow">Quién soy</div>
            <h2 className="sh">Soy Nicolás Cantiano</h2>
            <p className="pres-desc">
              Ingeniero Industrial (UTN), especialista en E-Commerce Management (San Andrés) y
              fundador de AS Digital Partners. Comencé con 20 años antes de la pandemia, construí nuestra
              propia operación en MercadoLibre desde cero y logramos vender más de USD 500.000
              en un solo mes junto a mi equipo de trabajo de más de 20 colaboradores. Hoy aplico ese mismo sistema con mis clientes.
            </p>

            <div className="quote-card">
              <p>
                "Cada implementacion que hago, ya la probé en mi propia infraestructura. No soy un consultor
                que leyó libros — soy un operador que también asesora."
              </p>
            </div>

            <div className="logros">
              {logros.map((l, i) => (
                <div className="logro-item" key={i}>
                  <div className="logro-check">
                    <CheckIcon />
                  </div>
                  <div>
                    <div className="logro-t">{l.t}</div>
                    <div className="logro-s">{l.s}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Foto ── */}
          <div className="pres-right reveal d1">
            <div className="photo-container">
              <div className="photo-frame">
                <img src="/nicolas.jpeg" alt="Nicolás Cantiano — Fundador de AS Digital Partners" />
              </div>

              {/* Badge inferior izquierdo */}
              <div className="photo-badge">
                <div className="pb-num">+500k</div>
                <div className="pb-txt">USD en un mes</div>
              </div>

              {/* Badge superior derecho */}
              <div className="photo-badge2">
                <span className="pb2-dot" />
                MercadoLíder Platinum
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
