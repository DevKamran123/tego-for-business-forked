import { create } from "zustand";

interface CouponState {
  activeTab: string;
  setActiveTab: (value: string)=>void;
  currentId: string | number;
  setCurrentId: (value: string | number)=>void;
}

const useCouponStore = create<CouponState>((set) => ({
  activeTab: "available",
  setActiveTab: (activeTab) => set({ activeTab: activeTab }),
  currentId: "",
  setCurrentId: (currentId) => set({ currentId: currentId }),
  clearId: ()=>set({currentId: ""}),
}));

export default useCouponStore;
