import { create } from "zustand";
import { Store } from "../types/global";
export const INITIAL_PAGINATION = {
  count: 0,
  next: null,
  previous: null,
  results: [],
};

export const useAppStore = create<Store>((set) => ({
  //authentication
  isAuth: false,
  setAuth: (value) => set({ isAuth: value }),

  //loading
  loading: 0,
  startLoading: () => set((state) => ({ loading: state.loading + 1 })),
  stopLoading: () => set((state) => ({ loading: state.loading - 1 })),

  //people
  people: INITIAL_PAGINATION,
  setPeople: (people) => set({ people }),

  //films
  films: INITIAL_PAGINATION,
  setFilms: (films) => set({ films }),
}));
