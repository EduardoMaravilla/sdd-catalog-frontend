import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Alert,
} from "react-bootstrap";
import {FC, FormEvent, useState} from "react";
import { useForm } from "../hooks/useForm";
import { isApiResponseError, isValidEmail } from "../utilities/funcionExport";
import { useRacerResetPasswordService } from "../services/racer/useRacerResetPasswordService";
import { ValidTokenResponse } from "../types/TypesUserLogin";
import HReCaptchaComponent from "../components/utils/HReCaptchaComponent";
import { AuthenticationContext } from "../context/auth/AuthenticationContext";
import { useAuth } from "../context/auth/useAuth";
import SpinnerComponent from "../components/utils/SpinnerComponent";

type ForgotPasswordPageProps = {
  t: (key: string) => string;
};

const initialForm = {
  emailReset: "",
};

const ForgotPasswordPage: FC<ForgotPasswordPageProps> = ({ t }) => {
  const [successRegister, setSuccessRegister] = useState<boolean>(false);
  const [failSendEmail, setFailSendEmail] = useState<boolean>(false);
  const [emailFail, setEmailFail] = useState<boolean>(false);
  const [showConnectError, setShowConnectError] = useState<boolean>(false);
  const [isValidCaptcha, setIsValidCaptcha] = useState<boolean>(false);

  const { formState, onInputChange, resetForm } = useForm(initialForm);
  const { emailReset } = formState;
  const resetPasswordService = useRacerResetPasswordService();

  const { isLoading, setIsLoading, isAuthenticated } = useAuth(
    AuthenticationContext
  );


  const onResetPassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    if (!isValidCaptcha){
      setIsLoading(false);
      return;
    }

    if (!isValidEmail(emailReset)) {
      setEmailFail(true);
      return;
    }
    resetPasswordService.chargeEmailInOptions(emailReset);
    const state = await resetPasswordService.getFetch();
    if (isApiResponseError(state.data)) {
      setFailSendEmail(true);
    } else if (state.errors) {
      setShowConnectError(true);
    } else {
      const response = state.data as ValidTokenResponse;
      if (response.valid) {
        setSuccessRegister(true);
        resetForm();
      } else {
        setFailSendEmail(true);
      }
    }
    setIsValidCaptcha(false);
    setIsLoading(false);
    setTimeout(() => {
      setShowConnectError(false);
      setSuccessRegister(false);
      setFailSendEmail(false);
      setEmailFail(false);
    }, 20000);
  };

  const onVerifyCaptcha = (isValid:boolean) => {
    setIsValidCaptcha(isValid);
  };

  return (
    <Container>
      <Row>
        <Col>
          <Card className="profile-card text-light border border-primary-subtle">
            <Card.Header className="text-center fw-bold fs-2">
              {t("forgotPasswordTitle")}
            </Card.Header>
            <Card.Body>
              <Form onSubmit={async (event) => await onResetPassword(event)}>
                {emailFail ? (
                  <Form.Group>
                    <Form.Label column={true} className="d-flex justify-content-center align-items-center text-center">
                      <Alert
                        variant="warning"
                        onClose={() => setEmailFail(false)}
                        dismissible
                      >
                        <p>{t("forgotPasswordInvalidError")}</p>
                      </Alert>
                    </Form.Label>
                  </Form.Group>
                ) : null}
                {failSendEmail ? (
                  <Form.Group>
                    <Form.Label column={true} className="d-flex justify-content-center align-items-center text-center">
                      <Alert
                        variant="danger"
                        onClose={() => setFailSendEmail(false)}
                        dismissible
                      >
                        <p>{t("forgotPasswordEmailInvalid")}</p>
                      </Alert>
                    </Form.Label>
                  </Form.Group>
                ) : null}
                {showConnectError ? (
                  <Form.Group>
                    <Form.Label column={true} className="d-flex justify-content-center align-items-center">
                      <Alert
                        variant="danger"
                        onClose={() => setShowConnectError(false)}
                        dismissible
                      >
                        <p>{t("loginConnectError")}</p>
                      </Alert>
                    </Form.Label>
                  </Form.Group>
                ) : null}
                {successRegister ? (
                  <Form.Group>
                    <Form.Label column={true} className="d-flex justify-content-center align-items-center text-center">
                      <Alert
                        variant="success"
                        onClose={() => setSuccessRegister(false)}
                        dismissible
                      >
                        <p>{t("forgotPasswordSuccessMessage")}</p>
                      </Alert>
                    </Form.Label>
                  </Form.Group>
                ) : null}
                <Form.Group>
                  <Form.Label column={true} htmlFor="emailReset" className="fw-bold fs-4">
                    {t("cAEmail")}
                  </Form.Label>
                  <Form.Control
                    id="emailReset"
                    name="emailReset"
                    value={emailReset}
                    className={`bg-dark text-light fw-medium ${
                      isLoading ? "disabled-custom" : ""
                    }`}
                    type="email"
                    placeholder={t("cAEmailText")}
                    onChange={onInputChange}
                    required
                    autoComplete="off"
                  />
                  <Form.Text className="text-light">
                    {t("forgotPasswordText")}
                  </Form.Text>
                </Form.Group>
                {!isAuthenticated ? (
                  <HReCaptchaComponent t={t} onVerify={onVerifyCaptcha} />
                ) : null}
                {isLoading ? (
                  <SpinnerComponent />
                ) : (
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 mt-3 my-2"
                    disabled={isLoading || !isValidCaptcha}
                  >
                    {t("forgotPasswordButton")}
                  </Button>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPasswordPage;