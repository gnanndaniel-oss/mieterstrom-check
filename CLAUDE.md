# mieterstrom-check.de — Claude-Hinweise

Next.js 16 (App Router) + Prisma + Neon Postgres auf Vercel. Deutsche B2B-Lead-Gen-Plattform für Mieterstrom / Gebäudeversorgung (PV in Mehrfamilienhäusern).

## Commands

```bash
npm run dev       # Dev-Server auf :3000
npm run build     # Production-Build (Vercel macht das auch automatisch)
npm run lint      # ESLint
npx tsc --noEmit  # Type-Check (kein Test-Suite)
npx prisma generate
npx prisma db push   # Schema gegen Neon syncen (bei Schema-Änderungen)
```

Kein Test-Framework. Bei Schema-Änderungen vor dem Deploy `prisma db push` ausführen.

## Architektur-Konventionen

- **Formulare laufen über Server Actions**, nicht über `/api`-Routen. Siehe `src/app/actions/`.
- **Mail-Versand**: nodemailer → SMTP an `mail.arfida.de:587` (hostone/Plesk). Zentrales Modul `src/lib/mail.ts` mit `sendMail()`. Niemals direkt `nodemailer.createTransport()` in Routen verwenden.
- **Empfänger** für Admin-Mails: `getAdminEmail()` aus `src/lib/mail.ts` (wirft Fehler wenn `ADMIN_EMAIL` env fehlt). Kann mehrere Adressen komma-getrennt sein.
- **HTML in Mails escapen**: `escapeHtml()` aus `src/lib/mail.ts` für jeden User-Input.
- **Spamschutz**: jedes neue Formular braucht das versteckte Honeypot-Feld `<input name="website_url">` und serverseitige Prüfung.
- **Newsletter ist Double-Opt-In**: kein direktes `aktiv: true` setzen — neuer Code muss den Token-Flow in `submit-lead.ts` analog umsetzen.

## SEO

- Helper: `src/lib/seo.ts` (`pageMetadata()`) und `src/lib/structured-data.ts` (Schema.org JSON-LD).
- Jede neue Route exportiert `metadata` (statisch) oder `generateMetadata` (dynamisch). Bei Client-Components → zusätzliche `layout.tsx` mit `metadata`.
- Kanonische Domain ist `https://www.mieterstrom-check.de` (Vercel redirected non-www → www). `SITE_URL`-Konstante hardcoded in `src/lib/seo.ts` — nicht aus env lesen.
- `sitemap.ts` ist dynamisch (Prisma) — neue dynamische Routen dort ergänzen.

## Git-Workflow

- `main` ist **branch-protected**, kein Direkt-Push.
- Pattern: `feat|fix|docs|chore/<topic>` → PR → Vercel-Preview grün → `gh pr merge <id> --squash --delete-branch`.
- Commit-Messages: Conventional Commits (`feat(scope): …`, `fix(scope): …`).

## Was NICHT tun

- Keine Resend-Imports (wurde 2026-05 rausgeworfen, alles läuft über hostone-SMTP).
- Kein `localhost`/`mieterstrom-check.de` (non-www) hardcoden — `SITE_URL` benutzen.
- Keine Server-Action ohne Honeypot.
- Keine destruktiven Prisma-Calls ohne explizite User-Freigabe.

## Externe Systeme

- **Vercel**: Project `prj_fxmD3Dad72R4fzi2UguFjRmCylPn`, Team `team_9R5VGMDdhBA6MQ7T0qzHz23C`. Env-Vars via Dashboard oder API.
- **Neon**: DB via Vercel-Integration, Connection-Strings sind automatisch in den Env-Vars.
- **hostone**: Mailserver (Plesk). SSH-Alias `verdagen`. Postfächer für `mieterstrom-check.de` (admin@, noreply@, leads@/partner@/newsletter@ als Forwarder).
- **DNS**: ns14.net (InternetX). Lehnt lange TXT-Records mit Semikolons teils ab — DKIM-Eintrag noch offen (Stand 2026-05).

## Datenmodell

Siehe `prisma/schema.prisma`. Kern-Modelle: `Anbieter`, `Lead`, `KontaktAnfrage`, `NewsletterAbonnent`, `BlogPost`. Admin-Bereich unter `/admin` (NextAuth).
