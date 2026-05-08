import './globals.css'

export const metadata = {
  title: 'AS Digital Partners — Escalá tus ventas en MercadoLibre',
  description: 'AS Digital Partners — Escalamos tus ventas en MercadoLibre en Argentina, Uruguay y México. Diagnóstico gratuito. Si en 30 días no detectás mejoras, te devolvemos tu inversión.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" type="image/png" href="/icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
