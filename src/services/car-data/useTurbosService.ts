import { useFetchData } from "../../hooks/useFetchData";
import { TurboDto } from "../../types/TypeCars";

const URL_Turbos = `${import.meta.env.VITE_API_URL}${
  import.meta.env.VITE_API_URL_Turbos
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

export const useTurbosService = () => {

  const { getFetch } = useFetchData<TurboDto[]>(URL_Turbos, options);

  return { getFetch };
};