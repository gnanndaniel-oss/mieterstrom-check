"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function SortSelect() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentSort = searchParams.get('sort') || 'relevanz';

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('sort', e.target.value);
        router.push(`/vergleich?${params.toString()}`);
    };

    return (
        <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-slate-700">Sortieren nach:</span>
            <select
                value={currentSort}
                onChange={handleSortChange}
                className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
            >
                <option value="relevanz">Relevanz</option>
                <option value="bewertung">Bewertung</option>
                <option value="rendite">Rendite</option>
                <option value="mindestWE">Mindest-WE</option>
                <option value="name">Name (A-Z)</option>
            </select>
        </div>
    );
}
