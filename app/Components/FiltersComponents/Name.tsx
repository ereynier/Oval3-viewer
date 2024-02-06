import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Input } from '@/components/ui/input'
import { ChevronUp } from 'lucide-react'
import React, { use, useEffect } from 'react'

interface NameProps {
    setFilters: (value: any) => void
    filters: any
}

const Name = ({ setFilters, filters }: NameProps) => {

    const [name, setName] = React.useState(filters.name)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
        setFilters({ ...filters, name: e.target.value })
    }

    useEffect(() => {
        setName(filters.name)
    }, [filters.name])

    return (
        <div className="w-full h-full">
            <Input placeholder="Player name" value={name} onChange={(e) => handleChange(e)} />
        </div>
    )
}

export default Name