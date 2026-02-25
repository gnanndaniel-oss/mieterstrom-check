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
import { Loader2, CheckCircle2 } from "lucide-react";
import { submitLead } from "@/app/actions/submit-lead";

interface LeadModalProps {
    buttonText?: string;
    className?: string;
    variant?: "default" | "outline" | "secondary" | "ghost" | "link";
    anbieterId?: string;
    rechnerDaten?: any;
}

export function LeadModal({ buttonText = "Angebot anfordern", className, variant = "default", anbieterId, rechnerDaten }: LeadModalProps) {
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        if (anbieterId) formData.append("anbieterId", anbieterId);
        if (rechnerDaten) formData.append("rechnerDaten", JSON.stringify(rechnerDaten));

        const res = await submitLead(formData);
        setIsSubmitting(false);

        if (res?.success) {
            setIsSuccess(true);
            setTimeout(() => {
                setOpen(false);
                setIsSuccess(false);
            }, 3000); // Close after 3s
        } else {
            alert(res?.error || "Ein unerwarteter Fehler ist aufgetreten.");
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={variant} className={className}>
                    {buttonText}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                {!isSuccess ? (
                    <>
                        <DialogHeader>
                            <DialogTitle>Unverbindliches Angebot anfordern</DialogTitle>
                            <DialogDescription>
                                Hinterlassen Sie Ihre Kontaktdaten. Wir vernetzen Sie kostenlos mit den passenden Experten.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="vorname" className="text-sm font-medium">Vorname</label>
                                    <input id="vorname" name="vorname" required className="w-full border rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-green-500" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="nachname" className="text-sm font-medium">Nachname</label>
                                    <input id="nachname" name="nachname" required className="w-full border rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-green-500" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium">E-Mail Adresse</label>
                                <input id="email" name="email" type="email" required className="w-full border rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-green-500" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="telefon" className="text-sm font-medium">Telefon (Optional)</label>
                                    <input id="telefon" name="telefon" type="tel" className="w-full border rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-green-500" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="anzahlObjekte" className="text-sm font-medium">Anzahl WE</label>
                                    <select id="anzahlObjekte" name="anzahlObjekte" className="w-full border rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-green-500">
                                        <option value="1-5">1-5 Einheiten</option>
                                        <option value="6-20">6-20 Einheiten</option>
                                        <option value="20+">20+ Einheiten</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex items-start gap-2 pt-2">
                                <input type="checkbox" id="dsgvo" required className="mt-1" />
                                <label htmlFor="dsgvo" className="text-xs text-slate-500 leading-tight">
                                    Ich stimme der Datenschutzerklärung zu. Meine Daten werden ausschließlich zur Bearbeitung meiner Anfrage und zur Vermittlung gespeichert.
                                </label>
                            </div>

                            <div className="pt-4">
                                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 h-12" disabled={isSubmitting}>
                                    {isSubmitting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Jetzt anfragen"}
                                </Button>
                            </div>
                        </form>
                    </>
                ) : (
                    <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-2">
                            <CheckCircle2 className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900">Anfrage erfolgreich!</h3>
                        <p className="text-slate-500">
                            Vielen Dank für Ihr Interesse. Ein Experte wird sich in Kürze bei Ihnen melden.
                        </p>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
