import { create } from 'zustand'

type GWStore = {
    display: string
    setDisplay: (v: boolean) => void
    num: number
    setNum: (v: number) => void
}

export const useGWStore = create<GWStore>((set) => ({
    display: "Score",
    setDisplay: (v: boolean) => set({ display: v ? "GW" : "Score" }),
    num: 1,
    setNum: (v: number) => set({ num: v })
}))
