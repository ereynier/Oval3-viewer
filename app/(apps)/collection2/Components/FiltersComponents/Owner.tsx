import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Input } from '@/components/ui/input'
import { ChevronUp } from 'lucide-react'
import React, { use, useEffect } from 'react'

interface OwnerProps {
    setFilters: (value: any) => void
    filters: any
}

const Owner = ({ setFilters, filters }: OwnerProps) => {

    const [owner, setOwner] = React.useState(filters.owner)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOwner(e.target.value)
        setFilters({ ...filters, owner: e.target.value })
    }

    useEffect(() => {
        setOwner(filters.owner)
    }, [filters.owner])

    return (
        <div className="w-full h-full">
            <Input placeholder="0xa3ebf..." value={owner} onChange={(e) => handleChange(e)} />
        </div>
    )
}

export default Owner