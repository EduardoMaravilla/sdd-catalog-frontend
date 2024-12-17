import { useFetchData } from "../../hooks/useFetchData";
import { NewUserProfileResponse } from "../../types/TypeConctact";

const URL_Racer_Valid_Email = `${import.meta.env.VITE_API_URL}${
  import.meta.env.VITE_API_URL_Validate_Email
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

export const useRacerValidateEmailService = () => {
  const chargeTokenInOptions = (jwtToken: string) => {
    headers.set("Authorization", `Bearer ${jwtToken}`);
  };

  const { getFetch } = useFetchData<NewUserProfileResponse>(
    URL_Racer_Valid_Email,
    options
  );
  return { getFetch, chargeTokenInOptions };
};
