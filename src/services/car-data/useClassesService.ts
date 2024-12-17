import { useFetchData } from "../../hooks/useFetchData";
import { ClassesDto } from "../../types/TypeCars";

const URL_Classes= `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_API_URL_Classes}`;

const headers = new Headers({
  "Content-Type": "application/json",
  "Authorization": "",  
});

const options: RequestInit = {
  method: "GET",
  headers,
  credentials: "include",
};

export const useClassesService = () => {

  const { getFetch} = useFetchData<ClassesDto[]>(URL_Classes, options);

  return { getFetch};
}