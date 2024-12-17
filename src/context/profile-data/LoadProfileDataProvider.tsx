import { FC, ReactNode, useEffect, useMemo, useState } from "react";
import { LoadProfileDataContext } from "./LoadProfileDataContext";
import { UserProfileResponse } from "../../types/TypeConctact";
import { useAuth } from "../auth/useAuth";
import { AuthenticationContext } from "../auth/AuthenticationContext";
import { useAuthProfileService } from "../../services/auth/useAuthProfileService";
import {
  isApiResponseError,
  isUserProfileResponse,
  loadDataFromLocalStorage,
} from "../../utilities/funcionExport";
import { CarConfigurationDto } from "../../types/TypeCars";
import { useGetAllRacerCarService } from "../../services/racer-car-configuration/useGetAllRacerCarService";

const initialProfile: UserProfileResponse = {
  name: "",
  email: "",
  role: "",
  username: "",
  color: "",
};

export const LoadProfileDataProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userProfile, setUserProfile] =
    useState<UserProfileResponse>(initialProfile);
  const { jwtToken, setIsLoading } = useAuth(AuthenticationContext);
  const [profileAllCarConfigs, setProfileAllCarConfigs] = useState<
    CarConfigurationDto[]
  >([]);
  const [profileCommunityAllCarConfigs, setProfileCommunityAllCarConfigs] = useState<CarConfigurationDto[]>([]);

  const profileService = useAuthProfileService();
  const profileAllCarService = useGetAllRacerCarService();

  useEffect(() => {
    const getUserProfile = async () => {
      setIsLoading(true);
      const userProfile = loadDataFromLocalStorage<UserProfileResponse>(
        "user-profile-response"
      );
      if (userProfile) {
        setUserProfile(userProfile);
      } else if (jwtToken) {
        profileService.chargeTokenInOptions(jwtToken);
        const response = await profileService.getFetch();
        if (isApiResponseError(response.data)) {
          setUserProfile(initialProfile);
        } else if (isUserProfileResponse(response.data)) {
          setUserProfile(response.data);
          localStorage.setItem(
            "user-profile-response",
            JSON.stringify(response.data)
          );
        } else {
          console.error("Error al cargar el usuario:", response.data);
          setUserProfile(initialProfile);
        }
      }
      //Load Profile Car Configs
      const profileAllCars = loadDataFromLocalStorage<CarConfigurationDto[]>(
        "profileAllCarConfigs"
      );
      if (profileAllCars) {
        setProfileAllCarConfigs(profileAllCars);
      } else if(jwtToken) {
        const profileAllCarFetch = await profileAllCarService.getFetch();
        if (profileAllCarFetch.data) {
          if (isApiResponseError(profileAllCarFetch.data)) {
            console.error(
              "Error al cargar los datos de configuraciones de carro:",
              profileAllCarFetch.data
            );
            setProfileAllCarConfigs([]);
          } else {
            setProfileAllCarConfigs(profileAllCarFetch.data);
            localStorage.setItem(
              "profileAllCarConfigs",
              JSON.stringify(profileAllCarFetch.data)
            );
          }
        }
      }
      //Load Community Car Configs
      const profileCommunityAllCars = loadDataFromLocalStorage<CarConfigurationDto[]>(
        "profileCommunityAllCarConfigs"
      );
      if (profileCommunityAllCars) {
        setProfileCommunityAllCarConfigs(profileCommunityAllCars);
      }else{
        setProfileCommunityAllCarConfigs([]);
        localStorage.setItem("profileCommunityAllCarConfigs",JSON.stringify(profileCommunityAllCarConfigs));
      }
      setIsLoading(false);
    };
    getUserProfile().then();
  }, [jwtToken]); // eslint-disable-line react-hooks/exhaustive-deps

  const profile = useMemo(
    () => ({ userProfile, setUserProfile,profileAllCarConfigs,setProfileAllCarConfigs,profileCommunityAllCarConfigs,setProfileCommunityAllCarConfigs }),
    [userProfile,profileAllCarConfigs,profileCommunityAllCarConfigs]
  );

  return (
    <LoadProfileDataContext.Provider value={profile}>
      {children}
    </LoadProfileDataContext.Provider>
  );
};
