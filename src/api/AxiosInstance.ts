import axios from "axios";


// axiosInstance
export const axiosInstance = axios.create({
  baseURL:'https://swapi.dev/api/' ,
});

export class CrudOperations {
  private api: string;
  constructor(api: string) {
    this.api = api;
  }
  get = async (query: string = "") => {
    try {
      const response: Axios.AxiosXHR<any> = await axiosInstance.get(
        `${this.api}${query}`
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  };
  retrieve = async (id: number | string, query: string = "") => {
    try {
      const response: Axios.AxiosXHR<any> = await axiosInstance.get(
        `${this.api}/${id}${query}`
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  };
}
