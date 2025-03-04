import { create } from "zustand";
import Cookies from "js-cookie";

interface AppState {
  session: string | null;
  setSession: (session: string) => void;
  sideBarOpen: boolean;
  setSideBarOpen: (open: boolean) => void;
  showMobileMenu: boolean;
  setShowMobileMenu: (showMobileMenu: boolean) => void;
}

const useAppStore = create<AppState>((set) => ({
  session: Cookies.get("session") || null,
  setSession: (session: string) => {
    Cookies.set("session", session);
    set({ session });
  },
  sideBarOpen: true,
  setSideBarOpen: (open: boolean) => {
    set({ sideBarOpen: open });
  },
  showMobileMenu: false,
  setShowMobileMenu: (showMobileMenu) => set({ showMobileMenu: showMobileMenu }),
  // user: Cookies.get("user") || null,
  // setUser: (user: string) => {
  //   Cookies.set("user", user);
  //   set({ user });
  // },
  // clearUser: () => {
  //   Cookies.remove("user");
  //   set({ user: null });
  // },
}));

export default useAppStore;
