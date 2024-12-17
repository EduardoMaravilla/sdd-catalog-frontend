import { useFetchData } from "../../hooks/useFetchData";
import { ValidTokenResponse } from "../../types/TypesUserLogin";

const URL_VALID_TOKEN = `${import.meta.env.VITE_API_URL}${
  import.meta.env.VITE_API_URL_Auht_Validtoken
}`;

const headers = new Headers({
  "Content-Type": "application/json",
});

const options: RequestInit = {
  method: "POST",
  headers,
  credentials: "include",
};

export const useAuthValidTokenService = () => {
  const { getFetch } = useFetchData<ValidTokenResponse>(
    URL_VALID_TOKEN,
    options
  );

  return { getFetch };
};
