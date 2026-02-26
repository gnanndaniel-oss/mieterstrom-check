"use client";

import { useState } from "react";
import { toggleAnbieterPublish } from "@/app/actions/admin-actions";
import { Copy, Database, Check, Edit } from "lucide-react";
import Link from "next/link";

export function AnbieterActions({ anbieter }: { anbieter: any }) {
    const [isUpdating, setIsUpdating] = useState(false);
    const [copied, setCopied] = useState(false);

    async function handleToggle() {
        setIsUpdating(true);
        await toggleAnbieterPublish(anbieter.id, !anbieter.veroeffentlicht);
        setIsUpdating(false);
    }

    function copyData() {
        navigator.clipboard.writeText(JSON.stringify(anbieter, null, 2));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    return (
        <div className="flex flex-col items-end gap-2">
            <button
                onClick={handleToggle}
                disabled={isUpdating}
                className={`text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full relative flex items-center justify-center transition-colors mb-2 w-full ${isUpdating ? 'opacity-50' : ''} ${anbieter.veroeffentlicht
                    ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                    }`}
            >
                {anbieter.veroeffentlicht ? "Sichtbar" : "Verborgen"}
            </button>

            <div className="flex gap-2 justify-end w-full">
                <Link
                    href={`/admin/anbieter/${anbieter.id}`}
                    className="p-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
                    title="Bearbeiten"
                >
                    <Edit className="w-4 h-4" />
                </Link>

                <button
                    onClick={copyData}
                    title="JSON kopieren"
                    className="p-1.5 bg-slate-100 text-slate-500 rounded hover:bg-slate-200 hover:text-slate-700 mt-2"
                >
                    {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
            </div>
        </div>
    );
}
