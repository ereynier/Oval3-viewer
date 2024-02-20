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

interface FiltersProps {
    filters: any
    setFilters: (value: any) => void
}

const Filters = ({ setFilters, filters }: FiltersProps) => {

    const [nbFilters, setNbFilters] = React.useState<number>(0)
    const [nbTmpFilters, setNbTmpFilters] = React.useState<number>(0)
    const [tmpFilters, setTmpFilters] = React.useState<any>(filters)

    useEffect(() => {
        setNbFilters(Object.keys(filters).filter((key) => filters[key] !== { ...emptyFilters }[key]).length)
        setNbTmpFilters(Object.keys(tmpFilters).filter((key) => tmpFilters[key] !== { ...filters }[key]).length)
    }, [filters, tmpFilters])

    const handleResetFilters = () => {
        setTmpFilters({ ...emptyFilters })
        setFilters({ ...emptyFilters })
    }

    return (
        <Sheet onOpenChange={(open) => {!open && setTmpFilters({...filters})}}>
            <SheetTrigger className='relative flex flex-row gap-2 hover:bg-secondary rounded-lg border w-full sm:w-[180px] h-10 justify-between p-2 items-center bg-background'>
                <p>Filters</p>
                <ListFilter size={24} />
                {nbFilters > 0 && (
                    <div className='absolute top-0 right-0 -mt-2 -mr-2 bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center'>
                        <p className=' text-xs'>{nbFilters}</p>
                    </div>
                )}
            </SheetTrigger>
            <SheetContent side={"left"} className='p-2 sm:p-4'>
                <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription className='flex flex-col gap-2'>
                        {"Select the filters you want to apply"}
                        <Separator className='shadow-lg shadow-black' />
                    </SheetDescription>
                </SheetHeader>
                <ScrollArea className='h-full w-full p-0 pb-[50px]'>
                    <div className="flex flex-col items-start gap-4 justify-center my-4 p-1">
                        <div className='grid grid-cols-3 gap-2 col-span-3 items-center justify-between w-full'>
                            <Button disabled={nbTmpFilters == 0} onClick={() => { setFilters({ ...tmpFilters }) }} className={`w-full mb-1 col-span-2`} variant='default'>Apply filters</Button>
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
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet >

    )
}

export default Filters