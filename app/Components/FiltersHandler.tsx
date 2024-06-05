import React from 'react'
import Filters from './Filters'
import FiltersFixed from './FiltersFixed'

interface FiltersProps {
    filters: any
    setFilters: (value: any) => void
}

const FiltersHandler = ({ filters, setFilters }: FiltersProps) => {
    
    return (
        <>
            <div className='md:hidden block fixed top-0 left-0'>
                <Filters filters={filters} setFilters={setFilters} />
            </div>
            <div className='hidden md:block'>
                <FiltersFixed filters={filters} setFilters={setFilters} />
            </div>
        </>
    )
}

export default FiltersHandler