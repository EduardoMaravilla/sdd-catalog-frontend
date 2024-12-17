import {
  NewUserProfileResponse,
  UserProfileResponse,
} from "../types/TypeConctact";
import { ApiResponseError } from "../types/TypesErrors";
import {
  AuthenticationResponse,
  LogoutResponse,
  ValidTokenResponse,
} from "../types/TypesUserLogin";

export function isApiResponseError(data: unknown): data is ApiResponseError {
  if (typeof data === "object" && data !== null) {
    const error = data as ApiResponseError;

    return (
      typeof error.backendMessage === "string" &&
      typeof error.message === "string" &&
      typeof error.url === "string" &&
      typeof error.method === "string" &&
      typeof error.timesTamp === "string"
    );
  }
  return false;
}

export function isAuthenticationResponse(
  data: unknown
): data is AuthenticationResponse {
  if (typeof data === "object" && data !== null) {
    const response = data as AuthenticationResponse;
    return typeof response.tokenJwt === "string";
  }
  return false;
}

export function isLogoutResponse(data: unknown): data is LogoutResponse {
  if (typeof data === "object" && data !== null) {
    const response = data as LogoutResponse;
    return typeof response.message === "string";
  }
  return false;
}

export function isValidTokenResponse(
  data: unknown
): data is ValidTokenResponse {
  if (typeof data === "object" && data !== null) {
    const response = data as ValidTokenResponse;
    return typeof response.valid === "boolean";
  }
  return false;
}

export function isUserProfileResponse(
  data: unknown
): data is UserProfileResponse {
  if (typeof data === "object" && data !== null) {
    const response = data as UserProfileResponse;
    return (
      typeof response.name === "string" &&
      typeof response.username === "string" &&
      typeof response.email === "string" &&
      typeof response.role === "string"
    );
  }
  return false;
}

export function isNewUserProfileResponse(
  data: unknown
): data is NewUserProfileResponse {
  if (typeof data === "object" && data !== null) {
    const response = data as NewUserProfileResponse;
    return (
      isUserProfileResponse(response.userProfileResponse) &&
      isAuthenticationResponse(response.authenticationResponse)
    );
  }
  return false;
}

export function loadDataFromLocalStorage<T>(key: string): T | null {
  const savedData = localStorage.getItem(key);
  return savedData ? JSON.parse(savedData) : null;
}

export function getColorLevel(level: number) {
  switch (level) {
    case 1:
      return "#F7C614";
    case 2:
      return "#F6941D";
    case 3:
      return "#A2CD59";
    case 4:
      return "#FF1D25";
    case 5:
      return "#662D91";
    default:
      return "white";
  }
}

export function isValidStringLength(input: string): boolean {
  return input.length >= 5 && input.length <= 50;
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPassword(password: string): boolean {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-])[A-Za-z\d!@#$%^&*ñ-]{8,}$/;
  return passwordRegex.test(password);
}

export function getPasswordValidationIssues(password: string): string[] {
  const issues: string[] = [];
  const requirements = [
    { key: 'p8', regex: /^.{8,}$/ }, 
    { key: 'pm', regex: /[a-z]/ }, 
    { key: 'pM', regex: /[A-Z]/ }, 
    { key: 'pE', regex: /[!@#$%^&*+ñ-]/ }, 
    { key: 'pN', regex: /\d/ } 
  ];

  for (const requirement of requirements) {
    if (!requirement.regex.test(password)) {
      issues.push(requirement.key);
    }
  }

  return issues;
}

export function getBackgroundForPath(path: string): string{
  switch (path) {
    case "/login":
      return "url('/images/background/loginBackground.webp')";
    default:
      return "url('/images/background/loginBackground.webp')";
  }
}

export const translationLevels: { [key:number]: string} = {
  1: "levelBasic",
  2: "levelSport",
  3: "levelPro",
  4: "levelSuper",
  5: "levelElite",
};

export const translationStreetType: { [key: number]: string } = {
  1: "streetTypeNormal",
  2: "streetTypeGrip",
  3: "streetTypeDrift",
  4: "streetTypeProDrift",
  5: "streetTypeAsphalt",
  6: "streetTypeOffRoad",
};

export const translationTurboType: { [key: number]: string } = {
  1: "naturallyAspired",
  2: "centrifugalSupercharger",
  3: "screwSupercharger",
  4: "turbocharger",
  5: "twinTurbo",
  6: "rootsSupercharger",
};

export function generateRandomCoordinates(): { latitud: number; longitud: number } {
  
  const latitud = parseFloat((Math.random() * 180 - 90).toFixed(6));
  const longitud = parseFloat((Math.random() * 360 - 180).toFixed(6));
  
  return { latitud, longitud };
}

export const getTokenJwt = async () => {
  return localStorage.getItem("token-jwt-nfs-catalog-unbound");
}

export const saveTokenJwt = async (jwtToken: string) => {
    localStorage.setItem("token-jwt-nfs-catalog-unbound", jwtToken);
}

export const removeTokenJwt = async () => {
    localStorage.removeItem("token-jwt-nfs-catalog-unbound");
}
