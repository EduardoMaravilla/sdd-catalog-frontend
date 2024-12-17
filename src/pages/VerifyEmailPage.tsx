import { FC, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useRacerValidateEmailService } from "../services/racer/useRacerValidateEmailService";
import { useAuth } from "../context/auth/useAuth";
import { AuthenticationContext } from "../context/auth/AuthenticationContext";
import { isApiResponseError } from "../utils/funcionExport";
import { NewUserProfileResponse } from "../types/TypeConctact";
import { useLoadProfileData } from "../context/profile-data/useLoadProfileData";
import { LoadProfileDataContext } from "../context/profile-data/LoadProfileDataContext";
import HReCaptchaComponent from "../components/utils/HReCaptchaComponent";
import SpinnerComponent from "../components/utils/SpinnerComponent";

type VerifyEmailPageProps = {
  t: (key: string) => string;
};

export const VerifyEmailPage: FC<VerifyEmailPageProps> = ({ t }) => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const {
    setIsLoading,
    setIsAuthenticated,
    setJwtToken,
    isAuthenticated,
    isLoading,
  } = useAuth(AuthenticationContext);
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const [isValidCaptcha, setIsValidCaptcha] = useState<boolean>(false);
  const { setUserProfile } = useLoadProfileData(LoadProfileDataContext);

  const validateEmailService = useRacerValidateEmailService();

  const onVerifyEmail = async () => {
    setIsLoading(true);

    if (!isValidCaptcha) {
      setIsLoading(false);
      return;
    }
    if (token) {
      validateEmailService.chargeTokenInOptions(token);
      const state = await validateEmailService.getFetch();
      if (isApiResponseError(state.data)) {
        setShowWarning(true);
      } else {
        const newUserProfileResponse = state.data as NewUserProfileResponse;
        setIsAuthenticated(true);
        setJwtToken(newUserProfileResponse.authenticationResponse.tokenJwt);
        localStorage.setItem(
          "token-jwt-nfs-catalog-unbound",
          newUserProfileResponse.authenticationResponse.tokenJwt
        );
        setUserProfile(newUserProfileResponse.userProfileResponse);
        localStorage.setItem(
          "user-profile-response",
          JSON.stringify(newUserProfileResponse.userProfileResponse)
        );
      }
    }
    setIsLoading(false);
    setIsValidCaptcha(false);
  };

  const onVerifyCaptcha = (isValid: boolean) => {
    setIsValidCaptcha(isValid);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Row>
        <Col>
          <Card className="justify-content-center align-items-center my-2 border border-primary-sudtle profile-card">
            <Card.Header className="text-center fs-2 fw-bold text-light">
              {t("verifyEmailTitle")}
            </Card.Header>
            <Card.Body className="justify-content-center align-items-center text-center">
              {showWarning ? (
                <Form.Group>
                  <Form.Label
                    column={true}
                    className="justify-content-center align-items-center text-center"
                  >
                    <Alert
                      variant="warning"
                      onClose={() => setShowWarning(false)}
                      dismissible
                    >
                      <p>{t("verifyEmailInvalidError")}</p>
                    </Alert>
                  </Form.Label>
                </Form.Group>
              ) : null}
              {!isAuthenticated ? (
                <HReCaptchaComponent t={t} onVerify={onVerifyCaptcha} />
              ) : null}
              {isLoading ? (
                <SpinnerComponent />
              ) : (
                <Button
                  className="fs-3 my-2"
                  type="button"
                  onClick={async () => await onVerifyEmail()}
                  disabled={isLoading || !isValidCaptcha}
                >
                  {t("verifyEmailButton")}
                </Button>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
