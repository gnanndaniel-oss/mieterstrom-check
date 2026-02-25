import { ShieldCheck, Scale, Mail, MapPin, Building2 } from "lucide-react";

export const metadata = {
    title: "Impressum | mieterstrom-check.de",
    description: "Impressum der Gnann Verwaltung GmbH in Augsburg.",
};

export default function ImpressumPage() {
    return (
        <div className="bg-slate-50 min-h-screen">
            <div className="bg-slate-900 py-16 text-white mb-12 border-b border-slate-800">
                <div className="container mx-auto px-4 max-w-3xl text-center">
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Scale className="w-8 h-8 text-green-400" />
                    </div>
                    <h1 className="text-4xl font-bold mb-4">Impressum</h1>
                    <p className="text-xl text-slate-300">Angaben gemäß § 5 DDG</p>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-3xl pb-24 space-y-8">
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-4">
                            <Building2 className="w-6 h-6 text-slate-400" /> Kontaktadresse
                        </h2>
                        <div className="text-slate-600 leading-relaxed grid sm:grid-cols-2 gap-4">
                            <div>
                                <p className="font-bold text-slate-900">Gnann Verwaltung GmbH</p>
                                <p>Römerweg 56</p>
                                <p>86391 Stadtbergen</p>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <p className="flex items-center gap-2 mb-2"><Mail className="w-4 h-4 text-slate-400" /> kontakt@gnann-holding.de</p>
                                <p>Telefon: 0821/419028-40</p>
                                <p>Telefax: 0821/419028-41</p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">Vertretung</h2>
                        <p className="text-slate-600">Geschäftsführer: DV-Kfm. Daniel Gnann</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">Registereintrag</h2>
                        <p className="text-slate-600">
                            Umsatzsteuer-ID-Nummer: DE276095758<br />
                            Registergericht: Amtsgericht Augsburg – HRB 25918
                        </p>
                    </section>

                    <section className="pt-6 border-t border-slate-100">
                        <h2 className="text-xl font-bold text-slate-900 mb-3">Zuständige Kammer</h2>
                        <p className="text-slate-600 leading-relaxed">
                            Industrie- und Handelskammer für Augsburg und Schwaben<br />
                            Stettenstraße 1+3, 86150 Augsburg<br />
                            Tel: +49 821 3162 0<br />
                            Fax: +49 821 3162 323<br />
                            info@augsburg.ihk.de
                        </p>
                        <p className="mt-4 text-sm text-slate-500">Berufsrechtliche Regelungen: Zu finden unter www.ihk-augsburg.de</p>
                    </section>

                    <section className="pt-6 border-t border-slate-100">
                        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-3">
                            <ShieldCheck className="w-5 h-5 text-slate-400" /> Haftungsausschluss & Gewähr
                        </h2>
                        <p className="text-slate-600 text-sm leading-relaxed space-y-4">
                            <span className="block mb-2">Die Autoren und Herausgeber übernehmen keine Gewähr und Haftung für die Richtigkeit, Zuverlässigkeit, Vollständigkeit und Aktualität der Information.</span>
                            <span className="block mb-2">Die Gnann GmbH haftet nicht für Inhalte, die von den Anwendern im Zusammenhang mit dem Download und der Installation dieser Seite erstellt werden, bzw. für vorhandene Inhalte, die nach dem Download von den Anwendern verändert werden. Die Gnann Verwaltung GmbH haftet auch nicht für den Inhalt anderer Websites, auf die mittels Hyperlink verwiesen wird.</span>
                            <span className="block">Die Verwendung der Website und der darin enthaltenen Informationen erfolgt auf eigene Gefahr. Änderungen können jederzeit vorgenommen werden. Jeglicher Verkauf oder anderweitiger kommerzieller Vertrieb dieser Seite ist ausdrücklich untersagt.</span>
                        </p>
                    </section>

                </div>
            </div>
        </div>
    );
}
