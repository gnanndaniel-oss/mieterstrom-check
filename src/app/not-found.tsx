import Link from "next/link";
import { Search, Home, ArrowLeft, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center bg-slate-50 px-4 text-center">
            <div className="relative mb-8 text-green-500 animate-pulse">
                <div className="absolute inset-0 bg-green-500/20 blur-3xl rounded-full" />
                <Zap className="w-32 h-32 relative z-10" />
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-4 tracking-tight">404</h1>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Diese Seite ist leider ohne Strom.</h2>

            <p className="text-lg text-slate-600 mb-8 max-w-lg mx-auto">
                Die von Ihnen gesuchte Seite existiert nicht oder wurde verschoben. Keine Sorge, hier finden Sie schnell zurück ins richtige Netz.
            </p>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 w-full max-w-md mb-8 ring-1 ring-slate-900/5">
                <div className="flex items-center gap-3 text-sm text-slate-500 justify-center">
                    <span className="font-bold text-green-600">Fun Fact:</span>
                    München hat das größte städtische Mieterstromnetz Deutschlands!
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-md">
                <Button asChild size="lg" className="w-full sm:w-auto h-14 px-8 rounded-xl bg-green-600 hover:bg-green-500 text-white shadow-md">
                    <Link href="/">
                        <Home className="w-5 h-5 mr-2" /> Startseite
                    </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 rounded-xl border-slate-200 bg-white hover:bg-slate-100 text-slate-700">
                    <Link href="/vergleich">
                        <Search className="w-5 h-5 mr-2" /> Anbieter finden
                    </Link>
                </Button>
            </div>

            <div className="mt-12">
                <Link href="/rechner" className="text-green-600 hover:text-green-700 font-medium inline-flex items-center group">
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Oder Mieterstrom-Rechner starten
                </Link>
            </div>
        </div>
    );
}
