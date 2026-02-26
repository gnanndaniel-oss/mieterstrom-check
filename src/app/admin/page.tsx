import { Users, FileText, Settings, Database, ArrowRight } from "lucide-react";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    const anbieterCount = await prisma.anbieter.count();
    const leadsCount = await prisma.lead.count();

    const leads = await prisma.lead.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5
    });

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8 text-slate-900">Willkommen im Dashboard, Admin!</h1>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <h3 className="text-slate-500 font-medium mb-2 flex items-center gap-2"><Users className="w-4 h-4" /> Generierte Leads</h3>
                    <div className="text-4xl font-black text-slate-900 mb-2">{leadsCount}</div>
                    <Link href="/admin/leads" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 inline-flex items-center group">Alle ansehen <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" /></Link>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <h3 className="text-slate-500 font-medium mb-2 flex items-center gap-2"><Database className="w-4 h-4" /> Gelistete Anbieter</h3>
                    <div className="text-4xl font-black text-slate-900 mb-2">{anbieterCount}</div>
                    <Link href="/admin/anbieter" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 inline-flex items-center group">Verwalten <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" /></Link>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <h3 className="text-slate-500 font-medium mb-2 flex items-center gap-2"><FileText className="w-4 h-4" /> Blogartikel Online</h3>
                    <div className="text-4xl font-black text-slate-900 mb-2">3</div>
                </div>
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-2xl shadow-sm border border-slate-800 text-white">
                    <h3 className="text-slate-400 font-medium mb-2 flex items-center gap-2"><Settings className="w-4 h-4" /> Mieterstromzuschlag</h3>
                    <div className="text-3xl font-bold text-emerald-400">2.59 ct<span className="text-sm text-slate-400 font-normal">/kWh</span></div>
                    <p className="text-xs text-slate-400 mt-2">Maximalsatz (&le; 10 kWp)</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <div className="flex items-center justify-between mb-8 pb-4 border-b">
                    <h2 className="text-xl font-bold">Die neuesten Leads</h2>
                    <Button variant="outline" size="sm" asChild>
                        <Link href="/admin/leads">Alle Leads öffnen</Link>
                    </Button>
                </div>
                {leads.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left whitespace-nowrap">
                            <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                                <tr>
                                    <th className="px-4 py-3 rounded-tl-lg">Datum</th>
                                    <th className="px-4 py-3">Name</th>
                                    <th className="px-4 py-3">E-Mail</th>
                                    <th className="px-4 py-3 rounded-tr-lg">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leads.map((lead: any) => (
                                    <tr key={lead.id} className="border-b last:border-0 hover:bg-slate-50/50">
                                        <td className="px-4 py-4 text-slate-600">{new Date(lead.createdAt).toLocaleDateString("de-DE", { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}</td>
                                        <td className="px-4 py-4 font-bold text-slate-900">{lead.vorname} {lead.nachname}</td>
                                        <td className="px-4 py-4 text-emerald-600 font-medium">{lead.email}</td>
                                        <td className="px-4 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${lead.status === 'neu' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                                                {lead.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-12 text-slate-500">Noch keine Leads vorhanden.</div>
                )}
            </div>
        </div>
    );
}
