import { useFetchData } from "../../hooks/useFetchData";
import { ValidTokenResponse } from "../../types/TypesUserLogin";

const URL_Delete_Racer_Car = `${import.meta.env.VITE_API_URL}${
  import.meta.env.VITE_API_URL_Delete_Racer_Car
}`;

const headers = new Headers({
  "Content-Type": "application/json",
  Authorization: "",
});

const options: RequestInit = {
  method: "DELETE",
  headers,
  credentials: "include",
};

export const useDeleteRacerCarService = () => {
  const useChargeDataInOptions = (
    carConfigurationId: number
  ) => {
    const newURL = URL_Delete_Racer_Car + "/" + carConfigurationId;
    const { getFetch } = useFetchData<ValidTokenResponse>(newURL, options);

    return { getFetch };
  };

  return { useChargeDataInOptions };
};
