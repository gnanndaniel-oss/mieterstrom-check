import { MetadataRoute } from "next";
import prisma from "@/lib/prisma";
import { SITE_URL } from "@/lib/seo";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const now = new Date();

    const staticRoutes: MetadataRoute.Sitemap = [
        { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
        { url: `${SITE_URL}/vergleich`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
        { url: `${SITE_URL}/rechner`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: `${SITE_URL}/partner`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
        { url: `${SITE_URL}/mieterstrom-guide`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
        { url: `${SITE_URL}/mieterstrom-guide/foerderung`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${SITE_URL}/mieterstrom-guide/gebaeudeversorgung`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${SITE_URL}/mieterstrom-guide/recht`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${SITE_URL}/mieterstrom-guide/warum-speicher`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${SITE_URL}/datenschutz`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
        { url: `${SITE_URL}/impressum`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    ];

    let dynamicRoutes: MetadataRoute.Sitemap = [];
    try {
        const [providers, posts] = await Promise.all([
            prisma.anbieter.findMany({
                where: { veroeffentlicht: true },
                select: { slug: true, updatedAt: true },
            }),
            prisma.blogPost.findMany({
                where: { veroeffentlicht: true },
                select: { slug: true, updatedAt: true },
            }),
        ]);
        dynamicRoutes = [
            ...providers.map((p) => ({
                url: `${SITE_URL}/anbieter/${p.slug}`,
                lastModified: p.updatedAt,
                changeFrequency: "weekly" as const,
                priority: 0.8,
            })),
            ...posts.map((p) => ({
                url: `${SITE_URL}/blog/${p.slug}`,
                lastModified: p.updatedAt,
                changeFrequency: "monthly" as const,
                priority: 0.7,
            })),
        ];
    } catch (err) {
        console.error("[sitemap] DB query failed, falling back to static routes only", err);
    }

    return [...staticRoutes, ...dynamicRoutes];
}
