"use client"
import React, { useEffect, useState } from 'react'
import FiltersHandler from './FiltersHandler'
import { useFiltersStore } from '@/utils/store/FiltersStore'
import { ThemeSwitcher } from './ThemeSwitcher'
import Link from 'next/link'

const Navbar = () => {

    const [filters, setFilters] = useFiltersStore(state => [state.filters, state.setFilters])

    return (
        <nav className={`w-full bg-background/20 backdrop-blur-sm border-gray-200 shadow-md top-0 z-50 navbar sticky`}>
            <div className='p-1 w-full flex justify-between items-center'>
                <FiltersHandler setFilters={setFilters} filters={filters} />
                <div className='flex flex-row gap-3 items-center justify-end'>
                    <Link href='/'>
                        Home
                    </Link>
                    <Link href='/feedbacks'>
                        Feedbacks
                    </Link>
                    <div className='pl-2'>
                        <ThemeSwitcher />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar