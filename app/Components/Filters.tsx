"use client"
import React, { useEffect } from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Filter, ListFilter, SlidersHorizontal } from 'lucide-react'
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

interface FiltersProps {
    filters: any
    setFilters: (value: any) => void
}

const Filters = ({ setFilters, filters }: FiltersProps) => {

    const [nbFilters, setNbFilters] = React.useState<number>(0)
    const [tmpFilters, setTmpFilters] = React.useState<any>(filters)
    const nbCard = useNbCardStore(state => state.nbCard)
    const nbFilteredCard = useNbCardStore(state => state.nbFilteredCard)

    useEffect(() => {
        setNbFilters(Object.keys(filters).filter((key) => !_.isEqual(filters[key], { ...emptyFilters }[key])).length);
    }, [filters])

    const handleResetFilters = () => {
        setTmpFilters({ ...emptyFilters })
        setFilters({ ...emptyFilters })
    }

    const diffFilters = () => {
        return Object.keys(filters).filter((key) => !_.isEqual(filters[key], { ...tmpFilters }[key])).length == 0;
    }

    return (
        <Sheet onOpenChange={(open) => { !open && setTmpFilters({ ...filters }) }}>
            <SheetTrigger className='relative flex flex-row gap-2 hover:bg-secondary rounded-lg w-fit h-10 justify-between p-2 items-center'>
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
            </SheetTrigger>
            <SheetContent side={"left"} className='p-2 sm:p-4'>
                <SheetHeader className='items-start'>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription className='flex flex-col gap-0 w-full items-start'>
                            <p>{"Select the filters you want to apply."}</p>
                            <p>{nbFilteredCard} / {nbCard} cards</p>
                        <Separator className='shadow-lg shadow-black' />
                    </SheetDescription>
                </SheetHeader>
                <ScrollArea className='h-full w-full p-0 pb-[60px]'>
                    <div className="flex flex-col items-start gap-4 justify-center my-4 p-1">
                        <div className='grid grid-cols-3 gap-2 col-span-3 items-center justify-between w-full'>
                            <Button disabled={diffFilters()} onClick={() => { setFilters({ ...tmpFilters }) }} className={`w-full mb-1 col-span-2`} variant='default'>Apply filters</Button>
                            <Button disabled={nbFilters == 0} onClick={() => handleResetFilters()} className={`w-full mb-1 col-span-1`} variant='destructive'>Reset</Button>
                        </div>
                        <CollapseProvider name="Name">
                            <Name filters={tmpFilters} setFilters={setTmpFilters} />
                        </CollapseProvider>
                        <Separator />
                        <CollapseProvider name="Rarity">
                            <Rarity filters={tmpFilters} setFilters={setTmpFilters} />
                        </CollapseProvider>
                        <Separator />
                        <CollapseProvider name="Clubs">
                            <Clubs filters={tmpFilters} setFilters={setTmpFilters} />
                        </CollapseProvider>
                        <Separator />
                        <CollapseProvider name="Position">
                            <Position filters={tmpFilters} setFilters={setTmpFilters} />
                        </CollapseProvider>
                        <Separator />
                        <CollapseProvider name="Score">
                            <Score filters={tmpFilters} setFilters={setTmpFilters} />
                        </CollapseProvider>
                        <Separator />
                        <CollapseProvider name="Stats">
                            <Stats filters={tmpFilters} setFilters={setTmpFilters} />
                        </CollapseProvider>
                        <Separator />
                        <CollapseProvider name="Age">
                            <Age filters={tmpFilters} setFilters={setTmpFilters} />
                        </CollapseProvider>
                        <Separator />
                        <CollapseProvider name="Leagues">
                            <Leagues filters={tmpFilters} setFilters={setTmpFilters} />
                        </CollapseProvider>
                        <Separator />
                        <CollapseProvider name="Nationality">
                            <Countries filters={tmpFilters} setFilters={setTmpFilters} />
                        </CollapseProvider>
                        <Separator />
                        <CollapseProvider name="Game Week Score">
                            <GWScore filters={tmpFilters} setFilters={setTmpFilters} />
                        </CollapseProvider>
                        <Separator />
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet >

    )
}

export default Filters