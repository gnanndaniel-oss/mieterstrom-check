import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL('https://mieterstrom-check.de'),
  title: "Mieterstrom-Anbieter vergleichen 2026 | Kostenloser Vergleich | mieterstrom-check.de",
  description: "Finden Sie den passenden Mieterstrom-Dienstleister für Ihr Mehrfamilienhaus. Unabhängig. Kostenlos. BNetzA geprüft.",
  openGraph: {
    type: 'website',
    url: 'https://mieterstrom-check.de',
    title: 'Das Vergleichsportal für Mieterstrom & GGV | mieterstrom-check.de',
    description: 'Finden Sie den perfekten Mieterstrom-Contracting Partner für Ihr Mehrfamilienhaus.',
    siteName: 'mieterstrom-check.de',
  },
  alternates: {
    canonical: '/',
  },
  other: {
    'geo.region': 'DE-BY',
    'geo.placename': 'Augsburg',
    'geo.position': '48.3715;10.8978',
    'ICBM': '48.3715, 10.8978'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <Script id="schema-org" type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify([{
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Mieterstrom-Check",
            "url": "https://mieterstrom-check.de",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://mieterstrom-check.de/vergleich?we={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          }, {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Gnann Verwaltung GmbH",
            "url": "https://mieterstrom-check.de",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+49-821-419028-40",
              "contactType": "customer service"
            },
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Römerweg 56",
              "addressLocality": "Stadtbergen",
              "postalCode": "86391",
              "addressRegion": "Bayern",
              "addressCountry": "DE"
            }
          }])
        }} />
      </head>
      <body
        className={`${inter.variable} ${jetbrains.variable} font-sans antialiased text-slate-800 bg-slate-50 flex flex-col min-h-screen`}
      >
        <Header />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
        <CookieBanner />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
