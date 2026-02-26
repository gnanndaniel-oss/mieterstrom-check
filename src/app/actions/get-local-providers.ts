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
        const whiteEnergy = await prisma.anbieter.findUnique({
            where: { slug: "white-energy" }
        });

        const providers = await prisma.anbieter.findMany({
            where: {
                slug: { notIn: ["entena-energy", "white-energy", "mieterstrom-jetzt", "mieterstromjetzt"] },
                veroeffentlicht: true,
            },
            take: 20
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
            // Add a small random factor to rotate the 3rd provider occasionally if scores match
            score += Math.random() * 0.5;
            return { ...p, score };
        });

        scoredProviders.sort((a, b) => b.score - a.score);

        const bestRival = scoredProviders[0];

        const returnList = [];
        if (whiteEnergy) returnList.push(whiteEnergy);
        if (bestRival) returnList.push(bestRival);

        return returnList;
    } catch (err) {
        console.error("Fehler beim Laden lokaler Anbieter", err);
        return [];
    }
}
