import { useFetchData } from "../../hooks/useFetchData";
import { InitSkidDto } from "../../types/TypeCars";

const URL_InitSkids = `${import.meta.env.VITE_API_URL}${
  import.meta.env.VITE_API_URL_InitSkids
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

export const useInitSkidsService = () => {

  const { getFetch } = useFetchData<InitSkidDto[]>(URL_InitSkids, options);

  return { getFetch };
};