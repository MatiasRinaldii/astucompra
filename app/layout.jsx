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
        {/* Google Tag Manager */}
        <script dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-WN85F3SG');` }} />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WN85F3SG" height="0" width="0" style={{display:'none',visibility:'hidden'}} />
        </noscript>
        {children}
      </body>
    </html>
  )
}
