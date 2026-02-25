import Link from "next/link";
import { Zap } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="bg-green-600 text-white p-1 rounded-md">
                                <Zap className="w-4 h-4 fill-current" />
                            </div>
                            <span className="font-bold text-lg text-white">
                                mieterstrom-check<span className="text-green-500">.de</span>
                            </span>
                        </Link>
                        <p className="text-sm text-slate-400">
                            Unabhängiger Vergleich von Mieterstrom-Anbietern für Vermieter, WEGs und Hausverwaltungen in Deutschland.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Vergleich</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/vergleich" className="hover:text-green-400 transition-colors">Alle Anbieter</Link></li>
                            <li><Link href="/rechner" className="hover:text-green-400 transition-colors">Renditerechner</Link></li>
                            <li><Link href="/blog" className="hover:text-green-400 transition-colors">News & Updates</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Wissen</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/mieterstrom-guide" className="hover:text-green-400 transition-colors">Mieterstrom Modelle</Link></li>
                            <li><Link href="/mieterstrom-guide/foerderung" className="hover:text-green-400 transition-colors">Förderung & Zuschlag</Link></li>
                            <li><Link href="/mieterstrom-guide/recht" className="hover:text-green-400 transition-colors">Rechtliche Vorgaben</Link></li>
                            <li><Link href="/mieterstrom-guide/gebaeudeversorgung" className="hover:text-green-400 transition-colors">Gebäudeversorgung (GGV)</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Rechtliches</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/impressum" className="hover:text-green-400 transition-colors">Impressum</Link></li>
                            <li><Link href="/datenschutz" className="hover:text-green-400 transition-colors">Datenschutz</Link></li>
                            <li><Link href="/kontakt" className="hover:text-green-400 transition-colors">Kontakt</Link></li>
                            <li><Link href="/admin" className="hover:text-green-400 transition-colors">Partnernetzwerk</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-sm text-slate-500">
                    <p>© {new Date().getFullYear()} mieterstrom-check.de. Alle Rechte vorbehalten.</p>
                    <div className="mt-4 md:mt-0 space-x-4">
                        <span>100% Unabhängig</span>
                        <span>Made in Germany</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
