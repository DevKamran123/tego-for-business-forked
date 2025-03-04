import { create } from "zustand";

interface RideState {
  activeTab: string;
  setActiveTab: (value: string)=>void;
  currentId: string | number;
  setCurrentId: (value: string | number)=>void;
}

const useRideStore = create<RideState>((set) => ({
  activeTab: "ride-history",
  setActiveTab: (activeTab) => set({ activeTab: activeTab }),
  currentId: "",
  setCurrentId: (currentId) => set({ currentId: currentId }),
  clearId: ()=>set({currentId: ""}),
}));

export default useRideStore;
