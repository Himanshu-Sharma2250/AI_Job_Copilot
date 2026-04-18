import { create } from "zustand";

export const states = create((set) => ({
    archetypes: (() => {
        const stored = localStorage.getItem("archetypes");
        try {
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    })(),
    result: null,
    resultHistory: (() => {
        const stored = localStorage.getItem("resultHistory");
        try {
            return stored ? JSON.parse(stored) : []
        } catch (error) {
            return [];            
        }
    })(),

    setArchetype: (archetype) => {
        // archetype is an array
        set({ archetypes: archetype });
        localStorage.setItem("archetypes", JSON.stringify(archetype));
    },

    setResult: (data) => {
        set((state) => {
            // 1. Generate a unique, incremental ID
            // If the array is empty, start at 1. 
            // Otherwise, take the ID of the last element and add 1.
            const lastId = state.resultHistory.length > 0 
                ? state.resultHistory[state.resultHistory.length - 1].id 
                : 0;
            
            // 2. Attach the ID to the incoming data object
            const dataWithId = { 
                ...data, 
                id: lastId + 1,
                timestamp: new Date().toISOString()
            };

            const newHistory = [...state.resultHistory, dataWithId];
            
            localStorage.setItem("resultHistory", JSON.stringify(newHistory));
            
            return { 
                result: dataWithId, 
                resultHistory: newHistory 
            };
        });
    }
}));