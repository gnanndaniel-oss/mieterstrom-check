import Link from "next/link";
import { Check, Euro, Building2, Zap, ArrowRight, Home, Search, Star } from "lucide-react";
import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { LeadModal } from "@/components/LeadModal";

export const dynamic = 'force-dynamic';

export default async function VergleichPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const sp = await searchParams;
    const weQuery = typeof sp.we === 'string' ? parseInt(sp.we, 10) : undefined;
    const pvQuery = sp.pv === 'on';
    const bhkwQuery = sp.bhkw === 'on';
    const speicherQuery = sp.speicher === 'on';
    const wallboxQuery = sp.wallbox === 'on';

    const whereClause: any = {};
    if (weQuery) whereClause.mindestWE = { lte: weQuery };
    if (pvQuery) whereClause.installationPV = true;
    if (bhkwQuery) whereClause.bhkw = true;
    if (speicherQuery) whereClause.speicher = true;
    if (wallboxQuery) whereClause.wallboxen = true;

    // Minimal filter logic
    const anbieter = await prisma.anbieter.findMany({
        where: Object.keys(whereClause).length > 0 ? whereClause : undefined,
        orderBy: {
            anzahlBewertungen: 'desc'
        }
    });

    return (
        <div className="bg-slate-50 min-h-screen">
            <div className="bg-slate-900 py-16 text-white mb-8 border-b border-slate-800">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-4">Mieterstrom-Anbieter im Vergleich</h1>
                    <p className="text-xl text-slate-300 max-w-2xl">Finden Sie den besten Partner für Ihr Mehrfamilienhaus. Transparent und unabhängig.</p>
                </div>
            </div>

            <div className="container mx-auto px-4 pb-24 grid lg:grid-cols-4 gap-8">
                {/* Sidebar Filters */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 sticky top-24">
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <Search className="w-5 h-5 text-slate-400" /> Filter
                        </h3>
                        <form action="/vergleich" method="GET" className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold flex items-center justify-between">
                                    Wohneinheiten (WE)
                                </label>
                                <select name="we" defaultValue={weQuery || ""} className="w-full bg-slate-50 border border-slate-200 rounded-xl h-11 px-4 text-slate-700 focus:ring-2 focus:ring-green-500 outline-none">
                                    <option value="">Alle anzeigen</option>
                                    <option value="4">3 - 6 Einheiten</option>
                                    <option value="10">7 - 12 Einheiten</option>
                                    <option value="16">13 - 20 Einheiten</option>
                                    <option value="30">21 - 50 Einheiten</option>
                                    <option value="60">50+ Einheiten</option>
                                </select>
                            </div>

                            <div className="space-y-3 pt-4 border-t">
                                <label className="text-sm font-semibold">Besondere Leistungen</label>
                                {[
                                    { id: 'pv', label: 'PV-Anlage installieren', checked: pvQuery },
                                    { id: 'bhkw', label: 'BHKW-Lösungen', checked: bhkwQuery },
                                    { id: 'speicher', label: 'Gewerbespeicher', checked: speicherQuery },
                                    { id: 'wallbox', label: 'Wallboxen', checked: wallboxQuery }
                                ].map(f => (
                                    <label key={f.id} className="flex items-center gap-3 cursor-pointer">
                                        <input type="checkbox" name={f.id} defaultChecked={f.checked} className="w-4 h-4 rounded text-green-600 focus:ring-green-500" />
                                        <span className="text-sm text-slate-600">{f.label}</span>
                                    </label>
                                ))}
                            </div>

                            <Button type="submit" className="w-full bg-slate-900 border text-white hover:bg-slate-800">
                                Ergebnisse aktualisieren
                            </Button>
                        </form>
                    </div>
                </div>

                {/* Results */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg text-slate-600">
                            <span className="font-bold text-slate-900">{anbieter.length}</span> Dienstleister gefunden
                        </h2>
                    </div>

                    <div className="grid gap-6">
                        {anbieter.map((a: any) => (
                            <div key={a.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col md:flex-row hover:shadow-md transition-shadow">
                                <div className="p-6 md:w-1/3 border-b md:border-b-0 md:border-r border-slate-100 flex flex-col justify-between bg-slate-50/50">
                                    <div>
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-xl font-bold text-slate-900">{a.name}</h3>
                                            <div className="flex items-center text-sm font-medium text-yellow-500">
                                                <Star className="w-4 h-4 mr-1 fill-yellow-500" /> 4.{Math.floor(Math.random() * 5) + 5}
                                            </div>
                                        </div>
                                        <p className="text-sm text-slate-500 mb-4">{a.standort} • ab {a.mindestWE} WE</p>
                                        <p className="text-sm text-slate-700 leading-relaxed mb-4">{a.kurzBeschreibung}</p>
                                    </div>

                                    <div className="space-y-2 mt-4">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-500">Rendite</span>
                                            <span className="font-semibold text-green-600">{a.renditeMin}-{a.renditeMax}%</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-500">Mieter-Ersparnis</span>
                                            <span className="font-semibold">{a.ersparnisMin}-{a.ersparnisMax}%</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 md:w-2/3 flex flex-col justify-between">
                                    <div>
                                        <h4 className="text-sm font-semibold mb-3 text-slate-900">Enthaltene Leistungen</h4>
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {a.planungKonzeption && <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">Planung</span>}
                                            {a.finanzierung && <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">Finanzierung</span>}
                                            {a.installationPV && <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700 border border-yellow-100">PV, Installation</span>}
                                            {a.speicher && <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-100">Speicher</span>}
                                            {a.abrechnungssoftware && <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">Abrechnung/Software</span>}
                                            {a.wallboxen && <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-orange-50 text-orange-700 border border-orange-100">Wallbox</span>}
                                        </div>

                                        <h4 className="text-sm font-semibold mb-3 text-slate-900">Unterstützte Modelle</h4>
                                        <div className="flex items-center gap-4 text-sm text-slate-600">
                                            {a.modellMieterstrom && <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-green-500" /> Mieterstrom</span>}
                                            {a.modellGGV && <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-green-500" /> Gebäudeversorgung (GGV)</span>}
                                            {a.modellContracting && <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-green-500" /> Contracting</span>}
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t border-slate-100">
                                        <LeadModal
                                            anbieterId={a.id}
                                            buttonText="Profil & Angebot anfragen"
                                            className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-md cursor-pointer"
                                        />
                                        <Button asChild variant="outline" className="flex-1 rounded-xl cursor-pointer bg-white text-slate-900 border-2">
                                            <Link href={`/anbieter/${a.slug}`}>Mehr erfahren</Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
