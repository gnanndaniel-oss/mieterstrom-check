import Link from "next/link";
import { ArrowLeft, Building2, CheckCircle2, AlertTriangle, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GuideGGVPage() {
    return (
        <div className="bg-slate-50 min-h-screen">
            <div className="bg-slate-900 py-16 text-white border-b border-slate-800">
                <div className="container mx-auto px-4 max-w-4xl pt-8">
                    <Link href="/mieterstrom-guide" className="inline-flex items-center text-slate-400 hover:text-white font-medium mb-8 text-sm transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Zurück zur Guide-Übersicht
                    </Link>
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                        <Building2 className="w-8 h-8 text-slate-300" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Gemeinschaftliche Gebäudeversorgung (GGV)</h1>
                    <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">Das moderne Nachfolgemodell nach §42b EnWG. Bürokratiearm und ideal für kleinere WEGs und Vermieter.</p>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-4xl py-16">
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 mb-12">
                    <h2 className="text-2xl font-bold mb-6 text-slate-900">Was ist das GGV Modell?</h2>
                    <p className="text-lg text-slate-600 mb-6">Durch das Solarpaket 1 wurde das Modell der „Gemeinschaftlichen Gebäudeversorgung“ (GGV) erschaffen. Statt den gesamten Strombedarf des Mieters abzudecken, wird hier lediglich der im eigenen Haus produzierte PV-Strom intern verrechnet.</p>
                    <ul className="space-y-6">
                        <li className="flex gap-4">
                            <Layers className="w-6 h-6 text-blue-500 shrink-0" />
                            <div>
                                <h3 className="font-bold text-lg mb-1">Pauschaler Verteilschlüssel</h3>
                                <p className="text-slate-600">Die Solaranlage auf dem Dach produziert Strom. Dieser Strom wird nach einem festen prozentualen Verteilschlüssel in Echtzeit den verschiedenen Wohneinheiten im Haus zugeordnet und vom Smart Meter erfasst.</p>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <Layers className="w-6 h-6 text-blue-500 shrink-0" />
                            <div>
                                <h3 className="font-bold text-lg mb-1">Keine Reststromlieferung!</h3>
                                <p className="text-slate-600">Im Gegensatz zum alten Mieterstrom müssen Vermieter bei der GGV keinen teuren Reststrom der Stadtwerke einkaufen, wenn die Sonne abends nicht scheint. Jeder Mieter behält simpel seinen normalen alten Stromvertrag - die PV-Anlage klinkt sich für Eigenverbrauch nur buchhalterisch dazwischen.</p>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-green-50 rounded-3xl p-8 border border-green-200">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-green-800">
                            Vorteile der GGV
                        </h2>
                        <ul className="list-disc list-inside space-y-2 text-green-800/80 mb-6">
                            <li>Massiver Abbau von rechtlichen Pflichten (Kein EVU)</li>
                            <li>Abrechnung über intelligente Zähler komplett digital</li>
                            <li>Perfekt für Anlagen unter 10 Wohneinheiten</li>
                            <li>Mieter muss Reststrom-Versorger nicht kündigen</li>
                        </ul>
                    </div>
                    <div className="bg-red-50 rounded-3xl p-8 border border-red-200">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-red-800">
                            Nachteile der GGV
                        </h2>
                        <ul className="list-disc list-inside space-y-2 text-red-800/80 mb-6">
                            <li>Es gibt <strong>keinen gesetzlichen Mieterstromzuschlag!</strong></li>
                            <li>Trotz Digitalisierung bedarf es komplexer Smart Meter</li>
                            <li>Für ganz große WEGs rechnet sich oft lieber Contracting (Volle Pacht/Rendite)</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
                    <h2 className="text-2xl font-bold mb-6 text-slate-900" id="faq">FAQ zum Thema Gebäudeversorgung</h2>
                    <div className="space-y-6">
                        <div><h3 className="font-bold text-slate-800">Warum verliere ich den Zuschlag?</h3><p className="text-slate-600 mt-2">Das EnWG belohnt bei echtem Mieterstrom die Vollversorgung des Mieters (Strom aus einer Hand). Wer nur anteiligen Solarstrom (GGV) liefert, erhält keinen Zuschlag vom Staat – spart sich jedoch das Risiko am Stromeinkauf und der Rechnungsstellung.</p></div>
                        <div><h3 className="font-bold text-slate-800">Braucht das Haus intelligente Zähler?</h3><p className="text-slate-600 mt-2">Ja. Das GGV-Verfahren funktioniert nur über zeitgleiche hochaufgelöste Bilanzierung durch iMsys (intelligente Messsysteme), welche die Zählerstände viertelstündlich austauschen.</p></div>
                        <div><h3 className="font-bold text-slate-800">Wem gehört die Anlage?</h3><p className="text-slate-600 mt-2">Die Anlage bleibt voll in Eigentümer- oder WEG-Hand. Die Eigentümergesellschaft vertreibt den erzeugten Strom digital, wofür es inzwischen viele kleine IT-Startups gibt (z.B. Pionierkraft oder Quartierkraft), welche die Abrechnungssoftware via Schnittstelle bereitstellen.</p></div>
                    </div>
                </div>

                <div className="mt-12 text-center p-8 bg-white border border-slate-200 shadow-sm rounded-3xl">
                    <h2 className="text-2xl font-bold mb-4 text-slate-900">Passt die GGV zu Ihrem Projekt?</h2>
                    <p className="text-slate-600 mb-6">Unser Rechner ermittelt sofort, ob sich das Modell der GGV oder doch ein Contracting in Ihrem speziellen Business Case stärker lohnt.</p>
                    <Button asChild size="lg" className="bg-green-600 text-white hover:bg-green-700 h-14 px-8 rounded-full shadow-lg shadow-green-600/20">
                        <Link href="/rechner">Rendite berechnen und Modelle vergleichen</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
