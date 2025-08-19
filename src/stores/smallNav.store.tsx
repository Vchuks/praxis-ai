import { create } from "zustand";

type NavType = {
    showNav: boolean,
    setShowNav: (value: boolean) => void
}
export const useSmallNavStore = create<NavType>()((set)=>({
    showNav: false,
    setShowNav: (value: boolean) => {set({showNav: value})}
}))