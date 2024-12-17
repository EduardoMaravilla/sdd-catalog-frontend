import { Context, useContext } from "react";
import { AuthContextType } from "../../types/TypesUserLogin";

export const useAuth = (AuthenticationContext: Context<AuthContextType | undefined>) => {
    const context = useContext(AuthenticationContext);
    if (!context) {
      throw new Error("useAuth must be used within an AuthenticationProvider");
    }
    return context;
  };