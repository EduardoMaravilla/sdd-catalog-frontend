import { createContext } from "react";
import { AuthContextType } from "../../types/TypesUserLogin";

export const AuthenticationContext = createContext<AuthContextType | undefined>(undefined);