import { create } from "zustand";
import { Store } from "../types/global";

export const useAppStore = create<Store>((set) => ({
  //authentication
  isAuth: false,
  setAuth: (value) => set({ isAuth: value }),
}));
