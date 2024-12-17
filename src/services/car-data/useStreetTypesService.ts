import { useFetchData } from "../../hooks/useFetchData";
import { StreetTypeDto } from "../../types/TypeCars";

const URL_StreetTypes = `${import.meta.env.VITE_API_URL}${
  import.meta.env.VITE_API_URL_StreetTypes
}`;

const headers = new Headers({
  "Content-Type": "application/json",
  Authorization: "",
});

const options: RequestInit = {
  method: "GET",
  headers,
  credentials: "include",
};

export const useStreetTypesService = () => {

  const { getFetch } = useFetchData<StreetTypeDto[]>(URL_StreetTypes, options);

  return { getFetch };
};