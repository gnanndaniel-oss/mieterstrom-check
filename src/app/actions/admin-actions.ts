"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateLeadStatus(id: string, status: string) {
    await prisma.lead.update({
        where: { id },
        data: { status }
    });
    revalidatePath("/admin/leads");
    revalidatePath("/admin");
}

export async function deleteLead(id: string) {
    await prisma.lead.delete({
        where: { id }
    });
    revalidatePath("/admin/leads");
    revalidatePath("/admin");
}

export async function toggleAnbieterPublish(id: string, veroeffentlicht: boolean) {
    await prisma.anbieter.update({
        where: { id },
        data: { veroeffentlicht }
    });
    revalidatePath("/admin/anbieter");
    revalidatePath("/vergleich");
}

export async function deleteAnfrage(id: string) {
    await prisma.kontaktAnfrage.delete({
        where: { id }
    });
    revalidatePath("/admin/anfragen");
}

export async function updateAnbieter(id: string, data: any) {
    await prisma.anbieter.update({
        where: { id },
        data: {
            ...data
        }
    });
    revalidatePath("/admin/anbieter");
    revalidatePath("/admin/anbieter/" + id);
    revalidatePath("/vergleich");
    revalidatePath("/anbieter/" + data.slug || "");
}
