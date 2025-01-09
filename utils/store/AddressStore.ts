import { create } from 'zustand'

type AddressStore = {
    address: string
    setAddress: (value: string) => void
}

export const useAddressStore = create<AddressStore>((set) => ({
    address: "",
    setAddress: (value) => set({ address: value })
}))
