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
  isAuth: true,
  setAuth: (value) => set({ isAuth: value }),

  //people
  people: INITIAL_PAGINATION,
  setPeople: (people) => set({ people }),

  //films
  films: INITIAL_PAGINATION,
  setFilms: (films) => set({ films }),
}));
