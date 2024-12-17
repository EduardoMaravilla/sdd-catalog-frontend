import { useFetchData } from "../../hooks/useFetchData";
import { UserProfileResponse } from "../../types/TypeConctact";

const URL_Profile = `${import.meta.env.VITE_API_URL}${
  import.meta.env.VITE_API_URL_Auht_Profile
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

export const useAuthProfileService = () => {
  const chargeTokenInOptions = (jwtToken: string) => {
    headers.set("Authorization", `Bearer ${jwtToken}`);
  };

  const { getFetch } = useFetchData<UserProfileResponse>(URL_Profile, options);

  return { getFetch, chargeTokenInOptions };
};
