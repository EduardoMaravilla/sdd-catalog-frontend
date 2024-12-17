import { Context, useContext } from "react";
import { UserProfileContext } from "../../types/TypeConctact";


export const useLoadProfileData = (LoadProfileDataContext: Context<UserProfileContext | undefined>) => {
    const context = useContext(LoadProfileDataContext);
    if (!context) {
      throw new Error("useLoadProfileData must be used within a LoadProfileDataProvider");
    }
    return context;
}
