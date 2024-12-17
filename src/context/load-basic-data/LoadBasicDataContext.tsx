import { createContext } from "react";
import { BasicDataContextType } from "../../types/TypeCars";

export const LoadBasicDataContext = createContext<BasicDataContextType | undefined>(undefined);