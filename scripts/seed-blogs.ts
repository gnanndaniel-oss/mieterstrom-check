import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const blogs = [
    {
        title: "10 Gründe, warum Mieterstrom 2025 der Gamechanger für Vermieter ist",
        slug: "10-gruende-mieterstrom-2025",
        kategorie: "Markt-Insights",
        excerpt: "Seit dem Solarpaket I hat sich viel getan. Warum Eigentümer jetzt nicht mehr warten sollten.",
        content: "Mit dem neuen Solarpaket I wurden viele bürokratische Hürden abgebaut. Anlagenzertifikate sind einfacher, die Gemeinschaftliche Gebäudeversorgung (GGV) ist gestartet. Für Vermieter gibt es in 2025 keine Ausreden mehr: Die Renditen für PV-Anlagen auf Mehrfamilienhäusern sind auf einem Allzeithoch, besonders wenn man einen Gewerbespeicher integriert.",
        author: "Daniel Gnann",
        lesedauer: 4,
        veroeffentlicht: true
    },
    {
        title: "Mieterstrom vs. Gebäudeversorgung (GGV): Was lohnt sich mehr?",
        slug: "mieterstrom-vs-ggv-vergleich",
        kategorie: "Recht & Modelle",
        excerpt: "Das neue GGV-Modell verspricht weniger Bürokratie. Wir vergleichen Rendite und Aufwand.",
        content: "Die Gemeinschaftliche Gebäudeversorgung (GGV) ist seit Mitte 2024 Gesetz. Sie entbindet Vermieter von den Pflichten eines klassischen Energieversorgers (keine Reststrompflicht). Das senkt zwar den Aufwand massiv, allerdings fällt auch der lukrative Mieterstromzuschlag weg. Wir rechneten beide Modelle für ein Mustergebäude durch: Für Anlagen ab 20 kWp lohnt sich meist weiterhin das klassische Mieterstrommodell mit einem Dienstleister.",
        author: "Tatjana Wurm",
        lesedauer: 6,
        veroeffentlicht: true
    },
    {
        title: "Der Pflicht-Gewerbespeicher: Warum Autarkiegrade über 25% ohne Batterie eine Illusion sind",
        slug: "gewerbespeicher-erhoeht-rendite",
        kategorie: "Technik & Speicher",
        excerpt: "Ohne Speicher wird Mieterstrom oft zum Minusgeschäft. Wie ein Batteriespeicher die Mathe verändert.",
        content: "Die Sonne scheint mittags ins Netz – die Mieter kochen abends mit teurem Netzstrom. Das ist das Kernproblem klassischer PV-Anlagen auf Mehrfamilienhäusern ohne Speicher. Die Autarkie verharrt bei mickrigen 25%. Ein gewerblicher Batteriespeicher ab 30 kWh fängt den PV-Strom ab und verkauft ihn in den Abendstunden an die Mieter – für 32 Cent statt 8 Cent Einspeisevergütung.",
        author: "Christoph Ziller",
        lesedauer: 5,
        veroeffentlicht: true
    },
    {
        title: "Solarpaket I einfach erklärt: Was das Gesetz für Immobilienbesitzer bedeutet",
        slug: "solarpaket-1-einfach-erklaert",
        kategorie: "Recht & Modelle",
        excerpt: "Zertifizierungsgrenzen angehoben, GGV eingeführt. Die wichtigsten Änderungen für 2024/2025.",
        content: "Das Solarpaket I der Bundesregierung hat die Zertifizierungspflicht für Anlagen von 135 kW auf 500 kW angehoben. Ein riesiger Schritt für den Bau von PV-Anlagen auf großen Gewerbe- und Wohnanlagen. Außerdem wird der Bürokratieaufwand bei der Mieterstromabrechnung durch vereinfachte Smart-Meter-Rollouts gesenkt.",
        author: "Daniel Gnann",
        lesedauer: 3,
        veroeffentlicht: true
    },
    {
        title: "Wärmepumpen und Mieterstrom: Die unschlagbare Kombination",
        slug: "waermepumpe-mit-mieterstrom",
        kategorie: "Technik & Speicher",
        excerpt: "Wie Sie durch die Sektorenkopplung doppelt profitieren und die Heizkosten der Mieter drastisch senken.",
        content: "Eine intelligente Kaskadenschaltung ermöglicht es, den produzierten Solarstrom zuerst für die zentrale Wärmepumpe des Gebäudes und danach für den Haushaltsstrom der Mieter zu nutzen. Ein Batteriespeicher puffert die Lastspitzen. Die Wirtschaftlichkeit der Wärmepumpe steigt so enorm an.",
        author: "Tatjana Wurm",
        lesedauer: 5,
        veroeffentlicht: true
    },
    {
        title: "Haftungsdach: Warum Sie das EVU-Risiko an Contracting-Dienstleister abgeben sollten",
        slug: "haftungsdach-evu-risiko",
        kategorie: "Markt-Insights",
        excerpt: "Viele Eigentümer scheuen Mieterstrom wegen der Bürokratie. Ein 'Haftungsdach' schafft Abhilfe.",
        content: "Als Energieversorgungsunternehmen (EVU) hat man viele Pflichten: Meldung ans Marktstammdatenregister, Stromsteuer, Letztverbraucher-Abrechnungen. Ein Contracting-Dienstleister nimmt Ihnen diese Pflichten komplett ab (\"Haftungsdach\").",
        author: "Christoph Ziller",
        lesedauer: 4,
        veroeffentlicht: true
    },
    {
        title: "So überzeugen Sie Ihre Mieter vom Mieterstrom",
        slug: "mieter-ueberzeugen-kommunikation",
        kategorie: "Praxis",
        excerpt: "Die beste Anlage nützt nichts, wenn niemand den Strom abnimmt. Tipps für Mieter-Marketing.",
        content: "Damit Mieterstrom ein Erfolg wird, müssen Mieter aktiv wechseln. Das Argument Nummer 1 ist der Preis: Mieterstrom muss gesetzlich immer 10% unter dem lokalen Grundversorgertarif liegen. Zeigen Sie den Mietern klare Ersparnisse durch Musterschreiben auf.",
        author: "Daniel Gnann",
        lesedauer: 3,
        veroeffentlicht: true
    },
    {
        title: "Smart Meter Gateway als Flaschenhals: Was Sie beim iMSys-Einbau beachten müssen",
        slug: "smart-meter-gateway-imsys",
        kategorie: "Technik & Speicher",
        excerpt: "Intelligente Messsysteme sind das Rückgrat der Abrechnung. So vermeiden Sie Verzögerungen.",
        content: "Für ein sauberes viertelstündliches Abrechnungsmodell braucht jedes Mehrfamilienhaus ein intelligentes Messsystem (iMSys) vom zuständigen Messstellenbetreiber. Oft kommt es hier zu massiven Verzögerungen.",
        author: "Tatjana Wurm",
        lesedauer: 5,
        veroeffentlicht: true
    },
    {
        title: "Wallboxen im Mieterstrom modell: E-Mobilität in der Tiefgarage abrechnen",
        slug: "wallboxen-mieterstrom-abrechnen",
        kategorie: "Praxis",
        excerpt: "Der Boom der E-Mobilität erreicht die Mehrfamilienhäuser. Wie Sie Ladestrom rechtssicher abrechnen.",
        content: "Wenn Mieter ihre Autos in der Tiefgarage laden, explodiert der Strombedarf. Ein klug kombiniertes System mit Gewerbespeicher verkauft nachts den gespeicherten Solarstrom günstig für das E-Auto.",
        author: "Christoph Ziller",
        lesedauer: 4,
        veroeffentlicht: true
    },
    {
        title: "Mieterstrom-Zuschlag 2025: Die aktuellen Fördersätze",
        slug: "mieterstrom-zuschlag-2025-foerderung",
        kategorie: "Recht & Modelle",
        excerpt: "So viel Cent pro Kilowattstunde bekommen Sie aktuell staatlich bezuschusst.",
        content: "Abhängig von der anlagengröße sinkt oder steigt der Zuschlag nach dem EEG. In 2025 liegen wir grob zwischen 1,5 und 2,6 Cent pro verkaufter kWh, die es zusätzlich vom Staat direkt auf das Konto des Betreibers gibt.",
        author: "Daniel Gnann",
        lesedauer: 2,
        veroeffentlicht: true
    },
    {
        title: "Dachpachtmodell vs Eigeninvestment: Welcher Typ Eigentümer sind Sie?",
        slug: "dachpacht-vs-eigeninvestment",
        kategorie: "Markt-Insights",
        excerpt: "Wollen Sie 0€ investieren oder die maximale Rendite mitnehmen?",
        content: "Beim Dachpachtmodell haben Sie null Kosten. Sie verpachten Ihr Dach an einen Dienstleister, dieser baut Anlage und Speicher und verkauft den Strom. Das Ergebnis: Wenig Bürokratie, keine Investition, wenig Rendite.",
        author: "Tatjana Wurm",
        lesedauer: 5,
        veroeffentlicht: true
    },
    {
        title: "Das richtige Messkonzept beim zuständigen Netzbetreiber finden",
        slug: "messkonzept-netzbetreiber-waehlen",
        kategorie: "Technik & Speicher",
        excerpt: "Das Messkonzept bestimmt, wer welchen Strom zu welchen Konditionen abrechnen darf.",
        content: "Ohne das richtige Messkonzept darf kein Mieterstrom fließen. Es definiert exakt das Zähler-Setup (z.B. Zwei-Richtungszähler, Summenzähler) im Hausanschlussraum.",
        author: "Christoph Ziller",
        lesedauer: 6,
        veroeffentlicht: true
    },
    {
        title: "Kostenfalle Zählerschrankumbau: Wann der Netzanschluss teuer wird",
        slug: "kostenfalle-zaehlerschrank-umbau",
        kategorie: "Praxis",
        excerpt: "In Bestandsgebäuden aus den 70er, 80er Jahren ist die Elektrik oft nicht mehr zeitgemäß.",
        content: "Oft wird die Wirtschaftlichkeit eines Mieterstromprojekts von einem VDE-ungerechten, alten Zählerschrank zerstört, der für 15.000 Euro komplett erneuert werden muss. Eine gute Vorab-Planung ist Pflicht.",
        author: "Daniel Gnann",
        lesedauer: 3,
        veroeffentlicht: true
    },
    {
        title: "Was passiert, wenn der Mieter kündigt? Stromvertrag und Mietvertrag",
        slug: "stromvertrag-mietvertrag-kuendigung",
        kategorie: "Recht & Modelle",
        excerpt: "Laut EnWG darf der Abschluss eines Mieterstromvertrags nicht Bedingung für einen Mietvertrag sein.",
        content: "Kopplungsverbot: Sie können Mietern den Strom nicht vorschreiben. Zieht ein neuer Mieter ein, müssen Sie ihm ein frisches Angebot unterbreiten. Und bei einem Anbieterwechsel muss das System transparent gestaltet sein.",
        author: "Tatjana Wurm",
        lesedauer: 4,
        veroeffentlicht: true
    },
    {
        title: "Lohnt sich Mieterstrom überhaupt bei kleinen Mehrfamilienhäusern (3-5 WE)?",
        slug: "mieterstrom-kleine-mehrfamilienhaeuser",
        kategorie: "Markt-Insights",
        excerpt: "Die bittere Wahrheit: Viele Dienstleister lehnen kleine Projekte wegen der Fixkosten ab.",
        content: "Ein klassisches Contracting-Modell mit Full-Service-EVU-Übernahme lohnt sich für Dienstleister aufgrund der hohen Fixkosten für Messstellen und Software meist erst ab 10-15 Wohneinheiten. Für kleinere Objekte (unter 6 WE) bleibt oft nur die Gemeinschaftliche Gebäudeversorgung.",
        author: "Christoph Ziller",
        lesedauer: 4,
        veroeffentlicht: true
    }
];

async function main() {
    for (const b of blogs) {
        await prisma.blogPost.upsert({
            where: { slug: b.slug },
            update: {
                titel: b.title,
                kategorie: b.kategorie,
                excerpt: b.excerpt,
                inhalt: b.content,
                autor: b.author,
                veroeffentlicht: b.veroeffentlicht
            },
            create: {
                titel: b.title,
                slug: b.slug,
                kategorie: b.kategorie,
                excerpt: b.excerpt,
                inhalt: b.content,
                autor: b.author,
                veroeffentlicht: b.veroeffentlicht
            }
        });
    }
    console.log("15 Blogs successfully seeded!");
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
