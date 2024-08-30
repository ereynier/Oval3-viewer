"use server"
import { prisma } from "@/lib/prsima"

export const getTotalNbCard = async () => {
    const total = await prisma.card.count()
    return total
}