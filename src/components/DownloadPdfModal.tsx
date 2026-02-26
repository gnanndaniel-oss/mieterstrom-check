"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, CheckCircle2, FileText, Download } from "lucide-react";
import Link from "next/link";
import { submitLead } from "@/app/actions/submit-lead";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

interface DownloadPdfModalProps {
    rechnerDaten: any;
    className?: string;
}

export function DownloadPdfModal({ rechnerDaten, className }: DownloadPdfModalProps) {
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const generatePdfAndDownload = () => {
        const doc = new jsPDF();

        doc.setFontSize(20);
        doc.setTextColor(15, 23, 42); // slate-900
        doc.text("Mieterstrom-Wirtschaftlichkeitsanalyse", 14, 22);

        doc.setFontSize(12);
        doc.setTextColor(100, 116, 139); // slate-500
        doc.text("Erstellt mit mieterstrom-check.de", 14, 30);

        doc.setFontSize(14);
        doc.setTextColor(15, 23, 42);
        doc.text("Ihre Eingabedaten", 14, 45);

        autoTable(doc, {
            startY: 50,
            head: [['Gebäudedaten', 'Wert']],
            body: [
                ['Gebäudetyp', rechnerDaten.typ === 'bestand' ? 'Bestandsgebäude' : 'Neubau'],
                ['Wohneinheiten (WE)', `${rechnerDaten.we} WE`],
                ['Wohnfläche pro Einheit', `${rechnerDaten.flaeche} m²`],
                ['Dachfläche', `${rechnerDaten.dachflaeche} m²`],
                ['Postleitzahl', rechnerDaten.plz || 'Nicht angegeben'],
            ],
            theme: 'grid',
            headStyles: { fillColor: [15, 23, 42] }
        });

        const finalY1 = (doc as any).lastAutoTable.finalY + 15;

        doc.text("Verbrauchs- & Technikdaten", 14, finalY1);

        autoTable(doc, {
            startY: finalY1 + 5,
            head: [['Parameter', 'Wert']],
            body: [
                ['Verbrauch pro WE', `${rechnerDaten.verbrauchWe} kWh/Jahr`],
                ['Allgemeinstrom', `${rechnerDaten.allgemeinstrom} kWh/Jahr`],
                ['Aktueller Strompreis', `${rechnerDaten.strompreis} ct/kWh`],
                ['Wärmepumpe', rechnerDaten.waermepumpe ? 'Ja' : 'Nein'],
                ['Wallboxen', `${rechnerDaten.wallboxen}`],
                ['Batteriespeicher', rechnerDaten.speicher ? `Ja (${rechnerDaten.speicherKwh} kWh)` : 'Nein'],
                ['Investitionsmodell', rechnerDaten.investition === 'anbieter' ? 'Contracting (Dienstleister)' : 'Eigentümer'],
            ],
            theme: 'grid',
            headStyles: { fillColor: [15, 23, 42] }
        });

        const finalY2 = (doc as any).lastAutoTable.finalY + 20;

        // Simulate calculation summary in PDF (very simplified version of the logic in page.tsx)
        const anlagenLeistung_kWp = rechnerDaten.dachflaeche * 0.15;
        const jahresertrag_kWh = anlagenLeistung_kWp * 950;

        doc.setFontSize(16);
        doc.setTextColor(22, 163, 74); // green-600
        doc.text("Vorläufige Ergebniszusammenfassung", 14, finalY2);

        autoTable(doc, {
            startY: finalY2 + 5,
            head: [['Kennzahl', 'Geschätzter Wert']],
            body: [
                ['Empfohlene PV-Leistung', `${anlagenLeistung_kWp.toFixed(1)} kWp`],
                ['Erwarteter Jahresertrag', `${Math.round(jahresertrag_kWh).toLocaleString('de-DE')} kWh`],
            ],
            theme: 'plain',
            bodyStyles: { fontSize: 12, fontStyle: 'bold' }
        });

        doc.setFontSize(10);
        doc.setTextColor(100, 116, 139);
        doc.text("Hinweis: Diese Berechnung stellt ein Indikativ dar und ersetzt kein fachmännisches Angebot.", 14, 280);

        doc.save("Mieterstrom_Analyse_mieterstrom-check.pdf");
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        // Add rechnerDaten as JSON payload for lead submission
        formData.append("rechnerDaten", JSON.stringify(rechnerDaten));
        formData.append("isPdfDownload", "true");

        try {
            const res = await submitLead(formData);

            if (res?.success) {
                // Fire GA4 Event if GA4 is active
                if (typeof window !== 'undefined' && (window as any).gtag) {
                    (window as any).gtag('event', 'generate_lead', {
                        method: 'rechner_pdf',
                        value: rechnerDaten.we,
                        currency: 'EUR'
                    });
                }

                setIsSuccess(true);
                generatePdfAndDownload();

                setTimeout(() => {
                    setOpen(false);
                    setIsSuccess(false);
                }, 4000);
            } else {
                alert(res?.error || "Ein unerwarteter Fehler ist aufgetreten.");
            }
        } catch (error) {
            console.error(error);
            alert("Ein Fehler ist aufgetreten.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className={`gap-2 ${className}`}>
                    <FileText className="w-4 h-4" /> Detaillierten Bericht als PDF herunterladen
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                {!isSuccess ? (
                    <>
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                                <Download className="w-5 h-5 text-green-600" /> PDF Analyse herunterladen
                            </DialogTitle>
                            <DialogDescription>
                                Geben Sie Ihre E-Mail Adresse ein, um die detaillierte Berechnung als PDF herunterzuladen.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                            <div className="space-y-2">
                                <label htmlFor="pdfEmail" className="text-sm font-medium">E-Mail Adresse *</label>
                                <input id="pdfEmail" name="email" type="email" required className="w-full border rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-green-500" placeholder="max@muster.de" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="pdfVorname" className="text-sm font-medium">Name (Optional)</label>
                                    <input id="pdfVorname" name="vorname" className="w-full border rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-green-500" placeholder="Max Mustermann" />
                                    {/* Defaulting everything to vorname effectively if they only give one name field, backend will handle or we just pass it */}
                                    <input type="hidden" name="nachname" value="-" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="pdfFirma" className="text-sm font-medium">Firma (Optional)</label>
                                    <input id="pdfFirma" name="firma" className="w-full border rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-green-500" placeholder="WEG / GmbH" />
                                </div>
                            </div>

                            <div className="space-y-3 pt-2">
                                <div className="flex items-start gap-2">
                                    <input type="checkbox" id="dsgvoPdf" required className="mt-1" />
                                    <label htmlFor="dsgvoPdf" className="text-xs text-slate-500 leading-tight">
                                        Ich stimme der <Link href="/datenschutz" className="underline hover:text-green-600" target="_blank">Datenschutzerklärung</Link> zu. *
                                    </label>
                                </div>
                                <div className="flex items-start gap-2">
                                    <input type="checkbox" id="newsletterPdf" name="newsletter" value="true" className="mt-1" />
                                    <label htmlFor="newsletterPdf" className="text-xs text-slate-500 leading-tight">
                                        Ja, ich möchte regelmäßig Updates zu Förderungen und Mieterstrom-Modellen erhalten. (Optional)
                                    </label>
                                </div>
                            </div>

                            <div className="pt-4">
                                <Button type="submit" className="w-full bg-slate-900 border text-white hover:bg-slate-800 h-12" disabled={isSubmitting}>
                                    {isSubmitting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "PDF generieren & herunterladen"}
                                </Button>
                            </div>
                        </form>
                    </>
                ) : (
                    <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-2">
                            <CheckCircle2 className="w-8 h-8 animate-bounce" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900">PDF wird heruntergeladen!</h3>
                        <p className="text-slate-500">
                            Ihre Analyse wurde erfolgreich generiert und der Download startet automatisch.
                        </p>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
