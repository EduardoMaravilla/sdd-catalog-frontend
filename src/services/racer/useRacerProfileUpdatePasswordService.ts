import { useFetchData } from "../../hooks/useFetchData";
import { NewUpdatePasswordRequest, NewUserProfileResponse } from "../../types/TypeConctact";

const URL_Profile_Update_Password = `${import.meta.env.VITE_API_URL}${
  import.meta.env.VITE_API_URL_Profile_Password_Update
}`;

const headers = new Headers({
  "Content-Type": "application/json",
  Authorization: `Bearer `,
});

const options: RequestInit = {
  method: "POST",
  headers,
  credentials: "include",
};

export const useRacerProfileUpdatePasswordService = () => {
    const chargeDataInOptions = (newUpdatePasswordRequest: NewUpdatePasswordRequest ) => {
        options.body = JSON.stringify(newUpdatePasswordRequest);
      };
  
      const { getFetch } = useFetchData<NewUserProfileResponse>(URL_Profile_Update_Password, options);

  return {getFetch , chargeDataInOptions};
};
