import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ArrowLeft, Edit } from "lucide-react";
import Link from "next/link";
import { EditAnbieterForm } from "./EditAnbieterForm";

export const dynamic = 'force-dynamic';

export default async function EditAnbieterPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const anbieter = await prisma.anbieter.findUnique({
        where: { id }
    });

    if (!anbieter) {
        notFound();
    }

    return (
        <div className="p-8">
            <Link href="/admin/anbieter" className="inline-flex items-center text-slate-500 hover:text-slate-800 font-medium mb-6 text-sm transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" /> Zurück zur Übersicht
            </Link>

            <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center">
                    <Edit className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">{anbieter.name} bearbeiten</h1>
                    <p className="text-slate-500 text-sm">Passen Sie die Profil-Daten und Merkmale des Anbieters an</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <EditAnbieterForm anbieter={anbieter} />
            </div>
        </div>
    );
}
