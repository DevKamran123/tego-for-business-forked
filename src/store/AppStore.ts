import { create } from "zustand";
import Cookies from "js-cookie";

interface AppState {
  session: string | null;
  setSession: (session: string) => void;
  sideBarOpen: boolean;
  setSideBarOpen: (open: boolean) => void;
  showMobileMenu: boolean;
  setShowMobileMenu: (showMobileMenu: boolean) => void;
  // PHP API token storage
  phpToken: string | null;
  setPHPToken: (token: string | null) => void;
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
  phpToken: localStorage.getItem("php_access_token") || null,
  setPHPToken: (token: string | null) => {
    if (token) {
      localStorage.setItem("php_access_token", token);
    } else {
      localStorage.removeItem("php_access_token");
    }
    set({ phpToken: token });
  },
}));

export default useAppStore;
