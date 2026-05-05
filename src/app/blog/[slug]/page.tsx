import prisma from "@/lib/prisma";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Calendar } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { pageMetadata } from "@/lib/seo";
import { articleSchema, breadcrumbSchema, jsonLdString } from "@/lib/structured-data";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const post = await prisma.blogPost.findUnique({
        where: { slug },
        select: {
            slug: true,
            titel: true,
            excerpt: true,
            metaTitle: true,
            metaDescription: true,
            titelbild: true,
            kategorie: true,
            tags: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    if (!post) {
        return pageMetadata({
            title: "Artikel nicht gefunden",
            description: "Dieser Blogartikel ist nicht verfügbar.",
            path: `/blog/${slug}`,
            noindex: true,
        });
    }
    return pageMetadata({
        title: post.metaTitle || `${post.titel} | Mieterstrom-Check Blog`,
        description: post.metaDescription || post.excerpt || `${post.titel} – Aktueller Beitrag aus dem Mieterstrom-Check Blog.`,
        path: `/blog/${post.slug}`,
        type: "article",
        image: post.titelbild || undefined,
        keywords: post.tags ? post.tags.split(",").map((t) => t.trim()) : undefined,
        publishedTime: post.createdAt.toISOString(),
        modifiedTime: post.updatedAt.toISOString(),
    });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await prisma.blogPost.findUnique({
        where: { slug }
    });

    if (!post) {
        return <div className="p-20 text-center text-xl">Artikel nicht gefunden</div>;
    }

    const ld = jsonLdString(
        articleSchema({
            headline: post.titel,
            description: post.excerpt || undefined,
            slug: post.slug,
            image: post.titelbild,
            author: post.autor,
            category: post.kategorie,
            keywords: post.tags,
            publishedAt: post.createdAt,
            modifiedAt: post.updatedAt,
        }),
        breadcrumbSchema([
            { name: "Start", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.titel, path: `/blog/${post.slug}` },
        ]),
    );

    return (
        <div className="bg-slate-50 min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />
            <div className="bg-slate-900 pt-20 pb-16 text-white border-b border-slate-800">
                <div className="container mx-auto px-4 max-w-3xl">
                    <Link href="/mieterstrom-guide" className="inline-flex items-center text-green-400 hover:text-green-300 font-medium mb-8 text-sm transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Zurück zum Guide
                    </Link>
                    <div className="flex items-center gap-4 text-slate-400 text-sm mb-4">
                        <span className="bg-white/10 px-3 py-1 rounded-full text-white">{post.kategorie}</span>
                        <span className="flex items-center"><Calendar className="w-4 h-4 mr-1" /> {new Date(post.createdAt).toLocaleDateString("de-DE")}</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-white">{post.titel}</h1>
                    {post.excerpt && <p className="text-xl text-slate-300 leading-relaxed border-l-4 border-green-500 pl-4">{post.excerpt}</p>}
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-3xl py-16">
                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200">
                    <div className="prose prose-slate prose-lg prose-headings:font-bold prose-h2:text-slate-900 prose-h2:mb-4 prose-h2:mt-10 prose-p:text-slate-600 prose-a:text-green-600 max-w-none">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {post.inhalt}
                        </ReactMarkdown>
                    </div>
                </div>

                <div className="mt-12 bg-green-50 rounded-3xl p-8 text-center border border-green-100">
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">Persönliche Beratung gefällig?</h3>
                    <p className="text-slate-600 mb-6 max-w-xl mx-auto">Lassen Sie uns Ihr Projekt gemeinsam durchrechnen. Finden Sie in 2 Minuten heraus, wie viel Rendite in Ihrem Dach steckt.</p>
                    <Link href="/rechner" className="inline-flex items-center justify-center h-12 px-8 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors">
                        Wirtschaftlichkeit prüfen
                    </Link>
                </div>
            </div>
        </div>
    );
}
