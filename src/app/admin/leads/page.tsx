import prisma from "@/lib/prisma";
import { Users } from "lucide-react";
import { LeadActions } from "./LeadActions";

export const dynamic = 'force-dynamic';

export default async function LeadsPage() {
    const leads = await prisma.lead.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="p-8">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center">
                    <Users className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Leads Verwalten</h1>
                    <p className="text-slate-500 text-sm">Übersicht aller Kontakte und Anfragen aus dem Rechner</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                {leads.length > 0 ? (
                    <div className="overflow-x-auto pb-48"> {/* Extra pb for dropdown menus */}
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b">
                                <tr>
                                    <th className="px-4 py-3">Datum</th>
                                    <th className="px-4 py-3">Kontakt</th>
                                    <th className="px-4 py-3">Objekt-Details</th>
                                    <th className="px-4 py-3">Rendite-Check</th>
                                    <th className="px-4 py-3 text-right">Aktionen</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leads.map((lead: any) => {
                                    const parsed = typeof lead.rechnerDaten === 'string' ? JSON.parse(lead.rechnerDaten) : lead.rechnerDaten;

                                    return (
                                        <tr key={lead.id} className="border-b hover:bg-slate-50">
                                            <td className="px-4 py-4 align-top text-slate-600 whitespace-nowrap">
                                                {new Date(lead.createdAt).toLocaleDateString("de-DE", { day: '2-digit', month: 'short', year: 'numeric' })}<br />
                                                <span className="text-xs text-slate-400">{new Date(lead.createdAt).toLocaleTimeString("de-DE", { hour: '2-digit', minute: '2-digit' })} Uhr</span>
                                            </td>
                                            <td className="px-4 py-4 align-top">
                                                <div className="font-bold text-slate-900">{lead.vorname} {lead.nachname}</div>
                                                <div className="text-emerald-600 font-medium">{lead.email}</div>
                                                <div className="text-slate-500 text-xs mt-1">{lead.telefon || 'Kein Telefon'} {lead.firma ? `• ${lead.firma}` : ''}</div>
                                                {lead.anbieterId && <div className="text-xs font-semibold text-blue-600 bg-blue-50 inline-block px-1.5 py-0.5 rounded mt-1">Interesse: {lead.anbieterId}</div>}
                                            </td>
                                            <td className="px-4 py-4 align-top text-slate-600">
                                                {parsed ? (
                                                    <div className="space-y-1 text-xs">
                                                        <div><span className="font-semibold">{parsed.typ === 'neubau' ? 'Neubau' : 'Bestand'}:</span> {parsed.we} WE, {parsed.plz || 'Keine PLZ'}</div>
                                                        <div><span className="font-semibold">Dach:</span> {parsed.dachflaeche}m²</div>
                                                        <div><span className="font-semibold">Bedarf:</span> {parsed.verbrauchWe}kWh/Jahr</div>
                                                        {(parsed.waermepumpe || parsed.wallboxen > 0) && (
                                                            <div className="text-emerald-700 bg-emerald-50 px-1 py-0.5 rounded inline-block mt-0.5 whitespace-nowrap">WP/Wallbox vorhanden</div>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <div className="text-xs italic text-slate-400">Keine Rechner-Daten (Direktanfrage)</div>
                                                )}
                                            </td>
                                            <td className="px-4 py-4 align-top text-slate-600">
                                                {parsed ? (
                                                    <div className="space-y-1 text-xs">
                                                        <div><span className="font-semibold">Speicher:</span> {parsed.speicher ? `${parsed.speicherKwh}kWh` : 'Nein'}</div>
                                                        <div><span className="font-semibold">Invest:</span> {parsed.investition === 'anbieter' ? 'Contracting' : 'Eigentümer'}</div>
                                                    </div>
                                                ) : (
                                                    '-'
                                                )}
                                            </td>
                                            <td className="px-4 py-4 align-top min-w-[140px]">
                                                <div className="flex justify-end">
                                                    {/* Pass non stringified lead to client */}
                                                    <LeadActions lead={lead} />
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-12 text-slate-500">Bisher keine Leads vorhanden.</div>
                )}
            </div>
        </div>
    );
}
