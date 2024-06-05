import { create } from 'zustand'

type FilterOpenStore = {
    open: boolean
    setOpen: (state: boolean) => void
}

export const useFilterOpenStore = create<FilterOpenStore>((set) => ({
    open: false,
    setOpen: (state) => set({ open: state })
}))
