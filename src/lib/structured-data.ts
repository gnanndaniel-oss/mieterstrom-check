import { ORG, SITE_NAME, SITE_URL } from "./seo";

type Crumb = { name: string; path: string };

export function breadcrumbSchema(crumbs: Crumb[]) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: crumbs.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.name,
            item: c.path.startsWith("http") ? c.path : `${SITE_URL}${c.path}`,
        })),
    };
}

export function articleSchema(args: {
    headline: string;
    description?: string;
    slug: string;
    image?: string | null;
    author?: string | null;
    category?: string | null;
    keywords?: string | null;
    publishedAt: Date | string;
    modifiedAt: Date | string;
}) {
    const url = `${SITE_URL}/blog/${args.slug}`;
    return {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: args.headline,
        description: args.description || undefined,
        image: args.image ? [args.image.startsWith("http") ? args.image : `${SITE_URL}${args.image}`] : undefined,
        datePublished: new Date(args.publishedAt).toISOString(),
        dateModified: new Date(args.modifiedAt).toISOString(),
        author: { "@type": "Person", name: args.author || ORG.brand },
        publisher: {
            "@type": "Organization",
            name: ORG.brand,
            logo: { "@type": "ImageObject", url: `${SITE_URL}/blog/mieterstrom_2026.png` },
        },
        articleSection: args.category || undefined,
        keywords: args.keywords || undefined,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        inLanguage: "de-DE",
    };
}

type ProviderForSchema = {
    name: string;
    slug: string;
    kurzBeschreibung: string;
    beschreibung: string;
    website?: string | null;
    standort?: string | null;
    gruendungsjahr?: number | null;
    bewertung?: number | null;
    anzahlBewertungen?: number | null;
    regionen?: string | null;
    modellMieterstrom?: boolean;
    modellGGV?: boolean;
    modellContracting?: boolean;
    modellLieferkette?: boolean;
};

export function providerServiceSchema(p: ProviderForSchema) {
    const url = `${SITE_URL}/anbieter/${p.slug}`;
    const services: string[] = [];
    if (p.modellMieterstrom) services.push("Mieterstrom (§42a EnWG)");
    if (p.modellGGV) services.push("Gemeinschaftliche Gebäudeversorgung");
    if (p.modellContracting) services.push("Energie-Contracting");
    if (p.modellLieferkette) services.push("Lieferkettenmodell");

    const areaServed = p.regionen
        ? p.regionen.toLowerCase().includes("bundesweit")
            ? [{ "@type": "Country", name: "Deutschland" }]
            : p.regionen.split(",").map((r) => ({ "@type": "AdministrativeArea", name: r.trim() }))
        : [{ "@type": "Country", name: "Deutschland" }];

    return {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "Mieterstrom & Gebäudeversorgung",
        name: p.name,
        description: p.kurzBeschreibung,
        url,
        provider: {
            "@type": "Organization",
            name: p.name,
            url: p.website || url,
            ...(p.gruendungsjahr && { foundingDate: String(p.gruendungsjahr) }),
            ...(p.standort && {
                address: { "@type": "PostalAddress", addressLocality: p.standort, addressCountry: "DE" },
            }),
        },
        areaServed,
        ...(services.length && { hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Energie-Dienstleistungen",
            itemListElement: services.map((s) => ({
                "@type": "Offer",
                itemOffered: { "@type": "Service", name: s },
            })),
        } }),
        ...(p.bewertung && p.anzahlBewertungen
            ? {
                  aggregateRating: {
                      "@type": "AggregateRating",
                      ratingValue: p.bewertung,
                      reviewCount: p.anzahlBewertungen,
                      bestRating: 5,
                      worstRating: 1,
                  },
              }
            : {}),
    };
}

export function itemListSchema(items: { name: string; path: string }[], listName: string) {
    return {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: listName,
        itemListElement: items.map((it, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: it.path.startsWith("http") ? it.path : `${SITE_URL}${it.path}`,
            name: it.name,
        })),
    };
}

export function faqPageSchema(items: { question: string; answer: string }[]) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((it) => ({
            "@type": "Question",
            name: it.question,
            acceptedAnswer: { "@type": "Answer", text: it.answer },
        })),
    };
}

export function jsonLdString(...schemas: object[]) {
    return JSON.stringify(schemas.length === 1 ? schemas[0] : schemas);
}
