import { useFetchData } from "../../hooks/useFetchData";
import { GearDto } from "../../types/TypeCars";

const URL_Gears = `${import.meta.env.VITE_API_URL}${
  import.meta.env.VITE_API_URL_Gears
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

export const useGearsService = () => {
    const { getFetch } = useFetchData<GearDto[]>(URL_Gears, options);

  return { getFetch };
};
