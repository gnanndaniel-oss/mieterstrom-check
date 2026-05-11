import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLdString } from "@/lib/structured-data";

export const metadata = pageMetadata({
    title: "Mieterstrom-Rechner 2026 | Wirtschaftlichkeit prüfen | mieterstrom-check.de",
    description:
        "Berechnen Sie kostenlos die Wirtschaftlichkeit Ihrer Mieterstrom-Anlage: Rendite, Mieter-Ersparnis, Förderung und Investitionsmodell – in 2 Minuten zur Indikation.",
    path: "/rechner",
    keywords: ["Mieterstrom Rechner", "PV Rendite", "Wirtschaftlichkeit Mieterstrom", "Mieterstrom Kalkulator"],
});

export default function RechnerLayout({ children }: { children: ReactNode }) {
    const ld = jsonLdString(
        breadcrumbSchema([
            { name: "Start", path: "/" },
            { name: "Mieterstrom-Rechner", path: "/rechner" },
        ]),
    );
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />
            {children}
        </>
    );
}
