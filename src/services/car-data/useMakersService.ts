import { useFetchData } from "../../hooks/useFetchData";
import { MakerDto } from "../../types/TypeCars";

const URL_Makers = `${import.meta.env.VITE_API_URL}${
  import.meta.env.VITE_API_URL_Makers
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

export const useMakersService = () => {
  const { getFetch } = useFetchData<MakerDto[]>(URL_Makers, options);

  return { getFetch };
};
