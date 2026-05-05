# mieterstrom-check.de

Next.js 16 (App Router) + Prisma + Neon Postgres. Hosting auf Vercel, Mail über hostone (Plesk).

## Setup

```bash
npm install
cp .env.example .env   # Werte ausfüllen
npx prisma generate
npx prisma db push     # Schema auf die DB anwenden
npm run dev
```

## Formulare & E-Mail-Versand

Alle drei Formulare laufen über Server Actions (`src/app/actions/`):

| Formular | Action | Speichert in | Mail an |
|---|---|---|---|
| Lead-Modal | `submitLead` | `Lead` | `ADMIN_EMAIL` |
| PDF-Download | `submitLead` | `Lead` (Flag `isPdfDownload`) | `ADMIN_EMAIL` |
| Partner-Bewerbung | `submitProviderApplication` | `KontaktAnfrage` | `ADMIN_EMAIL` |

Newsletter läuft mit **Double-Opt-In**: Nach Anmeldung wird ein Bestätigungs-Token per Mail verschickt. Erst nach Klick auf den Link in `/newsletter/bestaetigen?token=…` wird `bestaetigt = true` und `aktiv = true`.

Spamschutz: jedes Formular hat ein verstecktes Honeypot-Feld `website_url`. Wird es gefüllt, antwortet die Action mit `success: true` ohne zu speichern oder zu mailen.

## Mail-Architektur

- **Versand**: nodemailer → SMTP an `mail.arfida.de:587` (STARTTLS, SASL-Auth) — verifizierte Absender unter `mieterstrom-check.de`
- **Empfang**: Postfach `admin@mieterstrom-check.de` auf hostone, Aliase `leads@/partner@/newsletter@` leiten dorthin weiter
- **Service-User für SMTP-Auth**: `noreply@mieterstrom-check.de`

## DNS-Records bei ns14.net

```
MX     @                    10 mail.arfida.de.
TXT    @                    v=spf1 mx -all
TXT    _dmarc               v=DMARC1; p=quarantine; rua=mailto:postmaster@arfida.de; fo=1; adkim=r; aspf=r
TXT    default._domainkey   v=DKIM1; k=rsa; p=<aus Plesk>
```

A-Record bleibt unverändert (zeigt auf Vercel).

## Vercel Environment Variables

Im Vercel-Projekt unter **Settings → Environment Variables** alle Werte aus `.env.example` setzen. Insbesondere:

- `SMTP_HOST=mail.arfida.de`
- `SMTP_PORT=587`
- `SMTP_USER=noreply@mieterstrom-check.de`
- `SMTP_PASS=<Passwort>`
- `ADMIN_EMAIL=admin@mieterstrom-check.de`
- `MAIL_FROM_LEADS / _PARTNER / _NEWSLETTER`
- `NEXT_PUBLIC_SITE_URL=https://mieterstrom-check.de` (sonst zeigt der Newsletter-Bestätigungslink auf localhost)

## Datenmodell

Siehe `prisma/schema.prisma`. Wichtigste Modelle: `Anbieter`, `Lead`, `KontaktAnfrage`, `NewsletterAbonnent`, `BlogPost`.

## Deploy

Auf jedes Push auf `main` deployt Vercel automatisch. Vor dem ersten Deploy nach Schema-Änderungen:

```bash
npx prisma db push
```
