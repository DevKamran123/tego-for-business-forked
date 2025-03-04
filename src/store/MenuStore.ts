import { create } from 'zustand';

interface MenuState {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  toggleMenu: () => void;
}

const useMenuStore = create<MenuState>((set) => ({
  isOpen: false,
  setIsOpen: (value: boolean) => set({ isOpen: value }),
  toggleMenu: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useMenuStore;