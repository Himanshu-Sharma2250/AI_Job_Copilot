import { create } from "zustand";

export const states = create((set) => ({
    result: null,

    setResult: (data) => {
        set({ result: data })
    }
}))