import Link from "next/link";
import { Check, Euro, Building2, Zap, ArrowRight, Home, Search, Star, ShieldCheck } from "lucide-react";
import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { LeadModal } from "@/components/LeadModal";
import { CompareWrapper } from "@/components/CompareWrapper";
import { SortSelect } from "@/components/SortSelect";

export const dynamic = 'force-dynamic';

export default async function VergleichPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const sp = await searchParams;
    const weQuery = typeof sp.we === 'string' ? parseInt(sp.we, 10) : undefined;
    const pvQuery = sp.pv === 'on';
    const bhkwQuery = sp.bhkw === 'on';
    const speicherQuery = sp.speicher === 'on';
    const wallboxQuery = sp.wallbox === 'on';
    const kategorieQuery = typeof sp.kategorie === 'string' ? sp.kategorie : undefined;
    const sortQuery = typeof sp.sort === 'string' ? sp.sort : 'relevanz';

    const whereClause: any = {};
    if (weQuery) whereClause.mindestWE = { lte: weQuery };
    if (kategorieQuery) whereClause.kategorie = kategorieQuery;
    if (pvQuery) whereClause.installationPV = true;
    if (bhkwQuery) whereClause.bhkw = true;
    if (speicherQuery) whereClause.speicher = true;
    if (wallboxQuery) whereClause.wallboxen = true;

    // Default relevanz by anzahlBewertungen + manual adjustments internally usually
    let orderBy: any = { anzahlBewertungen: 'desc' };
    if (sortQuery === 'bewertung') orderBy = { anzahlBewertungen: 'desc' };
    else if (sortQuery === 'rendite') orderBy = { renditeMax: 'desc' };
    else if (sortQuery === 'mindestWE') orderBy = { mindestWE: 'asc' };
    else if (sortQuery === 'name') orderBy = { name: 'asc' };

    // Minimal filter logic
    const anbieter = await prisma.anbieter.findMany({
        where: Object.keys(whereClause).length > 0 ? whereClause : undefined,
        orderBy
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
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold flex items-center justify-between">
                                        Anbieter-Kategorie
                                    </label>
                                    <select name="kategorie" defaultValue={kategorieQuery || ""} className="w-full bg-slate-50 border border-slate-200 rounded-xl h-11 px-4 text-slate-700 focus:ring-2 focus:ring-green-500 outline-none">
                                        <option value="">Alle Kategorien</option>
                                        <option value="Spezialisierte Dienstleister">Spezialisierte Dienstleister</option>
                                        <option value="Software & Abrechnung">Software & Abrechnung</option>
                                        <option value="Große Energieversorger">Große Energieversorger</option>
                                        <option value="Kommunal & Regional">Kommunal & Regional</option>
                                    </select>
                                </div>

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
                        <SortSelect />
                    </div>

                    <CompareWrapper initialAnbieter={anbieter} />
                </div>
            </div>

            <div className="container mx-auto px-4 pb-12 flex justify-center">
                <Link href="/partner" className="text-sm text-slate-500 hover:text-green-600 transition-colors">
                    Für Anbieter →
                </Link>
            </div>
        </div>
    );
}
