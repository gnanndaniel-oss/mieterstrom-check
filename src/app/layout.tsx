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
  title: "Mieterstrom-Anbieter vergleichen 2026 | Kostenloser Vergleich | mieterstrom-check.de",
  description: "Finden Sie den passenden Mieterstrom-Dienstleister für Ihr Mehrfamilienhaus. Unabhängig. Kostenlos. BNetzA geprüft.",
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
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Mieterstrom-Check",
            "url": "https://mieterstrom-check.de",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://mieterstrom-check.de/vergleich?we={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })
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
