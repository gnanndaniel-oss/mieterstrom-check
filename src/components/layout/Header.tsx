import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Zap, Menu, X } from "lucide-react";
import { SearchForm } from "@/components/SearchForm";

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="bg-green-600 text-white p-1.5 rounded-lg group-hover:bg-green-700 transition-colors">
                        <Zap className="w-5 h-5 fill-current" />
                    </div>
                    <span className="font-bold text-xl tracking-tight text-slate-900">
                        mieterstrom-check<span className="text-green-600">.de</span>
                    </span>
                </Link>

                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    <Link href="/vergleich" className="text-slate-600 hover:text-green-600 transition-colors">Anbietervergleich</Link>
                    <Link href="/rechner" className="text-slate-600 hover:text-green-600 transition-colors">Rechner</Link>
                    <Link href="/mieterstrom-guide" className="text-slate-600 hover:text-green-600 transition-colors">Guide</Link>
                    <Link href="/blog" className="text-slate-600 hover:text-green-600 transition-colors">Blog</Link>
                </nav>

                <div className="hidden md:flex flex-1 max-w-xs mx-4 lg:mx-8">
                    <SearchForm />
                </div>

                <div className="hidden md:flex items-center gap-4">

                    <Button asChild className="bg-green-600 hover:bg-green-700 text-white rounded-full px-6 shadow-md shadow-green-600/20">
                        <Link href="/rechner">Wirtschaftlichkeit prüfen</Link>
                    </Button>
                </div>

                {/* Mobile menu would go here */}
                <button className="md:hidden p-2 text-slate-600">
                    <Menu className="w-6 h-6" />
                </button>
            </div>
        </header>
    );
}
