// Display the stats of a card in a drawer
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
import Image from 'next/image'
import { Skeleton } from '@/components/ui/skeleton'


interface StatsProps {
    open: boolean
    setOpen: (open: boolean) => void
    card: any
}

const Stats = ({ open, setOpen, card }: StatsProps) => {


    const formatDate = (date: string) => {
        const d = new Date(date)
        // ex Dec 08
        return d.toLocaleString('en-US', { month: 'short', day: '2-digit' })
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle className='flex flex-row items-center justify-between'>
                        <p>{`${card.name}`}</p>
                        <p>{`#${card.tokenId}`}</p>
                    </DrawerTitle>
                    <DrawerDescription className='text-start'>{`${card.season}`}</DrawerDescription>
                </DrawerHeader>
                <div className='h-max w-full overflow-scroll'>
                    <div className="flex flex-col items-center justify-around gap-2 px-4 mb-2 md:px-8 py-4 h-fit w-full">
                        <div className="grid grid-cols-3 md:grid-cols-6 items-start justify-around gap-2 w-full h-full mb-2 md:mb-8">
                            <div className="flex flex-col items-start md:items-center justify-center gap-1">
                                <p className="text-sm text-muted-foreground">Club</p>
                                <Image title={card.clubName} src={`https://marketplace.oval3.game/icons/clubs/${card.clubCode}.png`} alt={"club logo"} width={40} height={40} className={`${(card.clubCode.includes("0031-ASBH") || card.clubCode.includes("0005-SUA") || card.clubCode.includes("0018-Provence-Rugby")) ? "bg-gray-800 dark:bg-background rounded-md" : ""}`} />
                            </div>
                            <div className="flex flex-col items-start md:items-center justify-center gap-1">
                                <p className="text-sm text-muted-foreground">League</p>
                                <Image title={card.competition} src={`https://marketplace.oval3.game/icons/leagues/${String(card.competition).replace(" ", "")}.png`} alt={"competition logo"} width={40} height={40} />
                            </div>
                            <div className="flex flex-col items-start md:items-center justify-center gap-1">
                                <p className="text-sm text-muted-foreground">Position</p>
                                <p className="md:text-lg text-md font-bold">{card.position}</p>
                            </div>
                            <div className="flex flex-col items-start md:items-center justify-center gap-1">
                                <p className="text-sm text-muted-foreground">Serial number</p>
                                <p className="md:text-lg text-md font-bold">{card.serial_Number} / {card.max_serial_Number}</p>
                            </div>
                            <div className="flex flex-col items-start md:items-center justify-center gap-1">
                                <p className="text-sm text-muted-foreground">Country</p>
                                <p className="md:text-lg text-md font-bold">{card.nationality}</p>
                            </div>
                            <div className="flex flex-col items-start md:items-center justify-center gap-1">
                                <p className="text-sm text-muted-foreground">Rarity</p>
                                <p className="md:text-lg text-md font-bold">{card.rarity}</p>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row items-start justify-between gap-1 w-full h-full ">
                            <div className="flex flex-col items-start justify-start gap-1 w-full h-full mb-2 md:mb-8 md:px-4 lg:px-16 xl:px-32">
                                <p className="text-xl font-semibold">Score</p>
                                <div className="grid grid-cols-3 items-start justify-start gap-2 w-full h-full">
                                    <div className="flex flex-col items-start justify-start gap-0 w-full h-full">
                                        <p className="text-sm text-muted-foreground">Score</p>
                                        <p className="md:text-lg text-md font-bold">{card.player.scoring}</p>
                                    </div>
                                    <div className="flex flex-col items-start justify-start gap-0 w-full h-full">
                                        <p className="text-sm text-muted-foreground">Impact</p>
                                        {card.player && <p className="md:text-lg text-md font-bold">{Number(card.player?.impact).toFixed(0)}</p>}
                                        {!card.player && <Skeleton className="w-[100px] h-[20px] rounded-full" />}
                                    </div>
                                    <div className="flex flex-col items-start justify-start gap-0 w-full h-full">
                                        <p className="text-sm text-muted-foreground">Attack</p>
                                        <p className="md:text-lg text-md font-bold">{Number(card.player?.attack).toFixed(0)}</p>
                                    </div>
                                    <div className="flex flex-col items-start justify-start gap-0 w-full h-full">
                                        <p className="text-sm text-muted-foreground">Defense</p>
                                        <p className="md:text-lg text-md font-bold">{Number(card.player?.defense).toFixed(0)}</p>
                                    </div>
                                    <div className="flex flex-col items-start justify-start gap-0 w-full h-full">
                                        <p className="text-sm text-muted-foreground">Skills</p>
                                        <p className="md:text-lg text-md font-bold">{Number(card.player?.skills).toFixed(0)}</p>
                                    </div>
                                    <div className="flex flex-col items-start justify-start gap-0 w-full h-full">
                                        <p className="text-sm text-muted-foreground">Strength</p>
                                        <p className="md:text-lg text-md font-bold">{Number(card.player?.strength).toFixed(0)}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-start justify-start gap-1 w-full h-full md:px-4 lg:px-16 xl:px-32">
                                <p className="text-xl font-semibold">Stats</p>
                                <div className="grid grid-cols-3 items-start justify-start gap-2 w-full h-full">
                                    <div className="flex flex-col items-start justify-start gap-0 w-full h-full">
                                        <p className="text-sm text-muted-foreground">Minutes played</p>
                                        <p className="md:text-lg text-md font-bold">{Number(card.player?.minutes_played_total).toFixed(0) || 0}</p>
                                    </div>
                                    <div className="flex flex-col items-start justify-start gap-0 w-full h-full">
                                        <p className="text-sm text-muted-foreground">Yellow cards</p>
                                        <p className="md:text-lg text-md font-bold">{card.player?.yellow_cards || 0}</p>
                                    </div>
                                    <div className="flex flex-col items-start justify-start gap-0 w-full h-full">
                                        <p className="text-sm text-muted-foreground">Red cards</p>
                                        <p className="md:text-lg text-md font-bold">{card.player?.red_cards || 0}</p>
                                    </div>
                                    <div className="flex flex-col items-start justify-start gap-0 w-full h-full">
                                        <p className="text-sm text-muted-foreground">Tries</p>
                                        <p className="md:text-lg text-md font-bold">{card.player?.tries || 0}</p>
                                    </div>
                                    <div className="flex flex-col items-start justify-start gap-0 w-full h-full">
                                        <p className="text-sm text-muted-foreground">Appearances</p>
                                        <p className="md:text-lg text-md font-bold">{card.player?.appearances || 0}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row items-center justify-start gap-4 w-full h-full">
                            <div className="flex flex-col items-start justify-start gap-1 w-full h-full md:px-4 lg:px-16 xl:px-32">
                                <p className="text-xl font-semibold">Last matches</p>
                                <div className="flex flex-row items-start justify-start gap-8 w-full h-full">
                                    {card.player.nb_games && card.player?.nb_games.map((match: any, index: number) => (
                                        <div key={index} className="flex flex-col items-start justify-start gap-0 w-fit h-full">
                                            <p className="md:text-sm text-xs text-muted-foreground">{formatDate(match?.game_date)}</p>
                                            <p className="md:text-lg text-md font-bold">{Number(match.metadata_total).toFixed(0)}</p>
                                        </div>
                                    ))}
                                    {!card.player.nb_games || card.player?.nb_games.length === 0 && (
                                        <p className="md:text-lg text-md font-bold">No matches</p>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col items-start justify-start gap-1 w-full h-full md:px-4 lg:px-16 xl:px-32">
                            <p className="text-xl font-semibold">Tags</p>
                                <div className="flex flex-row items-start justify-start gap-8 w-full h-full">
                                    <div className="flex flex-col items-start justify-start gap-0 w-fit h-full">
                                        <p className="md:text-sm text-xs text-muted-foreground">International</p>
                                        <p className="md:text-lg text-md font-bold">{card.international ? "YES" : "NO"}</p>
                                    </div>
                                    <div className="flex flex-col items-start justify-start gap-0 w-fit h-full">
                                        <p className="md:text-sm text-xs text-muted-foreground">Academy</p>
                                        <p className="md:text-lg text-md font-bold">{card.academy ? "YES" : "NO"}</p>
                                    </div>
                                    {/* <div className="flex flex-col items-start justify-start gap-0 w-fit h-full">
                                        <p className="md:text-sm text-xs text-muted-foreground">Kicker</p>
                                        <p className="md:text-lg text-md font-bold">{Card.kicker}</p>
                                    </div> */}
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
                 * dernier matchs     
                 * 
                 * BADGES            
                 * international
                 * academy
                 * kicker
                 */}
                </div>
            </DrawerContent>
        </Drawer >
    )
}

export default Stats