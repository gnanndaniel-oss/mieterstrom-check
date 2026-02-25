import Link from "next/link";
import { ArrowLeft, BatteryCharging, Zap, Euro, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StorageLeverageChart, ComplianceShieldGraphic, PartnerSynergyGraphic } from "@/components/Infographics";

export default function WarumSpeicherPage() {
    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Header */}
            <div className="bg-slate-900 py-16 text-white border-b border-slate-800">
                <div className="container mx-auto px-4 max-w-4xl pt-8">
                    <Link href="/mieterstrom-guide" className="inline-flex items-center text-green-400 hover:text-green-300 font-medium mb-8 text-sm transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Zurück zur Guide-Übersicht
                    </Link>
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 border border-white/10">
                        <BatteryCharging className="w-8 h-8 text-green-400" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
                        Mieterstrom mit Speicher.<br />
                        <span className="text-slate-400 font-medium">Erst dann rechnet es sich.</span>
                    </h1>
                    <p className="text-xl text-slate-300 leading-relaxed max-w-3xl">
                        Warum ein Gewerbespeicher der entscheidende Faktor ist, um Mieterstrom von einem bürokratischen Nullsummenspiel in ein margenstarkes Investment-Grade Asset zu verwandeln.
                    </p>
                </div>
            </div>

            {/* Content Body */}
            <div className="container mx-auto px-4 max-w-4xl py-16 space-y-16">

                {/* The Core Problem */}
                <section>
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">Das Problem ohne Speicher</h2>
                    <div className="prose prose-lg text-slate-600 max-w-none">
                        <p>
                            Ohne Speicher fließt der wertvolle Solarstrom nur dann zum Mieter, wenn dieser ihn zeitgleich verbraucht. Die Deckungsrate (Autarkie) liegt in klassischen Mehrfamilienhäusern (ohne Speicher) meist nur bei mageren <strong>25% bis 35%</strong>.
                        </p>
                        <p>
                            Der restliche Strom (bis zu 75%) muss für einen Bruchteil (ca. 8 ct/kWh) ins Netz eingespeist werden. Gleichzeitig müssen am Abend und in der Nacht teure Strommengen aus dem Netz dazugekauft werden, wenn die Mieter von der Arbeit kommen und kochen. Das Ergebnis: Die Marge schmilzt, der administrative Aufwand bleibt. Das Projekt rechnet sich kaum.
                        </p>
                    </div>
                </section>

                {/* The Solution: Storage Leverage */}
                <section className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl" />
                    <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-sm text-green-600 font-semibold mb-6">
                                Der Gamechanger
                            </div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">Der Speicher-Hebel</h2>
                            <p className="text-slate-600 mb-6 leading-relaxed">
                                Durch den Einsatz eines intelligenten <strong>Gewerbespeichers</strong> (ab ca. 30 kWh) ändert sich die Mathematik fundamental. Der tagsüber zu viel produzierte Strom wird gespeichert und am Abend an die Mieter verkauft.
                            </p>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-start">
                                    <Zap className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                                    <span className="text-slate-700"><strong>Verkaufspreis statt Einspeisevergütung:</strong> Sie verkaufen den Strom für ~30-36 ct/kWh statt ihn für 8 ct/kWh ins Netz abzugeben. Ein Erlöszuwachs von über 350%.</span>
                                </li>
                                <li className="flex items-start">
                                    <ShieldCheck className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                                    <span className="text-slate-700"><strong>Bis zu 96% Autarkie:</strong> Das Gebäude versorgt sich fast vollständig selbst mit günstigem Solarstrom.</span>
                                </li>
                                <li className="flex items-start">
                                    <Euro className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                                    <span className="text-slate-700"><strong>Peak-Shaving:</strong> Leistungsspitzen (z.B. durch Wallboxen) werden gekappt, wodurch die Leistungspreise des Netzbetreibers sinken.</span>
                                </li>
                            </ul>
                        </div>
                        <div className="relative w-full">
                            <StorageLeverageChart />
                        </div>
                    </div>
                </section>

                {/* Operator Risk and Compliance */}
                <section className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
                    <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                        <div className="order-2 lg:order-1 relative w-full flex justify-center scale-90 md:scale-100">
                            <ComplianceShieldGraphic />
                        </div>
                        <div className="order-1 lg:order-2">
                            <h2 className="text-3xl font-bold mb-6">Kein eigenes Risiko: Das Haftungsdach</h2>
                            <p className="text-slate-300 mb-6 leading-relaxed">
                                Viele Eigentümer scheuen Mieterstrom wegen der bürokratischen Betreiberpflichten: MaStR-Meldung, geeichte Messkonzepte, Letztverbraucher-Abrechnung und Stromsteuermeldung.
                            </p>
                            <p className="text-slate-300 mb-8 leading-relaxed">
                                Durch das moderne <strong>Contracting-Modell</strong> springt ein spezialisierter Dienstleister ein. Dieser pachtet Ihr Dach oder Ihre Anlage und übernimmt als offizieller Energieversorger (EVU) 100% der rechtlichen Pflichten. Das sogenannte "Haftungsdach" schirmt Sie als Vermieter vor jeglicher Bürokratie ab.
                            </p>
                        </div>
                    </div>
                </section>

                {/* The Power of Synergy */}
                <section>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Das Ökosystem aus einer Hand</h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Erfolgreiche Mieterstrom-Projekte mit Speichereinbindung erfordern die perfekte Verzahnung von kaufmännischer Abwicklung und technischer Installation. Genau dafür vermitteln wir Ihnen die passenden Konsortien.
                        </p>
                    </div>

                    <div className="w-full">
                        <PartnerSynergyGraphic />
                    </div>
                </section>

                {/* Call to Action */}
                <div className="bg-green-600 rounded-3xl p-10 md:p-14 text-white text-center shadow-xl shadow-green-600/20 mt-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Wirtschaftlichkeit jetzt simulieren</h2>
                    <p className="text-green-50 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
                        Finden Sie in 2 Minuten heraus, wie viel Rendite Ihr Mehrfamilienhaus mit Speicher abwirft und vergleichen Sie kostenlos die besten Contracting-Anbieter für Ihr Projekt.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button asChild size="lg" className="bg-white text-green-700 hover:bg-slate-50 font-bold rounded-xl px-8 h-14 text-lg">
                            <Link href="/rechner">Potenzial berechnen</Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-bold bg-transparent rounded-xl px-8 h-14 text-lg backdrop-blur-sm">
                            <Link href="/vergleich">Anbieter ansehen</Link>
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    );
}
