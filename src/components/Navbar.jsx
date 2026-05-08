import { useState } from 'react'

const navLinks = [
  { href: '#presentacion', label: 'Quién soy' },
  { href: '#metodo',       label: 'El método' },
  { href: '#resultados',   label: 'Resultados' },
  { href: '#testimonios',  label: 'Testimonios' },
]

export default function Navbar() {
  return (
    /* position: absolute → se queda en el hero, no sigue al scroll */
    <nav className="nav">
      <div className="nav-left">
        <img src="/logo.jpeg" className="nav-logo" alt="AS Digital Partners" />
        <div className="nav-brand-block">
          <div className="nav-brand">AS DIGITAL PARTNERS</div>
          <div className="nav-brand-sub">Crecemos tus ventas en MercadoLibre</div>
        </div>
      </div>

      <div className="nav-links">
        {navLinks.map((l) => (
          <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
        ))}
        <a href="#agenda" className="nav-cta">Agendar diagnóstico</a>
      </div>
    </nav>
  )
}
