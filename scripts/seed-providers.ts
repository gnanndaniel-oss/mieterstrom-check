import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const newProviders = [
    {
        name: "EINHUNDERT Energie GmbH",
        slug: "einhundert-energie",
        kategorie: "Spezialisierte Dienstleister",
        standort: "Köln (bundesweit)",
        zielgruppe: "MFH ab 4 WE, Wohnungswirtschaft",
        kurzBeschreibung: "Digitale Zählertechnik (Strom/Wasser/Wärme), Echtzeit-Abrechnung per App, Energiefluss-Visualisierung",
        beschreibung: "PV-Installation, Betrieb, Finanzierung, digitale Zählertechnik (Strom/Wasser/Wärme), Echtzeit-Abrechnung per App, Energiefluss-Visualisierung.",
        besonderheiten: "Lizensierter Anbieter seit 2017, digitale Zählertechnik als Alleinstellung",
        website: "https://einhundert.de",
        veroeffentlicht: true
    },
    {
        name: "SOLARIMO GmbH (ENGIE)",
        slug: "solarimo",
        kategorie: "Spezialisierte Dienstleister",
        standort: "Berlin (bundesweit)",
        zielgruppe: "Genossenschaften, Wohnungsbaugesellschaften, Kommunen",
        kurzBeschreibung: "Planung, Errichtung, Betrieb, Stromvermarktung, Dachpachtmodell, Whitelabel-Lösungen, Finanzierung",
        beschreibung: "Planung, Errichtung, Betrieb, Stromvermarktung, Dachpachtmodell, Whitelabel-Lösungen, Finanzierung.",
        besonderheiten: "100% Mieterstrom-Fokus, Tochter von ENGIE Deutschland, steueroptimiertes Dachpachtmodell",
        website: "https://solarimo.de",
        veroeffentlicht: true
    },
    {
        name: "metergrid",
        slug: "metergrid",
        kategorie: "Spezialisierte Dienstleister",
        standort: "bundesweit",
        zielgruppe: "Vermieter, Installateure, Wohnungswirtschaft",
        kurzBeschreibung: "All-in-One-Software, PV-Installation, Wirtschaftlichkeitsberechnung, Abrechnungssoftware, Mieterakquise-App",
        beschreibung: "All-in-One-Software, PV-Installation, Wirtschaftlichkeitsberechnung, Abrechnungssoftware, Mieterakquise-App, Onboarding.",
        besonderheiten: "Plattform für Selbstverwaltung oder Fullservice, starkes Wachstum",
        website: "https://metergrid.de",
        veroeffentlicht: true
    },
    {
        name: "Polarstern Energie",
        slug: "polarstern-energie",
        kategorie: "Spezialisierte Dienstleister",
        standort: "München (bundesweit)",
        zielgruppe: "Eigentümer, Investoren, Immobiliengesellschaften ab 20 WE",
        kurzBeschreibung: "Mieterstrom-Contracting, Mieterstrom-Enabling, Planung, Finanzierung, Betrieb, Stromlieferung",
        beschreibung: "Mieterstrom-Contracting, Mieterstrom-Enabling, Planung, Finanzierung, Betrieb, Stromlieferung, Abrechnung, Messstellenbetrieb.",
        besonderheiten: "100% Ökostrom mit Grüner Strom-Label, Smart Grid-Konzepte, Sektorenkopplung",
        website: "https://polarstern-energie.de",
        veroeffentlicht: true
    },
    {
        name: "Quartierkraft",
        slug: "quartierkraft",
        kategorie: "Spezialisierte Dienstleister",
        standort: "bundesweit",
        zielgruppe: "Gebäudeeigentümer, WEG, Genossenschaften",
        kurzBeschreibung: "Potenzialanalyse, Konzeption, Umsetzung, Betrieb, Mieterstrom/GGV-Lieferung, laufende Verwaltung",
        beschreibung: "Potenzialanalyse, Konzeption, Umsetzung, Betrieb, Mieterstrom/GGV-Lieferung, laufende Verwaltung (Self-Service oder Fullservice).",
        besonderheiten: "Flexible Modelle: Eigentümer als Anbieter oder Quartierkraft als Betreiber",
        website: "https://quartierkraft.de",
        veroeffentlicht: true
    },
    {
        name: "PIONIERKRAFT",
        slug: "pionierkraft",
        kategorie: "Spezialisierte Dienstleister",
        standort: "München (bundesweit)",
        zielgruppe: "Vermieter, MFH 2-12 Parteien, Eigentümergemeinschaften",
        kurzBeschreibung: "Energy-Sharing-Hardware, Abrechnungsportal, PV-Planung, Anmeldung",
        beschreibung: "Energy-Sharing-Hardware, Abrechnungsportal, PV-Planung, Anmeldung, jährliche Abrechnung, rechtliche Unterlagen.",
        besonderheiten: "Profitabel ab 1. Mieter, keine Energieversorger-Pflichten, Kleinunternehmerregelung möglich",
        website: "https://pionierkraft.de",
        veroeffentlicht: true
    },
    {
        name: "MieterStromPiraten",
        slug: "mieterstrompiraten",
        kategorie: "Spezialisierte Dienstleister",
        standort: "bundesweit",
        zielgruppe: "Vermieter als Stromanbieter",
        kurzBeschreibung: "PV + Speichersysteme, Energieberatung, Smart-Home-Lösungen, Ladesäulen",
        beschreibung: "PV + Speichersysteme, Energieberatung, Smart-Home-Lösungen, Ladesäulen, Unterstützung bei Stromverkauf.",
        besonderheiten: "Vermieter tritt selbst als Stromanbieter auf, umfassende Unterstützung",
        website: "https://mieterstrompiraten.de",
        veroeffentlicht: true
    },
    {
        name: "Ensys GmbH",
        slug: "ensys",
        kategorie: "Spezialisierte Dienstleister",
        standort: "Frankfurt am Main",
        zielgruppe: "Bauträger, Vermieter",
        kurzBeschreibung: "Contracting & Mieterstrom: BHKW- oder PV-Installation, Stromabnahme, Weiterleitung an Mieter",
        beschreibung: "Contracting & Mieterstrom: BHKW- oder PV-Installation, Stromabnahme, Weiterleitung an Mieter.",
        besonderheiten: "Contracting-Lösung senkt Investitions-, Betriebs- und Wartungskosten",
        website: "https://ensys.de",
        veroeffentlicht: true
    },
    {
        name: "ECOWATT GmbH",
        slug: "ecowatt",
        kategorie: "Spezialisierte Dienstleister",
        standort: "bundesweit",
        zielgruppe: "Investoren, Vermieter, Mieter",
        kurzBeschreibung: "Beratung, Planung, Umsetzung, kostenlose Kosten-Nutzen-Analyse, umfassender Ratgeber",
        beschreibung: "Beratung, Planung, Umsetzung, kostenlose Kosten-Nutzen-Analyse, umfassender Ratgeber.",
        besonderheiten: "Fokus auf professionelle Beratung und Wirtschaftlichkeitsanalyse",
        website: "https://ecowattgmbh.de",
        veroeffentlicht: true
    },
    {
        name: "Solar Estate",
        slug: "solar-estate",
        kategorie: "Spezialisierte Dienstleister",
        standort: "bundesweit",
        zielgruppe: "Immobilieneigentümer, Investoren",
        kurzBeschreibung: "Mieterstrom-Komplettlösung: Planung, Bau, Verwaltung",
        beschreibung: "Mieterstrom-Komplettlösung: Planung, Bau, Verwaltung.",
        besonderheiten: "Investitionspaket mit Full-Service-Ansatz",
        website: "https://solar-estate.de",
        veroeffentlicht: true
    },
    {
        name: "enTena Energy",
        slug: "entena-energy",
        kategorie: "Spezialisierte Dienstleister",
        standort: "bundesweit",
        zielgruppe: "Immobilieneigentümer, Wohnungsgesellschaften, Hausverwaltungen",
        kurzBeschreibung: "Mieterstrom mit kommerziellem Batteriespeicher, Planung, Installation, Betrieb, Abrechnung",
        beschreibung: "Mieterstrom mit kommerziellem Batteriespeicher, Planung, Installation, Betrieb, Abrechnung.",
        besonderheiten: "Alleinstellung: verpflichtender Batteriespeicher als Differenzierungsmerkmal für 96% Autarkie",
        website: "https://mieterstromjetzt.de",
        veroeffentlicht: true
    },
    {
        name: "Solarize",
        slug: "solarize",
        kategorie: "Software & Abrechnung",
        standort: "bundesweit",
        zielgruppe: "Anlagenbetreiber, Vermieter, EVU",
        kurzBeschreibung: "Software für Abrechnung, Vertragsmanagement, Zähler-Insights",
        beschreibung: "Software für Abrechnung, Vertragsmanagement, Zähler-Insights, Vermarktung von lokalem Solarstrom.",
        besonderheiten: "Reine Softwareplattform für Mieterstrom-Verwaltung",
        website: "https://solarize.de",
        veroeffentlicht: true
    },
    {
        name: "Discovergy GmbH",
        slug: "discovergy",
        kategorie: "Software & Abrechnung",
        standort: "Aachen/Heidelberg",
        zielgruppe: "EVU, Stadtwerke, Netzbetreiber, Privat/Gewerbe",
        kurzBeschreibung: "Smart-Meter-Lösungen (Meteroit Gateway), bundesweiter Messstellenbetrieb",
        beschreibung: "Smart-Meter-Lösungen (Meteroit Gateway), bundesweiter Messstellenbetrieb, Visualisierung, Abrechnungslösungen, Komplettpakete.",
        besonderheiten: "Eigenes Smart Meter Gateway, Kooperation mit Krannich Solar",
        website: "https://discovergy.com",
        veroeffentlicht: true
    },
    {
        name: "buzzn GmbH",
        slug: "buzzn",
        kategorie: "Software & Abrechnung",
        standort: "München",
        zielgruppe: "Kleinanlagenbetreiber, MFH-Eigentümer",
        kurzBeschreibung: "Localpool-Konzept: Rahmenverträge, Beratung, Musterstromlieferverträge, Messstellenbetrieb",
        beschreibung: "Localpool-Konzept: Rahmenverträge, Beratung, Musterstromlieferverträge, Messstellenbetrieb, Webportal.",
        besonderheiten: "Pionier der Direktvermarktung für Kleinanlagen",
        website: "https://buzzn.net",
        veroeffentlicht: true
    },
    {
        name: "Naturstrom AG",
        slug: "naturstrom",
        kategorie: "Große Energieversorger",
        standort: "Düsseldorf (bundesweit)",
        zielgruppe: "Wohnquartiere, Genossenschaften, Gewerbe",
        kurzBeschreibung: "Quartiersversorgung (PV, BHKW, Wärmepumpen, Speicher), Messkonzepte, LoRa-Funknetz",
        beschreibung: "Quartiersversorgung (PV, BHKW, Wärmepumpen, Speicher), Messkonzepte, LoRa-Funknetz-Zählerauslesung, Sektorenkopplung.",
        besonderheiten: "Komplexe Quartierskonzepte, innovatives LoRa-Funknetz, bis 471+ WE",
        website: "https://naturstrom.de",
        veroeffentlicht: true
    },
    {
        name: "LichtBlick SE",
        slug: "lichtblick",
        kategorie: "Große Energieversorger",
        standort: "Hamburg (bundesweit)",
        zielgruppe: "Baugesellschaften, Wohnungswirtschaft",
        kurzBeschreibung: "ZuhauseStrom: Betreuung BHKW + PV, Mieterstrom-Projekte, 100% Ökostrom",
        beschreibung: "ZuhauseStrom: Betreuung BHKW + PV, Mieterstrom-Projekte, 100% Ökostrom als Reststrom.",
        besonderheiten: "Großer Ökostromkonzern, Kooperation mit enercity contracting",
        website: "https://lichtblick.de",
        veroeffentlicht: true
    },
    {
        name: "Green Planet Energy eG",
        slug: "green-planet-energy",
        kategorie: "Große Energieversorger",
        standort: "Hamburg (bundesweit)",
        zielgruppe: "Immobilienwirtschaft, MFH",
        kurzBeschreibung: "Planung, Errichtung, Finanzierung von PV-Anlagen auf MFH, Stromlieferung",
        beschreibung: "Planung, Errichtung, Finanzierung von PV-Anlagen auf MFH, Stromlieferung.",
        besonderheiten: "Genossenschaftlich organisiert, Ökostrom-Anbieter",
        website: "https://green-planet-energy.de",
        veroeffentlicht: true
    },
    {
        name: "GETEC Mieterstrom GmbH",
        slug: "getec",
        kategorie: "Große Energieversorger",
        standort: "bundesweit",
        zielgruppe: "Eigentümer, Vermieter, große Wohnungsbestände",
        kurzBeschreibung: "Mieterstrom-Contracting (PV, BHKW), Smart-Meter-Einbau",
        beschreibung: "Mieterstrom-Contracting (PV, BHKW), Smart-Meter-Einbau, verschiedene Modelle auch ohne PV.",
        besonderheiten: "Auch Modelle ohne PV (z.B. BHKW), Smart-Meter inklusive",
        website: "https://getec-energyservices.com",
        veroeffentlicht: true
    },
    {
        name: "EnBW",
        slug: "enbw",
        kategorie: "Große Energieversorger",
        standort: "bundesweit",
        zielgruppe: "Vermieter, Eigentümer",
        kurzBeschreibung: "Beratung zu Mieterstrommodellen, Pseudo-Mieterstrom, Registrierung, Abrechnung",
        beschreibung: "Beratung zu Mieterstrommodellen, Pseudo-Mieterstrom, Registrierung, Abrechnung, Fördermanagement.",
        besonderheiten: "Großer Energieversorger mit breitem Portfolio",
        website: "https://enbw.com",
        veroeffentlicht: true
    },
    {
        name: "MVV Energie",
        slug: "mvv-energie",
        kategorie: "Große Energieversorger",
        standort: "Mannheim (bundesweit)",
        zielgruppe: "Immobilienwirtschaft, Quartiere",
        kurzBeschreibung: "Smart Mieterstrom: Vor-Ort-Stromerzeugung, integrierte Quartiersversorgung",
        beschreibung: "Smart Mieterstrom: Vor-Ort-Stromerzeugung, integrierte Quartiersversorgung.",
        besonderheiten: "Fokus auf Smart-Grid und Quartierskonzepte",
        website: "https://partner.mvv.de",
        veroeffentlicht: true
    },
    {
        name: "Vattenfall",
        slug: "vattenfall",
        kategorie: "Große Energieversorger",
        standort: "Berlin/Hamburg",
        zielgruppe: "MFH ab 40 WE",
        kurzBeschreibung: "Mieterstrom aus BHKW (Erdgas), Contracting-Modell, externe Abrechnung",
        beschreibung: "Mieterstrom aus BHKW (Erdgas), Contracting-Modell, externe Abrechnung.",
        besonderheiten: "Primär BHKW-basiert, Contracting ohne Eigentümer-Aufwand",
        website: "https://vattenfall.de",
        veroeffentlicht: true
    },
    {
        name: "Berliner Stadtwerke",
        slug: "berliner-stadtwerke",
        kategorie: "Kommunal & Regional",
        standort: "Berlin",
        zielgruppe: "Berliner Wohnungsunternehmen, Genossenschaften, WEG",
        kurzBeschreibung: "Tarif berlinStrom Sonne+, Dachpachtmodell, PV-Finanzierung, 500+ Solaranlagen",
        beschreibung: "Tarif berlinStrom Sonne+, Dachpachtmodell, PV-Finanzierung, 500+ Solaranlagen (43,7 MWp).",
        besonderheiten: "100% kommunal, über 11.500 Haushalte versorgt, größter kommunaler Mieterstromanbieter Berlins",
        website: "https://berlinerstadtwerke.de",
        veroeffentlicht: true
    },
    {
        name: "Berliner Energieagentur (BEA)",
        slug: "berliner-energieagentur",
        kategorie: "Kommunal & Regional",
        standort: "Berlin",
        zielgruppe: "Genossenschaften, Wohnungsbaugesellschaften",
        kurzBeschreibung: "BEA-Kiezstrom®: BHKW + PV (auch Hybridkraftwerke), Energieeffizienzprojekte seit 2010",
        beschreibung: "BEA-Kiezstrom®: BHKW + PV (auch Hybridkraftwerke), Energieeffizienzprojekte seit 2010.",
        besonderheiten: "PPP (Land Berlin, Vattenfall, GASAG, KfW), >10% günstiger als Grundversorgung",
        website: "https://berliner-e-agentur.de",
        veroeffentlicht: true
    },
    {
        name: "BürgerEnergie Berlin eG",
        slug: "buergerenergie-berlin",
        kategorie: "Kommunal & Regional",
        standort: "Berlin",
        zielgruppe: "WEG, MFH-Besitzer, Genossenschaften",
        kurzBeschreibung: "Genossenschaftliches Modell: Investition in PV, Direktverkauf an Mieter, Bürgerbeteiligung",
        beschreibung: "Genossenschaftliches Modell: Investition in PV, Direktverkauf an Mieter, Bürgerbeteiligung.",
        besonderheiten: "Bürgergenossenschaft, demokratische Teilhabe an Energiewende",
        website: "https://buerger-energie-berlin.de",
        veroeffentlicht: true
    },
    {
        name: "ENERVIE Vernetzt",
        slug: "enervie-vernetzt",
        kategorie: "Kommunal & Regional",
        standort: "Südwestfalen",
        zielgruppe: "Regionale Immobilieneigentümer",
        kurzBeschreibung: "Unterstützung bei Mieterstrommodellen, iMS-Einbau (ab 2026), Netzanschluss",
        beschreibung: "Unterstützung bei Mieterstrommodellen, iMS-Einbau (ab 2026), Netzanschluss.",
        besonderheiten: "Netzbetreiber mit Fokus auf intelligente Messsysteme",
        website: "https://enervie-vernetzt.de",
        veroeffentlicht: true
    }
];

async function main() {
    for (const p of newProviders) {
        await prisma.anbieter.upsert({
            where: { slug: p.slug },
            update: {
                kategorie: p.kategorie,
                standort: p.standort,
                zielgruppe: p.zielgruppe,
                kurzBeschreibung: p.kurzBeschreibung,
                beschreibung: p.beschreibung,
                besonderheiten: p.besonderheiten,
                website: p.website,
                veroeffentlicht: true
            },
            create: {
                ...p,
            },
        });
    }
    console.log("Providers successfully seeded!");
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
