import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, XCircle, Building2, Battery, Cpu, Activity, Zap, Euro } from "lucide-react";
import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { LeadModal } from "@/components/LeadModal";

export default async function AnbieterDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const anbieter = await prisma.anbieter.findUnique({
        where: { slug: slug }
    });

    if (!anbieter) {
        notFound();
    }

    return (
        <div className="bg-slate-50 min-h-screen pb-24">
            {/* Hero */}
            <div className="bg-slate-900 text-white pt-20 pb-24 border-b border-slate-800">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="flex items-center gap-3 text-slate-400 mb-6 text-sm">
                        <Link href="/vergleich" className="hover:text-white transition-colors">Vergleich</Link>
                        <span>/</span>
                        <span className="text-white">{anbieter.name}</span>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12 items-center">
                        <div className="md:col-span-2 space-y-6">
                            <h1 className="text-4xl md:text-5xl font-bold text-white">{anbieter.name}</h1>
                            <p className="text-xl text-slate-300 leading-relaxed">{anbieter.kurzBeschreibung}</p>

                            <div className="flex flex-wrap gap-3 pt-2">
                                <span className="inline-flex items-center px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm">
                                    {anbieter.standort}
                                </span>
                                <span className="inline-flex items-center px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm">
                                    Gegründet {anbieter.gruendungsjahr}
                                </span>
                                <span className="inline-flex items-center px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-400 rounded-full text-sm">
                                    Ab {anbieter.mindestWE} Wohneinheiten
                                </span>
                            </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
                            <h3 className="text-lg font-bold mb-4">Interesse an {anbieter.name}?</h3>
                            <p className="text-sm text-slate-400 mb-6">Prüfen Sie völlig kostenlos Ihre Wirtschaftlichkeit und fordern Sie ein direktes Angebot an.</p>
                            <LeadModal
                                anbieterId={anbieter.id.toString()}
                                buttonText="Angebot anfragen"
                                className="w-full bg-green-600 hover:bg-green-500 text-white rounded-xl h-12 text-md shadow-lg shadow-green-600/20 mb-3"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-5xl -mt-10">
                <div className="grid md:grid-cols-3 gap-8">

                    <div className="md:col-span-2 space-y-8">
                        {/* Description */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
                            <h2 className="text-2xl font-bold mb-4 text-slate-900">Über {anbieter.name}</h2>
                            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                                {anbieter.beschreibung.split('\\n').map((para: any, i: number) => (
                                    <p key={i} className="mb-4">{para}</p>
                                ))}
                            </div>
                        </div>

                        {/* Services Table */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
                            <h2 className="text-2xl font-bold mb-6 text-slate-900">Leistungskatalog</h2>

                            <div className="grid sm:grid-cols-2 gap-y-4 gap-x-8">
                                {[
                                    { key: 'planungKonzeption', label: 'Planung & Konzeption' },
                                    { key: 'finanzierung', label: 'Finanzierung & Investition' },
                                    { key: 'installationPV', label: 'Installation PV-Anlage' },
                                    { key: 'speicher', label: 'Speicherlösungen' },
                                    { key: 'bhkw', label: 'BHKW-Lösungen' },
                                    { key: 'wallboxen', label: 'Wallboxen / E-Mobilität' },
                                    { key: 'messkonzept', label: 'Messkonzept & Zähler' },
                                    { key: 'abrechnungssoftware', label: 'Abrechnungssoftware' },
                                    { key: 'mieterkommunikation', label: 'Mieterkommunikation' },
                                    { key: 'wartungBetrieb', label: 'Wartung & Betrieb' },
                                    { key: 'reststromversorgung', label: 'Reststromversorgung' },
                                    { key: 'mieterApp', label: 'Mieter-App' },
                                ].map(({ key, label }) => {
                                    const isActive = anbieter[key as keyof typeof anbieter];
                                    return (
                                        <div key={key} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                                            <span className="text-slate-700">{label}</span>
                                            {isActive ? (
                                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                                            ) : (
                                                <XCircle className="w-5 h-5 text-slate-300" />
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 sticky top-24">
                            <h3 className="font-bold text-lg mb-4 text-slate-900">Konditionen & Modelle</h3>

                            <div className="space-y-4">
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                    <div className="text-sm text-slate-500 mb-1">Angebotene Modelle</div>
                                    <div className="font-semibold text-slate-900 mt-2 space-y-2">
                                        {anbieter.modellMieterstrom && <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Mieterstrom (§42a)</div>}
                                        {anbieter.modellGGV && <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Gebäudeversorgung (GGV)</div>}
                                        {anbieter.modellContracting && <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Contracting</div>}
                                        {anbieter.modellLieferkette && <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Lieferkette</div>}
                                    </div>
                                </div>

                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                    <div className="text-sm text-slate-500 mb-1">Wer investiert?</div>
                                    <div className="font-semibold text-slate-900 capitalize">
                                        {anbieter.investitionDurch === 'beide' ? 'Eigentümer oder Anbieter' : anbieter.investitionDurch}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                        <div className="text-xs text-slate-500 mb-1">Rendite</div>
                                        <div className="font-bold text-lg text-green-600">{anbieter.renditeMin}-{anbieter.renditeMax}%</div>
                                    </div>
                                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                        <div className="text-xs text-slate-500 mb-1">Ersparnis Mieter</div>
                                        <div className="font-bold text-lg text-blue-600">{anbieter.ersparnisMin}-{anbieter.ersparnisMax}%</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
