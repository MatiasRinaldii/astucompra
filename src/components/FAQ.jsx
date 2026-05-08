import { useState } from 'react'

export default function FAQ() {
  const [open, setOpen] = useState(0)

  const faqs = [
    {
      q: '¿Cuánto cuesta el servicio?',
      a: 'Los precios son personalizados según la complejidad de la operación y el volumen de trabajo requerido, comenzando desde los 500 USD mensuales. En la llamada de diagnóstico armamos una propuesta exacta con el ROI estimado para tu caso.',
    },
    {
      q: '¿Cuánto tiempo tardan en verse los resultados?',
      a: 'El contrato mínimo es de 3 meses para consolidar cambios estructurales y ver el impacto real en ventas. Sin embargo, todos nuestros contratos incluyen una cláusula de rescisión gratuita durante los primeros 30 días si no estás 100% satisfecho con el servicio.',
    },
    {
      q: '¿Qué pasa si ya tengo agencia o equipo interno?',
      a: 'Nos adaptamos sin problema a cualquier estructura. Si tienes equipo interno, los capacitamos y les damos lineamientos estratégicos. Si trabajas con terceros, nos acoplamos perfectamente para potenciar su trabajo con nuestra metodología técnica.',
    },
    {
      q: '¿Trabajan con mis competidores?',
      a: 'No. Por estrictas políticas de confidencialidad y ética profesional, aseguramos exclusividad por país y rubro. Te damos todas nuestras herramientas sabiendo que no habrá otro en tu nicho usando exactamente las mismas estrategias.',
    },
    {
      q: '¿Cómo manejan la seguridad y accesos a mi cuenta?',
      a: 'Trabajamos únicamente mediante cuentas "Colaborador" generadas por ti, donde tú controlas al 100% los permisos. Todo nuestro trabajo queda registrado y jamás tenemos acceso a tu MercadoPago ni capacidad de realizar retiros o acciones sensibles.',
    },
  ]

  return (
    <div className="section-full faq-section">
      <div className="section-inner" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="eyebrow reveal" style={{ marginBottom: '16px' }}>Preguntas Frecuentes</div>
        </div>
        <h2 className="sh reveal" style={{ textAlign: 'center', marginBottom: '48px' }}>
          Todo lo que necesitas saber.
        </h2>
        <div className="faq-accordion reveal">
          {faqs.map((faq, i) => (
            <div 
              className={`faq-item ${open === i ? 'open' : ''}`} 
              key={i}
              onClick={() => setOpen(open === i ? -1 : i)}
            >
              <div className="faq-q-box">
                <h3 className="faq-q">{faq.q}</h3>
                <span className="faq-icon">{open === i ? '−' : '+'}</span>
              </div>
              <div className="faq-a-box">
                <p className="faq-a">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
