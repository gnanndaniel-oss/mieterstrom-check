"use client";

import { useState } from "react";
import { updateLeadStatus, deleteLead } from "@/app/actions/admin-actions";
import { Copy, Trash2, CheckCircle2 } from "lucide-react";

export function LeadActions({ lead }: { lead: any }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [statusMenuOpen, setStatusMenuOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const statuses = ["neu", "kontaktiert", "qualifiziert", "abgeschlossen", "aussortiert"];

    async function handleStatusChange(s: string) {
        setIsUpdating(true);
        setStatusMenuOpen(false);
        await updateLeadStatus(lead.id, s);
        setIsUpdating(false);
    }

    async function handleDelete() {
        if (confirm("Diesen Lead wirklich dauerhaft löschen?")) {
            setIsDeleting(true);
            await deleteLead(lead.id);
            // It will revalidate the page.
        }
    }

    function copyData() {
        if (lead.rechnerDaten) {
            navigator.clipboard.writeText(JSON.stringify(lead.rechnerDaten, null, 2));
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    }

    return (
        <div className="flex flex-col gap-2">
            <div className="relative">
                <button
                    disabled={isUpdating}
                    onClick={() => setStatusMenuOpen(!statusMenuOpen)}
                    className={`text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full min-w-[120px] text-left relative flex items-center justify-between ${isUpdating ? 'opacity-50' : ''} ${lead.status === 'neu' ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' :
                            lead.status === 'kontaktiert' ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' :
                                lead.status === 'qualifiziert' ? 'bg-purple-100 text-purple-700 hover:bg-purple-200' :
                                    lead.status === 'abgeschlossen' ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' :
                                        'bg-slate-200 text-slate-700 hover:bg-slate-300'
                        }`}
                >
                    {lead.status}
                    <span className="opacity-50 ml-2">▼</span>
                </button>
                {statusMenuOpen && (
                    <div className="absolute top-full mt-1 left-0 bg-white border border-slate-200 shadow-xl rounded-xl p-1 z-50 w-40 flex flex-col">
                        {statuses.map(s => (
                            <button
                                key={s}
                                onClick={() => handleStatusChange(s)}
                                className={`text-left px-3 py-2 text-xs font-bold uppercase rounded-lg transition-colors ${lead.status === s ? 'bg-slate-100' : 'hover:bg-slate-50'}`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex gap-2">
                {lead.rechnerDaten && (
                    <button
                        onClick={copyData}
                        title="Rechner-JSON kopieren"
                        className="p-1.5 bg-slate-100 text-slate-500 rounded hover:bg-slate-200 hover:text-slate-700"
                    >
                        {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                )}
                <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    title="Löschen"
                    className="p-1.5 bg-red-50 text-red-400 rounded hover:bg-red-100 hover:text-red-600 ml-auto"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
