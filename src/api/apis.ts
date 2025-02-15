import { CrudOperations } from "./AxiosInstance";

export const filmsCrud = new CrudOperations("/films");
export const peopleCrud = new CrudOperations("/people");
export const starShipCrud = new CrudOperations("/starships");
export const vehicleCrud = new CrudOperations("/vehicles");
export const speciesCrud = new CrudOperations("/species");
export const planetCrud = new CrudOperations("/planets");
