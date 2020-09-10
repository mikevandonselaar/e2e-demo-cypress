import axios, { AxiosInstance } from "axios";

export class TestDataManager {
  generator: AxiosInstance;
  apiUrl: string;
  authHeaders: any;

  constructor(apiUrl: string, authHeaders: any = null) {
    this.apiUrl = apiUrl;
    this.authHeaders = authHeaders
      ? authHeaders
      : getAuthHeadersFromLocalStorage();
    this.generator = axios.create({
      baseURL: apiUrl,
      headers: this.authHeaders,
    });
  }
}

export function getAuthHeadersFromLocalStorage(): any {
  return {
    Authorization: `Token ${window.localStorage.getItem("jwtToken")}`,
  };
}
