import { Input } from '@/components/ui/input'
import React from 'react'

interface NameProps {
    setFilters: (value: any) => void
    filters: any
}

const Name = ({ setFilters, filters }: NameProps) => {
    return (
        <Input placeholder="Player name" onChange={(value) => setFilters({ ...filters, name: value })} />
    )
}

export default Name