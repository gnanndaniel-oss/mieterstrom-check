"use server";

import prisma from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_12345"); // Fallback for local

export async function submitLead(formData: FormData) {
    const email = formData.get("email")?.toString();
    const vorname = formData.get("vorname")?.toString() || "";
    const nachname = formData.get("nachname")?.toString() || "";
    const telefon = formData.get("telefon")?.toString();
    const firma = formData.get("firma")?.toString();
    const anzahlObjekte = formData.get("anzahlObjekte")?.toString();
    const anbieterId = formData.get("anbieterId")?.toString();
    const newsletter = formData.get("newsletter") === "true";
    const rechnerDatenRaw = formData.get("rechnerDaten")?.toString();

    if (!email) {
        return { error: "E-Mail ist erforderlich" };
    }

    let rechnerDaten = null;
    if (rechnerDatenRaw) {
        try {
            rechnerDaten = JSON.parse(rechnerDatenRaw);
        } catch (e) { }
    }

    try {
        // 1. Save to DB
        const lead = await prisma.lead.create({
            data: {
                email,
                vorname,
                nachname,
                telefon,
                firma,
                anzahlObjekte,
                anbieterId,
                newsletter,
                rechnerDaten: rechnerDaten as any,
                status: "neu"
            }
        });

        // 2. Send Email to Admin (Optional, handle missing key gracefully)
        if (process.env.RESEND_API_KEY) {
            await resend.emails.send({
                from: "Leads <onboarding@resend.dev>",
                to: [process.env.ADMIN_EMAIL || "admin@mieterstrom-check.de"],
                subject: `Neuer Lead: ${vorname} ${nachname}`,
                html: `
          <h1>Neuer Mieterstrom-Lead</h1>
          <p><strong>Name:</strong> ${vorname} ${nachname}</p>
          <p><strong>E-Mail:</strong> ${email}</p>
          <p><strong>Telefon:</strong> ${telefon || '-'}</p>
          <p><strong>Firma:</strong> ${firma || '-'}</p>
          <p><strong>Objekte/WE:</strong> ${anzahlObjekte || '-'}</p>
          <p><strong>Newsletter Anfragen:</strong> ${newsletter ? 'Ja' : 'Nein'}</p>
          ${anbieterId ? `<p><strong>Interessierter Anbieter:</strong> ID ${anbieterId}</p>` : ''}
          ${rechnerDatenRaw ? `<h3>Rechner-Details:</h3><pre>${JSON.stringify(rechnerDaten, null, 2)}</pre>` : ''}
        `
            });
        }

        // 3. Handle Newsletter integration
        if (newsletter) {
            try {
                await prisma.newsletterAbonnent.upsert({
                    where: { email },
                    update: {},
                    create: { email, aktiv: true }
                });
            } catch (err) {
                console.error("Newsletter saving error", err);
            }
        }

        return { success: true, leadId: lead.id };
    } catch (error) {
        console.error("Fehler beim Speichern des Leads:", error);
        return { error: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut." };
    }
}
