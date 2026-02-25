import { ShieldCheck, Mail, Lock } from "lucide-react";

export const metadata = {
    title: "Datenschutzerklärung | mieterstrom-check.de",
    description: "Datenschutzerklärung der Gnann Verwaltung GmbH in Augsburg.",
};

export default function DatenschutzPage() {
    return (
        <div className="bg-slate-50 min-h-screen">
            <div className="bg-slate-900 py-16 text-white mb-12 border-b border-slate-800">
                <div className="container mx-auto px-4 max-w-3xl text-center">
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Lock className="w-8 h-8 text-green-400" />
                    </div>
                    <h1 className="text-4xl font-bold mb-4">Datenschutzerklärung</h1>
                    <p className="text-xl text-slate-300">Stand: Februar 2026</p>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-3xl pb-24 space-y-8">
                <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-8 text-slate-700 leading-relaxed">

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <ShieldCheck className="w-6 h-6 text-green-600" /> Verantwortliche Stelle
                        </h2>
                        <p className="mb-4">
                            Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
                        </p>
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                            <p className="font-bold text-slate-900 text-lg">Gnann Verwaltung GmbH</p>
                            <p>Römerweg 56</p>
                            <p>86391 Stadtbergen</p>
                            <p className="mt-4">Geschäftsführer: DV-Kfm. Daniel Gnann</p>
                            <p className="flex items-center gap-2 mt-4"><Mail className="w-4 h-4 text-slate-400" /> kontakt@gnann-holding.de</p>
                            <p>Telefon: 0821/419028-40</p>
                            <p>Telefax: 0821/419028-41</p>
                        </div>
                        <p className="text-sm text-slate-500 mt-4 italic">
                            Die verantwortliche Stelle entscheidet allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z.B. Namen, Kontaktdaten o. Ä.).
                        </p>
                    </section>

                    <hr className="border-slate-100" />

                    <section className="space-y-6">
                        <h2 className="text-2xl font-bold text-slate-900 border-l-4 border-green-500 pl-4 py-1">Allgemeine Rechte & Informationen</h2>

                        <div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Recht auf Auskunft, Berichtigung, Sperrung, Löschung</h3>
                            <p>
                                Sie haben jederzeit im Rahmen der geltenden gesetzlichen Bestimmungen das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, Herkunft der Daten, deren Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten. Diesbezüglich und auch zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit über die im Impressum aufgeführten Kontaktmöglichkeiten an uns wenden.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
                            <p>
                                Nur mit Ihrer ausdrücklichen Einwilligung sind einige Vorgänge der Datenverarbeitung möglich. Ein Widerruf Ihrer bereits erteilten Einwilligung ist jederzeit möglich. Für den Widerruf genügt eine formlose Mitteilung per E‑Mail. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Recht auf Datenübertragbarkeit</h3>
                            <p>
                                Ihnen steht das Recht zu, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an Dritte aushändigen zu lassen. Die Bereitstellung erfolgt in einem maschinenlesbaren Format. Sofern Sie die direkte Übertragung der Daten an einen anderen Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch machbar ist.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Recht auf Beschwerde bei der zuständigen Aufsichtsbehörde</h3>
                            <p>
                                Als Betroffener steht Ihnen im Falle eines datenschutzrechtlichen Verstoßes ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu. Zuständige Aufsichtsbehörde bezüglich datenschutzrechtlicher Fragen ist der Landesdatenschutzbeauftragte des Bundeslandes, in dem sich der Sitz unseres Unternehmens befindet. Ein Verzeichnis der Datenschutzbeauftragten sowie deren Kontaktdaten finden Sie im Internet (z.B. bfdi.bund.de).
                            </p>
                        </div>
                    </section>

                    <hr className="border-slate-100" />

                    <section className="space-y-6">
                        <h2 className="text-2xl font-bold text-slate-900 border-l-4 border-slate-300 pl-4 py-1">Sicherheit & Technik</h2>

                        <div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">SSL- bzw. TLS-Verschlüsselung</h3>
                            <p>
                                Aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, die Sie an uns als Seitenbetreiber senden, nutzt unsere Website eine SSL-bzw. TLS-Verschlüsselung. Damit sind Daten, die Sie über diese Website übermitteln, für Dritte nicht mitlesbar. Sie erkennen eine verschlüsselte Verbindung an der „https://“ Adresszeile Ihres Browsers und am Schloss-Symbol in der Browserzeile.
                            </p>
                        </div>

                        <div className="bg-slate-50 p-6 rounded-2xl">
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Datenschutzbeauftragter</h3>
                            <p>Wir haben einen Datenschutzbeauftragten bestellt.</p>
                            <div className="mt-3 text-sm">
                                <p className="font-semibold">DV-Kfm. Daniel Gnann</p>
                                <p>Gnann Verwaltung GmbH, Römerweg 56, 86391 Stadtbergen</p>
                                <p>E-Mail: kontakt@gnann-holding.de</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Nutzung von mieterstrom-checkspezifischen Daten</h3>
                            <p>
                                Sofern Sie unseren Rechner und die Anfrageformulare ("LeadModal" oder "Partner werden") nutzen, verarbeiten wir die von Ihnen eingegebenen Daten (Adresse, Kontaktdaten, Kenngrößen der Immobilie), um diese an Kooperationspartner (z.B. Mieterstrom-Dienstleister) weiterzuleiten, falls Sie dies aktiv mittels Opt-In bestätigen. Eine Weitergabe erfolgt stets transparent und im Sinne Ihrer Anfrage auf ein passgenaues Angebot. E-Mails können hierbei systembedingt über unseren Drittanbieter (z.B. Resend) verschlüsselt an uns gesendet werden.
                            </p>
                        </div>
                    </section>

                    <div className="text-sm text-slate-400 mt-12 pt-6 border-t border-slate-100 italic">
                        Quelle: Inhalte u.a. basierend auf Best-Practices und der Datenschutz-Erklärung der Gnann Gruppe.
                    </div>

                </div>
            </div>
        </div>
    );
}
