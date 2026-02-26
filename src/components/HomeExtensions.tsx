import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin, Building2, Zap, Euro, ChevronDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Script from "next/script";

// =========================================================
// 1. Anbieter-Logo-Karussell
// =========================================================
export function LogoCarousel() {
    const logos = [
        { name: "Naturstrom", src: "/logos/naturstrom.png" }, // I'll use simple text if images aren't available, but user said "Logos" and listed names. I will render text placeholders if no image or wait. The user only specified names.
        { name: "Polarstern" },
        { name: "EINHUNDERT" },
        { name: "Metergrid" },
        { name: "Quartierkraft" },
        { name: "Pionierkraft" },
        { name: "BUZZN" },
        { name: "LichtBlick" },
        { name: "GETEC" },
        { name: "EnBW" }
    ];

    return (
        <section className="py-12 bg-white border-b border-slate-100 overflow-hidden">
            <div className="container mx-auto px-4 mb-8 text-center">
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest">
                    Über 30 Dienstleister im Vergleich
                </p>
            </div>
            <div className="relative flex overflow-x-hidden group">
                <div className="animate-marquee whitespace-nowrap flex items-center gap-12 group-hover:pause">
                    {[...logos, ...logos, ...logos].map((logo, i) => (
                        <Link key={i} href={`/anbieter/${logo.name.toLowerCase()}`} className="text-2xl font-black text-slate-300 hover:text-green-600 transition-colors px-8 grayscale hover:grayscale-0">
                            {logo.name}
                        </Link>
                    ))}
                </div>
            </div>
            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />
        </section>
    );
}

// =========================================================
// 2. Aktuelle Fördersätze
// =========================================================
export function FoerderTable({ foerdersaetze }: { foerdersaetze: any[] }) {
    // Use static fallback if db is empty
    const defaultData = [
        { anlagenGroesseVon: 0, anlagenGroesseBis: 10, satz: 2.59, gueltigVon: "2025-02-01" },
        { anlagenGroesseVon: 10.01, anlagenGroesseBis: 40, satz: 2.41, gueltigVon: "2025-02-01" },
        { anlagenGroesseVon: 40.01, anlagenGroesseBis: 100, satz: 1.62, gueltigVon: "2025-02-01" },
    ];

    const data = foerdersaetze.length > 0 ? foerdersaetze : defaultData;

    return (
        <section className="py-24 bg-slate-50 border-b border-slate-100">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4 text-slate-900">Aktuelle Mieterstromförderung 2026</h2>
                    <p className="text-slate-600">Sichern Sie sich den gesetzlichen Mieterstromzuschlag für Ihren verkauften Strom.</p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200">
                                    <th className="py-4 px-6 font-semibold text-slate-700">Anlagengröße</th>
                                    <th className="py-4 px-6 font-semibold text-slate-700">Zuschlag (ct/kWh)</th>
                                    <th className="py-4 px-6 font-semibold text-slate-700">Gültig seit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((row, i) => (
                                    <tr key={i} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
                                        <td className="py-4 px-6 text-slate-600">bis {row.anlagenGroesseBis} kWp</td>
                                        <td className="py-4 px-6 font-bold text-green-600">{row.satz.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ct/kWh</td>
                                        <td className="py-4 px-6 text-slate-500">{new Date(row.gueltigVon).toLocaleDateString('de-DE', { month: 'short', year: 'numeric' })}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <p className="text-sm text-slate-500 text-center mb-8">Hinweis: Werte degressieren halbjährlich. Stand: Februar 2026</p>

                <div className="text-center">
                    <Button asChild className="bg-slate-900 hover:bg-slate-800 text-white rounded-full h-12 px-8">
                        <Link href="/rechner">Förderung für Ihr Gebäude berechnen <ArrowRight className="w-4 h-4 ml-2" /></Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}

// =========================================================
// 3. Testimonials / Fallstudien
// =========================================================
export function Fallstudien() {
    const beispiele = [
        {
            title: "Mehrfamilienhaus München, 12 WE",
            stats: [
                { icon: Building2, text: "12 WE" },
                { icon: Zap, text: "38 kWp PV" },
                { icon: Euro, text: "14% Rendite" }
            ],
            desc: "Durch die Kombination mit einer Wärmepumpe wird der Eigenverbrauch massiv gesteigert. Mieter sparen im Schnitt 180€/Jahr.",
        },
        {
            title: "Wohnanlage Hamburg, 48 WE",
            stats: [
                { icon: Building2, text: "48 WE" },
                { icon: Zap, text: "120 kWp + Speicher" },
                { icon: CheckCircle2, text: "96% Autarkie" }
            ],
            desc: "Komplettes Contracting-Modell. Die WEG hatte keine Investitionskosten und genießt stabile Strompreise ab Tag 1.",
        },
        {
            title: "WEG Berlin-Kreuzberg, 8 WE",
            stats: [
                { icon: Building2, text: "8 WE" },
                { icon: Zap, text: "22 kWp PV" },
                { icon: CheckCircle2, text: "GGV-Modell" }
            ],
            desc: "Umsetzung über die bürokratiearme Gebäudeversorgung (GGV). Die Amortisation der Anlage ist bereits in 7 Jahren erreicht.",
        }
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-sm font-bold tracking-widest text-green-600 uppercase mb-2 block">Beispielrechnungen</span>
                    <h2 className="text-3xl font-bold mb-4 text-slate-900">So sieht Mieterstrom in der Praxis aus</h2>
                    <p className="text-slate-600 max-w-xl mx-auto">Typische Projekt-Kennzahlen und Rendite-Erwartungen je nach Größe und Modell.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {beispiele.map((b, i) => (
                        <div key={i} className="bg-slate-50 border border-slate-100 p-8 rounded-3xl group hover:border-green-200 transition-colors">
                            <div className="flex items-center gap-2 text-slate-700 font-bold mb-6">
                                <MapPin className="w-5 h-5 text-green-600" />
                                {b.title}
                            </div>

                            <div className="flex flex-wrap gap-3 mb-6">
                                {b.stats.map((s, idx) => (
                                    <div key={idx} className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-sm font-semibold text-slate-700">
                                        <s.icon className="w-4 h-4 text-green-500" /> {s.text}
                                    </div>
                                ))}
                            </div>

                            <div className="h-px bg-slate-200 w-full mb-6" />

                            <p className="text-slate-600 leading-relaxed text-sm">
                                "{b.desc}"
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// =========================================================
// 4. Blog-Teaser
// =========================================================
export function BlogTeaser({ posts }: { posts: any[] }) {
    if (!posts || posts.length === 0) return null;

    return (
        <section className="py-24 bg-slate-50 border-t border-slate-100">
            <div className="container mx-auto px-4">
                <div className="flex flex-col sm:flex-row justify-between items-end mb-12 gap-4">
                    <div>
                        <h2 className="text-3xl font-bold mb-2 text-slate-900">Aktuelle Insights</h2>
                        <p className="text-slate-600">Neuigkeiten aus Gesetzgebung und Praxis.</p>
                    </div>
                    <Button variant="outline" asChild className="rounded-full">
                        <Link href="/blog">Alle Artikel lesen <ArrowRight className="w-4 h-4 ml-2" /></Link>
                    </Button>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <Link key={post.id} href={`/blog/${post.slug}`} className="group bg-white border border-slate-100 rounded-3xl overflow-hidden hover:shadow-xl hover:shadow-green-900/5 transition-all flex flex-col h-full">
                            {post.titelbild ? (
                                <div className="h-48 bg-slate-200 relative overflow-hidden">
                                    <img src={post.titelbild} alt={post.titel} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                                </div>
                            ) : (
                                <div className="h-48 bg-slate-100 flex items-center justify-center relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50 opacity-50" />
                                    <Zap className="w-12 h-12 text-slate-200" />
                                </div>
                            )}
                            <div className="p-6 flex flex-col flex-1">
                                <div className="flex items-center gap-3 mb-4 text-xs font-semibold">
                                    <span className="text-green-600 uppercase tracking-widest">{post.kategorie}</span>
                                    <span className="text-slate-400">• {new Date(post.createdAt).toLocaleDateString('de-DE')}</span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-green-600 transition-colors line-clamp-2">
                                    {post.titel}
                                </h3>
                                <p className="text-slate-600 text-sm line-clamp-3 mb-6 flex-1">
                                    {post.excerpt}
                                </p>
                                <div className="text-green-600 font-semibold text-sm flex items-center group-hover:gap-2 transition-all">
                                    Weiterlesen <ArrowRight className="w-4 h-4 ml-1" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

// =========================================================
// 5. Newsletter-Signup (Startseite)
// =========================================================
export function HomeNewsletter() {
    return (
        <section className="py-24 bg-green-900 relative overflow-hidden border-b border-green-800">
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay pointer-events-none" />
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-green-800/50 to-transparent pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-800/50 text-green-400 mb-6 border border-green-500/20">
                        <Zap className="w-8 h-8 fill-current" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Mieterstrom-News direkt ins Postfach
                    </h2>
                    <p className="text-green-100/80 mb-8 text-lg">
                        Bleiben Sie informiert über neue Fördersätze, gesetzliche Änderungen (Solargesetz, GGV) und Marktentwicklungen.
                    </p>

                    <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                        <input
                            type="email"
                            placeholder="Ihre E-Mail-Adresse"
                            className="flex-1 bg-green-950/50 border border-green-700/50 text-white placeholder:text-green-400/50 rounded-xl h-14 px-5 focus:outline-none focus:ring-2 focus:ring-green-400"
                            required
                        />
                        <Button type="submit" className="h-14 bg-white text-green-900 hover:bg-green-50 px-8 rounded-xl font-bold">
                            Kostenlos anmelden
                        </Button>
                    </form>
                    <p className="text-sm text-green-300/50 mt-4">
                        Kein Spam. Monatlich. Jederzeit abmeldbar.
                    </p>
                </div>
            </div>
        </section>
    );
}


// =========================================================
// 6. FAQ Akkodion
// =========================================================
export function FAQAccordion() {
    const faqs = [
        {
            q: "Was ist Mieterstrom?",
            a: "Mieterstrom ist lokal erzeugter Solarstrom, der direkt an die Mieter eines Gebäudes verkauft wird — ohne Umweg über das öffentliche Netz. Der Strom kommt typischerweise von einer PV-Anlage auf dem Dach."
        },
        {
            q: "Was ist der Unterschied zwischen Mieterstrom und Gemeinschaftlicher Gebäudeversorgung (GGV)?",
            a: "Beim Mieterstrom (§42a EnWG) gibt es eine Vollversorgungspflicht und EVU-Pflichten, dafür aber den Mieterstromzuschlag. Die GGV (§42b EnWG) ist bürokratieärmer — keine Vollversorgungspflicht, kein EVU-Status, aber auch kein Zuschlag."
        },
        {
            q: "Wie viel kann ich als Vermieter mit Mieterstrom verdienen?",
            a: "Typische Renditen liegen bei 7-15% p.a. Die genaue Rendite hängt von Anlagengröße, Eigenverbrauchsquote und gewähltem Modell ab. Nutzen Sie unseren Wirtschaftlichkeitsrechner für eine individuelle Berechnung."
        },
        {
            q: "Wie viel sparen Mieter beim Mieterstrom?",
            a: "Gesetzlich muss der Mieterstromtarif mindestens 10% unter dem Grundversorgertarif liegen. In der Praxis sparen Mieter 80-150€ pro Jahr."
        },
        {
            q: "Muss ich als Vermieter selbst investieren?",
            a: "Nicht unbedingt. Im Contracting-Modell investiert ein Dienstleister in die PV-Anlage und übernimmt Betrieb und Wartung. Sie stellen nur die Dachfläche bereit. Alternativ können Sie selbst investieren und erzielen höhere Renditen."
        },
        {
            q: "Ab wie vielen Wohneinheiten lohnt sich Mieterstrom?",
            a: "Einige Anbieter wie Pionierkraft oder Metergrid bieten Lösungen bereits ab 2-3 Wohneinheiten an. Für Full-Service-Contracting werden oft mindestens 10-15 WE benötigt."
        },
        {
            q: "Wie lange dauert die Umsetzung eines Mieterstromprojekts?",
            a: "Von der ersten Anfrage bis zum laufenden Betrieb vergehen typischerweise 3-6 Monate. Bei komplexeren Quartiersprojekten kann es 6-12 Monate dauern."
        },
        {
            q: "Ist mieterstrom-check.de kostenlos?",
            a: "Ja, unser Vergleich und der Wirtschaftlichkeitsrechner sind für Sie als Vermieter, WEG oder Hausverwaltung 100% kostenlos und unverbindlich."
        }
    ];

    const schemaData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(f => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": f.a
            }
        }))
    };

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4 text-slate-900">Häufige Fragen zu Mieterstrom</h2>
                    <p className="text-slate-600">Die wichtigsten Antworten für Immobilienbesitzer und Verwaltungen.</p>
                </div>

                <Accordion type="single" collapsible className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <AccordionItem key={idx} value={`item-${idx}`} className="bg-slate-50 border border-slate-200 rounded-2xl px-6 data-[state=open]:bg-white data-[state=open]:border-green-200 data-[state=open]:shadow-sm transition-all">
                            <AccordionTrigger className="hover:no-underline py-5 text-left font-bold text-slate-900 [&[data-state=open]>svg]:rotate-180">
                                {faq.q}
                            </AccordionTrigger>
                            <AccordionContent className="text-slate-600 leading-relaxed pb-6 text-base">
                                {faq.a}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>

            <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
        </section>
    );
}
