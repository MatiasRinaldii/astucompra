import { TrendingDown, CircleDollarSign, Ghost, PersonStanding, AlertTriangle } from 'lucide-react'

const pains = [
  {
    num: '01',
    icon: <TrendingDown className="pain-icon-svg" />,
    t: 'Visibilidad estancada en el ranking',
    d: 'El algoritmo premia métricas que la mayoría ignora. Sin posicionamiento sólido en la primera página, tu producto se vuelve invisible. Sin tráfico, la conversión es imposible.',
    stats: '75% de las ventas ocurren en la primera página de resultados.'
  },
  {
    num: '02',
    icon: <CircleDollarSign className="pain-icon-svg" />,
    t: 'Margen destruido por guerra de precios',
    d: 'Sin una estrategia de diferenciación real, el único argumento para ganar la venta termina siendo bajar el precio. Entras en un espiral donde vendes más pero tu rentabilidad neta se desploma.',
    stats: 'La guerra de precios reduce el LTV (Life Time Value) del cliente un 40%.'
  },
  {
    num: '03',
    icon: <Ghost className="pain-icon-svg" />,
    t: 'Catálogo que no convierte',
    d: 'Inviertes en publicidad pero tu catálogo tiene títulos genéricos y fotos amateur. El comprador llega, no encuentra respuestas a sus objeciones y termina comprando a tu competencia.',
    stats: 'Una publicación optimizada puede aumentar la conversión en un 300%.'
  },
  {
    num: '04',
    icon: <PersonStanding className="pain-icon-svg" />,
    t: 'Operación que depende del dueño',
    d: 'Respondes preguntas, armas paquetes y gestionas reclamos. Sin procesos estandarizados ni sistemas automatizados, el techo de crecimiento de tu negocio es tu propia capacidad.',
    stats: 'Escalar sin soltar el control operativo es el principal límite de facturación.'
  },
]

export default function PainPoints() {
  return (
    <div className="section-blue">
      <div className="section-inner">
        <div className="eyebrow reveal">
          <AlertTriangle size={14} style={{ marginRight: '6px' }} />
          El diagnóstico
        </div>
        <h2 className="sh reveal">
          Por qué la mayoría<br />de los vendedores no crecen.
        </h2>
        <p className="sp reveal">
          Después de auditar y trabajar con decenas de marcas, identificamos estos 4 patrones letales que frenan el crecimiento y destruyen la rentabilidad.
        </p>
        <div className="pain-grid reveal">
          {pains.map((p) => (
            <div className="pain-card" key={p.num}>
              <div className="pain-header">
                <div className="pain-num">{p.num}</div>
                <div className="pain-icon-wrapper">
                  {p.icon}
                </div>
              </div>
              <div className="pain-t">{p.t}</div>
              <div className="pain-d">{p.d}</div>
              <div className="pain-stats">
                <span className="stats-dot"></span>
                {p.stats}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
