import { useFetchData } from "../../hooks/useFetchData";
import { CarConfigurationDto } from "../../types/TypeCars";

const URL_Get_All_Racer_Car = `${import.meta.env.VITE_API_URL}${
  import.meta.env.VITE_API_URL_Get_All_Racer_Car
}`;

const headers = new Headers({
  "Content-Type": "application/json",
  Authorization: "",
});

const options: RequestInit = {
  method: "POST",
  headers,
  credentials: "include",
};

export const useGetAllRacerCarService = () => {
  const { getFetch } = useFetchData<CarConfigurationDto[]>(
    URL_Get_All_Racer_Car,
    options
  );

  return { getFetch };
};
