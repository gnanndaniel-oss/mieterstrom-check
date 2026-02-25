import prisma from "@/lib/prisma";
import Link from "next/link";
import { ArrowRight, Calendar, BookOpen } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function BlogOverview() {
    const posts = await prisma.blogPost.findMany({
        where: { veroeffentlicht: true },
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="bg-slate-50 min-h-screen">
            <div className="bg-slate-900 py-20 text-white mb-16 border-b border-slate-800">
                <div className="container mx-auto px-4 max-w-5xl text-center">
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <BookOpen className="w-8 h-8 text-green-400" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Wissen & Neuigkeiten</h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                        Tiefgehende Analysen, rechtliche Updates und Experten-Tipps rund um Photovoltaik, Mieterstrom und die Gebäudeversorgung.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-5xl pb-24">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post: any) => (
                        <Link key={post.id} href={`/blog/${post.slug}`} className="group bg-white rounded-3xl p-8 border border-slate-200 hover:border-green-500 hover:shadow-lg transition-all flex flex-col h-full">
                            <div className="text-xs font-semibold tracking-wider text-green-600 uppercase mb-4">
                                {post.kategorie}
                            </div>
                            <h2 className="text-2xl font-bold mb-4 text-slate-900 group-hover:text-green-600 transition-colors">
                                {post.titel}
                            </h2>
                            <p className="text-slate-600 leading-relaxed mb-8 flex-grow">
                                {post.excerpt}
                            </p>
                            <div className="flex items-center justify-between text-sm mt-auto pt-6 border-t border-slate-100">
                                <span className="flex items-center text-slate-400">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    {new Date(post.createdAt).toLocaleDateString("de-DE")}
                                </span>
                                <span className="text-green-600 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center">
                                    <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
