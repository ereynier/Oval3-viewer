import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ChevronUp } from 'lucide-react'
import React from 'react'

interface RarityProps {
    filters: any
    setFilters: (value: any) => void
}

const rarity = ["LIMITED", "RARE", "SUPER RARE", "UNIQUE"]

const Rarity = ({ filters, setFilters }: RarityProps) => {

    const handleChange = (value: string | boolean, name: string) => {
        if (typeof value === "boolean") {
            setFilters({ ...filters, rarity: { ...filters.rarity, [name]: value } })
        }
    }

    return (
        <div className="w-full h-full">
            <div className="flex flex-col items-start justify-center gap-2">
                {rarity.map((name: string) => (
                    <div key={name} className="flex items-center space-x-2">
                        <Checkbox checked={filters.rarity[name]} id={name} onCheckedChange={(value) => handleChange(value, name)} />
                        <label
                            htmlFor="terms2"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            {name}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Rarity