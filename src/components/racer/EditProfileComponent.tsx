import {Alert, Button, Card, Col, Form, Row} from "react-bootstrap";
import {BsPersonCircle} from "react-icons/bs";
import HReCaptchaComponent from "../utils/HReCaptchaComponent.tsx";
import SpinnerComponent from "../utils/SpinnerComponent.tsx";
import {useLoadProfileData} from "../../context/profile-data/useLoadProfileData.ts";
import {LoadProfileDataContext} from "../../context/profile-data/LoadProfileDataContext.tsx";
import {useAuth} from "../../context/auth/useAuth.ts";
import {AuthenticationContext} from "../../context/auth/AuthenticationContext.tsx";
import {FC, FormEvent, useEffect } from "react";
import {AllState, UserEditProfileRequest} from "../../types/TypeConctact.ts";
import {useForm} from "../../hooks/useForm.ts";
import {useRacerUpdateProfileService} from "../../services/racer/useRacerUpdateProfileService.ts";
import {isApiResponseError, isNewUserProfileResponse} from "../../utils/funcionExport.ts";


interface EditProfileComponentProps {
    t:(key:string) => string;
    allState: AllState;
    setBooleanState: (key: string, value: boolean) => void;
}

export const EditProfileComponent:FC<EditProfileComponentProps> = ({t,allState,setBooleanState}) => {
    const { userProfile, setUserProfile } = useLoadProfileData(
        LoadProfileDataContext
    );
    const {setJwtToken, setIsLoading, isLoading } = useAuth(
        AuthenticationContext
    );

    const initialFormProfile: UserEditProfileRequest = {
        nameEdit: userProfile.name,
        emailEdit: userProfile.email,
        passwordEdit: "",
        roleEdit: userProfile.role,
        usernameEdit: userProfile.username,
        colorEdit: userProfile.color,
    };

    const profileForm = useForm<UserEditProfileRequest>(initialFormProfile);

    const {
        nameEdit,
        emailEdit,
        passwordEdit,
        roleEdit,
        usernameEdit,
        colorEdit,
    } = profileForm.formState;

    const updateProfileService = useRacerUpdateProfileService();

    const isPasswordVisibility = () => {
        setBooleanState("showPassword",!allState.showPassword)
    };

    const onSubmitEditProfile = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();
        setBooleanState("showPassword",false);
        setIsLoading(true);

        if (!allState.isValidCaptcha){
            setIsLoading(false);
            return;
        }

        updateProfileService.chargeDataInOptions(
            profileForm.formState
        );
        const state = await updateProfileService.getFetch();
        if (isApiResponseError(state.data)) {
            setBooleanState("failEditData", true);
        } else if (isNewUserProfileResponse(state.data)) {
            const editProfileResponse = state.data ;
            setUserProfile(editProfileResponse.userProfileResponse);
            setJwtToken(editProfileResponse.authenticationResponse.tokenJwt);
            localStorage.setItem(
                "user-profile-response",
                JSON.stringify(editProfileResponse.userProfileResponse)
            );
            localStorage.setItem(
                "token-jwt-nfs-catalog-unbound",
                editProfileResponse.authenticationResponse.tokenJwt
            );
            setBooleanState("dataEditSuccessfully",true);
        } else {
            setBooleanState("showConnectError",true);
        }
        setBooleanState("isValidCaptcha",false);
        setBooleanState("editData",false);
        setIsLoading(false);
    };

    const onVerifyCaptcha = (isValid:boolean) => {
        setBooleanState("isValidCaptcha",isValid);
    };

    useEffect(() => {
      profileForm.resetForm();
    }, [allState.editData]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setTimeout( () =>{
            setBooleanState("showConnectError",false);
            setBooleanState("failEditData",false);
            setBooleanState("dataEditSuccessfully",false);
        },5000 );
        
    } ,[allState.showConnectError,allState.failEditData, allState.dataEditSuccessfully]) // eslint-disable-line react-hooks/exhaustive-deps
    
  return (
      <Card className="my-3 profile-card text-light fw-medium border border-primary-subtle">
          <Card.Header className="fw-bold fs-4">
              {t("profilePageTitle")}
          </Card.Header>
          <Card.Body>
              {allState.showConnectError ? (
                  <Form.Group>
                      <Form.Label column={true} className="d-flex justify-content-center align-items-center" >
                          <Alert
                              variant="danger"
                              onClose={() => setBooleanState("showConnectError",true)}
                              dismissible
                          >
                              <p>{t("loginConnectError")}</p>
                          </Alert>
                      </Form.Label>
                  </Form.Group>
              ) : null}
              {allState.failEditData ? (
                  <Alert
                      variant="danger"
                      onClose={() => setBooleanState("failEditData",false)}
                      dismissible
                  >
                      {t("profileEditError")}
                  </Alert>
              ) : null}
              {allState.dataEditSuccessfully ? (
                  <Alert
                      variant="success"
                      onClose={() => setBooleanState("dataEditSuccessfully",false)}
                      dismissible
                  >
                      {t("profileChangeEditSuccess")}
                  </Alert>
              ) : null}
              <Form onSubmit={async (event) => await onSubmitEditProfile(event)}>
                  <Form.Group as={Row} className="my-2">
                      <Form.Label column={true} htmlFor="colorEdit" sm={2}>
                          <BsPersonCircle
                              size={100}
                              className="mb-3"
                              style={{ color: colorEdit }}
                          />
                      </Form.Label>
                      <Col sm={10}>
                          <Form.Control
                              id="colorEdit"
                              name="colorEdit"
                              type="color"
                              className={`bg-dark text-light fw-medium ${!allState.editData ? 'disabled-custom' : ''}`}
                              value={colorEdit}
                              onChange={profileForm.onInputChange}
                              title="Choose your color"
                              disabled={!allState.editData}
                          />
                      </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="my-2">
                      <Form.Label column={true} htmlFor="nameEdit" className="fs-5" sm={2}>
                          {t("profileName") + ":"}
                      </Form.Label>
                      <Col sm={10}>
                          <Form.Control
                              id="nameEdit"
                              name="nameEdit"
                              type="text"
                              className={`bg-dark text-light fw-medium ${!allState.editData ? 'disabled-custom' : ''}`}
                              value={nameEdit}
                              onChange={profileForm.onInputChange}
                              disabled={!allState.editData}
                          />
                      </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="my-2">
                      <Form.Label column={true} htmlFor="usernameEdit" className="fs-5" sm={2}>
                          {t("profileUsername") + ":"}
                      </Form.Label>
                      <Col sm={10}>
                          <Form.Control
                              id="usernameEdit"
                              name="usernameEdit"
                              type="text"
                              className={`bg-dark text-light fw-medium ${!allState.editData ? 'disabled-custom' : ''}`}
                              value={usernameEdit}
                              onChange={profileForm.onInputChange}
                              disabled={!allState.editData}
                          />
                      </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="my-2">
                      <Form.Label column={true} htmlFor="emailEdit" className="fs-5" sm={2}>
                          Email:
                      </Form.Label>
                      <Col sm={10}>
                          <Form.Control
                              id="emailEdit"
                              name="emailEdit"
                              type="email"
                              className="bg-dark text-light fw-medium disabled-custom"
                              value={emailEdit}
                              onChange={profileForm.onInputChange}
                              disabled
                          />
                      </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="my-2">
                      <Form.Label column={true} htmlFor="roleEdit" className="fs-5" sm={2}>
                          Role:
                      </Form.Label>
                      <Col sm={10}>
                          <Form.Control
                              id="roleEdit"
                              name="roleEdit"
                              type="text"
                              className="bg-dark text-light fw-medium disabled-custom"
                              value={roleEdit}
                              onChange={profileForm.onInputChange}
                              disabled
                          />
                      </Col>
                  </Form.Group>
                  {allState.editData ? (
                      <Form.Group as={Row} className="my-2">
                          <Form.Label column={true} htmlFor="passwordEdit" className="fs-5" sm={2}>
                              {t("profilePassword") + ":"}
                          </Form.Label>
                          <Col sm={10}>
                              <Form.Control
                                  id="passwordEdit"
                                  name="passwordEdit"
                                  className="bg-dark text-light fw-medium"
                                  type={allState.showPassword ? "text" : "password"}
                                  value={passwordEdit}
                                  onChange={profileForm.onInputChange}
                                  required
                                  disabled={!allState.editData}
                              />
                              <Form.Check
                                  id="showPassword"
                                  name="showPassword"
                                  className="fs-6 my-2"
                                  label={t("showPassword")}
                                  type="checkbox"
                                  checked={allState.showPassword}
                                  disabled={isLoading || !allState.editData}
                                  onChange={isPasswordVisibility}
                              />
                              <HReCaptchaComponent t={t} onVerify={onVerifyCaptcha} />
                          </Col>
                      </Form.Group>
                  ) : null}
                  {isLoading ? (
                      <SpinnerComponent />
                  ) : (
                      <>
                          <Button
                              className="mx-2 fs-5 text-light"
                              variant="info"
                              onClick={() => {
                                  setBooleanState("editData",!allState.editData)
                                  setBooleanState("showPassword",false);
                                  profileForm.resetForm();
                                  if (allState.editNewPassword) {
                                      setBooleanState("editNewPassword",false);
                                      setBooleanState("showNewPassword",false);
                                  }
                              }}
                          >
                              {allState.editData ? t("dontEditButton") : t("editButton")}
                          </Button>
                          <Button
                              variant="success"
                              type="submit"
                              className="fs-5 text-light"
                              disabled={!allState.editData || !allState.isValidCaptcha}
                          >
                              {t("saveButton")}
                          </Button>
                      </>
                  )}
              </Form>
          </Card.Body>
      </Card>
  )
}
