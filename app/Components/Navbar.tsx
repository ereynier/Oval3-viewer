"use client"
import React, { useEffect, useState } from 'react'
import FiltersHandler from './FiltersHandler'
import { useFiltersStore } from '@/utils/store/FiltersStore'
import { ThemeSwitcher } from './ThemeSwitcher'
import Link from 'next/link'
import WalletButton from './WalletButton'

const Navbar = () => {

    const [filters, setFilters] = useFiltersStore(state => [state.filters, state.setFilters])

    return (
        <nav className={`w-full bg-background/20 backdrop-blur-sm border-gray-200 shadow-md top-0 z-50 navbar sticky`}>
            <div className='p-1 w-full flex justify-between items-center'>
                <div className='flex items-center justify-start w-full'>
                    <FiltersHandler setFilters={setFilters} filters={filters} />
                </div>
                <div className='flex items-center justify-center w-full mx-2'>
                    <WalletButton />
                </div>
                <div className='flex flex-row sm:gap-3 gap-2 items-center justify-end text-sm sm:text-base w-full'>
                    <Link href='/'>
                        Home
                    </Link>
                    <Link href='/feedbacks'>
                        Feedbacks
                    </Link>
                    <div className='pl-0 sm:pl-2'>
                        <ThemeSwitcher />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar