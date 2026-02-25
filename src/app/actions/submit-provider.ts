"use server";

import prisma from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_12345");

export async function submitProviderApplication(formData: FormData) {
    const firma = formData.get("firma")?.toString() || "";
    const name = formData.get("name")?.toString() || "";
    const email = formData.get("email")?.toString();
    const bewerbung = formData.get("website")?.toString() || "";
    const typ = formData.get("typ")?.toString() || "";

    if (!email || !firma) {
        return { error: "Firma und E-Mail sind erforderlich" };
    }

    try {
        const kontakt = await prisma.kontaktAnfrage.create({
            data: {
                name: `${firma} (${name})`,
                email: email,
                betreff: `Neuer Dienstleister: ${firma}`,
                nachricht: `Bewerbung als: ${typ}\nWebsite: ${bewerbung}`
            }
        });

        if (process.env.RESEND_API_KEY) {
            await resend.emails.send({
                from: "Partner <onboarding@resend.dev>",
                to: [process.env.ADMIN_EMAIL || "admin@mieterstrom-check.de"],
                subject: `Neue Anbieter-Bewerbung: ${firma}`,
                html: `
          <h1>Neuer Partner möchte gelistet werden</h1>
          <p><strong>Firma:</strong> ${firma}</p>
          <p><strong>Ansprechpartner:</strong> ${name}</p>
          <p><strong>Typ:</strong> ${typ}</p>
          <p><strong>Website:</strong> <a href="${bewerbung}">${bewerbung}</a></p>
          <p><strong>E-Mail:</strong> ${email}</p>
        `
            });
        }

        return { success: true };
    } catch (error) {
        console.error("Fehler bei Anbieter-Bewerbung:", error);
        return { error: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut." };
    }
}
