import { Alert, Button, Card, Col, Form, Row } from "react-bootstrap";
import HReCaptchaComponent from "../utils/HReCaptchaComponent.tsx";
import SpinnerComponent from "../utils/SpinnerComponent.tsx";
import { FC, FormEvent, useEffect, useState } from "react";
import {
  getPasswordValidationIssues,
  isApiResponseError,
  isNewUserProfileResponse
} from "../../utils/funcionExport.ts";
import {
  AllState,
  NewUpdatePasswordRequest,
} from "../../types/TypeConctact.ts";
import { useRacerProfileUpdatePasswordService } from "../../services/racer/useRacerProfileUpdatePasswordService.ts";
import { useForm } from "../../hooks/useForm.ts";
import { useAuth } from "../../context/auth/useAuth.ts";
import { AuthenticationContext } from "../../context/auth/AuthenticationContext.tsx";
import { useLoadProfileData } from "../../context/profile-data/useLoadProfileData.ts";
import { LoadProfileDataContext } from "../../context/profile-data/LoadProfileDataContext.tsx";

interface ChangePasswordComponentProps {
  t: (key: string) => string;
  allState: AllState;
  setBooleanState: (key: string, value: boolean) => void;
}

export const ChangePasswordComponent: FC<ChangePasswordComponentProps> = ({
  t,
  allState,
  setBooleanState,
}) => {
  const initialFormPassword: NewUpdatePasswordRequest = {
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const { setUserProfile } = useLoadProfileData(LoadProfileDataContext);

  const { setJwtToken, setIsLoading, isLoading } = useAuth(
    AuthenticationContext
  );
  const [passwordIssues, setPasswordIssues] = useState<string[]>([]);
  const passwordForm = useForm<NewUpdatePasswordRequest>(initialFormPassword);
  const { currentPassword, newPassword, confirmNewPassword } =
    passwordForm.formState;
  const updatePasswordService = useRacerProfileUpdatePasswordService();

  const onSubmitEditPassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setBooleanState("showNewPassword", false);

    const count = verifyPassword(passwordForm.formState);
    if (count > 0) {
      setIsLoading(false);
      return;
    }

    if (!allState.isValidCaptcha) {
      setIsLoading(false);
      return;
    }

    updatePasswordService.chargeDataInOptions(
      passwordForm.formState
    );
    const state = await updatePasswordService.getFetch();
    if (isApiResponseError(state.data)) {
      setBooleanState("failEditNewPassword", true);
    } else if (isNewUserProfileResponse(state.data)) {
      const editProfileResponse = state.data;

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
      setBooleanState("passwordChangeSuccessfully", true);
    } else {
      setBooleanState("showConnectError", true);
    }
    passwordForm.resetForm();
    setBooleanState("editNewPassword", false);
    setBooleanState("isValidCaptcha", false);
    setIsLoading(false);
  };

  const isNewPasswordVisibility = () => {
    setBooleanState("showNewPassword", !allState.showNewPassword);
  };

  const verifyPassword = (password: NewUpdatePasswordRequest) => {
    let count = 0;
    if (password.newPassword !== password.confirmNewPassword) {
      setBooleanState("failNewConfirmPassword", true);
      count++;
    } else {
      setBooleanState("failNewConfirmPassword", false);
    }
    const newPasswordIssues = getPasswordValidationIssues(password.newPassword);
    if (newPasswordIssues.length > 0) {
      setPasswordIssues(newPasswordIssues);
      setBooleanState("failNewPassword", true);
      count++;
    } else {
      setBooleanState("failNewPassword", false);
      setPasswordIssues([]);
    }
    return count;
  };

  const onVerifyCaptcha = (isValid: boolean) => {
    setBooleanState("isValidCaptcha", isValid);
  };

  useEffect(() => {
    passwordForm.resetForm();
  }, [allState.editNewPassword]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setTimeout(() => {
      setBooleanState("failEditNewPassword", false);
      setBooleanState("passwordChangeSuccessfully", false);
    }, 5000);
  }, [allState.failEditNewPassword, allState.passwordChangeSuccessfully]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Card className="my-3 profile-card text-light fw-medium border border-primary-subtle">
      <Card.Header className="fw-bold fs-4">
        {t("profileChangePassword")}
      </Card.Header>
      <Card.Body>
        {allState.failEditNewPassword ? (
          <Alert
            variant="danger"
            onClose={() => setBooleanState("failEditNewPassword", false)}
            dismissible
          >
            {t("profileEditErrorPassword")}
          </Alert>
        ) : null}
        {allState.passwordChangeSuccessfully ? (
          <Alert
            variant="success"
            onClose={() => setBooleanState("passwordChangeSuccessfully", false)}
            dismissible
          >
            {t("profilePasswordChangeSuccess")}
          </Alert>
        ) : null}
        <Form onSubmit={async (event) => await onSubmitEditPassword(event)}>
          <Form.Group as={Row} className="my-2">
            <Form.Label
              htmlFor="currentPassword"
              className="fs-5"
              column={true}
              sm={2}
            >
              {t("profileCurrentPassword") + ":"}
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                id="currentPassword"
                name="currentPassword"
                type={allState.showNewPassword ? "text" : "password"}
                value={currentPassword}
                className={`bg-dark text-light fw-medium ${
                  !allState.editNewPassword ? "disabled-custom" : ""
                }`}
                onChange={passwordForm.onInputChange}
                required
                disabled={isLoading || !allState.editNewPassword}
              />
              <Form.Check
                id="showNewPassword"
                name="showNewPassword"
                className="fs-6 my-2"
                label={t("showPassword")}
                type="checkbox"
                checked={allState.showNewPassword}
                onChange={isNewPasswordVisibility}
                disabled={isLoading || !allState.editNewPassword}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="my-2">
            <Form.Label
              htmlFor="newPassword"
              className="fs-5"
              column={true}
              sm={2}
            >
              {t("profileNewPassword") + ":"}
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                id="newPassword"
                name="newPassword"
                className={`bg-dark text-light fw-medium ${
                  !allState.editNewPassword ? "disabled-custom" : ""
                }`}
                type={allState.showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={passwordForm.onInputChange}
                required
                disabled={!allState.editNewPassword}
              />
              <Form.Text>
                <span
                  className={
                    passwordIssues.includes("p8") ||
                    (!/^.{8,}$/.test(newPassword) && newPassword.length > 0)
                      ? "text-danger"
                      : "text-secondary"
                  }
                >
                  {t("cAPasswordMessage1")}
                </span>
                <span
                  className={
                    passwordIssues.includes("pM") ||
                    (!/[A-Z]/.test(newPassword) && newPassword.length > 0)
                      ? "text-danger"
                      : "text-secondary"
                  }
                >
                  {t("cAPasswordMessage2")}
                </span>
                <span
                  className={
                    passwordIssues.includes("pm") ||
                    (!/[a-z]/.test(newPassword) && newPassword.length > 0)
                      ? "text-danger"
                      : "text-secondary"
                  }
                >
                  {t("cAPasswordMessage3")}
                </span>
                <span
                  className={
                    passwordIssues.includes("pN") ||
                    (!/\d/.test(newPassword) && newPassword.length > 0)
                      ? "text-danger"
                      : "text-secondary"
                  }
                >
                  {t("cAPasswordMessage4")}
                </span>
                <span
                  className={
                    passwordIssues.includes("pE") ||
                    (!/[!@#$%^&*+ñ-]/.test(newPassword) &&
                      newPassword.length > 0)
                      ? "text-danger"
                      : "text-secondary"
                  }
                >
                  {t("cAPasswordMessage5")}
                </span>
              </Form.Text>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="my-2">
            <Form.Label
              htmlFor="confirmNewPassword"
              className="fs-5"
              column={true}
              sm={2}
            >
              {t("profileNewConfirmPassword") + ":"}
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                id="confirmNewPassword"
                name="confirmNewPassword"
                className={`bg-dark text-light fw-medium ${
                  !allState.editNewPassword ? "disabled-custom" : ""
                }`}
                type={allState.showNewPassword ? "text" : "password"}
                value={confirmNewPassword}
                onChange={passwordForm.onInputChange}
                required
                disabled={!allState.editNewPassword}
              />
              <Form.Text
                className={
                  allState.failNewConfirmPassword
                    ? "text-danger"
                    : "text-secondary"
                }
              >
                {t("cAConfirmPasswordMessage")}
              </Form.Text>
              {allState.editNewPassword ? (
                <HReCaptchaComponent t={t} onVerify={onVerifyCaptcha} />
              ) : null}
            </Col>
          </Form.Group>
          {isLoading ? (
            <SpinnerComponent />
          ) : (
            <>
              <Button
                variant="info"
                className="mx-2 my-2 fs-5 text-light"
                onClick={() => {
                  setBooleanState("editNewPassword", !allState.editNewPassword);
                  setBooleanState("showNewPassword", false);
                  setBooleanState("failNewPassword", false);
                  setBooleanState("failNewConfirmPassword", false);
                  passwordForm.resetForm();
                  if (allState.editData) {
                    setBooleanState("editData", false);
                  }
                }}
              >
                {allState.editNewPassword
                  ? t("profileButtonCancel")
                  : t("profileButtonChangePassword")}
              </Button>
              <Button
                className="fs-5 text-light my-2"
                variant="success"
                type="submit"
                disabled={!allState.editNewPassword || !allState.isValidCaptcha}
              >
                {t("saveButton")}
              </Button>
            </>
          )}
        </Form>
      </Card.Body>
    </Card>
  );
};
