import { useFetchData } from "../../hooks/useFetchData";
import { ContactFormRequest } from "../../types/TypeConctact";
import { ValidTokenResponse } from "../../types/TypesUserLogin";

const URL_Contact = `${import.meta.env.VITE_API_URL}${
  import.meta.env.VITE_API_URL_Auht_Contact
}`;

const headers = new Headers({
  "Content-Type": "application/json",
});

const options: RequestInit = {
  method: "POST",
  headers,
  credentials: "include",
};

export const useAuthContactService = () => {
  const chargeContactInOptions = (contactDto: ContactFormRequest) => {
    options.body = JSON.stringify(contactDto);
  };

  const { getFetch } = useFetchData<ValidTokenResponse>(URL_Contact, options);

  return { chargeContactInOptions, getFetch };
};
