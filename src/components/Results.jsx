const cases = [
  {
    cat: 'Electrónica · México',
    big: '+300%',
    desc: 'De facturación en 90 días. Pasamos de 350 mil MXN (≈ USD 20,000) a 1M MXN (≈ USD 62,000).',
    tags: ['MercadoLibre', '90 días', '200+ SKU'],
  },
  {
    cat: 'Operación propia · ASTuCompra',
    big: '$500k+',
    desc: 'USD en un solo mes. Sistema construido para absorber picos sin perder calidad.',
    tags: ['Shopify + ML', 'Propio'],
  },
  {
    cat: 'Hogar y decoración · Argentina',
    big: 'Líder Platinum',
    desc: 'Posicionamos a la marca en el top 1 de búsquedas orgánicas dentro de la categoría de seguridad en MercadoLibre y llevamos de un ROAS menor a 1 en campañas de DSP a un ROAS de 35.',
    tags: ['Posicionamiento', 'ROAS x35'],
  },
]

export default function Results() {
  return (
    <div className="section-blue">
      <div className="section-inner">
        <div className="eyebrow reveal">Casos reales</div>
        <h2 className="sh reveal">
          Números reales,<br />no proyecciones.
        </h2>
        <div className="res-grid reveal">
          {cases.map((c) => (
            <div className="res-card" key={c.cat}>
              <div className="res-cat">{c.cat}</div>
              <div className="res-big">{c.big}</div>
              <div className="res-desc">{c.desc}</div>
              <div className="res-tags">
                {c.tags.map((t) => (
                  <span className="rtag" key={t}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
