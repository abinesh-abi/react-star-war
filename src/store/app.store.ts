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

  //staship
  starShips: INITIAL_PAGINATION,
  setStarShips: (starShips) => set({ starShips }),

  //vehicles
  vehicles: INITIAL_PAGINATION,
  setVehicles: (vehicles) => set({ vehicles }),

  //species
  species: INITIAL_PAGINATION,
  setSpecies: (species) => set({ species }),

  //planets
  planets: INITIAL_PAGINATION,
  setPlanets: (planets) => set({ planets }),
}));
