import { useFetchData } from "../../hooks/useFetchData";
import { CarConfigurationDto, FilterCar } from "../../types/TypeCars";
import { PagedResponse } from "../../types/TypeFetch";


const URL_Get_All_Cars_With_Filter = `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_API_URL_Car_Config_filter}`;

const headers = new Headers({
    "Content-Type": "application/json",
    Authorization: "",
  });
  
  const options: RequestInit = {
    method: "POST",
    headers,
    credentials: "include",
  };

export const useGetAllCarsWithFilterService = () => {
  
    const useChargeDataInOptions = (
        filter: FilterCar,
        page: number,
        pageSize: number
    ) => {
        options.body = JSON.stringify(filter);
        const newURL = `${URL_Get_All_Cars_With_Filter}?page=${page}&size=${pageSize}`;
        const { getFetch } = useFetchData<PagedResponse<CarConfigurationDto>>(newURL, options);
        return { getFetch };
    };
    return {useChargeDataInOptions};    
}
