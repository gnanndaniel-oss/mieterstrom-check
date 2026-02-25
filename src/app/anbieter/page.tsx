"use client";

import { useState } from "react";
import { CheckCircle2, TrendingUp, Users, Target, ShieldCheck, Mail, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { submitProviderApplication } from "@/app/actions/submit-provider";
import Link from "next/link";
import { PartnerSynergyGraphic } from "@/components/Infographics";

export default function AnbieterLandingPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMsg("");

        const formData = new FormData(e.currentTarget);
        const res = await submitProviderApplication(formData);

        setIsSubmitting(false);

        if (res?.success) {
            setIsSuccess(true);
        } else {
            setErrorMsg(res?.error || "Ein Fehler ist aufgetreten.");
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Hero Section */}
            <div className="bg-slate-900 pt-24 pb-32 text-white border-b border-slate-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-green-900/40 to-slate-900/80 z-0" />
                <div className="container mx-auto px-4 max-w-6xl relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <div className="inline-flex items-center rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-sm text-green-400">
                            Partnerportal für Dienstleister
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                            Erhalten Sie qualifizierte Mieterstrom-Leads aus ganz Deutschland.
                        </h1>
                        <p className="text-xl text-slate-300 leading-relaxed max-w-xl">
                            Positionieren Sie sich auf der führenden Plattform für Gebäudeversorgung und klassisches Contracting. Wir matchen Ihr Angebot präzise mit den passenden WEG- und Vermieter-Dächern.
                        </p>
                        <div className="flex items-center gap-6 pt-2">
                            <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-500" /> Performance-basiert</span>
                            <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-500" /> Exklusive Daten</span>
                            <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-500" /> Direkter Fit</span>
                        </div>
                    </div>

                    {/* Registration Form */}
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl relative">
                        {isSuccess ? (
                            <div className="py-16 text-center space-y-4">
                                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/30">
                                    <CheckCircle2 className="w-10 h-10 text-green-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-white">Bewerbung eingegangen!</h3>
                                <p className="text-slate-300">
                                    Vielen Dank für Ihr Interesse an einer Partnerschaft. Unser Team wird Ihre Anfrage prüfen und sich in Kürze mit Ihnen in Verbindung setzen.
                                </p>
                                <Button asChild className="mt-8 bg-green-600 hover:bg-green-500 px-8 text-white rounded-xl">
                                    <Link href="/">Zurück zur Startseite</Link>
                                </Button>
                            </div>
                        ) : (
                            <>
                                <h3 className="text-2xl font-bold text-white mb-2">Partner werden</h3>
                                <p className="text-slate-300 mb-8 text-sm">Bewerben Sie sich jetzt auf eine Partnerschaft und erhalten Sie Zugang zu hunderten Dächern monatlich.</p>

                                {errorMsg && <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">{errorMsg}</div>}

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-300">Unternehmensname *</label>
                                        <input name="firma" required className="w-full bg-slate-900/50 border border-slate-700/50 outline-none rounded-xl h-12 px-4 focus:ring-2 focus:ring-green-500 text-white placeholder:text-slate-500" placeholder="Max Muster Energy GmbH" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-300">Ansprechpartner *</label>
                                            <input name="name" required className="w-full bg-slate-900/50 border border-slate-700/50 outline-none rounded-xl h-12 px-4 focus:ring-2 focus:ring-green-500 text-white placeholder:text-slate-500" placeholder="Vorname Nachname" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-300">E-Mail *</label>
                                            <input name="email" type="email" required className="w-full bg-slate-900/50 border border-slate-700/50 outline-none rounded-xl h-12 px-4 focus:ring-2 focus:ring-green-500 text-white placeholder:text-slate-500" placeholder="email@firma.de" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-300">Website</label>
                                        <input name="website" type="url" className="w-full bg-slate-900/50 border border-slate-700/50 outline-none rounded-xl h-12 px-4 focus:ring-2 focus:ring-green-500 text-white placeholder:text-slate-500" placeholder="https://www.firma.de" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-300">Ihr Fokus</label>
                                        <select name="typ" className="w-full bg-slate-900/50 border border-slate-700/50 outline-none rounded-xl h-12 px-4 focus:ring-2 focus:ring-green-500 text-white">
                                            <option value="Full Service Contractor">Full-Service Contracting</option>
                                            <option value="Installation PV">Reine PV-Installation</option>
                                            <option value="Messstellenbetrieb / Abrechnung">Messstellenbetrieb & Abrechnungssoftware</option>
                                            <option value="Anderes">Anderes (z.B. Speicherhersteller)</option>
                                        </select>
                                    </div>

                                    <Button type="submit" disabled={isSubmitting} className="w-full h-14 bg-green-600 hover:bg-green-500 text-white rounded-xl text-lg font-semibold shadow-lg shadow-green-600/20 mt-6">
                                        {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : "Jetzt bewerben"}
                                    </Button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Why Join Section */}
            <div className="py-24 bg-white">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Ihre Vorteile als Partner</h2>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">Warum Top-Anbieter wie EON, Naturstrom oder lokale Spezialisten mieterstrom-check nutzen.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-20">
                        <div className="bg-slate-50 border border-slate-100 p-8 rounded-3xl hover:shadow-lg transition-shadow">
                            <Target className="w-12 h-12 text-green-600 mb-6" />
                            <h3 className="text-xl font-bold mb-3 text-slate-900">100% Matching</h3>
                            <p className="text-slate-600 leading-relaxed">
                                Sie erhalten nur Leads, die auf Ihr Profil passen. Suchen Sie Projekte ab 20 WE? Nehmen Sie Contracting-Aufträge an? Wir filtern die Endkundenberaten für Sie vor.
                            </p>
                        </div>
                        <div className="bg-slate-50 border border-slate-100 p-8 rounded-3xl hover:shadow-lg transition-shadow">
                            <TrendingUp className="w-12 h-12 text-blue-600 mb-6" />
                            <h3 className="text-xl font-bold mb-3 text-slate-900">Skalierbarer Vertrieb</h3>
                            <p className="text-slate-600 leading-relaxed">
                                Ein konstanter Inflow aus hochkonvertierenden Leads, generiert durch den besten Wirtschaftlichkeitsrechner Deutschlands. Senken Sie Ihre Akquisekosten sofort.
                            </p>
                        </div>
                        <div className="bg-slate-50 border border-slate-100 p-8 rounded-3xl hover:shadow-lg transition-shadow">
                            <ShieldCheck className="w-12 h-12 text-yellow-500 mb-6" />
                            <h3 className="text-xl font-bold mb-3 text-slate-900">Seriöses Umfeld</h3>
                            <p className="text-slate-600 leading-relaxed">
                                Platzieren Sie Ihre Marke in einem professionellen und informativen Umfeld. Durch unser fundiertes Infomaterial wie den Mieterstrom-Guide ist das Vertrauen der Nutzer maximal hoch.
                            </p>
                        </div>
                    </div>

                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Das perfekte Ökosystem für Kooperationen</h2>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">Vernetzen Sie sich kaufmännisch oder technisch mit komplementären Partnern, um Komplettlösungen anzubieten.</p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <PartnerSynergyGraphic />
                    </div>
                </div>
            </div>
        </div>
    );
}
