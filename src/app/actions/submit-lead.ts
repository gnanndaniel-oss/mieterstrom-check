"use server";

import { randomBytes } from "crypto";
import prisma from "@/lib/prisma";
import {
    MAIL_FROM_LEADS,
    MAIL_FROM_NEWSLETTER,
    escapeHtml,
    getAdminEmail,
    getSiteUrl,
    sendMail,
} from "@/lib/mail";

const NEWSLETTER_TOKEN_TTL_HOURS = 48;

export async function submitLead(formData: FormData) {
    // Honeypot: any value here means a bot filled the hidden field — silently succeed.
    const honeypot = formData.get("website_url")?.toString();
    if (honeypot) {
        return { success: true, leadId: "spam-ignored" };
    }

    const email = formData.get("email")?.toString().trim();
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
        } catch {
            // ignore malformed JSON; lead saves without payload
        }
    }

    try {
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
                rechnerDaten: rechnerDaten ?? undefined,
                status: "neu",
            },
        });

        await sendMail({
            from: MAIL_FROM_LEADS,
            to: getAdminEmail(),
            replyTo: email,
            subject: `Neuer Lead: ${vorname} ${nachname}`.trim(),
            html: `
                <h1>Neuer Mieterstrom-Lead</h1>
                <p><strong>Name:</strong> ${escapeHtml(`${vorname} ${nachname}`.trim())}</p>
                <p><strong>E-Mail:</strong> ${escapeHtml(email)}</p>
                <p><strong>Telefon:</strong> ${escapeHtml(telefon) || "-"}</p>
                <p><strong>Firma:</strong> ${escapeHtml(firma) || "-"}</p>
                <p><strong>Objekte/WE:</strong> ${escapeHtml(anzahlObjekte) || "-"}</p>
                <p><strong>Newsletter:</strong> ${newsletter ? "Ja" : "Nein"}</p>
                ${anbieterId ? `<p><strong>Interessierter Anbieter:</strong> ID ${escapeHtml(anbieterId)}</p>` : ""}
                ${rechnerDatenRaw ? `<h3>Rechner-Details:</h3><pre>${escapeHtml(JSON.stringify(rechnerDaten, null, 2))}</pre>` : ""}
            `,
        });

        if (newsletter) {
            await startNewsletterDoubleOptIn(email);
        }

        return { success: true, leadId: lead.id };
    } catch (error) {
        console.error("Fehler beim Speichern des Leads:", error);
        return { error: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut." };
    }
}

async function startNewsletterDoubleOptIn(email: string) {
    try {
        const existing = await prisma.newsletterAbonnent.findUnique({ where: { email } });
        if (existing?.bestaetigt) {
            return;
        }

        const token = randomBytes(32).toString("hex");
        const tokenAblauf = new Date(Date.now() + NEWSLETTER_TOKEN_TTL_HOURS * 60 * 60 * 1000);

        await prisma.newsletterAbonnent.upsert({
            where: { email },
            update: { bestaetigToken: token, tokenAblauf, aktiv: false },
            create: {
                email,
                aktiv: false,
                bestaetigt: false,
                bestaetigToken: token,
                tokenAblauf,
            },
        });

        const confirmUrl = `${getSiteUrl()}/newsletter/bestaetigen?token=${token}`;

        await sendMail({
            from: MAIL_FROM_NEWSLETTER,
            to: email,
            subject: "Bitte bestätigen Sie Ihre Newsletter-Anmeldung",
            html: `
                <h1>Newsletter-Anmeldung bestätigen</h1>
                <p>Vielen Dank für Ihr Interesse am Mieterstrom-Check Newsletter.</p>
                <p>Bitte bestätigen Sie Ihre Anmeldung mit einem Klick:</p>
                <p>
                    <a href="${confirmUrl}" style="display:inline-block;padding:12px 24px;background:#16a34a;color:#fff;border-radius:8px;text-decoration:none;font-weight:600;">
                        Anmeldung bestätigen
                    </a>
                </p>
                <p style="color:#64748b;font-size:13px;">
                    Falls der Button nicht funktioniert, kopieren Sie diesen Link: <br/>
                    <a href="${confirmUrl}">${confirmUrl}</a>
                </p>
                <p style="color:#64748b;font-size:13px;">
                    Der Link ist ${NEWSLETTER_TOKEN_TTL_HOURS} Stunden gültig. Wenn Sie diese Anmeldung nicht angefordert haben, ignorieren Sie diese E-Mail.
                </p>
            `,
        });
    } catch (err) {
        console.error("Newsletter Double-Opt-In Fehler:", err);
    }
}
