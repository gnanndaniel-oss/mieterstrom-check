import { Button } from "@/components/ui/button";
import { ShieldAlert, Users, Plus, FileText, Settings, Database } from "lucide-react";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    const anbieterCount = await prisma.anbieter.count();
    const leadsCount = await prisma.lead.count();

    const leads = await prisma.lead.findMany({
        orderBy: { createdAt: 'desc' },
        take: 10
    });

    const anfragen = await prisma.kontaktAnfrage.findMany({
        orderBy: { createdAt: 'desc' },
        take: 10
    });

    return (
        <div className="bg-slate-100 min-h-screen">
            <div className="bg-slate-900 py-6 text-white border-b border-slate-800">
                <div className="container mx-auto px-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <ShieldAlert className="w-5 h-5 text-green-400" />
                        <h1 className="text-xl font-bold">Admin-Bereich</h1>
                    </div>
                    <div className="text-sm text-slate-400">
                        Eingeloggt als Admin
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <h2 className="text-3xl font-bold mb-8 text-slate-900">Dashboard</h2>

                <div className="grid md:grid-cols-4 gap-6 mb-12">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <h3 className="text-slate-500 font-medium mb-2 flex items-center gap-2"><Users className="w-4 h-4" /> Neue Leads</h3>
                        <div className="text-4xl font-bold text-slate-900">{leadsCount}</div>
                        <div className="text-xs text-green-600 mt-2 font-medium bg-green-50 inline-block px-2 py-1 rounded">+3 diese Woche</div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <h3 className="text-slate-500 font-medium mb-2 flex items-center gap-2"><Database className="w-4 h-4" /> Gelistete Anbieter</h3>
                        <div className="text-4xl font-bold text-slate-900">{anbieterCount}</div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <h3 className="text-slate-500 font-medium mb-2 flex items-center gap-2"><FileText className="w-4 h-4" /> Blogartikel</h3>
                        <div className="text-4xl font-bold text-slate-900">1</div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <h3 className="text-slate-500 font-medium mb-2 flex items-center gap-2"><Settings className="w-4 h-4" /> Fördersätze (Aktuell)</h3>
                        <div className="text-xl font-bold text-green-600">2.59 ct/kWh</div>
                        <p className="text-xs text-slate-400 mt-1">Bis 10 kWp (Stand 2025/2026)</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                    <div className="flex items-center justify-between mb-8 pb-4 border-b">
                        <h3 className="text-xl font-bold">Zuletzt eingegangene Leads</h3>
                    </div>
                    {leads.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b">
                                    <tr>
                                        <th className="px-4 py-3">Datum</th>
                                        <th className="px-4 py-3">Name</th>
                                        <th className="px-4 py-3">Kontakt</th>
                                        <th className="px-4 py-3">Einheiten</th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3">Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {leads.map((lead: any) => (
                                        <tr key={lead.id} className="border-b hover:bg-slate-50">
                                            <td className="px-4 py-3 text-slate-600">{new Date(lead.createdAt).toLocaleDateString("de-DE")}</td>
                                            <td className="px-4 py-3 font-medium text-slate-900">{lead.vorname} {lead.nachname}</td>
                                            <td className="px-4 py-3 text-slate-600">{lead.email}<br /><span className="text-xs">{lead.telefon || '-'}</span></td>
                                            <td className="px-4 py-3 text-slate-600">{lead.anzahlObjekte || '-'}</td>
                                            <td className="px-4 py-3">
                                                <span className={`px-2 py-1 rounded text-xs font-medium ${lead.status === 'neu' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'}`}>
                                                    {lead.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-slate-500 text-xs">
                                                {lead.anbieterId ? `Anbieter ID: ${lead.anbieterId}` : '-'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-slate-500 text-sm">Bisher keine Leads vorhanden.</p>
                    )}
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mt-8">
                    <div className="flex items-center justify-between mb-8 pb-4 border-b">
                        <h3 className="text-xl font-bold">Zuletzt eingegangene Partner-Bewerbungen</h3>
                    </div>
                    {anfragen.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b">
                                    <tr>
                                        <th className="px-4 py-3">Datum</th>
                                        <th className="px-4 py-3">Name / Firma</th>
                                        <th className="px-4 py-3">E-Mail</th>
                                        <th className="px-4 py-3">Nachricht</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {anfragen.map((anfrage: any) => (
                                        <tr key={anfrage.id} className="border-b hover:bg-slate-50">
                                            <td className="px-4 py-3 text-slate-600">{new Date(anfrage.createdAt).toLocaleDateString("de-DE")}</td>
                                            <td className="px-4 py-3 font-medium text-slate-900">{anfrage.name}</td>
                                            <td className="px-4 py-3 text-slate-600">{anfrage.email}</td>
                                            <td className="px-4 py-3 text-slate-500 text-xs whitespace-pre-wrap">{anfrage.nachricht}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-slate-500 text-sm">Bisher keine Partner-Bewerbungen vorhanden.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
