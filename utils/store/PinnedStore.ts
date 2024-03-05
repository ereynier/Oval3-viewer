import { create } from 'zustand'

type PinnedStore = {
    pinnedPlayers: number[]
    setPinnedPlayers: (value: number[]) => void
    onlyPinned: boolean
    setOnlyPinned: (value: boolean) => void
    applyFilters: boolean
    setApplyFilters: (value: boolean) => void
}

export const usePinnedStore = create<PinnedStore>((set) => ({
    pinnedPlayers: [],
    setPinnedPlayers: (value) => set({ pinnedPlayers: value }),
    onlyPinned: false,
    setOnlyPinned: (value) => set({ onlyPinned: value }),
    applyFilters: false,
    setApplyFilters: (value) => set({ applyFilters: value })
}))
