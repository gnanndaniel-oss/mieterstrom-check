import Link from "next/link";
import { ArrowLeft, Scale, CheckCircle2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GuideRechtPage() {
    return (
        <div className="bg-slate-50 min-h-screen">
            <div className="bg-slate-900 py-16 text-white border-b border-slate-800">
                <div className="container mx-auto px-4 max-w-4xl pt-8">
                    <Link href="/mieterstrom-guide" className="inline-flex items-center text-slate-400 hover:text-white font-medium mb-8 text-sm transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Zurück zur Guide-Übersicht
                    </Link>
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                        <Scale className="w-8 h-8 text-slate-300" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Rechtliche Vorgaben im Mieterstrom</h1>
                    <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">Vertragslaufzeiten, Preisdeckel und EVU-Pflichten. Was Sie rechtlich beachten müssen (Stand 2026).</p>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-4xl py-16">
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 mb-12">
                    <h2 className="text-2xl font-bold mb-6 text-slate-900">Die 3 wichtigsten Regeln</h2>
                    <ul className="space-y-6">
                        <li className="flex gap-4">
                            <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                            <div>
                                <h3 className="font-bold text-lg mb-1">1. Der Preisdeckel (90%-Regelung)</h3>
                                <p className="text-slate-600">Um Mieterstrom anbieten zu dürfen, muss der Stromtarif für den Mieter stets mindestens 10% unter dem Tarif des lokalen Grundversorgers liegen. In der Praxis sparen Mieter oft 15-20%.</p>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                            <div>
                                <h3 className="font-bold text-lg mb-1">2. Die Kopplungsverbote</h3>
                                <p className="text-slate-600">Der Mieterstromvertrag darf nicht zwingend an den Mietvertrag gekoppelt sein. Der Mieter hat jederzeit die freie Wahl seines Stromversorgers.</p>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                            <div>
                                <h3 className="font-bold text-lg mb-1">3. Kündigungsfristen</h3>
                                <p className="text-slate-600">Bei Einzug darf der erste Vertrag maximal für 1 Jahr geschlossen werden. Danach ist er monatlich kündbar. Bei Auszug endet der Stromvertrag automatisch.</p>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="bg-yellow-50 rounded-3xl p-8 border border-yellow-200 mb-12">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-yellow-800">
                        <AlertTriangle className="w-6 h-6" /> Die Krux: Betreiber- & EVU-Pflichten
                    </h2>
                    <p className="text-yellow-800/80 mb-4">
                        Wenn Sie als WEG oder Vermieter selbst Mieterstrom betreiben, gelten Sie als Energieversorgungsunternehmen (EVU). Sie müssen:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-yellow-800/80 mb-6">
                        <li>Den Strom steuerlich abrechnen inkl. Meldung beim Hauptzollamt</li>
                        <li>Das Anlagenregister (MaStR) pflegen</li>
                        <li>Transparente Stromrechnungen exakt nach Gesetzgebung erstellen</li>
                        <li>Für eine ununterbrochene Stromversorgung garantieren (Reststrom)</li>
                    </ul>
                    <p className="font-bold text-yellow-900">Daher empfehlen wir fast immer ein Contracting-Modell, bei dem der Dienstleister all diese Pflichten übernimmt.</p>
                </div>

                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
                    <h2 className="text-2xl font-bold mb-6 text-slate-900" id="faq">FAQ zum Thema Recht</h2>
                    <div className="space-y-6">
                        <div><h3 className="font-bold text-slate-800">Gilt für GGV das gleiche?</h3><p className="text-slate-600 mt-2">Nein. Die Besonderheit der neuen Gebäudeversorgung nach §42b EnWG ist, dass die meisten EVU-Pflichten entfallen, weil der Mieter seinen Reststromvertrag bei einem beliebigen Versorger behält. Allerdings entfällt dort auch der staatliche Mieterstromzuschlag.</p></div>
                        <div><h3 className="font-bold text-slate-800">Darf ich den Mieterstrom-Tarif anpassen?</h3><p className="text-slate-600 mt-2">Ja, nach den allgemeinen AGB und BGB Vorgaben der Energieversorgungsverträge. Er muss aber immer unter der 90% Marke des Grundversorgers bleiben.</p></div>
                        <div><h3 className="font-bold text-slate-800">Müssen alle Mieter mitmachen?</h3><p className="text-slate-600 mt-2">Nein. Alle Modelle beruhen auf Freiwilligkeit der Mieter. Ab etwa 30-40% Beteiligungsquote rechnet sich ein Projekt jedoch meist in kürzester Zeit.</p></div>
                        <div><h3 className="font-bold text-slate-800">Haftet der Vermieter bei Stromausfällen?</h3><p className="text-slate-600 mt-2">Nein. Das allgemeine Netz sowie die Zählerinfrastruktur obliegt weiterhin dem Messstellenbetreiber und dem örtlichen Netzbetreiber. Der Vermieter liefert lediglich produzierten Strom virtuell zu.</p></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
