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
import { useOrderStore } from '@/utils/store/OrderStore'
import { useGWStore } from '@/utils/store/GWStore'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { usePinnedStore } from '@/utils/store/PinnedStore'



const Sorter = () => {
    const setSortBy = useOrderStore(state => state.setSortBy)
    const toggleOrder = useOrderStore(state => state.toggleOrder)
    const order = useOrderStore(state => state.order)
    const onlyPinned = usePinnedStore(state => state.onlyPinned)
    const setOnlyPinned = usePinnedStore(state => state.setOnlyPinned)

    return (
        <div className="flex flex-row items-center justify-between gap-2 w-full sm:w-fit">
            <div className="flex flex-row items-center justify-center gap-2 w-full">
                <Select onValueChange={setSortBy}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent
                        ref={(ref) => {
                            if (!ref) return;
                            ref.ontouchstart = (e) => {
                                e.preventDefault();
                            }
                        }}
                    >
                        <SelectItem value="tokenId">ID</SelectItem>
                        <SelectItem value="rarity">Rarity</SelectItem>
                        <SelectItem value="clubName">Club</SelectItem>
                        <SelectItem value="scoring">Score</SelectItem>
                        <SelectItem value="gw_score">GW Score</SelectItem>
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
            <div className="flex items-center space-x-2">
                <Switch id="pinned" checked={onlyPinned} onCheckedChange={(v) => setOnlyPinned(v)}/>
                <Label htmlFor="pinned" className='whitespace-nowrap'>Pin only</Label>
            </div>
        </div>

    )
}

export default Sorter