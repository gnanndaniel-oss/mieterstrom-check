import prisma from "@/lib/prisma";
import { Database, TrendingUp, CheckCircle2 } from "lucide-react";
import { AnbieterActions } from "./AnbieterActions";

export const dynamic = 'force-dynamic';

export default async function AnbieterPage() {
    const anbieterList = await prisma.anbieter.findMany({
        orderBy: { veroeffentlicht: 'desc' },
        include: {
            _count: {
                select: { leads: true }
            }
        }
    });

    return (
        <div className="p-8">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center">
                    <Database className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Anbieter Verwalten</h1>
                    <p className="text-slate-500 text-sm">Übersicht aller {anbieterList.length} Partner, Sichtbarkeiten und generierten Kontakte</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                {anbieterList.length > 0 ? (
                    <div className="overflow-x-auto pb-8">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b">
                                <tr>
                                    <th className="px-4 py-3">Partner-Name / Slug</th>
                                    <th className="px-4 py-3">Rendite %</th>
                                    <th className="px-4 py-3">Modelle</th>
                                    <th className="px-4 py-3 text-center">Generierte Leads</th>
                                    <th className="px-4 py-3 text-right">Aktionen / Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {anbieterList.map((anbieter: any) => (
                                    <tr key={anbieter.id} className="border-b hover:bg-slate-50">
                                        <td className="px-4 py-4 align-top">
                                            <div className="font-bold text-slate-900 text-base">{anbieter.name}</div>
                                            <div className="text-slate-400 text-xs font-mono bg-slate-100 inline-block px-1.5 py-0.5 rounded mt-1">{anbieter.slug}</div>
                                            {anbieter.zielgruppe && <div className="text-blue-600 text-xs mt-1 bg-blue-50 inline-block px-1.5 py-0.5 rounded">{anbieter.zielgruppe}</div>}
                                        </td>
                                        <td className="px-4 py-4 align-top">
                                            <div className="font-bold text-emerald-600">{anbieter.renditeMin} - {anbieter.renditeMax}%</div>
                                            <div className="text-xs text-slate-500 mt-1">Ersparnis: {anbieter.ersparnisMin}-{anbieter.ersparnisMax}%</div>
                                        </td>
                                        <td className="px-4 py-4 align-top">
                                            <div className="space-y-1 text-slate-600 text-xs font-medium">
                                                {anbieter.modellMieterstrom && <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> Mieterstrom</div>}
                                                {anbieter.modellGGV && <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> GGV</div>}
                                                {anbieter.modellContracting && <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> Contracting</div>}
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 align-top text-center">
                                            <div className="inline-flex items-center px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full font-bold">
                                                <TrendingUp className="w-4 h-4 mr-1.5" />
                                                {anbieter._count.leads}
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 align-top min-w-[120px]">
                                            <AnbieterActions anbieter={anbieter} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-12 text-slate-500">Bisher keine Anbieter vorhanden.</div>
                )}
            </div>
        </div>
    );
}
