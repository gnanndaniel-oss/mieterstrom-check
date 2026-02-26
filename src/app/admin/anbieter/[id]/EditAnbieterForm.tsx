"use client";

import { useState } from "react";
import { updateAnbieter } from "@/app/actions/admin-actions";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { CheckCircle2, Save } from "lucide-react";

export function EditAnbieterForm({ anbieter }: { anbieter: any }) {
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    // Wir packen alle Felder ins FormData-Objekt.
    const [formData, setFormData] = useState({
        name: anbieter.name || "",
        slug: anbieter.slug || "",
        kurzBeschreibung: anbieter.kurzBeschreibung || "",
        beschreibung: anbieter.beschreibung || "",
        standort: anbieter.standort || "",
        website: anbieter.website || "",
        zielgruppe: anbieter.zielgruppe || "",

        // Leistungen
        planungKonzeption: anbieter.planungKonzeption || false,
        finanzierung: anbieter.finanzierung || false,
        installationPV: anbieter.installationPV || false,
        speicher: anbieter.speicher || false,
        abrechnungssoftware: anbieter.abrechnungssoftware || false,
        messkonzept: anbieter.messkonzept || false,
        wartungBetrieb: anbieter.wartungBetrieb || false,
        reststromversorgung: anbieter.reststromversorgung || false,
        mieterkommunikation: anbieter.mieterkommunikation || false,

        // Modelle
        modellMieterstrom: anbieter.modellMieterstrom || false,
        modellGGV: anbieter.modellGGV || false,
        modellContracting: anbieter.modellContracting || false,

        // Konditionen
        mindestWE: anbieter.mindestWE || 0,
        renditeMin: anbieter.renditeMin || 0,
        renditeMax: anbieter.renditeMax || 0,
        ersparnisMin: anbieter.ersparnisMin || 0,
        ersparnisMax: anbieter.ersparnisMax || 0,
        investitionDurch: anbieter.investitionDurch || "",
        regionen: anbieter.regionen || ""
    });

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : (type === 'number' ? Number(value) : value)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            await updateAnbieter(anbieter.id, formData);
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
            router.refresh();
        } catch (err) {
            alert("Fehler beim Speichern!");
        }
        setIsSaving(false);
    };

    const Checkbox = ({ name, label }: { name: keyof typeof formData, label: string }) => (
        <label className="flex items-center gap-3 cursor-pointer group">
            <input
                type="checkbox"
                name={name}
                checked={formData[name] as boolean}
                onChange={handleChange}
                className="w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
            />
            <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">{label}</span>
        </label>
    );

    const Input = ({ name, label, type = "text", textarea = false }: { name: keyof typeof formData, label: string, type?: string, textarea?: boolean }) => (
        <label className="flex flex-col gap-1.5 w-full">
            <span className="text-sm font-bold text-slate-700">{label}</span>
            {textarea ? (
                <textarea
                    name={name}
                    value={(formData[name] as string) || ""}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-slate-50 border-2 border-slate-200 p-3 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all text-sm font-medium text-slate-900"
                />
            ) : (
                <input
                    type={type}
                    name={name}
                    value={formData[name] as any}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border-2 border-slate-200 p-3 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all text-sm font-medium text-slate-900"
                />
            )}
        </label>
    );

    return (
        <form onSubmit={handleSubmit} className="space-y-12">

            {/* Stammdaten */}
            <div>
                <h3 className="text-lg font-bold border-b pb-2 mb-6">Stammdaten</h3>
                <div className="grid md:grid-cols-2 gap-6">
                    <Input name="name" label="Anbieter Name" />
                    <Input name="slug" label="Slug (URL-Pfad)" />
                    <Input name="website" label="Website URL" />
                    <Input name="zielgruppe" label="Zielgruppe (z.B. Kleine WEGs, B2B)" />
                    <div className="md:col-span-2">
                        <Input name="standort" label="Standorte / Firmensitz" />
                    </div>
                    <div className="md:col-span-2">
                        <Input name="kurzBeschreibung" label="Kurzbeschreibung (Teaser)" textarea={true} />
                    </div>
                    <div className="md:col-span-2">
                        <Input name="beschreibung" label="Detaillierte Beschreibung" textarea={true} />
                    </div>
                </div>
            </div>

            {/* Modelle */}
            <div>
                <h3 className="text-lg font-bold border-b pb-2 mb-6">Angebotene Modelle</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Checkbox name="modellMieterstrom" label="Echter Mieterstrom" />
                    <Checkbox name="modellGGV" label="Gebäudeversorgung (GGV)" />
                    <Checkbox name="modellContracting" label="PV-Contracting" />
                </div>
            </div>

            {/* Leistungen */}
            <div>
                <h3 className="text-lg font-bold border-b pb-2 mb-6">Module & Leistungen</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <Checkbox name="planungKonzeption" label="Planung & Konzeption" />
                    <Checkbox name="finanzierung" label="Finanzierung" />
                    <Checkbox name="installationPV" label="PV-Installation" />
                    <Checkbox name="speicher" label="Batteriespeicher" />
                    <Checkbox name="messkonzept" label="Messkonzeption (Zähler)" />
                    <Checkbox name="abrechnungssoftware" label="Abrechnungssoftware" />
                    <Checkbox name="wartungBetrieb" label="Wartung & Betrieb" />
                    <Checkbox name="reststromversorgung" label="Reststromlieferung" />
                    <Checkbox name="mieterkommunikation" label="Mieterkommunikation" />
                </div>
            </div>

            {/* Konditionen */}
            <div>
                <h3 className="text-lg font-bold border-b pb-2 mb-6">Konditionen & Rendite</h3>
                <div className="grid md:grid-cols-3 gap-6">
                    <Input name="mindestWE" label="Mindest-Wohneinheiten" type="number" />
                    <Input name="regionen" label="Regionen (e.g. bundesweit)" />
                    <label className="flex flex-col gap-1.5 w-full">
                        <span className="text-sm font-bold text-slate-700">Investition Durch</span>
                        <select
                            name="investitionDurch"
                            value={formData.investitionDurch}
                            onChange={handleChange}
                            className="w-full bg-slate-50 border-2 border-slate-200 p-3 rounded-xl focus:bg-white outline-none font-medium text-slate-900"
                        >
                            <option value="">Keine Angabe</option>
                            <option value="anbieter">Dienstleister / Anbieter</option>
                            <option value="eigentuemer">Eigentümer (Kauf)</option>
                            <option value="beide">Beide Modelle</option>
                        </select>
                    </label>

                    <Input name="renditeMin" label="Rendite Min (%)" type="number" />
                    <Input name="renditeMax" label="Rendite Max (%)" type="number" />
                    <div className="hidden md:block"></div>

                    <Input name="ersparnisMin" label="Mieter-Ersparnis Min (%)" type="number" />
                    <Input name="ersparnisMax" label="Mieter-Ersparnis Max (%)" type="number" />
                </div>
            </div>

            {/* Actions */}
            <div className="pt-6 border-t flex items-center justify-end gap-6">
                {saved && <span className="text-emerald-600 font-bold flex items-center gap-2"><CheckCircle2 className="w-5 h-5" /> Erfolgreich gespeichert!</span>}
                <Button type="submit" disabled={isSaving} className="bg-emerald-600 hover:bg-emerald-700 text-white h-12 px-8 rounded-xl font-bold shadow-lg shadow-emerald-600/20 text-base">
                    {isSaving ? "Wird gespeichert..." : <><Save className="w-5 h-5 mr-2" /> Änderungen speichern</>}
                </Button>
            </div>

        </form>
    );
}
