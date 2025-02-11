export type User = { email: string; password: string };

export type Store = {
  isAuth: boolean;
  setAuth: (value: boolean) => void
};
