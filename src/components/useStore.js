import create from 'zustand'

export const useUserStore = create((set) => ({
    user: '',
    userID: '',
    setUser: (str) => 
        set({user: str}),
    setUserID: (str) => 
        set({userID: str})
}));