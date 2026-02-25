"use server";

import prisma from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_12345"); // Fallback for local

export async function submitLead(formData: FormData) {
    const email = formData.get("email")?.toString();
    const vorname = formData.get("vorname")?.toString() || "";
    const nachname = formData.get("nachname")?.toString() || "";
    const telefon = formData.get("telefon")?.toString();
    const anzahlObjekte = formData.get("anzahlObjekte")?.toString();
    const anbieterId = formData.get("anbieterId")?.toString();
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
                anzahlObjekte,
                anbieterId,
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
          <p><strong>Objekte/WE:</strong> ${anzahlObjekte || '-'}</p>
          ${anbieterId ? `<p><strong>Interessierter Anbieter:</strong> ID ${anbieterId}</p>` : ''}
          ${rechnerDatenRaw ? `<h3>Rechner-Details:</h3><pre>${JSON.stringify(rechnerDaten, null, 2)}</pre>` : ''}
        `
            });
        }

        return { success: true, leadId: lead.id };
    } catch (error) {
        console.error("Fehler beim Speichern des Leads:", error);
        return { error: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut." };
    }
}
