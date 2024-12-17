import { CarConfigurationContextType } from "../../types/TypeCars";
import { Context, useContext } from "react";

export const useCarConfiguration = (
  CarConfigurationContext: Context<CarConfigurationContextType | undefined>
) => {
  const context = useContext(CarConfigurationContext);
  if (!context) {
    throw new Error(
      "useCarConfiguration must be used within a CarConfigurationProvider"
    );
  }
  return context;
};
