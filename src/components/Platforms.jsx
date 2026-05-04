import { MLIcon, ShopifyIcon, WooIcon, TiendanubeIcon, GoogleAdsIcon } from './PlatformIcons'
import { CheckCircle2, Layers } from 'lucide-react'

const platforms = [
  {
    Icon: MLIcon,
    name: 'MercadoLibre',
    desc: 'Dominio total del ecosistema, desde MercadoEnvíos Full hasta MercadoAds. Posicionamiento en el marketplace líder de LATAM.',
    accent: '#3483FA',
    features: ['Estrategia Full', 'Optimización de Catálogo']
  },
  {
    Icon: ShopifyIcon,
    name: 'Shopify',
    desc: 'Construcción y escalado de tu propia tienda online de alto rendimiento enfocado en maximizar la conversión (CRO).',
    accent: '#96BF48',
    features: ['E-commerce propio', 'Optimización CRO']
  },
  {
    Icon: WooIcon,
    name: 'WooCommerce',
    desc: 'Flexibilidad absoluta en WordPress. Arquitecturas robustas para catálogos complejos y SEO técnico.',
    accent: '#7F54B3',
    features: ['Control total', 'SEO Avanzado']
  },
  {
    Icon: TiendanubeIcon,
    name: 'Tiendanube',
    desc: 'Soluciones ágiles y altamente efectivas en la plataforma de e-commerce de mayor crecimiento local.',
    accent: '#00ADEF',
    features: ['Lanzamiento ágil', 'Diseño a medida']
  },
  {
    Icon: GoogleAdsIcon,
    name: 'Google Ads & Meta',
    desc: 'Ingeniería de tráfico pago. Campañas PMax, Shopping y retargeting agresivo con foco en conversiones.',
    accent: '#4285F4',
    features: ['Tráfico calificado', 'Escalamiento ROAS']
  },
]

export default function Platforms() {
  return (
    <div className="platforms-section reveal">
      <div className="platforms-inner">
        <div className="platforms-header">
          <div className="eyebrow"><Layers size={14} style={{marginRight: '6px'}}/> Ecosistema Integral</div>
          <h2 className="sh">Plataformas y canales<br/>donde operamos</h2>
          <p className="sp">Desarrollamos e implementamos estrategias omnicanal adaptadas a la arquitectura de cada plataforma para maximizar tu rentabilidad.</p>
        </div>
        <div className="platforms-grid">
          {platforms.map((p) => (
            <div
              className="platform-card"
              key={p.name}
              style={{ '--accent': p.accent }}
            >
              <div className="platform-card-top">
                <div className="platform-icon-wrap">
                  <p.Icon />
                </div>
                <div className="platform-name">{p.name}</div>
              </div>
              <div className="platform-desc">{p.desc}</div>
              <div className="platform-features">
                {p.features.map(f => (
                  <div className="pf-item" key={f}>
                    <CheckCircle2 size={12} className="pf-icon" style={{color: p.accent}} />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
              {p.badge && <div className="platform-badge">{p.badge}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
