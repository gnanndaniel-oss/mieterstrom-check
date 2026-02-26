import Link from "next/link";
import { ArrowLeft, Calculator, Coins, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GuideFoerderungPage() {
    return (
        <div className="bg-slate-50 min-h-screen">
            <div className="bg-slate-900 py-16 text-white border-b border-slate-800">
                <div className="container mx-auto px-4 max-w-4xl pt-8">
                    <Link href="/mieterstrom-guide" className="inline-flex items-center text-slate-400 hover:text-white font-medium mb-8 text-sm transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Zurück zur Guide-Übersicht
                    </Link>
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                        <Calculator className="w-8 h-8 text-slate-300" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Mieterstromzuschlag & Förderung</h1>
                    <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">Wie Sie vom Staat durch das Erneuerbare-Energien-Gesetz (EEG) bares Geld für den Stromverkauf erhalten. (Stand 2026)</p>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-4xl py-16">
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 mb-12">
                    <h2 className="text-2xl font-bold mb-6 text-slate-900">Der Ablauf der Förderung</h2>
                    <ul className="space-y-6">
                        <li className="flex gap-4">
                            <Coins className="w-6 h-6 text-yellow-500 shrink-0" />
                            <div>
                                <h3 className="font-bold text-lg mb-1">1. Der Mieterstromzuschlag (2025/2026)</h3>
                                <p className="text-slate-600">Sobald Sie Solarstrom vom Dach an Ihre Mieter verkaufen, erhalten Sie zusätzlich zum Strompreis, den der Mieter zahlt, von der Bundesnetzagentur den "Mieterstromzuschlag". Er beträgt bei PV-Anlagen bis 10 kWp ca. 2,59 ct/kWh, bis 40 kWp ca. 2,41 ct/kWh und bis 100 kWp noch 1,62 ct/kWh.</p>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <Coins className="w-6 h-6 text-yellow-500 shrink-0" />
                            <div>
                                <h3 className="font-bold text-lg mb-1">2. Spezieller Liefer-Zuschlag</h3>
                                <p className="text-slate-600">Das Solarpaket I hat eine neue Bonusregelung eingebaut, falls in dem Quartier auch gewerbliche Mieter aktiv sind. Die alte Grenze, die auf % Wohnanteil basierte, wurde abgeschafft.</p>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="bg-blue-50 rounded-3xl p-8 border border-blue-200 mb-12">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-blue-800">
                        <AlertTriangle className="w-6 h-6" /> Vorsicht bei Förderung: Batterie & Steuern
                    </h2>
                    <p className="text-blue-800/80 mb-4">
                        Wichtig zu wissen: Seit 2024 ist der Erwerb von PV-Anlagen und zugehörigen Batteriespeichern von der Mehrwertsteuer befreit (Nullsteuersatz, 0% MwSt.).
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-blue-800/80 mb-6">
                        <li>Dies gilt nur für Anlagenbetreiber in der Regelsteuer oder für Kleinunternehmer! (Ausnahme, wenn Anlage unter §12 UStG fällt)</li>
                        <li>Wenn der Strom über die Gemeinschaftliche Gebäudeversorgung geliefert wird (GGV), fällt *kein* gesetzlicher Mieterstromzuschlag vom Netzbetreiber an!</li>
                    </ul>
                </div>

                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
                    <h2 className="text-2xl font-bold mb-6 text-slate-900" id="faq">FAQ zum Thema Förderung</h2>
                    <div className="space-y-6">
                        <div><h3 className="font-bold text-slate-800">Wie melde ich die Förderung an?</h3><p className="text-slate-600 mt-2">Die PV-Anlage muss im Marktstammdatenregister (MaStR) der Bundesnetzagentur angemeldet weden und vom Netzbetreiber technisch abgenommen sein.</p></div>
                        <div><h3 className="font-bold text-slate-800">Bleibt die Förderung so hoch?</h3><p className="text-slate-600 mt-2">Das EEG regelt eine schrittweise Degression. Die Vergütungen sinken halbjährig. Es gilt immer der Zeitpunkt der Inbetriebnahme. Sobald die Anlage am Netz ist, gilt ihr Fördersatz gesichert für volle 20 Jahre!</p></div>
                        <div><h3 className="font-bold text-slate-800">Gibt es regionale Förderungen?</h3><p className="text-slate-600 mt-2">Ja! Einige Bundesländer (wie Bayern oder BW) sowie Städte (z.B. München oder Berlin mit SolarPLUS) haben zusätzliche Förderbudgets. Ein guter Dienstleister prüft das für Sie automatisch, um den Business Case zu optimieren.</p></div>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <Button asChild size="lg" className="bg-green-600 text-white hover:bg-green-700 h-14 px-8 rounded-full shadow-lg shadow-green-600/20">
                        <Link href="/rechner">Potenzial prüfen und fördern lassen</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
