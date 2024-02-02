import React, { useEffect } from 'react'

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from '@/components/ui/button'
import Image from 'next/image'

interface StatsProps {
    open: boolean
    setOpen: (open: boolean) => void
    metadata: any
    Card: any
}

const Stats = ({ open, setOpen, metadata, Card }: StatsProps) => {

    const [stats, setStats] = React.useState<any>(null)

    useEffect(() => {
        fetch(`https://score.oval3.game/api/scoring/player/${Card.optaId}`)
            .then(res => res.json())
            .then(data => setStats(data))
            .catch(error => error)
    }, [Card.optaId])

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle className='flex flex-row items-center justify-between'>
                        <p>{`${Card.firstname} ${Card.lastname}`}</p>
                        <p>{`#${Card.tokenId}`}</p>
                    </DrawerTitle>
                    <DrawerDescription className='text-start'>{`${Card.season}`}</DrawerDescription>
                </DrawerHeader>
                <div className="flex flex-col items-center justify-around gap-2 px-4 mb-2 md:px-8 py-4 w-full">
                    <div className="grid grid-cols-3 md:grid-cols-6 items-start justify-around gap-2 w-full h-full mb-2 md:mb-8">
                        <div className="flex flex-col items-start md:items-center justify-center gap-1">
                            <p className="text-sm text-gray-500">Club</p>
                            <Image src={`https://marketplace.oval3.game/icons/clubs/${Card.club.clubCode}.png`} alt={"club logo"} width={40} height={40} />
                        </div>
                        <div className="flex flex-col items-start md:items-center justify-center gap-1">
                            <p className="text-sm text-gray-500">League</p>
                            <Image src={`https://marketplace.oval3.game/icons/leagues/${String(Card.competition).replace(" ", "")}.png`} alt={"competition logo"} width={40} height={40} />
                        </div>
                        <div className="flex flex-col items-start md:items-center justify-center gap-1">
                            <p className="text-sm text-gray-500">Position</p>
                            <p className="md:text-lg text-md font-bold">{Card.position}</p>
                        </div>
                        <div className="flex flex-col items-start md:items-center justify-center gap-1">
                            <p className="text-sm text-gray-500">Serial number</p>
                            <p className="md:text-lg text-md font-bold">{Card.edition}</p>
                        </div>
                        <div className="flex flex-col items-start md:items-center justify-center gap-1">
                            <p className="text-sm text-gray-500">Country</p>
                            <p className="md:text-lg text-md font-bold">{Card.nationality}</p>
                        </div>
                        <div className="flex flex-col items-start md:items-center justify-center gap-1">
                            <p className="text-sm text-gray-500">Rarity</p>
                            <p className="md:text-lg text-md font-bold">{Card.rarity}</p>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-start justify-between gap-1 w-full h-full ">
                        <div className="flex flex-col items-start justify-start gap-1 w-full h-full mb-2 md:mb-8 md:px-32">
                            <p className="text-xl font-semibold">Score</p>
                            <div className="grid grid-cols-3 items-start justify-start gap-2 w-full h-full">
                                <div className="flex flex-col items-start justify-start gap-0 w-full h-full">
                                    <p className="text-sm text-gray-500">Score</p>
                                    <p className="md:text-lg text-md font-bold">{Card.score}</p>
                                </div>
                                <div className="flex flex-col items-start justify-start gap-0 w-full h-full">
                                    <p className="text-sm text-gray-500">Impact</p>
                                    <p className="md:text-lg text-md font-bold">{stats.data.impact}</p>
                                </div>
                                <div className="flex flex-col items-start justify-start gap-0 w-full h-full">
                                    <p className="text-sm text-gray-500">Attack</p>
                                    <p className="md:text-lg text-md font-bold">{stats.data.attack}</p>
                                </div>
                                <div className="flex flex-col items-start justify-start gap-0 w-full h-full">
                                    <p className="text-sm text-gray-500">Defense</p>
                                    <p className="md:text-lg text-md font-bold">{stats.data.defense}</p>
                                </div>
                                <div className="flex flex-col items-start justify-start gap-0 w-full h-full">
                                    <p className="text-sm text-gray-500">Skills</p>
                                    <p className="md:text-lg text-md font-bold">{stats.data.skills}</p>
                                </div>
                                <div className="flex flex-col items-start justify-start gap-0 w-full h-full">
                                    <p className="text-sm text-gray-500">Strength</p>
                                    <p className="md:text-lg text-md font-bold">{stats.data.strength}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-start justify-start gap-1 w-full h-full md:px-32">
                            <p className="text-xl font-semibold">Stats</p>
                            <div className="grid grid-cols-3 items-start justify-start gap-2 w-full h-full">
                                <div className="flex flex-col items-start justify-start gap-0 w-full h-full">
                                    <p className="text-sm text-gray-500">Minutes played</p>
                                    <p className="md:text-lg text-md font-bold">{stats.data.minutes_played_total}</p>
                                </div>
                                <div className="flex flex-col items-start justify-start gap-0 w-full h-full">
                                    <p className="text-sm text-gray-500">Red cards</p>
                                    <p className="md:text-lg text-md font-bold">{stats.data.red_cards}</p>
                                </div>
                                <div className="flex flex-col items-start justify-start gap-0 w-full h-full">
                                    <p className="text-sm text-gray-500">Yellow cards</p>
                                    <p className="md:text-lg text-md font-bold">{stats.data.yellow_cards}</p>
                                </div>
                                <div className="flex flex-col items-start justify-start gap-0 w-full h-full">
                                    <p className="text-sm text-gray-500">Tries</p>
                                    <p className="md:text-lg text-md font-bold">{stats.data.tries}</p>
                                </div>
                                <div className="flex flex-col items-start justify-start gap-0 w-full h-full">
                                    <p className="text-sm text-gray-500">Appearances</p>
                                    <p className="md:text-lg text-md font-bold">{stats.data.appearances}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/**
                 * club 
                 * competition
                 * position
                 * edition
                 * nationality
                 * rarity
                 * 
                 * score
                 * stats de jeu
                 * dernier matchs      <---
                 * 
                 * BADGES              <---
                 * international
                 * academy
                 * kicker
                 */}
            </DrawerContent>
        </Drawer >
    )
}

export default Stats