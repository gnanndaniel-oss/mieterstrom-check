"use client";

import { useState, Suspense } from "react";
import { ArrowRight, ArrowLeft, CheckCircle2, Calculator, BarChart3, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeadModal } from "@/components/LeadModal";
import { useSearchParams } from "next/navigation";

export default function RechnerPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500">Lade Rechner...</div>}>
            <RechnerForm />
        </Suspense>
    );
}

function RechnerForm() {
    const searchParams = useSearchParams();
    const [step, setStep] = useState(1);
    const initialWe = parseInt(searchParams.get("we") || "10", 10);
    const [formData, setFormData] = useState({
        // Step 1
        we: initialWe,
        flaeche: 80,
        typ: searchParams.get("type") || "bestand",
        plz: searchParams.get("plz") || "",
        dachflaeche: initialWe * 25, // Errechne ca. 25m2 Dachfläche pro Wohneinheit als Standardwert
        ausrichtung: "sued",
        // Step 2
        verbrauchWe: 2500,
        strompreis: 40,
        waermepumpe: false,
        wallboxen: 0,
        allgemeinstrom: 2000,
        // Step 3
        kwp: 30, // calculated later if not override
        speicher: false,
        speicherKwh: 20,
        bhkw: false,
        investition: "eigentuemer"
    });

    const handleNext = () => setStep(s => Math.min(4, s + 1));
    const handleBack = () => setStep(s => Math.max(1, s - 1));

    // calculation logic
    const anlagenLeistung_kWp = formData.dachflaeche * 0.15;
    const jahresertrag_kWh = anlagenLeistung_kWp * 950;
    const gesamtverbrauch_kWh = (formData.we * formData.verbrauchWe) + formData.allgemeinstrom + (formData.waermepumpe ? 5000 : 0) + (formData.wallboxen * 2000);

    const eigenverbrauchsquote = formData.speicher ? Math.min(0.85, gesamtverbrauch_kWh / jahresertrag_kWh) : Math.min(0.45, gesamtverbrauch_kWh / jahresertrag_kWh);
    const direktverbrauch_kWh = jahresertrag_kWh * eigenverbrauchsquote;
    const einspeisung_kWh = jahresertrag_kWh - direktverbrauch_kWh;

    const mieterstromPreis_ct = formData.strompreis * 0.88;
    const entgelte_ct = 11; // Netzentgelte etc als ca.-Wert
    const mieterstromErloes = direktverbrauch_kWh * (mieterstromPreis_ct - entgelte_ct) / 100;

    const zuschlagSatz = anlagenLeistung_kWp <= 10 ? 2.59 : anlagenLeistung_kWp <= 40 ? 2.41 : 1.62;
    const mieterstromZuschlag = direktverbrauch_kWh * zuschlagSatz / 100;

    const einspeiseverguetung = einspeisung_kWh * 7.5 / 100;
    const gesamtErloes = mieterstromErloes + mieterstromZuschlag + einspeiseverguetung;

    const kostenProKWp = anlagenLeistung_kWp > 40 ? 1200 : 1500;
    let investitionskosten = anlagenLeistung_kWp * kostenProKWp;
    if (formData.speicher) investitionskosten += formData.speicherKwh * 650;

    const betriebskosten = 0.02 * investitionskosten; // 2% Wartung/Versicherung
    const baseRendite = ((gesamtErloes - betriebskosten) / investitionskosten) * 100;

    // Realistische Skalierung ohne feste Untergrenze
    let rendite = baseRendite * 1.5;
    rendite += formData.speicher ? 2.5 : 0;
    rendite += formData.waermepumpe ? 1.0 : 0;
    rendite += (formData.wallboxen * 0.1);
    rendite += formData.we * 0.05; // Leichte Skaleneffekte

    let amortisation = 100 / Math.max(0.1, rendite); // Prevent division by zero

    // Ampelsystem Logik
    const isProvider = formData.investition === "anbieter";
    const evalRendite = isProvider ? 6.5 : rendite;

    let ampelColor = "bg-red-500";
    let ampelText = "Schwer wirtschaftlich";
    let ampelTextColor = "text-red-500";
    if (evalRendite >= 8) {
        ampelColor = "bg-green-500";
        ampelTextColor = "text-green-500";
        ampelText = "Sehr lukrativ";
    } else if (evalRendite >= 4) {
        ampelColor = "bg-yellow-500";
        ampelTextColor = "text-yellow-600";
        ampelText = "Solide";
    }

    return (
        <div className="bg-slate-50 min-h-screen py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-slate-900">Wirtschaftlichkeitsrechner</h1>
                    <p className="text-slate-600 mt-2">Prüfen Sie völlig kostenlos das Potenzial für Ihr Gebäude.</p>
                </div>

                {/* Steps header */}
                <div className="flex items-center justify-between mb-8 relative">
                    <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-slate-200 -z-10 hidden sm:block"></div>
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className={`flex flex-col items-center bg-slate-50 relative z-10 px-2 sm:px-4 ${step >= i ? "text-green-600" : "text-slate-400"}`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 border-2 ${step >= i ? "border-green-600 bg-green-50" : "border-slate-300 bg-white"}`}>
                                {step > i ? <CheckCircle2 className="w-6 h-6" /> : i}
                            </div>
                            <span className="text-xs font-medium hidden sm:block">
                                {i === 1 ? "Gebäude" : i === 2 ? "Verbrauch" : i === 3 ? "Technik" : "Ergebnis"}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-10">
                    {step === 1 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h2 className="text-2xl font-bold border-b pb-4">1. Gebäudedaten</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold">Anzahl Wohneinheiten</label>
                                    <input type="number" min="2" className="w-full border p-3 rounded-lg focus:ring-2 outline-none" value={formData.we} onChange={e => setFormData({ ...formData, we: Number(e.target.value) })} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold">Wohnfläche pro Einheit (m²)</label>
                                    <input type="number" min="20" className="w-full border p-3 rounded-lg focus:ring-2 outline-none" value={formData.flaeche} onChange={e => setFormData({ ...formData, flaeche: Number(e.target.value) })} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold">Dachfläche (m²)</label>
                                    <input type="number" min="50" className="w-full border p-3 rounded-lg focus:ring-2 outline-none" value={formData.dachflaeche} onChange={e => setFormData({ ...formData, dachflaeche: Number(e.target.value) })} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold">Gebäudetyp</label>
                                    <select className="w-full border p-3 rounded-lg focus:ring-2 outline-none" value={formData.typ} onChange={e => setFormData({ ...formData, typ: e.target.value })}>
                                        <option value="bestand">Bestand</option>
                                        <option value="neubau">Neubau</option>
                                    </select>
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm font-semibold">Postleitzahl</label>
                                    <input type="text" className="w-full border p-3 rounded-lg focus:ring-2 outline-none" placeholder="10115" value={formData.plz} onChange={e => setFormData({ ...formData, plz: e.target.value })} />
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h2 className="text-2xl font-bold border-b pb-4">2. Verbrauchsdaten</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold">Verbrauch pro WE (kWh/Jahr)</label>
                                    <input type="number" className="w-full border p-3 rounded-lg focus:ring-2 outline-none" value={formData.verbrauchWe} onChange={e => setFormData({ ...formData, verbrauchWe: Number(e.target.value) })} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold">Aktueller Strompreis (ct/kWh)</label>
                                    <input type="number" step="0.1" className="w-full border p-3 rounded-lg focus:ring-2 outline-none" value={formData.strompreis} onChange={e => setFormData({ ...formData, strompreis: Number(e.target.value) })} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold">Allgemeinstrom (kWh/Jahr)</label>
                                    <input type="number" className="w-full border p-3 rounded-lg focus:ring-2 outline-none" value={formData.allgemeinstrom} onChange={e => setFormData({ ...formData, allgemeinstrom: Number(e.target.value) })} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold">Anzahl Wallboxen</label>
                                    <input type="number" min="0" className="w-full border p-3 rounded-lg focus:ring-2 outline-none" value={formData.wallboxen} onChange={e => setFormData({ ...formData, wallboxen: Number(e.target.value) })} />
                                </div>
                                <div className="space-y-4 md:col-span-2 mt-2">
                                    <label className="flex items-center gap-3 cursor-pointer p-4 border rounded-xl hover:bg-slate-50 transition-colors">
                                        <input type="checkbox" className="w-5 h-5" checked={formData.waermepumpe} onChange={e => setFormData({ ...formData, waermepumpe: e.target.checked })} />
                                        <span className="font-semibold">Zentrale Wärmepumpe vorhanden</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h2 className="text-2xl font-bold border-b pb-4">3. Anlagenkonzept</h2>
                            <div className="bg-blue-50 text-blue-800 p-4 rounded-xl flex gap-3 text-sm mb-6">
                                <Info className="flex-shrink-0 w-5 h-5 text-blue-600" />
                                <p>Basierend auf Ihrer Dachfläche haben wir eine PV-Anlage von <b>{anlagenLeistung_kWp.toFixed(1)} kWp</b> vorausgefüllt. Ein Batteriespeicher erhöht die Rendite bei Mieterstrom signifikant.</p>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2 md:col-span-2">
                                    <label className="flex items-center justify-between cursor-pointer p-4 border rounded-xl hover:bg-slate-50 transition-colors border-green-200 bg-green-50/50">
                                        <div className="flex flex-col">
                                            <span className="font-semibold">Batteriespeicher integrieren (Empfohlen)</span>
                                            <a href="/mieterstrom-guide/warum-speicher" target="_blank" className="text-sm text-green-700 hover:underline flex items-center mt-1" onClick={(e) => e.stopPropagation()}>
                                                Warum ein Speicher wichtig ist <ArrowRight className="w-3 h-3 ml-1" />
                                            </a>
                                        </div>
                                        <input type="checkbox" className="w-5 h-5 flex-shrink-0 ml-4 cursor-pointer" checked={formData.speicher} onChange={e => setFormData({ ...formData, speicher: e.target.checked })} />
                                    </label>
                                </div>
                                {formData.speicher && (
                                    <div className="space-y-2 md:col-span-2 animate-in fade-in mt-[-1rem]">
                                        <div className="p-4 border border-t-0 rounded-b-xl border-green-200 bg-white">
                                            <label className="text-sm font-semibold">Speichergröße (kWh)</label>
                                            <input type="number" className="w-full border p-3 rounded-lg mt-2 focus:ring-2 outline-none" value={formData.speicherKwh} onChange={e => setFormData({ ...formData, speicherKwh: Number(e.target.value) })} />
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm font-semibold">Wer investiert in die Anlage?</label>
                                    <select className="w-full border p-3 rounded-lg focus:ring-2 outline-none" value={formData.investition} onChange={e => setFormData({ ...formData, investition: e.target.value })}>
                                        <option value="eigentuemer">Ich (Eigentümer-Modell) - Höchste Rendite</option>
                                        <option value="anbieter">Dienstleister (Contracting) - Kein eigener Aufwand/Risiko</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-bold">Ergebnis-Dashboard</h2>
                                <Button className="bg-slate-900 border" onClick={() => window.print()}>
                                    Ergebnis drucken
                                </Button>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-slate-900 text-white rounded-2xl p-6 relative overflow-hidden text-center shadow-lg flex flex-col justify-center items-center">
                                    <div className="absolute top-0 right-0 p-4 opacity-10">
                                        <BarChart3 className="w-24 h-24" />
                                    </div>
                                    <h4 className="text-slate-400 font-medium mb-1 relative z-10">Geschätzte Rendite p.a.</h4>
                                    <div className={`text-5xl font-black tracking-tight relative z-10 mb-3 ${ampelTextColor}`}>
                                        {isProvider ? "6.5%" : `${Math.max(0, rendite).toFixed(1)}%`}
                                    </div>
                                    <div className="relative z-10 flex items-center justify-center gap-2">
                                        <span className={`w-3 h-3 rounded-full ${ampelColor} shadow-sm shadow-current`}></span>
                                        <span className="text-sm font-semibold text-white">{ampelText}</span>
                                    </div>
                                </div>

                                <div className="bg-white border rounded-2xl p-6 text-center shadow-sm flex flex-col justify-center items-center">
                                    <h4 className="text-slate-500 font-medium mb-1">Amortisation in</h4>
                                    <div className="text-4xl font-bold tracking-tight text-slate-900">
                                        {isProvider ? "Keine Invest." : `${Math.max(1, amortisation).toFixed(1)} Jahre`}
                                    </div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-3 gap-4 mt-4">
                                <div className="p-4 bg-slate-50 rounded-xl border">
                                    <div className="text-sm text-slate-500 mb-1">Investitionsaufwand (netto)</div>
                                    <div className="font-bold text-xl">{formData.investition === "anbieter" ? "0 €" : `${Math.round(investitionskosten).toLocaleString("de-DE")} €`}</div>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-xl border">
                                    <div className="text-sm text-slate-500 mb-1">Jahresertrag PV</div>
                                    <div className="font-bold text-xl">{Math.round(jahresertrag_kWh).toLocaleString("de-DE")} kWh</div>
                                </div>
                                <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                                    <div className="text-sm text-green-700 mb-1">Ersparnis pro Mieter (~12%)</div>
                                    <div className="font-bold text-green-700 text-xl">{Math.round(formData.verbrauchWe * (formData.strompreis - mieterstromPreis_ct) / 100).toLocaleString("de-DE")} €/Jahr</div>
                                </div>
                            </div>

                            <div className="p-6 bg-slate-100 rounded-2xl text-center space-y-4">
                                <h3 className="font-bold text-xl">Lassen Sie dieses Projekt professionell prüfen!</h3>
                                <p className="text-slate-600 mb-4">Wir vergleichen und finden den Dienstleister, der diese Wirtschaftlichkeit für Sie realisiert.</p>
                                <LeadModal
                                    rechnerDaten={formData}
                                    buttonText="Unverbindliches Angebot anfordern"
                                    className="w-full sm:w-auto bg-green-600 hover:bg-green-700 h-12 px-8 rounded-full font-semibold text-white shadow-md shadow-green-600/20"
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center mt-6">
                    <Button variant="outline" onClick={handleBack} disabled={step === 1} className="h-12 px-6 rounded-xl font-medium hidden sm:flex">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Zurück
                    </Button>
                    <Button variant="outline" onClick={handleBack} disabled={step === 1} className="h-12 w-12 rounded-xl sm:hidden">
                        <ArrowLeft className="w-4 h-4" />
                    </Button>

                    {step < 4 ? (
                        <Button onClick={handleNext} className="h-12 px-8 rounded-xl font-medium bg-slate-900 text-white hover:bg-slate-800 ml-auto">
                            Weiter <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    ) : (
                        <div className="ml-auto"></div>
                    )}
                </div>
            </div>
        </div>
    );
}
