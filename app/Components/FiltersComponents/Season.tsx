import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { emptyFilters } from '@/utils/emptyFilters'
import { ChevronUp } from 'lucide-react'
import React from 'react'

interface SeasonProps {
    filters: any
    setFilters: (value: any) => void
}

const season: string[] = emptyFilters.season ? Object.keys(emptyFilters.season) : []

const Season = ({ filters, setFilters }: SeasonProps) => {

    const handleChange = (value: string | boolean, name: string) => {
        if (typeof value === "boolean") {
            setFilters({ ...filters, season: { ...filters.season, [name]: value } })
        }
    }

    return (
        <div className="w-full h-full">
            <div className="flex flex-col items-start justify-center gap-2">
                {season.map((name: string) => (
                    <div key={name} className="flex items-center space-x-2">
                        <Checkbox checked={filters.season[name]} id={name} onCheckedChange={(value) => handleChange(value, name)} />
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

export default Season