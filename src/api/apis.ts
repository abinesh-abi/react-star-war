import { CurdOperations } from "./AxiosInstance";

export const filmsCrud = new CurdOperations('/films')
export const peopleCrud = new CurdOperations('/people')