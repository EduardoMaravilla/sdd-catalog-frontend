import { useFetchData } from "../../hooks/useFetchData";
import { NewUserProfileResponse, UserEditProfileRequest } from "../../types/TypeConctact";

const URL_Racer_Update = `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_API_URL_Racer_Update}`;

const headers = new Headers({
    "Content-Type": "application/json",
    "Authorization": "",  
  });
  
  const options: RequestInit = {
    method: "POST",
    headers,
    credentials: "include",
  };

export const useRacerUpdateProfileService = () => {
    const chargeDataInOptions = ( userEditProfileRequest: UserEditProfileRequest) => {
        options.body = JSON.stringify(userEditProfileRequest); 
      };

      const { getFetch} = useFetchData<NewUserProfileResponse>(URL_Racer_Update, options);
  return {getFetch, chargeDataInOptions};
}
