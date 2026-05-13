import { useState, useEffect } from 'react'

const navLinks = [
  { href: '#presentacion', label: 'Quién soy' },
  { href: '#metodo',       label: 'El método' },
  { href: '#resultados',   label: 'Resultados' },
  { href: '#testimonios',  label: 'Testimonios' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 900) setOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const handleLinkClick = () => setOpen(false)

  return (
    <nav className={`nav ${open ? 'nav--open' : ''}`}>
      <div className="nav-left">
        <img src="/logo.jpeg" className="nav-logo" alt="AS Digital Partners" />
        <div className="nav-brand-block">
          <div className="nav-brand">AS DIGITAL PARTNERS</div>
          <div className="nav-brand-sub">Crecemos tus ventas en MercadoLibre</div>
        </div>
      </div>

      {/* Hamburger button — mobile only */}
      <button
        className="nav-hamburger"
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={open}
      >
        <span className="ham-line ham-1" />
        <span className="ham-line ham-2" />
        <span className="ham-line ham-3" />
      </button>

      {/* Backdrop overlay */}
      {open && <div className="nav-backdrop" onClick={() => setOpen(false)} />}

      {/* Links */}
      <div className={`nav-links ${open ? 'nav-links--open' : ''}`}>
        {navLinks.map((l) => (
          <a key={l.href} href={l.href} className="nav-link" onClick={handleLinkClick}>{l.label}</a>
        ))}
        <a href="#agenda" className="nav-cta" onClick={handleLinkClick}>Agendar diagnóstico</a>
      </div>
    </nav>
  )
}
