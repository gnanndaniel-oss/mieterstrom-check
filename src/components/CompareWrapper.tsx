"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ShieldCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeadModal } from "@/components/LeadModal";

export function CompareWrapper({ initialAnbieter }: { initialAnbieter: any[] }) {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [anbieter] = useState(initialAnbieter);

    const toggleSelection = (id: string) => {
        setSelectedIds(prev =>
            prev.includes(id)
                ? prev.filter(x => x !== id)
                : prev.length < 3 ? [...prev, id] : prev
        );
    };

    const clearSelection = () => setSelectedIds([]);

    const selectedAnbieter = anbieter.filter(a => selectedIds.includes(a.id));

    return (
        <div className="space-y-6 pb-24 relative">
            <div className="grid gap-6">
                {anbieter.map((a: any) => {
                    const isSelected = selectedIds.includes(a.id);
                    return (
                        <div key={a.id} className={`bg-white rounded-2xl border ${isSelected ? 'border-green-500 shadow-md ring-1 ring-green-500' : 'border-slate-100 shadow-sm'} overflow-hidden flex flex-col md:flex-row hover:shadow-md transition-all relative`}>
                            {/* Vergleichen Checkbox */}
                            <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-white/90 backdrop-blur rounded-lg px-2 py-1 shadow-sm border border-slate-200">
                                <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-slate-700">
                                    <input
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={() => toggleSelection(a.id)}
                                        disabled={!isSelected && selectedIds.length >= 3}
                                        className="w-4 h-4 rounded text-green-600 focus:ring-green-500"
                                    />
                                    Vergleichen
                                </label>
                            </div>

                            <div className="p-6 md:w-1/3 border-b md:border-b-0 md:border-r border-slate-100 flex flex-col justify-between bg-slate-50/50 pt-12 md:pt-6">
                                <div>
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="space-y-1">
                                            {a.kategorie && (
                                                <div className="text-xs font-semibold text-blue-600 mb-1">{a.kategorie}</div>
                                            )}
                                            <h3 className="text-xl font-bold text-slate-900">{a.name}</h3>
                                        </div>
                                    </div>
                                    <div className="inline-flex items-center text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded border border-green-100 mb-4">
                                        <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Verifiziert
                                    </div>
                                    <p className="text-sm text-slate-500 mb-2">{a.standort} {(a.mindestWE ?? 0) > 0 && `• ab ${a.mindestWE} WE`}</p>
                                    {a.zielgruppe && <p className="text-xs font-semibold text-slate-600 mb-4 bg-slate-200/50 inline-block px-2 py-1 rounded">Zielgruppe: {a.zielgruppe}</p>}
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

                            <div className="p-6 md:w-2/3 flex flex-col justify-between pt-12 md:pt-6">
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
                                        className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-md cursor-pointer h-12"
                                    />
                                    <Button asChild variant="outline" className="flex-1 rounded-xl cursor-pointer bg-white text-slate-900 border-2 h-12">
                                        <Link href={`/anbieter/${a.slug}`}>Mehr erfahren</Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Sticky Compare Bar */}
            {selectedIds.length > 0 && (
                <div className="fixed bottom-0 left-0 right-0 z-[100] bg-white border-t border-slate-200 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] p-4 transform transition-transform translate-y-0">
                    <div className="container mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4 flex-1">
                            <span className="font-bold text-slate-900">{selectedIds.length}/3 Anbietern ausgewählt:</span>
                            <div className="flex flex-wrap gap-2">
                                {selectedAnbieter.map(a => (
                                    <div key={a.id} className="flex items-center gap-2 bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg text-sm font-medium">
                                        {a.name}
                                        <button onClick={() => toggleSelection(a.id)} className="text-slate-400 hover:text-red-500 transition-colors">
                                            <X className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center gap-3 w-full sm:w-auto mt-2 sm:mt-0">
                            <Button variant="ghost" onClick={clearSelection} className="text-slate-500 hover:text-slate-700">
                                Zurücksetzen
                            </Button>
                            <Button asChild className="bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-600/20 px-8">
                                <Link href={`/vergleich/compare?ids=${selectedAnbieter.map(a => a.slug).join(',')}`}>
                                    Jetzt vergleichen
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
