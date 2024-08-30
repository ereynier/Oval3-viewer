import { create } from 'zustand'

type OrderStore = {
    order: string
    toggleOrder: () => void
    sortBy: string
    setSortBy: (value: string) => void
}

export const useOrderStore = create<OrderStore>((set) => ({
    order: "asc",
    toggleOrder: () => set((state) => ({ order: state.order === "asc" ? "desc" : "asc" })),
    sortBy: "tokenId",
    setSortBy: (value) => set({ sortBy: value }),
}))
