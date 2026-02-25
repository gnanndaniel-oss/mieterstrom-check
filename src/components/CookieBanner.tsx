"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Cookie } from "lucide-react";

export function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Simple check if cookie exists
        const consent = localStorage.getItem("cookie-consent");
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = (type: 'all' | 'essential') => {
        localStorage.setItem("cookie-consent", type);
        setIsVisible(false);
        // Here you would typically initialize optional tracking (like GTM or Ads) if type === 'all'
        // Vercel Analytics and Speed Insights are privacy-first/cookieless and don't strictly require prior active consent under GDPR, 
        // but it's good practice.
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-6 md:p-8 pointer-events-none">
            <div className="max-w-4xl mx-auto bg-slate-900 text-slate-300 rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-700 pointer-events-auto flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700 shrink-0">
                            <Cookie className="w-5 h-5 text-green-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white">Privatsphäre & Cookies</h3>
                    </div>
                    <p className="text-sm leading-relaxed">
                        Wir verwenden Cookies und ähnliche Technologien, um unsere Plattform funktionsfähig zu halten und die Leistung zu messen (via Vercel Analytics). Wenn Sie auf "Alle akzeptieren" klicken, stimmen Sie der Speicherung von Cookies auf Ihrem Gerät zu.{' '}
                        <Link href="/datenschutz" className="text-green-400 hover:text-green-300 underline underline-offset-2">
                            Zur Datenschutzerklärung
                        </Link>
                    </p>
                </div>
                <div className="flex sm:flex-row flex-col gap-3 shrink-0 sm:w-auto w-full">
                    <Button
                        variant="outline"
                        className="bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white rounded-xl h-11"
                        onClick={() => handleAccept('essential')}
                    >
                        Nur Essenzielle
                    </Button>
                    <Button
                        className="bg-green-600 hover:bg-green-500 text-white rounded-xl h-11 border-none shadow-lg shadow-green-600/20"
                        onClick={() => handleAccept('all')}
                    >
                        Alle akzeptieren
                    </Button>
                </div>
            </div>
        </div>
    );
}
