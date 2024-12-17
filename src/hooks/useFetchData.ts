import { FetchState } from "../types/TypeFetch";
import {  getTokenJwt } from "../utils/funcionExport";

export const useFetchData = <T>(url: string, options: RequestInit = {}) => {


  const getFetch = async (): Promise<FetchState<T>> => {
    const defaultState: FetchState<T> = {
      data: null,
      errors: null,
    };

    try {
    
      const latitude = localStorage.getItem("app-latitude");
      const longitude = localStorage.getItem("app-longitude");
      const jwtToken = await getTokenJwt();

      let headers: Headers;
      if (options.headers instanceof Headers) {
        headers = options.headers;
      } else {
        headers = new Headers(options.headers);
      }
     if(latitude && longitude){
      headers.set("Latitude", btoa(latitude));
      headers.set("Longitude", btoa(longitude));
     }
      

      if (jwtToken) {
        headers.set("Authorization", `Bearer ${jwtToken}`);
      }
      options.headers = headers;
      const response = await fetch(url, options);
      defaultState.data = await response.json();
      defaultState.errors = null;
    } catch (error) {
      defaultState.data = null;
      defaultState.errors =
        error instanceof Error ? error : new Error("Unknown error");
    }

    return defaultState;
  };

  return { getFetch };
};
