"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getLocalProviders(plz: string) {
    // Basic PLZ parsing logic for Germany (1st digit regions)
    const firstDigit = plz ? plz.charAt(0) : "1";

    // Some rough regional mapping strings based on our seeded data
    let searchRegions = ["bundesweit"];
    if (firstDigit === "1") searchRegions.push("Berlin", "bundesweit");
    if (firstDigit === "8") searchRegions.push("München", "Augsburg", "Bayern", "bundesweit");
    if (firstDigit === "2" || firstDigit === "0") searchRegions.push("Hamburg", "Nord", "bundesweit");
    if (firstDigit === "4" || firstDigit === "5") searchRegions.push("Köln", "Düsseldorf", "NRW", "bundesweit");
    if (firstDigit === "6" || firstDigit === "7") searchRegions.push("Frankfurt", "Stuttgart", "bundesweit");

    try {
        const providers = await prisma.anbieter.findMany({
            where: {
                slug: { not: "entena-energy" }, // Not the top recommendation
                veroeffentlicht: true,
            },
            take: 15
        });

        // Sort by how well the 'standort' matches our regions
        const scoredProviders = providers.map(p => {
            let score = 0;
            const standortLower = (p.standort || "").toLowerCase();
            searchRegions.forEach((region, i) => {
                if (standortLower.includes(region.toLowerCase())) {
                    score += (10 - i); // higher score for direct regional matches over "bundesweit"
                }
            });
            return { ...p, score };
        });

        scoredProviders.sort((a, b) => b.score - a.score);

        // Return top 2
        return scoredProviders.slice(0, 2);
    } catch (err) {
        console.error("Fehler beim Laden lokaler Anbieter", err);
        return [];
    }
}
