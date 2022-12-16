import create from 'zustand'

export const useUserStore = create((set) => ({
    user: '',
    setUser: (str) => 
        set({user: str}),
}));