"use client"
import React, { useEffect, useState } from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Filter, ListFilter, SlidersHorizontal, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Checkbox } from '@/components/ui/checkbox'
import Rarity from './FiltersComponents/Rarity'
import Name from './FiltersComponents/Name'
import Clubs from './FiltersComponents/Clubs'
import { ScrollArea } from '@/components/ui/scroll-area'
import Score from './FiltersComponents/Score'
import Age from './FiltersComponents/Age'
import Stats from './FiltersComponents/Stats'
import Position from './FiltersComponents/Position'
import Countries from './FiltersComponents/Countries'
import Leagues from './FiltersComponents/Leagues'
import CollapseProvider from '@/components/CollapseProvider'
import { emptyFilters } from '@/utils/emptyFilters'
import { useNbCardStore } from '@/utils/store/NbCardStore'
import GWScore from './FiltersComponents/GWScore'
import _ from 'lodash'
import { useCollapsibleStateStore } from '@/utils/store/CollapsibleStateStore'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { usePinnedStore } from '@/utils/store/PinnedStore'
import { useFilterOpenStore } from '@/utils/store/FilterOpenStore'
import Season from './FiltersComponents/Season'

interface FiltersProps {
    filters: any
    setFilters: (value: any) => void
}

const FiltersFixed = ({ setFilters, filters }: FiltersProps) => {

    const [nbFilters, setNbFilters] = React.useState<number>(0)
    const [tmpFilters, setTmpFilters] = React.useState<any>(filters)
    const nbCard = useNbCardStore(state => state.nbCard)
    const nbFilteredCard = useNbCardStore(state => state.nbFilteredCard)
    const [openStates, setOpenStates] = useCollapsibleStateStore(state => [state.openStates, state.setOpenStates])
    const applyFilterPin = usePinnedStore(state => state.applyFilters)
    const setApplyFilterPin = usePinnedStore(state => state.setApplyFilters)
    const [open, setOpen] = useFilterOpenStore(state => [state.open, state.setOpen])

    useEffect(() => {
        setNbFilters(Object.keys(filters).filter((key) => !_.isEqual(filters[key], { ...emptyFilters }[key])).length);

        const handleKeyDown = (event: { key: string }) => {
            if (event.key === 'Enter') {
                // Execute your function here
                setFilters({ ...tmpFilters });
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        // Cleanup function to remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };

    }, [filters, tmpFilters, setFilters])

    const handleResetFilters = () => {
        setTmpFilters({ ...emptyFilters })
        setFilters({ ...emptyFilters })
    }

    const diffFilters = () => {
        return Object.keys(filters).filter((key) => !_.isEqual(filters[key], { ...tmpFilters }[key])).length == 0;
    }

    const handleOpen = () => {
        setOpen(!open)
        setTmpFilters({ ...filters })
    }

    return (
        <>
            {open ? null : (<div onClick={handleOpen} className=' flex flex-row gap-2 hover:bg-secondary rounded-lg w-fit h-10 justify-between p-2 items-center cursor-pointer'>
                {/* <div className='flex flex-row gap-2 items-end justify-between w-full'>
                    <p>Filters</p>
                    <p className='text-xs text-muted-foreground'>{nbFilteredCard}/{nbCard}</p>
                </div> */}
                <ListFilter size={24} className='' />
                {nbFilters > 0 && (
                    <div className='absolute top-0 left-0 mt-1 ml-1 bg-primary text-primary-foreground rounded-full h-4 w-4 flex items-center justify-center'>
                        <p className=' text-xs'>{nbFilters}</p>
                    </div>
                )}
            </div>)}
            <div className={`fixed w-80 h-screen bg-background transition-all duration-500 ${open ? "" : "-translate-x-full hidden"}`}>
                <div onClick={handleOpen} className='absolute top-2 right-2 hover:bg-secondary rounded-lg p-1 w-fit cursor-pointer'>
                    <X size={24} />
                </div>
                <div className='p-2 sm:p-4 h-full'>
                    <div className='items-start'>
                        <h2 className='text-xl font-bold'>Filters</h2>
                        <div className='flex flex-col gap-0 w-full items-start'>
                            <p>{"Select the filters you want to apply."}</p>
                            <p>{nbFilteredCard} / {nbCard} cards</p>
                            <Separator className='shadow-lg shadow-black' />
                        </div>
                    </div>
                    <ScrollArea className='h-full w-full p-0 pb-[60px]'>
                        <div className="flex flex-col items-start gap-4 justify-center my-4 p-1">
                            <div className='grid grid-cols-3 gap-2 col-span-3 items-center justify-between w-full'>
                                <Button disabled={diffFilters()} onClick={() => { setFilters({ ...tmpFilters }) }} className={`w-full mb-1 col-span-2`} variant='default'>Apply filters</Button>
                                <Button disabled={nbFilters == 0} onClick={() => handleResetFilters()} className={`w-full mb-1 col-span-1`} variant='destructive'>Reset</Button>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch id="pinned" checked={applyFilterPin} onCheckedChange={(v) => setApplyFilterPin(v)} />
                                <Label htmlFor="pinned" className='whitespace-nowrap'>Apply filters to pinned</Label>
                            </div>
                            <CollapseProvider name="Name" isOpen={openStates['Name']} onOpenChange={(isOpen: boolean) => setOpenStates('Name', isOpen)}>
                                <Name filters={tmpFilters} setFilters={setTmpFilters} />
                            </CollapseProvider>
                            <Separator />
                            <CollapseProvider name="Rarity" isOpen={openStates['Rarity']} onOpenChange={(isOpen: boolean) => setOpenStates('Rarity', isOpen)}>
                                <Rarity filters={tmpFilters} setFilters={setTmpFilters} />
                            </CollapseProvider>
                            <Separator />
                            <CollapseProvider name="Clubs" isOpen={openStates['Clubs']} onOpenChange={(isOpen: boolean) => setOpenStates('Clubs', isOpen)}>
                                <Clubs filters={tmpFilters} setFilters={setTmpFilters} />
                            </CollapseProvider>
                            <Separator />
                            <CollapseProvider name="Position" isOpen={openStates['Position']} onOpenChange={(isOpen: boolean) => setOpenStates('Position', isOpen)}>
                                <Position filters={tmpFilters} setFilters={setTmpFilters} />
                            </CollapseProvider>
                            <Separator />
                            <CollapseProvider name="Score" isOpen={openStates['Score']} onOpenChange={(isOpen: boolean) => setOpenStates('Score', isOpen)}>
                                <Score filters={tmpFilters} setFilters={setTmpFilters} />
                            </CollapseProvider>
                            <Separator />
                            <CollapseProvider name="Stats" isOpen={openStates['Stats']} onOpenChange={(isOpen: boolean) => setOpenStates('Stats', isOpen)}>
                                <Stats filters={tmpFilters} setFilters={setTmpFilters} />
                            </CollapseProvider>
                            <Separator />
                            <CollapseProvider name="Age" isOpen={openStates['Age']} onOpenChange={(isOpen: boolean) => setOpenStates('Age', isOpen)}>
                                <Age filters={tmpFilters} setFilters={setTmpFilters} />
                            </CollapseProvider>
                            <Separator />
                            <CollapseProvider name="Leagues" isOpen={openStates['Leagues']} onOpenChange={(isOpen: boolean) => setOpenStates('Leagues', isOpen)}>
                                <Leagues filters={tmpFilters} setFilters={setTmpFilters} />
                            </CollapseProvider>
                            <Separator />
                            <CollapseProvider name="Nationality" isOpen={openStates['Nationality']} onOpenChange={(isOpen: boolean) => setOpenStates('Nationality', isOpen)}>
                                <Countries filters={tmpFilters} setFilters={setTmpFilters} />
                            </CollapseProvider>
                            <Separator />
                            <CollapseProvider name="Season" isOpen={openStates['Season']} onOpenChange={(isOpen: boolean) => setOpenStates('Season', isOpen)}>
                                <Season filters={tmpFilters} setFilters={setTmpFilters} />
                            </CollapseProvider>
                            <Separator />
                            <CollapseProvider name="Game Week Score" isOpen={openStates['GWScore']} onOpenChange={(isOpen: boolean) => setOpenStates('GWScore', isOpen)}>
                                <GWScore filters={tmpFilters} setFilters={setTmpFilters} />
                            </CollapseProvider>
                            <Separator />
                        </div>
                    </ScrollArea>
                </div>
            </div >
        </>

    )
}

export default FiltersFixed