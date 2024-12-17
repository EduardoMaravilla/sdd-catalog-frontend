import { useFetchData } from "../../hooks/useFetchData";
import { LogoutResponse } from "../../types/TypesUserLogin";

const URL_LOGOUT = `${import.meta.env.VITE_API_URL}${
  import.meta.env.VITE_API_URL_Auht_Logout
}`;

const headers = new Headers({
  "Content-Type": "application/json",
});

const options: RequestInit = {
  method: "POST",
  headers,
  credentials: "include",
};

export const useAuthLogoutService = () => {
  

  const { getFetch } = useFetchData<LogoutResponse>(URL_LOGOUT, options);

  return { getFetch};
};
