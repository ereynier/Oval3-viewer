import { create } from 'zustand'
import { emptyFilters } from "@/utils/emptyFilters";

type FiltersStore = {
    filters: any
    setFilters: (value: any) => void
}

export const useFiltersStore = create<FiltersStore>((set) => ({
    filters: { ...emptyFilters },
    setFilters: (value) => set({ filters: value })
}))
