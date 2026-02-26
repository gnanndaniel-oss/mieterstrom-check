import prisma from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Search as SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export const dynamic = 'force-dynamic';

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const sp = await searchParams;
    const query = typeof sp.q === 'string' ? sp.q : '';

    let anbieterResults: any[] = [];
    let blogResults: any[] = [];

    if (query) {
        // Simple search across name and description for Anbieter
        anbieterResults = await prisma.anbieter.findMany({
            where: {
                OR: [
                    { name: { contains: query, mode: 'insensitive' } },
                    { beschreibung: { contains: query, mode: 'insensitive' } },
                    { kurzBeschreibung: { contains: query, mode: 'insensitive' } },
                ]
            }
        });

        // Search across title and excerpt for Blog Posts
        blogResults = await prisma.blogPost.findMany({
            where: {
                veroeffentlicht: true,
                OR: [
                    { titel: { contains: query, mode: 'insensitive' } },
                    { excerpt: { contains: query, mode: 'insensitive' } },
                    { inhalt: { contains: query, mode: 'insensitive' } }
                ]
            }
        });
    }

    const hasResults = anbieterResults.length > 0 || blogResults.length > 0;

    return (
        <div className="bg-slate-50 min-h-screen">
            <div className="bg-slate-900 py-12 text-white border-b border-slate-800">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
                        <SearchIcon className="w-8 h-8 text-green-500" /> Suchergebnisse
                    </h1>
                    <p className="text-lg text-slate-300">
                        {query ? `Suchergebnisse für "${query}"` : 'Bitte geben Sie einen Suchbegriff ein.'}
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-4xl py-12">
                {!query ? (
                    <div className="text-center p-12 bg-white rounded-2xl shadow-sm border">
                        <p className="text-slate-500 text-lg">Nutzen Sie die Suchleiste im Menü, um Inhalte zu finden.</p>
                    </div>
                ) : !hasResults ? (
                    <div className="text-center p-12 bg-white rounded-2xl shadow-sm border border-slate-200">
                        <SearchIcon className="w-12 h-12 mx-auto text-slate-300 mb-4" />
                        <h2 className="text-xl font-bold text-slate-900 mb-2">Keine Treffer gefunden</h2>
                        <p className="text-slate-500 mb-6">Wir konnten leider nichts zu "{query}" finden. Bitte versuchen Sie es mit einem anderen Begriff.</p>
                        <Button asChild variant="outline">
                            <Link href="/">Zur Startseite</Link>
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-12">
                        {anbieterResults.length > 0 && (
                            <section>
                                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center justify-between border-b pb-2">
                                    <span>Anbieter ({anbieterResults.length})</span>
                                </h2>
                                <div className="space-y-4">
                                    {anbieterResults.map(a => (
                                        <div key={a.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-green-200 transition-colors">
                                            <div className="flex justify-between items-start gap-4 mb-2">
                                                <h3 className="text-lg font-bold text-slate-900">{a.name}</h3>
                                                {a.kategorie && <span className="text-xs px-2 py-1 rounded bg-slate-100 text-slate-600 font-medium whitespace-nowrap">{a.kategorie}</span>}
                                            </div>
                                            <p className="text-sm text-slate-600 mb-4 line-clamp-2">{a.kurzBeschreibung}</p>
                                            <Link href={`/anbieter/${a.slug}`} className="text-sm font-semibold text-green-600 hover:text-green-700 inline-flex items-center">
                                                Zum Profil <ArrowRight className="w-4 h-4 ml-1" />
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {blogResults.length > 0 && (
                            <section>
                                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center justify-between border-b pb-2">
                                    <span>Ratgeber & Blog ({blogResults.length})</span>
                                </h2>
                                <div className="space-y-4">
                                    {blogResults.map(p => (
                                        <div key={p.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-green-200 transition-colors">
                                            <div className="flex items-center gap-3 text-xs text-slate-500 mb-2">
                                                <span className="font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase tracking-wider">{p.kategorie}</span>
                                                <span>{new Date(p.createdAt).toLocaleDateString("de-DE")}</span>
                                            </div>
                                            <h3 className="text-lg font-bold text-slate-900 mb-2">{p.titel}</h3>
                                            <p className="text-sm text-slate-600 mb-4 line-clamp-2">{p.excerpt}</p>
                                            <Link href={`/blog/${p.slug}`} className="text-sm font-semibold text-green-600 hover:text-green-700 inline-flex items-center">
                                                Artikel lesen <ArrowRight className="w-4 h-4 ml-1" />
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
