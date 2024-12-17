import { useFetchData } from "../../hooks/useFetchData";
import { AuxiliarDto } from "../../types/TypeCars";

const URL_Auxiliaries= `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_API_URL_Auxiliaries}`;

const headers = new Headers({
  "Content-Type": "application/json",
  "Authorization": "",  
});

const options: RequestInit = {
  method: "GET",
  headers,
  credentials: "include",
};

export const useAuxiliariesService = () => {

  const { getFetch} = useFetchData<AuxiliarDto[]>(URL_Auxiliaries, options);

  return { getFetch};
}