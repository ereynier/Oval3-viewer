import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Filter, ListFilter } from 'lucide-react'
import { Button } from '@/components/ui/button'


const Filters = () => {
    return (
        <Sheet>
            <SheetTrigger>
                <Button variant={"ghost"} size={"icon"}>
                    <ListFilter size={24} />
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>
                        {"Select the filters you want to apply"}
                    </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col items-start justify-center my-4">
                    Reset filters (+ reset for each filter)
                    Search bar
                    Rarity
                    Club
                    Position
                    Score
                    Age
                    Stats
                    League
                    Nationality
                </div>
            </SheetContent>
        </Sheet>

    )
}

export default Filters