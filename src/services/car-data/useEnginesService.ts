import { useFetchData } from "../../hooks/useFetchData";
import { EngineDto } from "../../types/TypeCars";

const URL_Engines= `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_API_URL_Engines}`;

const headers = new Headers({
  "Content-Type": "application/json",
  "Authorization": "",  
});

const options: RequestInit = {
  method: "GET",
  headers,
  credentials: "include",
};

export const useEnginesService = () => {

  const { getFetch} = useFetchData<EngineDto[]>(URL_Engines, options);

  return { getFetch};
}