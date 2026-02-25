import Link from "next/link";
import { ArrowRight, BookOpen, Scale, Zap, Calculator, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GuidePage() {
    return (
        <div className="bg-slate-50 min-h-screen">
            <div className="bg-slate-900 py-16 text-white mb-12 border-b border-slate-800">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <BookOpen className="w-8 h-8 text-green-400" />
                    </div>
                    <h1 className="text-4xl font-bold mb-4">Der ultimative Mieterstrom-Guide</h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">Alles was Vermieter, WEGs und Hausverwaltungen wissen müssen. Verständlich erklärt und rechtssicher aufbereitet.</p>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-5xl pb-24">
                <div className="grid md:grid-cols-2 gap-6">

                    <Link href="/mieterstrom-guide/modelle" className="group bg-white rounded-3xl p-8 border border-slate-200 hover:border-green-500 hover:shadow-lg transition-all">
                        <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-500 group-hover:text-white transition-colors text-green-600">
                            <Zap className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-bold mb-3 text-slate-900 group-hover:text-green-600 transition-colors">Mieterstrommodelle</h2>
                        <p className="text-slate-600 leading-relaxed mb-6">Erfahren Sie die Unterschiede zwischen echtem Mieterstrom, Contracting und der Lieferkette.</p>
                        <div className="flex items-center text-green-600 font-semibold text-sm">
                            Weiterlesen <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>

                    <Link href="/mieterstrom-guide/gebaeudeversorgung" className="group bg-white rounded-3xl p-8 border border-slate-200 hover:border-blue-500 hover:shadow-lg transition-all">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-500 group-hover:text-white transition-colors text-blue-600">
                            <Building2 className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-bold mb-3 text-slate-900 group-hover:text-blue-600 transition-colors">Gebäudeversorgung (GGV)</h2>
                        <p className="text-slate-600 leading-relaxed mb-6">Das neue Modell nach §42b EnWG (Solarpaket I) detailliert erklärt. Die bürokratiearme Alternative.</p>
                        <div className="flex items-center text-blue-600 font-semibold text-sm">
                            Weiterlesen <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>

                    <Link href="/mieterstrom-guide/foerderung" className="group bg-white rounded-3xl p-8 border border-slate-200 hover:border-yellow-500 hover:shadow-lg transition-all">
                        <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-500 group-hover:text-white transition-colors text-yellow-600">
                            <Calculator className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-bold mb-3 text-slate-900 group-hover:text-yellow-600 transition-colors">Förderung & Zuschlag</h2>
                        <p className="text-slate-600 leading-relaxed mb-6">Mieterstromzuschlag, Staffelung und aktuelle Fördersätze. So rechnet sich Ihre Anlage am besten.</p>
                        <div className="flex items-center text-yellow-600 font-semibold text-sm">
                            Weiterlesen <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>

                    <Link href="/mieterstrom-guide/recht" className="group bg-white rounded-3xl p-8 border border-slate-200 hover:border-slate-800 hover:shadow-lg transition-all">
                        <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-slate-900 group-hover:text-white transition-colors text-slate-700">
                            <Scale className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-bold mb-3 text-slate-900 group-hover:text-slate-900 transition-colors">Rechtliche Rahmenbedingungen</h2>
                        <p className="text-slate-600 leading-relaxed mb-6">Von Kündigungsfristen im Mieterstromvertrag bis hin zum Preisdeckel von 90% des Grundversorgers.</p>
                        <div className="flex items-center text-slate-800 font-semibold text-sm">
                            Weiterlesen <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>

                    <Link href="/mieterstrom-guide/warum-speicher" className="group bg-white rounded-3xl p-8 border border-slate-200 hover:border-emerald-500 hover:shadow-lg transition-all md:col-span-2 lg:col-span-1">
                        <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-colors text-emerald-600">
                            <Calculator className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-bold mb-3 text-slate-900 group-hover:text-emerald-600 transition-colors">Warum Speicher den Unterschied macht</h2>
                        <p className="text-slate-600 leading-relaxed mb-6">Wie Sie mit einem Gewerbespeicher aus Mieterstrom ein hochrentables Investment-Grade Asset machen und Autarkiewerte von 96% erreichen.</p>
                        <div className="flex items-center text-emerald-600 font-semibold text-sm">
                            Weiterlesen <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>
                </div>

                <div className="mt-16 bg-green-600 rounded-3xl p-8 md:p-12 text-white text-center shadow-xl shadow-green-600/20">
                    <h2 className="text-3xl font-bold mb-4">Lieber nicht selber machen?</h2>
                    <p className="text-green-100 mb-8 max-w-2xl mx-auto text-lg">
                        Überlassen Sie Planung, Messkonzept und Abrechnung den Profis. Realisieren Sie Mieterstrom ganz ohne eigenen bürokratischen Aufwand durch das Contracting-Modell.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button asChild size="lg" className="bg-white text-green-700 hover:bg-slate-50 font-semibold rounded-xl px-8">
                            <Link href="/vergleich">Anbieter vergleichen</Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="border-green-400 text-white hover:bg-green-700 font-semibold bg-transparent rounded-xl px-8">
                            <Link href="/rechner">Rendite & Potenzial prüfen</Link>
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    );
}
