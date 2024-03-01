import { create } from 'zustand'

type CollapsibleStateStore = {
    openStates: { [key: string]: boolean}
    setOpenStates: (key: string, state: boolean) => void
}

export const useCollapsibleStateStore = create<CollapsibleStateStore>((set) => ({
    openStates: {},
    setOpenStates: (key, state) => set((prev) => ({ openStates: { ...prev.openStates, [key]: state } }))
}))
