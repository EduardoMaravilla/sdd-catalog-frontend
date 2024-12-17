import {FC, ReactNode, useEffect, useMemo, useState} from "react";
import { CarConfigurationDto, initialCarConfiguration } from "../../types/TypeCars";
import { CarConfigurationContext } from "./CarConfigurationContext";
import { loadDataFromLocalStorage } from "../../utilities/funcionExport";

export const CarConfigurationProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [carConfigurationCreated, setCarConfigurationCreated] =
    useState<CarConfigurationDto>(JSON.parse(JSON.stringify(initialCarConfiguration)));

  useEffect(() => {
    const carConfigurationLocalStorage =
      loadDataFromLocalStorage<CarConfigurationDto>(
        "car-configuration-created"
      );
    if (carConfigurationLocalStorage) {
      setCarConfigurationCreated(carConfigurationLocalStorage);
    }else {
      localStorage.setItem(
        "car-configuration-created",
        JSON.stringify(carConfigurationCreated)
      );
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const carConfiguration = useMemo(() => ({carConfigurationCreated,setCarConfigurationCreated}),[carConfigurationCreated])

  return (
    <CarConfigurationContext.Provider
      value={carConfiguration}
    >
      {children}
    </CarConfigurationContext.Provider>
  );
};
