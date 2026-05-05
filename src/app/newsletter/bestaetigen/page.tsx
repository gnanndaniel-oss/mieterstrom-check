import Link from "next/link";
import { CheckCircle2, XCircle } from "lucide-react";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

type SearchParams = Promise<{ token?: string }>;

export default async function NewsletterBestaetigenPage({
    searchParams,
}: {
    searchParams: SearchParams;
}) {
    const { token } = await searchParams;

    const result = await confirmToken(token);

    return (
        <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 px-4 py-16">
            <div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl p-10 text-center shadow-sm">
                {result.ok ? (
                    <>
                        <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-6">
                            <CheckCircle2 className="w-9 h-9" />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900 mb-2">Anmeldung bestätigt</h1>
                        <p className="text-slate-600 leading-relaxed">
                            Vielen Dank! Ihre Newsletter-Anmeldung für{" "}
                            <span className="font-medium">{result.email}</span> ist jetzt aktiv.
                        </p>
                    </>
                ) : (
                    <>
                        <div className="w-16 h-16 mx-auto rounded-full bg-red-100 flex items-center justify-center text-red-600 mb-6">
                            <XCircle className="w-9 h-9" />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900 mb-2">Bestätigung fehlgeschlagen</h1>
                        <p className="text-slate-600 leading-relaxed">{result.message}</p>
                    </>
                )}
                <Link
                    href="/"
                    className="inline-block mt-8 px-6 py-3 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800"
                >
                    Zurück zur Startseite
                </Link>
            </div>
        </div>
    );
}

async function confirmToken(
    token: string | undefined,
): Promise<{ ok: true; email: string } | { ok: false; message: string }> {
    if (!token) {
        return { ok: false, message: "Kein Bestätigungs-Token übergeben." };
    }

    const abonnent = await prisma.newsletterAbonnent.findUnique({
        where: { bestaetigToken: token },
    });

    if (!abonnent) {
        return { ok: false, message: "Der Bestätigungs-Link ist ungültig oder wurde bereits verwendet." };
    }

    if (abonnent.bestaetigt) {
        return { ok: true, email: abonnent.email };
    }

    if (abonnent.tokenAblauf && abonnent.tokenAblauf < new Date()) {
        return {
            ok: false,
            message: "Der Bestätigungs-Link ist abgelaufen. Bitte melden Sie sich erneut an.",
        };
    }

    await prisma.newsletterAbonnent.update({
        where: { id: abonnent.id },
        data: {
            bestaetigt: true,
            bestaetigtAm: new Date(),
            aktiv: true,
            bestaetigToken: null,
            tokenAblauf: null,
        },
    });

    return { ok: true, email: abonnent.email };
}
