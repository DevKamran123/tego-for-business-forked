import { create } from "zustand";
import Cookies from "js-cookie";

interface AppState {
  user: string | null;
  setUser: (user: string) => void;
  clearUser: () => void;
}

const useAppStore = create<AppState>((set) => ({
  user: Cookies.get("user") || null,
  setUser: (user: string) => {
    Cookies.set("user", user);
    set({ user });
  },
  clearUser: () => {
    Cookies.remove("user");
    set({ user: null });
  },
}));

export default useAppStore;
