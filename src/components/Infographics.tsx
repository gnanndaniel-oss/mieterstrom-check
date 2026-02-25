import React from 'react';
import { Shield, Users, Zap, RefreshCw, Check } from 'lucide-react';

export const StorageLeverageChart = () => (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl group-hover:bg-green-500/10 transition-colors"></div>
        <div className="text-center mb-10 relative z-10">
            <h4 className="text-2xl font-bold text-slate-900 mb-2">Der Speicher-Hebel</h4>
            <p className="text-sm text-slate-500">Marge pro kWh im Vergleich</p>
        </div>

        <div className="flex justify-center items-end gap-12 h-64 relative z-10">
            {/* Standard Feed-in */}
            <div className="w-28 flex flex-col items-center justify-end h-full">
                <div className="w-full bg-slate-100 rounded-t-xl relative overflow-hidden h-[20%] border border-slate-200 hover:bg-slate-200 transition-colors">
                    <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-slate-500">8 ct</div>
                </div>
                <div className="mt-4 text-center">
                    <div className="font-bold text-slate-700">Netz</div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Einspeisung</div>
                </div>
            </div>

            {/* Mieterstrom Price */}
            <div className="w-32 group/bar flex flex-col items-center justify-end h-full">
                <div className="absolute top-[-30px] bg-green-100 text-green-700 px-3 py-1.5 rounded-lg text-sm font-bold whitespace-nowrap shadow-sm mb-4 transform group-hover/bar:-translate-y-2 transition-transform">+350% Erlös</div>
                <div className="w-full bg-green-600 rounded-t-xl relative overflow-hidden h-[90%] shadow-xl shadow-green-200 hover:brightness-110 transition-all">
                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-green-500/30 pointer-events-none"></div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                        <span className="text-3xl font-black">36 ct</span>
                        <span className="text-xs font-medium opacity-90">Verkaufspreis</span>
                    </div>
                </div>
                <div className="mt-4 text-center">
                    <div className="font-bold text-green-700">Mieter</div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Direktverkauf</div>
                </div>
            </div>
        </div>
    </div>
);

export const ComplianceShieldGraphic = () => (
    <div className="relative w-full max-w-md mx-auto aspect-square flex items-center justify-center p-8 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden group">
        <div className="absolute inset-0 bg-slate-50/50"></div>
        {/* Concentric Circles */}
        <div className="absolute inset-4 border-2 border-dashed border-slate-200 rounded-full animate-[spin_60s_linear_infinite] group-hover:border-blue-200 transition-colors"></div>
        <div className="absolute inset-16 border border-slate-200 bg-white rounded-full shadow-inner shadow-slate-100"></div>

        {/* Central Shield */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center">
            <div className="w-28 h-28 bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl flex items-center justify-center shadow-2xl mb-6 transform rotate-45 group-hover:rotate-0 transition-transform duration-500">
                <Shield className="text-white transform -rotate-45 group-hover:rotate-0 transition-transform duration-500 w-12 h-12" />
            </div>
            <h4 className="font-bold text-slate-900 text-xl font-heading">Haftungsdach</h4>
            <p className="text-sm text-slate-500 max-w-[180px] mt-2">Dienstleister übernehmen alle Betreiberpflichten</p>
        </div>

        {/* Satellites */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow-lg border border-slate-100 text-sm font-bold flex items-center gap-2 transform -translate-y-2 group-hover:-translate-y-4 transition-transform">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span> MaStR Meldung
        </div>
        <div className="absolute bottom-16 right-4 bg-white px-4 py-2 rounded-full shadow-lg border border-slate-100 text-sm font-bold flex items-center gap-2 transform translate-x-2 group-hover:translate-x-4 transition-transform">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse delay-75"></span> Strom-Abrechnung
        </div>
        <div className="absolute bottom-16 left-4 bg-white px-4 py-2 rounded-full shadow-lg border border-slate-100 text-sm font-bold flex items-center gap-2 transform -translate-x-2 group-hover:-translate-x-4 transition-transform">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse delay-150"></span> Messstellenbetrieb
        </div>
    </div>
);

export const PartnerSynergyGraphic = () => (
    <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/10 rounded-full group-hover:bg-blue-500/20 transition-colors blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-500/10 rounded-full group-hover:bg-emerald-500/20 transition-colors blur-3xl"></div>

        <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
            {/* Left Block - Commercial */}
            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 hover:border-blue-500/50 transition-colors shadow-2xl relative">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-500/20 rounded-xl text-blue-400"><Users size={24} /></div>
                    <span className="font-bold text-white text-lg">Kaufmännisch</span>
                </div>
                <ul className="space-y-4">
                    <li className="flex items-center gap-3 text-sm text-slate-300 font-medium"><Check size={16} className="text-blue-500" /> Mieter-Verträge & Onboarding</li>
                    <li className="flex items-center gap-3 text-sm text-slate-300 font-medium"><Check size={16} className="text-blue-500" /> Inkasso & Billing</li>
                    <li className="flex items-center gap-3 text-sm text-slate-300 font-medium"><Check size={16} className="text-blue-500" /> Strompreisbremsen & Steuern</li>
                </ul>
            </div>

            {/* Sync Connector - Hidden on mobile, absolute center on desktop */}
            <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-slate-950 border border-slate-700 rounded-full p-4 text-white shadow-2xl shadow-black/50 group-hover:rotate-180 transition-transform duration-700">
                <RefreshCw size={24} className="text-slate-300" />
            </div>

            {/* Right Block - Technical */}
            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 hover:border-emerald-500/50 transition-colors shadow-2xl relative">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-emerald-500/20 rounded-xl text-emerald-400"><Zap size={24} /></div>
                    <span className="font-bold text-white text-lg">Technisch</span>
                </div>
                <ul className="space-y-4">
                    <li className="flex items-center gap-3 text-sm text-slate-300 font-medium"><Check size={16} className="text-emerald-500" /> PV & Speicher Installation</li>
                    <li className="flex items-center gap-3 text-sm text-slate-300 font-medium"><Check size={16} className="text-emerald-500" /> Smart-Meter Gateways</li>
                    <li className="flex items-center gap-3 text-sm text-slate-300 font-medium"><Check size={16} className="text-emerald-500" /> EMS (Energy Management)</li>
                </ul>
            </div>
        </div>
    </div>
);
