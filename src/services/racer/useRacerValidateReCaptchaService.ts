import { useFetchData } from "../../hooks/useFetchData";
import { ValidTokenResponse } from "../../types/TypesUserLogin";

const URL_Validate_ReCaptcha = `${import.meta.env.VITE_API_URL}${
  import.meta.env.VITE_API_URL_Verify_token_ReCaptcha
}`;

const headers = new Headers({
  "Content-Type": "application/json",
});

const options: RequestInit = {
  method: "POST",
  headers,
  credentials: "include",
};

export const useRacerValidateReCaptchaService = () => {
  const chargeCaptchaTokenInOptions = (token: string) => {
    options.body = JSON.stringify({ token });
  };

  const { getFetch } = useFetchData<ValidTokenResponse>(
    URL_Validate_ReCaptcha,
    options
  );

  return { getFetch, chargeCaptchaTokenInOptions };
};
