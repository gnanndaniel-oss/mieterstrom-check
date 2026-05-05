"use server";

import prisma from "@/lib/prisma";
import { MAIL_FROM_PARTNER, escapeHtml, getAdminEmail, sendMail } from "@/lib/mail";

export async function submitProviderApplication(formData: FormData) {
    const honeypot = formData.get("website_url")?.toString();
    if (honeypot) {
        return { success: true };
    }

    const firma = formData.get("firma")?.toString() || "";
    const name = formData.get("name")?.toString() || "";
    const email = formData.get("email")?.toString().trim();
    const bewerbung = formData.get("website")?.toString() || "";
    const typ = formData.get("typ")?.toString() || "";

    if (!email || !firma) {
        return { error: "Firma und E-Mail sind erforderlich" };
    }

    try {
        await prisma.kontaktAnfrage.create({
            data: {
                name: `${firma} (${name})`,
                email,
                betreff: `Neuer Dienstleister: ${firma}`,
                nachricht: `Bewerbung als: ${typ}\nWebsite: ${bewerbung}`,
            },
        });

        await sendMail({
            from: MAIL_FROM_PARTNER,
            to: getAdminEmail(),
            replyTo: email,
            subject: `Neue Anbieter-Bewerbung: ${firma}`,
            html: `
                <h1>Neuer Partner möchte gelistet werden</h1>
                <p><strong>Firma:</strong> ${escapeHtml(firma)}</p>
                <p><strong>Ansprechpartner:</strong> ${escapeHtml(name)}</p>
                <p><strong>Typ:</strong> ${escapeHtml(typ)}</p>
                <p><strong>Website:</strong> <a href="${escapeHtml(bewerbung)}">${escapeHtml(bewerbung)}</a></p>
                <p><strong>E-Mail:</strong> ${escapeHtml(email)}</p>
            `,
        });

        return { success: true };
    } catch (error) {
        console.error("Fehler bei Anbieter-Bewerbung:", error);
        return { error: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut." };
    }
}
