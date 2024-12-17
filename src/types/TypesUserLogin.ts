export interface AuthenticationRequest {
    usernameOrEmail: string;
    password: string;
    latitude: number;
    longitude: number;
}

export interface AuthenticationResponse {
    tokenJwt: string;
}
export interface LogoutResponse {
    message: string;
}

export interface ValidTokenResponse {
    valid: boolean;
}

export interface AuthContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
    jwtToken: string | null;
    setJwtToken: (value: string) => void;
    isLoading: boolean;
    setIsLoading: (value: boolean) => void;
}