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
    <div className="w-full bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col items-center">
        <div className="p-8 w-full border-b border-slate-100 bg-gradient-to-b from-slate-50 to-white text-center flex flex-col items-center">
            <div className="w-20 h-20 bg-slate-900 rounded-2xl flex items-center justify-center shadow-lg mb-4 transform rotate-6 hover:rotate-0 transition-transform duration-500">
                <Shield className="text-white w-10 h-10 transform -rotate-6 hover:rotate-0 transition-transform duration-500" />
            </div>
            <h4 className="font-bold text-slate-900 text-2xl font-heading mb-2">Das Haftungsdach</h4>
            <p className="text-slate-500 max-w-sm text-sm">Ein Contracting-Partner übernimmt die volle rechtliche Verantwortung als Endversorger (EVU).</p>
        </div>

        <div className="w-full p-4 bg-white grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex flex-col items-center text-center gap-2 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 transition-colors">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold shrink-0 text-sm">1</div>
                <div>
                    <h5 className="font-bold text-slate-800 text-sm">Meldewesen</h5>
                    <p className="text-xs text-slate-500 mt-1">Übernahme im Marktstammdatenregister</p>
                </div>
            </div>
            <div className="flex flex-col items-center text-center gap-2 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-200 transition-colors">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold shrink-0 text-sm">2</div>
                <div>
                    <h5 className="font-bold text-slate-800 text-sm">Abrechnung</h5>
                    <p className="text-xs text-slate-500 mt-1">Rechnungsstellung direkt an Mieter</p>
                </div>
            </div>
            <div className="flex flex-col items-center text-center gap-2 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-purple-50 hover:border-purple-200 transition-colors">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold shrink-0 text-sm">3</div>
                <div>
                    <h5 className="font-bold text-slate-800 text-sm">Messung</h5>
                    <p className="text-xs text-slate-500 mt-1">Betrieb des Smart Meter Gateways</p>
                </div>
            </div>
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
