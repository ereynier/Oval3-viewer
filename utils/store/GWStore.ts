import { create } from 'zustand'

type GWStore = {
    display: string
    setDisplay: (v: boolean) => void
}

export const useGWStore = create<GWStore>((set) => ({
    display: "Score",
    setDisplay: (v: boolean) => set({ display: v ? "GW" : "Score" }),
}))
