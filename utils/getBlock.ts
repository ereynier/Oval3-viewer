"use server"

import { prisma } from "@/lib/prsima"

export const getBlock = async () => {
    const block = await prisma.blocks.findFirst()
    return block?.blockNumber
}