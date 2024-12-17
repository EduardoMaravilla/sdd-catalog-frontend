import { useFetchData } from "../../hooks/useFetchData";
import { SuspensionDto } from "../../types/TypeCars";

const URL_Suspensions = `${import.meta.env.VITE_API_URL}${
  import.meta.env.VITE_API_URL_Suspensions
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

export const useSuspensionsService = () => {

  const { getFetch } = useFetchData<SuspensionDto[]>(URL_Suspensions, options);

  return { getFetch };
};