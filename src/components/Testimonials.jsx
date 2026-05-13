const testimonials = [
  {
    q: '"Nico entiende MercadoLibre como nadie. En 3 meses tripliqué mis ventas. La diferencia está en que él vivió cada situación con su propia cuenta."',
    name: 'Dueño',
    role: <>RedLizard <span style={{ fontSize: '1.2rem', marginLeft: '4px', verticalAlign: 'middle' }}>🇲🇽</span></>,
  },
  {
    q: '"Nico y todo su equipo nos ayudaron mucho a controlar el canal, gestionar los precios y escalar nuestro posicionamiento con mucho profesionalismo."',
    name: 'Equipo E-Commerce',
    role: 'Hikvision',
  },
  {
    q: '"Pasamos de vender de forma reactiva a tener un sistema que funciona solo. Ese fue el cambio real."',
    name: 'Luciano P.',
    role: <>Importador & distribuidor <span style={{ fontSize: '1.2rem', marginLeft: '4px', verticalAlign: 'middle' }}>🇺🇾</span></>,
  },
]

export default function Testimonials() {
  return (
    <div className="section-full" id="testimonios">
      <div className="section-inner">
        <div className="eyebrow reveal">Testimonios</div>
        <h2 className="sh reveal">
          Lo que dicen quienes<br />trabajaron conmigo.
        </h2>
        <div className="testi-grid reveal">
          {testimonials.map((t, i) => (
            <div className="testi-card" key={i}>
              <div className="stars">★★★★★</div>
              <p className="testi-q">{t.q}</p>
              <div className="testi-div" />
              <div className="testi-name">{t.name}</div>
              <div className="testi-role">{t.role}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
