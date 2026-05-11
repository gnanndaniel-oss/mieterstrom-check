import type { Metadata } from "next";

export const SITE_URL = "https://mieterstrom-check.de";
export const SITE_NAME = "mieterstrom-check.de";
export const DEFAULT_OG_IMAGE = "/blog/mieterstrom_2026.png";

export const ORG = {
    legalName: "Gnann Verwaltung GmbH",
    brand: "Mieterstrom-Check",
    street: "Römerweg 56",
    postalCode: "86391",
    city: "Stadtbergen",
    region: "Bayern",
    country: "DE",
    phone: "+49-821-419028-40",
    email: "admin@mieterstrom-check.de",
    geo: { lat: 48.3715, lon: 10.8978 },
} as const;

type PageMetadataInput = {
    title: string;
    description: string;
    path: string;
    image?: string;
    type?: "website" | "article";
    keywords?: string[];
    publishedTime?: string;
    modifiedTime?: string;
    noindex?: boolean;
};

export function pageMetadata(input: PageMetadataInput): Metadata {
    const url = `${SITE_URL}${input.path.startsWith("/") ? input.path : "/" + input.path}`;
    const image = input.image || DEFAULT_OG_IMAGE;
    return {
        title: input.title,
        description: input.description,
        keywords: input.keywords,
        alternates: { canonical: input.path },
        robots: input.noindex ? { index: false, follow: false } : undefined,
        openGraph: {
            type: input.type || "website",
            url,
            title: input.title,
            description: input.description,
            siteName: SITE_NAME,
            locale: "de_DE",
            images: [{ url: image, width: 1200, height: 630, alt: input.title }],
            ...(input.type === "article" && {
                publishedTime: input.publishedTime,
                modifiedTime: input.modifiedTime,
            }),
        },
        twitter: {
            card: "summary_large_image",
            title: input.title,
            description: input.description,
            images: [image],
        },
        other: {
            "geo.region": "DE",
            "geo.placename": "Deutschland",
        },
    };
}
