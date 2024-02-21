import { create } from 'zustand'

type NbCardStore = {
  nbCard: number
  setNbCard: (nbCard: number) => void
  nbFilteredCard: number
  setNbFilteredCard: (nbFilteredCard: number) => void
}

export const useNbCardStore = create<NbCardStore>((set) => ({
  nbCard: 0,
  setNbCard: (nbCard) => set({ nbCard }),
  nbFilteredCard: 0,
  setNbFilteredCard: (nbFilteredCard) => set({ nbFilteredCard }),
}))
