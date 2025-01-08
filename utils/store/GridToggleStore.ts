import { create } from 'zustand'

type GridToggleStore = {
    grid: string
    toggleGrid: () => void
}

export const useGridToggleStore = create<GridToggleStore>((set) => ({
    grid: "1",
    toggleGrid: () => set((state) => ({ grid: state.grid === "1" ? "3" : "1" })),
}))
