import prisma from "@/lib/prisma";
import { MessageSquare } from "lucide-react";
import { AnfrageActions } from "./AnfrageActions";

export const dynamic = 'force-dynamic';

export default async function AnfragenPage() {
    const anfragen = await prisma.kontaktAnfrage.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="p-8">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Partner-Bewerbungen</h1>
                    <p className="text-slate-500 text-sm">Übersicht aller eingehenden Anfragen für eine Listung auf dem Portal</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                {anfragen.length > 0 ? (
                    <div className="overflow-x-auto pb-8">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b">
                                <tr>
                                    <th className="px-4 py-3">Datum</th>
                                    <th className="px-4 py-3">Firma / Kontakt</th>
                                    <th className="px-4 py-3">Nachricht</th>
                                    <th className="px-4 py-3 text-right">Aktionen</th>
                                </tr>
                            </thead>
                            <tbody>
                                {anfragen.map((anfrage: any) => (
                                    <tr key={anfrage.id} className="border-b hover:bg-slate-50">
                                        <td className="px-4 py-4 align-top text-slate-600 whitespace-nowrap">
                                            {new Date(anfrage.createdAt).toLocaleDateString("de-DE", { day: '2-digit', month: 'short', year: 'numeric' })}<br />
                                            <span className="text-xs text-slate-400">{new Date(anfrage.createdAt).toLocaleTimeString("de-DE", { hour: '2-digit', minute: '2-digit' })} Uhr</span>
                                        </td>
                                        <td className="px-4 py-4 align-top">
                                            <div className="font-bold text-slate-900 text-base">{anfrage.name}</div>
                                            <div className="text-emerald-600 font-medium text-xs mt-0.5">{anfrage.email}</div>
                                            {anfrage.telefon && <div className="text-slate-500 text-xs mt-1">Tel: {anfrage.telefon}</div>}
                                        </td>
                                        <td className="px-4 py-4 align-top">
                                            <div className="text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100 whitespace-pre-wrap text-sm leading-relaxed max-w-xl">
                                                {anfrage.nachricht}
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 align-top min-w-[80px]">
                                            <div className="flex justify-end">
                                                <AnfrageActions anfrageId={anfrage.id} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-12 text-slate-500">Bisher keine Bewerbungen / Anfragen vorhanden.</div>
                )}
            </div>
        </div>
    );
}
