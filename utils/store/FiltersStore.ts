import { create } from 'zustand'
import { emptyFilters } from '../emptyFilters'

type FiltersStore = {
    filter: any
    setFilter: (v: any) => void
}

export const useFiltersStore = create<FiltersStore>((set) => ({
    filter: { ...emptyFilters},
    setFilter: (v: any) => set({ filter: v })
}))
