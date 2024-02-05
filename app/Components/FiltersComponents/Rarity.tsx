import { Checkbox } from '@/components/ui/checkbox'
import React from 'react'

interface RarityProps {
    filters: any
    setFilters: (value: any) => void
}

const values = ["LIMITED", "RARE", "SUPER RARE", "UNIQUE"]

const Rarity = ({ filters, setFilters }: RarityProps) => {

    const handleChange = (e: string | boolean, value: string) => {
        if (!e && filters.rarity.includes(value)) {
            setFilters({ ...filters, rarity: filters.rarity.filter((r: string) => r !== value) })
        } else if (e && !filters.rarity.includes(value)) {
            setFilters({ ...filters, rarity: [...filters.rarity, value] })
        }
    }

    return (
        <div className="flex flex-col items-start justify-center gap-2">
            {values.map((value) => (
                <div key={value} className="flex items-center space-x-2">
                    <Checkbox id={value} onCheckedChange={(e) => handleChange(e, value)} />
                    <label
                        htmlFor="terms2"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        {value}
                    </label>
                </div>
            ))}
        </div>
    )
}

export default Rarity