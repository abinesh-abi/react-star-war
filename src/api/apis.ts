import { CrudOperations } from "./AxiosInstance";

export const filmsCrud = new CrudOperations('/films')
export const peopleCrud = new CrudOperations('/people')