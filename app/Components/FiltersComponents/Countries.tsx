import React, { useEffect } from 'react'
import countries from "@/utils/datas/countries.json"
import { Checkbox } from '@/components/ui/checkbox'
import Image from 'next/image'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CountriesProps {
    setFilters: (value: any) => void
    filters: any
}

const Countries = ({ setFilters, filters }: CountriesProps) => {

    const [isAllChecked, setIsAllChecked] = React.useState(Object.values(filters.countries).every((value) => value === true))

    const handleChange = (value: boolean | string, name: string) => {
        setFilters({ ...filters, countries: { ...filters.countries, [name]: value } })
        if (value === false) {
            setIsAllChecked(false)
        } else {
            const allChecked = Object.values({ ...filters.countries, [name]: value }).every((value) => value === true)
            setIsAllChecked(allChecked)
        }
    }

    const handleAllChange = (value: boolean | string) => {
        if (typeof value === "boolean") {
            setIsAllChecked(value)
            setFilters({ ...filters, countries: countries.reduce((acc, country) => ({ ...acc, [country.name]: value }), {}) })
        }
    }


    useEffect(() => {
        setIsAllChecked(Object.values(filters.countries).every((value) => value === true))
    }, [filters.countries])

    return (
        <div className="w-full h-full">
            <div className='flex items-center gap-2'>
                <Checkbox checked={isAllChecked} onCheckedChange={(value) => handleAllChange(value)} />
                <p className='italic'>Select all</p>
            </div>
            {countries.map((country, index) => {
                return (
                    <div key={index} className='flex items-center gap-2'>
                        <Checkbox checked={filters.countries[country.name]} onCheckedChange={(value) => handleChange(value, country.name)} />
                        <p>{country.name}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Countries