import {FC, ReactNode, useEffect, useMemo, useState} from "react";
import {AuthenticationContext} from "./AuthenticationContext";
import {
    generateRandomCoordinates,
    getTokenJwt,
    isApiResponseError,
    isValidTokenResponse,
} from "../../utilities/funcionExport";
import {useAuthValidTokenService} from "../../services/auth/useAuthValidTokenService";

export const AuthenticationProvider: FC<{
    children: ReactNode;
}> = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [jwtToken, setJwtToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const validationService = useAuthValidTokenService();

    useEffect(() => {
        const verifyToken = async () => {
            generateCoordinates();
            try {
                startLoading();
                const tokenJwt = await getTokenJwt();
                if (tokenJwt) {
                    const state = await validationService.getFetch();
                    if (isApiResponseError(state.data)) {
                        clearAuthState();
                    } else if (isValidTokenResponse(state.data)) {
                        if (state.data.valid) {
                            setIsAuthenticated(true);
                            setJwtToken(tokenJwt);
                        } else {
                            clearAuthState();
                        }
                    } else {
                        clearAuthState();
                    }
                }
                finishLoading();
            } catch (error) {
                console.error("Error fetching token validation:", error);
                clearAuthState();
                finishLoading();
            }
        };
        verifyToken().then();
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    const startLoading = () => {
        setIsLoading(true);
    }

    const finishLoading = () => {
        setIsLoading(false);
    }

    const clearAuthState = () => {
        localStorage.removeItem("token-jwt-nfs-catalog-unbound");
        localStorage.removeItem("user-profile-response");
        setIsAuthenticated(false);
        setJwtToken(null);
    };

    const generateCoordinates = () => {
        const { latitud, longitud } = generateRandomCoordinates();
        if (!localStorage.getItem("app-latitude") || !localStorage.getItem("app-longitude")) {
            localStorage.setItem("app-latitude", latitud.toString());
            localStorage.setItem("app-longitude", longitud.toString());
        } 
    };
    

    const authProviders = useMemo(() => ({
        isAuthenticated,
        setIsAuthenticated,
        jwtToken,
        setJwtToken,
        isLoading,
        setIsLoading,
    }), [isAuthenticated,jwtToken,isLoading]);

    return (
        <AuthenticationContext.Provider
            value={authProviders}
        >
            {children}
        </AuthenticationContext.Provider>
    );
};
