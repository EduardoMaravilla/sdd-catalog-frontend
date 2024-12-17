import { useFetchData } from "../../hooks/useFetchData";
import { LevelDto } from "../../types/TypeCars";

const URL_Levels = `${import.meta.env.VITE_API_URL}${
  import.meta.env.VITE_API_URL_Levels
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

export const useLevelsService = () => {
  
  const { getFetch } = useFetchData<LevelDto[]>(URL_Levels, options);

  return { getFetch};
};