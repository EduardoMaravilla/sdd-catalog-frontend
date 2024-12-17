import { useFetchData } from "../../hooks/useFetchData";
import { CarConfigurationDto } from "../../types/TypeCars";
import { ValidTokenResponse } from "../../types/TypesUserLogin";

const URL_Update_Racer_Car = `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_API_URL_Update_Racer_Car}`;

const headers = new Headers({
  "Content-Type": "application/json",
  Authorization: "",
});

const options: RequestInit = {
  method: "PUT",
  headers,
  credentials: "include",
};

export const useUpdateRacerCarService = () => {

  const useChargeDataInOptions = (
    carConfiguration: CarConfigurationDto
  ) => {
    options.body = JSON.stringify(carConfiguration);
    const newUrl = URL_Update_Racer_Car+"/"+carConfiguration.id;
    const { getFetch } = useFetchData<ValidTokenResponse>(newUrl, options);
    return { getFetch };
  };  

  return {useChargeDataInOptions};
};
