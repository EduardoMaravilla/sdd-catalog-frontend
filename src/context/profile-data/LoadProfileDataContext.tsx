import { createContext } from "react";
import { UserProfileContext } from "../../types/TypeConctact";


export const LoadProfileDataContext = createContext<UserProfileContext | undefined>(undefined);