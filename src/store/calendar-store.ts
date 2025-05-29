import {create} from 'zustand'

type Store = {
    date: Date | undefined;
    setDate: (date: Date | undefined) => void;
}

export const useCalendarStore = create<Store>((set) => ({
    date: new Date(),
    setDate: (date: Date | undefined) => set({ date }),
}))
