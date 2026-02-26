import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { CheckCircle2, XCircle, ArrowLeft } from "lucide-react";
import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { LeadModal } from "@/components/LeadModal";

export const dynamic = 'force-dynamic';

export default async function ComparePage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const sp = await searchParams;
    const idsParam = typeof sp.ids === 'string' ? sp.ids : undefined;

    if (!idsParam) {
        redirect('/vergleich');
    }

    const slugs = idsParam.split(',').slice(0, 3); // max 3

    const anbieterList = await prisma.anbieter.findMany({
        where: { slug: { in: slugs } }
    });

    if (anbieterList.length === 0) {
        notFound();
    }

    // Sort the list so they match the order of slugs passed in the URL (optional but nice)
    const sortedAnbieter = slugs.map(slug => anbieterList.find(a => a.slug === slug)).filter(Boolean) as any[];

    const features = [
        { key: 'modellMieterstrom', label: 'Mieterstrom (§42a)', category: 'Modelle' },
        { key: 'modellGGV', label: 'Gebäudeversorgung (GGV)', category: 'Modelle' },
        { key: 'modellContracting', label: 'Contracting', category: 'Modelle' },

        { key: 'planungKonzeption', label: 'Planung & Konzeption', category: 'Leistungen' },
        { key: 'finanzierung', label: 'Finanzierung', category: 'Leistungen' },
        { key: 'installationPV', label: 'Installation PV', category: 'Leistungen' },
        { key: 'speicher', label: 'Speicher', category: 'Leistungen' },
        { key: 'bhkw', label: 'BHKW', category: 'Leistungen' },
        { key: 'wallboxen', label: 'Wallboxen', category: 'Leistungen' },
        { key: 'abrechnungssoftware', label: 'Abrechnungssoftware', category: 'Leistungen' },
        { key: 'mieterkommunikation', label: 'Mieterkommunikation', category: 'Leistungen' },
        { key: 'wartungBetrieb', label: 'Wartung & Betrieb', category: 'Leistungen' },
        { key: 'reststromversorgung', label: 'Reststromversorgung', category: 'Leistungen' },
    ];

    const categories = ['Modelle', 'Leistungen'];

    return (
        <div className="bg-slate-50 min-h-screen pb-24">
            <div className="bg-slate-900 py-12 text-white mb-8 border-b border-slate-800">
                <div className="container mx-auto px-4 max-w-6xl">
                    <Link href="/vergleich" className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors mb-6">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Zurück zum Vergleich
                    </Link>
                    <h1 className="text-4xl font-bold mb-4">Anbieter im direkten Vergleich</h1>
                    <p className="text-xl text-slate-300">Gegenüberstellung von {sortedAnbieter.length} Dienstleistern</p>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-6xl">
                <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                        <thead>
                            <tr className="bg-slate-50/80 border-b border-slate-200">
                                <th className="w-[28%] py-6 px-6 font-semibold text-slate-500 uppercase tracking-widest text-xs">Kriterium</th>
                                {sortedAnbieter.map(a => (
                                    <th key={a.id} className="w-[24%] py-6 px-6 bg-white border-l border-slate-100">
                                        <div className="text-sm font-bold text-blue-600 mb-1">{a.kategorie}</div>
                                        <h3 className="text-xl font-bold text-slate-900 line-clamp-2">{a.name}</h3>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {/* Konditionen */}
                            <tr className="bg-slate-100/50 border-b border-slate-200">
                                <td colSpan={sortedAnbieter.length + 1} className="py-3 px-6 font-bold text-slate-900 text-sm tracking-wide">KONDITIONEN</td>
                            </tr>
                            <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                                <td className="py-4 px-6 text-sm font-semibold text-slate-700">Mindest-Wohneinheiten</td>
                                {sortedAnbieter.map(a => (
                                    <td key={a.id} className="py-4 px-6 border-l border-slate-100 font-medium text-slate-900">
                                        {a.mindestWE ? `ab ${a.mindestWE} WE` : 'Keine Angabe'}
                                    </td>
                                ))}
                            </tr>
                            <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                                <td className="py-4 px-6 text-sm font-semibold text-slate-700">Investition durch</td>
                                {sortedAnbieter.map(a => (
                                    <td key={a.id} className="py-4 px-6 border-l border-slate-100 font-medium text-slate-900 capitalize">
                                        {a.investitionDurch === 'beide' ? 'Eigentümer o. Anbieter' : a.investitionDurch}
                                    </td>
                                ))}
                            </tr>
                            <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                                <td className="py-4 px-6 text-sm font-semibold text-slate-700">Rendite Vermieter</td>
                                {sortedAnbieter.map(a => (
                                    <td key={a.id} className="py-4 px-6 border-l border-slate-100 font-bold text-green-600">
                                        {a.renditeMin}-{a.renditeMax}%
                                    </td>
                                ))}
                            </tr>
                            <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                                <td className="py-4 px-6 text-sm font-semibold text-slate-700">Ersparnis Mieter</td>
                                {sortedAnbieter.map(a => (
                                    <td key={a.id} className="py-4 px-6 border-l border-slate-100 font-bold text-blue-600">
                                        {a.ersparnisMin}-{a.ersparnisMax}%
                                    </td>
                                ))}
                            </tr>

                            {/* Dynamische Kategorien für Modelle und Leistungen */}
                            {categories.map(cat => (
                                <optgroup key={cat} label={cat} className="contents">
                                    <tr className="bg-slate-100/50 border-b border-slate-200 border-t border-t-slate-200">
                                        <td colSpan={sortedAnbieter.length + 1} className="py-3 px-6 font-bold text-slate-900 text-sm tracking-wide uppercase">{cat}</td>
                                    </tr>
                                    {features.filter(f => f.category === cat).map(feature => (
                                        <tr key={feature.key} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                                            <td className="py-4 px-6 text-sm text-slate-700">{feature.label}</td>
                                            {sortedAnbieter.map(a => {
                                                const hasFeature = a[feature.key as keyof typeof a];
                                                return (
                                                    <td key={a.id} className="py-4 px-6 border-l border-slate-100">
                                                        {hasFeature ? (
                                                            <div className="flex items-center text-green-600 font-medium gap-2 text-sm">
                                                                <CheckCircle2 className="w-5 h-5" />
                                                                <span className="hidden sm:inline">Ja</span>
                                                            </div>
                                                        ) : (
                                                            <div className="flex items-center text-slate-300 font-medium gap-2 text-sm">
                                                                <XCircle className="w-5 h-5" />
                                                                <span className="hidden sm:inline">Nein</span>
                                                            </div>
                                                        )}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))}
                                </optgroup>
                            ))}

                            {/* CTA Row */}
                            <tr className="bg-slate-50/50">
                                <td className="py-8 px-6"></td>
                                {sortedAnbieter.map(a => (
                                    <td key={a.id} className="py-8 px-6 border-l border-slate-100">
                                        <LeadModal
                                            anbieterId={a.id}
                                            buttonText="Angebot anfragen"
                                            className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl h-12 shadow-lg shadow-green-600/20"
                                        />
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
