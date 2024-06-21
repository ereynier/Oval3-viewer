import React, { useEffect } from 'react'
import leagues from "@/utils/datas/leagues.json"
import { Checkbox } from '@/components/ui/checkbox'
import Image from 'next/image'

interface LeaguesProps {
    setFilters: (value: any) => void
    filters: any
}

const Leagues = ({ setFilters, filters }: LeaguesProps) => {

    const handleChange = (value: boolean | string, name: string) => {
        setFilters({ ...filters, leagues: { ...filters.leagues, [name]: value } })
    }

    return (
        <div className="w-full h-full flex flex-col gap-1">
            {leagues.map((league, index) => {
                return (
                    <div key={index} className='flex items-center gap-2'>
                        <Checkbox checked={filters.leagues[league.name]} onCheckedChange={(value) => handleChange(value, league.name)} />
                        <Image title={league.name} src={league.src} alt={`${league.name} logo`} width={30} height={30} className='bg-neutral-900 dark:bg-background rounded-sm' />
                        <p>{league.name}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Leagues