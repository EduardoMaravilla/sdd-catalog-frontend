import { BasicDataContextType } from "../../types/TypeCars";
import { Context, useContext } from "react";

export const useLoadBasicData = (LoadBasicDataContext : Context<BasicDataContextType | undefined> ) => {
    const context = useContext(LoadBasicDataContext);
    if (!context) {
      throw new Error("useLoadBasicData must be used within a LoadBasicDataProvider");
    }
    return context;
};