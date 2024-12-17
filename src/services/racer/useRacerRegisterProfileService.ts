import { useFetchData } from "../../hooks/useFetchData";
import { UserSaveDto } from "../../types/TypeConctact";
import { ValidTokenResponse } from "../../types/TypesUserLogin";

const URL_Register = `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_API_URL_Racer_Register}`

const headers = new Headers({
  "Content-Type": "application/json",
});

const options: RequestInit = {
  method: "POST",
  headers,
  credentials: "include",
};

export const useRacerRegisterProfileService = () => {

  const chargeRegisterInOptions = async (userSaveProfile: UserSaveDto) => {
   const latitude = localStorage.getItem("app-latitude");
    const longitude = localStorage.getItem("app-longitude");
   if(latitude && longitude){
    userSaveProfile.latitude = parseFloat(latitude);
    userSaveProfile.longitude = parseFloat(longitude);
   }else {
    userSaveProfile.latitude = 0.0
    userSaveProfile.longitude = 0.0
   }    
    options.body = JSON.stringify(userSaveProfile);
  };

  const { getFetch } = useFetchData<ValidTokenResponse>(URL_Register, options);

  return {getFetch ,chargeRegisterInOptions};
};
