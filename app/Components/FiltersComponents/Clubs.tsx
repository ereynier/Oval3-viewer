import React, { useEffect } from 'react'
import clubs from "@/utils/datas/clubs.json"
import { Checkbox } from '@/components/ui/checkbox'
import Image from 'next/image'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ClubsProps {
    setFilters: (value: any) => void
    filters: any
}

const Clubs = ({ setFilters, filters }: ClubsProps) => {

    const [isAllChecked, setIsAllChecked] = React.useState(Object.values(filters.clubs).every((value) => value === true))

    const handleChange = (value: boolean | string, name: string) => {
        setFilters({ ...filters, clubs: { ...filters.clubs, [name]: value } })
        if (value === false) {
            setIsAllChecked(false)
        } else {
            const allChecked = Object.values({ ...filters.clubs, [name]: value }).every((value) => value === true)
            setIsAllChecked(allChecked)
        }
    }

    const handleAllChange = (value: boolean | string) => {
        if (typeof value === "boolean") {
            setIsAllChecked(value)
            setFilters({ ...filters, clubs: clubs.reduce((acc, club) => ({ ...acc, [club.name]: value }), {}) })
        }
    }

    useEffect(() => {
        setIsAllChecked(Object.values(filters.clubs).every((value) => value === true))
    }, [filters.clubs])

    return (
        <div className="w-full h-full flex flex-col gap-1">
            <div className='flex items-center gap-2'>
                <Checkbox checked={isAllChecked} onCheckedChange={(value) => handleAllChange(value)} />
                <p className='italic'>Select all</p>
            </div>
            {clubs.map((club, index) => {
                return (
                    <div key={index} className='flex items-center gap-2'>
                        <Checkbox checked={filters.clubs[club.name]} onCheckedChange={(value) => handleChange(value, club.name)} />
                        {/* Bezier, Agen, Provence need background on light */}
                        <Image title={club.name} src={club.clubCode} alt={`${club.name} logo`} width={30} height={30} className={`${(club.clubCode.includes("0031-ASBH") || club.clubCode.includes("0005-SUA") || club.clubCode.includes("0018-Provence-Rugby")) ? "bg-gray-800 dark:bg-background rounded-full" : ""}`} />
                        <p>{club.name}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Clubs