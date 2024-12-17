import { useFetchData } from "../../hooks/useFetchData";
import { TurboTypeDto } from "../../types/TypeCars";

const URL_TurboTypes = `${import.meta.env.VITE_API_URL}${
  import.meta.env.VITE_API_URL_TurboTypes
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

export const useTurboTypesService = () => {
  const { getFetch } = useFetchData<TurboTypeDto[]>(URL_TurboTypes, options);

  return { getFetch };
};