"use server"

import { prisma } from "@/lib/prsima"

export const searchPlayer = async (name: string) => {
    const players = await prisma.card.findMany({
        where: {
            name: {
                contains: name,
                mode: 'insensitive'
            }
        },
        take: 8,
        distinct: ['name']
    })
    // console.log(JSON.stringify(players))
    return JSON.parse(JSON.stringify(players))
}