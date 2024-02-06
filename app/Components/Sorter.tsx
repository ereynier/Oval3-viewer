"use client"
import React from 'react'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import { ArrowDown10, ArrowUp10 } from 'lucide-react'

interface SorterProps {
    setSortBy: (value: string) => void
    toggleOrder: () => void
    order: string
}

const Sorter = ({ setSortBy, toggleOrder, order }: SorterProps) => {
    return (
        <div className="flex flex-row items-center justify-center gap-2 w-full sm:w-fit">
            <Select onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="id">ID</SelectItem>
                    <SelectItem value="rarity">Rarity</SelectItem>
                    <SelectItem value="club">Club</SelectItem>
                    <SelectItem value="score">Score</SelectItem>
                </SelectContent>
            </Select>
            <Button title='Toogle order' variant={"ghost"} size={"icon"} onClick={() => toggleOrder()}>
                {order === "asc" ?
                    <ArrowUp10 size={24} />
                    :
                    <ArrowDown10 size={24} />
                }
            </Button>
        </div>

    )
}

export default Sorter