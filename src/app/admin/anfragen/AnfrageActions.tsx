"use client";

import { useState } from "react";
import { deleteAnfrage } from "@/app/actions/admin-actions";
import { Trash2 } from "lucide-react";

export function AnfrageActions({ anfrageId }: { anfrageId: string }) {
    const [isDeleting, setIsDeleting] = useState(false);

    async function handleDelete() {
        if (confirm("Diese Anfrage wirklich löschen?")) {
            setIsDeleting(true);
            await deleteAnfrage(anfrageId);
        }
    }

    return (
        <button
            onClick={handleDelete}
            disabled={isDeleting}
            title="Löschen"
            className="p-1.5 bg-red-50 text-red-400 rounded hover:bg-red-100 hover:text-red-600"
        >
            <Trash2 className="w-4 h-4" />
        </button>
    );
}
