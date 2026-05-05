import nodemailer from "nodemailer";

const SMTP_HOST = process.env.SMTP_HOST || "mail.arfida.de";
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;

const transporter =
    SMTP_USER && SMTP_PASS
        ? nodemailer.createTransport({
              host: SMTP_HOST,
              port: SMTP_PORT,
              secure: SMTP_PORT === 465,
              auth: { user: SMTP_USER, pass: SMTP_PASS },
          })
        : null;

export const MAIL_FROM_LEADS =
    process.env.MAIL_FROM_LEADS || "Mieterstrom-Check <leads@mieterstrom-check.de>";
export const MAIL_FROM_PARTNER =
    process.env.MAIL_FROM_PARTNER || "Mieterstrom-Check <partner@mieterstrom-check.de>";
export const MAIL_FROM_NEWSLETTER =
    process.env.MAIL_FROM_NEWSLETTER || "Mieterstrom-Check <newsletter@mieterstrom-check.de>";

export function getAdminEmail(): string {
    const adminEmail = process.env.ADMIN_EMAIL;
    if (!adminEmail) {
        throw new Error("ADMIN_EMAIL is not configured");
    }
    return adminEmail;
}

export function getSiteUrl(): string {
    return process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";
}

type SendArgs = {
    from: string;
    to: string | string[];
    subject: string;
    html: string;
    replyTo?: string;
};

export async function sendMail(args: SendArgs): Promise<{ ok: boolean; error?: unknown }> {
    if (!transporter) {
        console.warn("[mail] SMTP credentials missing — skipping send", { subject: args.subject });
        return { ok: false, error: "SMTP credentials missing" };
    }
    try {
        await transporter.sendMail({
            from: args.from,
            to: Array.isArray(args.to) ? args.to.join(", ") : args.to,
            subject: args.subject,
            html: args.html,
            replyTo: args.replyTo,
        });
        return { ok: true };
    } catch (error) {
        console.error("[mail] send failed", { subject: args.subject, error });
        return { ok: false, error };
    }
}

export function escapeHtml(input: string | null | undefined): string {
    if (!input) return "";
    return input
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
