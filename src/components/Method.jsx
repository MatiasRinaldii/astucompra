import { Search, Zap, TrendingUp, Settings, Activity } from 'lucide-react'

const steps = [
  {
    num: '01',
    icon: <Search />,
    h: 'Auditoría Quirúrgica',
    p: 'Diseccionamos tus métricas, catálogo y competencia. Identificamos los cuellos de botella exactos que están desangrando tu rentabilidad.',
  },
  {
    num: '02',
    icon: <Zap />,
    h: 'Reconfiguración de Catálogo',
    p: 'Optimizamos títulos, imágenes y copy con técnicas avanzadas de CRO. Convertimos cada publicación en un vendedor 24/7.',
  },
  {
    num: '03',
    icon: <TrendingUp />,
    h: 'Ingeniería de Tráfico & Ads',
    p: 'Desplegamos campañas de Product Ads y retargeting agresivo. Compramos visibilidad barata y la convertimos en ventas de alto margen.',
  },
  {
    num: '04',
    icon: <Settings />,
    h: 'Sistematización Operativa',
    p: 'Implementamos procesos y dashboards para que delegues el 80% de la operación. El negocio escala, recuperas tu tiempo.',
  },
]

const metrics = [
  { l: 'Facturación mensual', v: '+340%', cls: 'up' },
  { l: 'Posición en ranking', v: 'Top 5', cls: 'blue' },
  { l: 'Costo por adquisición', v: '−62%', cls: 'up' },
]

export default function Method() {
  return (
    <div className="section-full method-section">
      <div className="section-inner">
        <div className="eyebrow reveal"><Activity size={14} style={{marginRight: '6px'}}/> El Método AS Digital Partners</div>
        <h2 className="sh reveal method-title">
          Probado en nuestra operación.<br />
          <span className="hero-highlight">Replicado en la tuya.</span>
        </h2>
        <p className="sp reveal method-sub">
          No somos teóricos. Aplicamos el mismo playbook con el que facturamos millones mes a mes para llevar tu negocio al siguiente nivel.
        </p>

        <div className="method-wrap reveal">
          {/* Steps Timeline */}
          <div className="method-steps">
            <div className="timeline-line"></div>
            {steps.map((s) => (
              <div className="mstep-card" key={s.num}>
                <div className="mstep-icon">
                  {s.icon}
                </div>
                <div className="mstep-content">
                  <div className="mstep-num-badge">Fase {s.num}</div>
                  <h3>{s.h}</h3>
                  <p>{s.p}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Metrics Panel (Dark/Glowing) */}
          <div className="metrics-box premium">
            <div className="mb-head">
              <h3>Resultados típicos</h3>
              <p>Promedio de impacto en los primeros 90 días de implementación completa.</p>
            </div>
            <div className="mb-body">
              {metrics.map((m) => (
                <div className="mb-metric-card" key={m.l}>
                  <span className="mb-l">{m.l}</span>
                  <span className={`mb-v ${m.cls}`}>{m.v}</span>
                </div>
              ))}
            </div>
            <div className="mb-footer">
              <div className="mb-pulse-dot"></div>
              <span>Basado en auditorías de cuentas &gt;$10M ARS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
