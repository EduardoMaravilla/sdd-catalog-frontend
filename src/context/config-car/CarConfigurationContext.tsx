import { createContext } from "react";
import { CarConfigurationContextType } from "../../types/TypeCars";

export const CarConfigurationContext = createContext<
  CarConfigurationContextType | undefined
>(undefined);
