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
                    <SheetDescription>
                        {"Select the filters you want to apply"}
                    </SheetDescription>
                </SheetHeader>
                <ScrollArea className='h-full w-full p-0 pb-8'>
                    <div className="flex flex-col items-start gap-4 justify-center my-4 p-1">
                        <p>Reset filters (+ reset for each filter)</p>
                        <div className="flex flex-col items-start justify-center gap-0 w-full sm:w-fit">
                            <h3>Search player</h3>
                            <Name filters={filters} setFilters={setFilters} />
                        </div>
                        <Separator />
                        <div className="flex flex-col items-start justify-center gap-0 w-full sm:w-fit">
                            <h3>Rarity</h3>
                            <Rarity filters={filters} setFilters={setFilters} />
                        </div>
                        <Separator />
                        <div className="flex flex-col items-start justify-center gap-1 w-full sm:w-fit">
                            <h3>Clubs</h3>
                            <Clubs filters={filters} setFilters={setFilters} />
                        </div>
                        <Separator />
                        <div className="flex flex-col items-start justify-center gap-1 w-full sm:w-fit">
                            <h3>Position</h3>
                            <Position filters={filters} setFilters={setFilters} />
                        </div>
                        <Separator />
                        <div className="flex flex-col items-start justify-center gap-1 w-full">
                            <h3>Score</h3>
                            <Score filters={filters} setFilters={setFilters} />
                        </div>
                        <Separator />
                        <div className="flex flex-col items-start justify-center gap-1 w-full">
                            <h3>Stats</h3>
                            <Stats filters={filters} setFilters={setFilters} />
                        </div>
                        <Separator />
                        <div className="flex flex-col items-start justify-center gap-1 w-full">
                            <h3>Age</h3>
                            <Age filters={filters} setFilters={setFilters} />
                        </div>
                        <Separator />
                        <p>League</p>
                        <Separator />
                        <p>Nationality</p>
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet >

    )
}

export default Filters