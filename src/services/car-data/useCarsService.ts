import { useFetchData } from "../../hooks/useFetchData";
import { CarDto } from "../../types/TypeCars";

const URL_Cars= `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_API_URL_Cars}`;

const headers = new Headers({
  "Content-Type": "application/json",
  "Authorization": "",  
});

const options: RequestInit = {
  method: "GET",
  headers,
  credentials: "include",
};

export const useCarsService = () => {

  const { getFetch} = useFetchData<CarDto[]>(URL_Cars, options);

  return { getFetch};
}