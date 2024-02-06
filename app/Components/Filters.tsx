"use client"
import React from 'react'
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

interface FiltersProps {
    filters: any
    setFilters: (value: any) => void
}

const Filters = ({ setFilters, filters }: FiltersProps) => {

    return (
        <Sheet>
            <SheetTrigger className='flex flex-row gap-2 hover:bg-secondary rounded-lg border w-full sm:w-[180px] h-10 justify-between p-2 items-center'>
                <p>Filters</p>
                <ListFilter size={24} />
            </SheetTrigger>
            <SheetContent side={"left"} className='p-2 sm:p-4'>
                <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription className='flex flex-col gap-1'>
                        {"Select the filters you want to apply"}
                        <Button onClick={() => {setFilters({...emptyFilters})}} className='w-full mb-1' variant='secondary'>Reset filters</Button>
                    </SheetDescription>
                </SheetHeader>
                <ScrollArea className='h-full w-full p-0 pb-[80px]'>
                    <div className="flex flex-col items-start gap-4 justify-center my-4 p-1">
                        <CollapseProvider name="Name">
                            <Name filters={filters} setFilters={setFilters} />
                        </CollapseProvider>
                        <Separator/>
                        <CollapseProvider name="Rarity">
                            <Rarity filters={filters} setFilters={setFilters} />
                        </CollapseProvider>
                        <Separator/>
                        <CollapseProvider name="Clubs">
                            <Clubs filters={filters} setFilters={setFilters} />
                        </CollapseProvider>
                        <Separator />
                        <CollapseProvider name="Position">
                            <Position filters={filters} setFilters={setFilters} />
                        </CollapseProvider>
                        <Separator />
                        <CollapseProvider name="Score">
                            <Score filters={filters} setFilters={setFilters} />
                        </CollapseProvider>
                        <Separator />
                        <CollapseProvider name="Stats">
                            <Stats filters={filters} setFilters={setFilters} />
                        </CollapseProvider>
                        <Separator />
                        <CollapseProvider name="Age">
                            <Age filters={filters} setFilters={setFilters} />
                        </CollapseProvider>
                        <Separator />
                        <CollapseProvider name="Leagues">
                            <Leagues filters={filters} setFilters={setFilters} />
                        </CollapseProvider>
                        <Separator />
                        <CollapseProvider name="Nationality">
                            <Countries filters={filters} setFilters={setFilters} />
                        </CollapseProvider>
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet >

    )
}

export default Filters