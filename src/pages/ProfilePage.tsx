import {FC, useState} from "react";

import {ChangePasswordComponent} from "../components/racer/ChangePasswordComponent.tsx";
import {EditProfileComponent} from "../components/racer/EditProfileComponent.tsx";
import { AllState } from "../types/TypeConctact.ts";

type ProfilePageProps = {
  t: (key: string) => string;
};

const ProfilePage: FC<ProfilePageProps> = ({ t }) => {

  const [allState, setAllState] = useState<AllState>({
    "showConnectError":false,
    "editData":false,
    "failEditData":false,
    "isValidCaptcha":false,
    "showPassword":false,
    "dataEditSuccessfully":false,
    "editNewPassword":false,
    "failEditNewPassword": false,
    "failNewPassword":false,
    "failNewConfirmPassword": false,
    "showNewPassword":false,
    "passwordChangeSuccessfully":false,
  });

  const setBooleanState = (key: string, value: boolean) => {
    setAllState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };


  return (
    <>
      <EditProfileComponent t={t} allState={allState} setBooleanState={setBooleanState}/>
      <ChangePasswordComponent t={t} allState={allState} setBooleanState={setBooleanState} />
    </>
  );
};

export default ProfilePage;
