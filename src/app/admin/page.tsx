import { Button } from "@/components/ui/button";
import { ShieldAlert, Users, Plus, FileText, Settings, Database } from "lucide-react";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    const anbieterCount = await prisma.anbieter.count();
    const leadsCount = await prisma.lead.count();

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
                        <h3 className="text-xl font-bold">Schnellaktionen</h3>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Button className="h-14 font-semibold text-md w-full gap-2" variant="outline"><Plus className="w-5 h-5" /> Anbieter anlegen</Button>
                        <Button className="h-14 font-semibold text-md w-full gap-2" variant="outline"><FileText className="w-5 h-5" /> Blogpost schreiben</Button>
                        <Button className="h-14 font-semibold text-md w-full gap-2" variant="outline"><Database className="w-5 h-5" /> Fördersätze bearbeiten</Button>
                        <Button className="h-14 font-semibold text-md w-full gap-2" variant="outline"><Users className="w-5 h-5" /> Leads exportieren</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
