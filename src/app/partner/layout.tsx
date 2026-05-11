import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLdString } from "@/lib/structured-data";

export const metadata = pageMetadata({
    title: "Mieterstrom-Partner werden | Qualifizierte Leads | mieterstrom-check.de",
    description:
        "Werden Sie Listing-Partner auf mieterstrom-check.de und erhalten Sie qualifizierte WEG- und Vermieter-Leads aus ganz Deutschland. Performance-basiert, transparent.",
    path: "/partner",
    keywords: ["Mieterstrom Partner", "Lead Plattform", "Mieterstrom Anbieter listen", "PV Contracting Leads"],
});

export default function PartnerLayout({ children }: { children: ReactNode }) {
    const ld = jsonLdString(
        breadcrumbSchema([
            { name: "Start", path: "/" },
            { name: "Partner werden", path: "/partner" },
        ]),
    );
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />
            {children}
        </>
    );
}
