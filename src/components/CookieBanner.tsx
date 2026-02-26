"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Cookie, X, Check } from "lucide-react";
import Cookies from "js-cookie";
import Script from "next/script";

type ConsentState = {
    necessary: boolean;
    analytics: boolean;
    marketing: boolean;
};

const GA_MEASUREMENT_ID = "G-XXXXXXXXXX"; // Replace with actual ID
const GTM_ID = "GTM-XXXXXXX"; // Replace with actual ID

export function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [consent, setConsent] = useState<ConsentState>({
        necessary: true,
        analytics: false,
        marketing: false,
    });
    const [hasConsented, setHasConsented] = useState(false);

    useEffect(() => {
        const savedConsent = Cookies.get("cookie-consent");
        if (savedConsent) {
            try {
                const parsedConsent = JSON.parse(savedConsent);
                setConsent(parsedConsent);
                setHasConsented(true);
            } catch (e) {
                setIsVisible(true);
            }
        } else {
            setIsVisible(true);
        }

        const handleOpenSettings = () => {
            setIsVisible(true);
            setShowSettings(true);
        };

        window.addEventListener('open-cookie-settings', handleOpenSettings);
        return () => window.removeEventListener('open-cookie-settings', handleOpenSettings);
    }, []);

    const saveConsent = (newConsent: ConsentState) => {
        Cookies.set("cookie-consent", JSON.stringify(newConsent), { expires: 365, path: '/' });
        setConsent(newConsent);
        setHasConsented(true);
        setIsVisible(false);
        setShowSettings(false);
    };

    const handleAcceptAll = () => {
        saveConsent({ necessary: true, analytics: true, marketing: true });
    };

    const handleAcceptEssential = () => {
        saveConsent({ necessary: true, analytics: false, marketing: false });
    };

    const handleSaveSettings = () => {
        saveConsent(consent);
    };

    return (
        <>
            {/* Tracking Scripts */}
            {hasConsented && consent.analytics && (
                <>
                    <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
                    <Script id="google-analytics" strategy="afterInteractive">
                        {`
                          window.dataLayer = window.dataLayer || [];
                          function gtag(){dataLayer.push(arguments);}
                          gtag('js', new Date());
                          gtag('config', '${GA_MEASUREMENT_ID}');
                        `}
                    </Script>
                </>
            )}
            {hasConsented && consent.marketing && (
                <>
                    {/* GTM */}
                    <Script id="google-tag-manager" strategy="afterInteractive">
                        {`
                          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                          })(window,document,'script','dataLayer','${GTM_ID}');
                        `}
                    </Script>
                </>
            )}

            {/* Banner UI */}
            {isVisible && !showSettings && (
                <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-6 pointer-events-none">
                    <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-2xl pointer-events-auto flex flex-col md:flex-row items-center gap-6">
                        <div className="flex-1 space-y-3 text-slate-700 dark:text-slate-300">
                            <h3 className="text-xl font-bold flex items-center gap-2 text-slate-900 dark:text-white">
                                <Cookie className="w-5 h-5 text-green-600" />
                                Cookie-Einstellungen
                            </h3>
                            <p className="text-sm">
                                Wir verwenden Cookies, um Inhalte und Anzeigen zu personalisieren, Funktionen für soziale Medien anbieten zu können und die Zugriffe auf unsere Website zu analysieren.{' '}
                                <Link href="/datenschutz" className="text-green-600 hover:underline">
                                    Datenschutz
                                </Link>{' '}
                                |{' '}
                                <Link href="/impressum" className="text-green-600 hover:underline">
                                    Impressum
                                </Link>
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                            <button
                                onClick={() => setShowSettings(true)}
                                className="text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 underline underline-offset-2 shrink-0"
                            >
                                Einstellungen
                            </button>
                            <Button
                                variant="outline"
                                className="w-full sm:w-auto rounded-xl"
                                onClick={handleAcceptEssential}
                            >
                                Nur Notwendige
                            </Button>
                            <Button
                                className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-md"
                                onClick={handleAcceptAll}
                            >
                                Alle akzeptieren
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Settings Modal */}
            {isVisible && showSettings && (
                <div className="fixed inset-0 z-[100] bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-slate-900 max-w-lg w-full rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <Cookie className="w-5 h-5 text-green-600" />
                                Datenschutz-Einstellungen
                            </h3>
                            <button onClick={() => { setShowSettings(false); if (!hasConsented) setIsVisible(true); }} className="text-slate-400 hover:text-slate-600 p-1">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto flex-1 space-y-6">
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                Hier können Sie festlegen, welche Cookies Sie zulassen möchten. Notwendige Cookies sind für die Kernfunktionen der Website erforderlich und können nicht abgewählt werden.
                            </p>

                            {/* Notwendig */}
                            <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                                <div className="mt-1 w-5 h-5 rounded-full bg-green-600 flex items-center justify-center text-white shrink-0">
                                    <Check className="w-3 h-3" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Notwendig</h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Diese Cookies sind erforderlich, um die Kernfunktionen der Website zu ermöglichen. Sie sind immer aktiv.</p>
                                </div>
                            </div>

                            {/* Statistik */}
                            <div className="flex items-start gap-3 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                                <input
                                    type="checkbox"
                                    id="cookie-analytics"
                                    className="mt-1 w-5 h-5 rounded text-green-600 border-slate-300 focus:ring-green-600"
                                    checked={consent.analytics}
                                    onChange={(e) => setConsent({ ...consent, analytics: e.target.checked })}
                                />
                                <label htmlFor="cookie-analytics" className="cursor-pointer flex-1">
                                    <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Statistik (Google Analytics)</h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Helfen Sie uns zu verstehen, wie Besucher mit unserer Website interagieren, indem Informationen anonym gesammelt und gemeldet werden.</p>
                                </label>
                            </div>

                            {/* Marketing */}
                            <div className="flex items-start gap-3 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                                <input
                                    type="checkbox"
                                    id="cookie-marketing"
                                    className="mt-1 w-5 h-5 rounded text-green-600 border-slate-300 focus:ring-green-600"
                                    checked={consent.marketing}
                                    onChange={(e) => setConsent({ ...consent, marketing: e.target.checked })}
                                />
                                <label htmlFor="cookie-marketing" className="cursor-pointer flex-1">
                                    <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Marketing (Google Tag Manager)</h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Marketing-Cookies werden verwendet, um Besuchern auf Websites zu folgen, um relevante und ansprechende Werbung zu zeigen.</p>
                                </label>
                            </div>
                        </div>
                        <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col sm:flex-row justify-end gap-3">
                            <Button variant="outline" onClick={handleAcceptEssential} className="w-full sm:w-auto">
                                Nur Notwendige
                            </Button>
                            <Button onClick={handleSaveSettings} className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white">
                                Auswahl speichern
                            </Button>
                            <Button onClick={handleAcceptAll} className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900">
                                Alle akzeptieren
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
