export type User = { email: string; password: string };

export type Store = {
  isAuth: boolean;
  setAuth: (value: boolean) => void;

  //people
  people: PaginationResponse<People>;
  setPeople: (value: PaginationResponse<People>) => void;

  //films
  films: PaginationResponse<Film>;
  setFilms: (value: PaginationResponse<Film>) => void;
};
export type PaginationResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type People = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
};

export type Film = {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
};
