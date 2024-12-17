import { useFetchData } from "../../hooks/useFetchData";
import { TireDto } from "../../types/TypeCars";

const URL_Tires = `${import.meta.env.VITE_API_URL}${
  import.meta.env.VITE_API_URL_Tires
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

export const useTiresService = () => {

  const { getFetch } = useFetchData<TireDto[]>(URL_Tires, options);

  return { getFetch };
};