import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BRUTAL. - Agencia Digital",
  description:
    "Agencia digital especializada en SEO, AEO, gestión estratégica de redes sociales y campañas de publicidad digital.",
  metadataBase: new URL("https://brutal-agency.onrender.com"),
  openGraph: {
    title: "BRUTAL. - Agencia Digital | SEO, AEO, Social Media & Ads",
    description: "Hacemos que te encuentren. Posicionamiento web (SEO & AEO), gestión estratégica de redes sociales y campañas de publicidad digital para hacer crecer tu negocio.",
    siteName: "BRUTAL.",
    locale: "es_ES",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "BRUTAL. - Agencia Digital" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BRUTAL. - Agencia Digital | SEO, AEO, Social Media & Ads",
    description: "Hacemos que te encuentren. Posicionamiento web (SEO & AEO), gestión estratégica de redes sociales y campañas de publicidad digital para hacer crecer tu negocio.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Space+Grotesk:wght@400;500;600;700&family=Manrope:wght@300;400;500;600;700&family=Syne:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
