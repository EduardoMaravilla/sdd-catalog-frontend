import { FC, FormEvent, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { useAuth } from "../context/auth/useAuth";
import { AuthenticationContext } from "../context/auth/AuthenticationContext";
import { useForm } from "../hooks/useForm";
import {
  getPasswordValidationIssues,
  isApiResponseError
} from "../utils/funcionExport";
import { UpdatePasswordRequest } from "../types/TypeConctact";
import { useRacerUpdatePasswordService } from "../services/racer/useRacerUpdatePasswordService";
import { useSearchParams } from "react-router-dom";
import { ValidTokenResponse } from "../types/TypesUserLogin";
import HReCaptchaComponent from "../components/utils/HReCaptchaComponent";
import SpinnerComponent from "../components/utils/SpinnerComponent";

type UpdatePasswordPageProps = {
  t: (key: string) => string;
};

const initialForm: UpdatePasswordRequest = {
  password: "",
  confirmPassword: "",
};

const UpdatePasswordPage: FC<UpdatePasswordPageProps> = ({ t }) => {
  const { isLoading, setIsLoading, isAuthenticated } = useAuth(
    AuthenticationContext
  );
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [failEditPassword, setFailEditPassword] = useState<string[]>([]);
  const [failEditConfirmPassword, setFailEditConfirmPassword] =
    useState<boolean>(false);
  const [isServerError, setIsServerError] = useState<boolean>(false);
  const [successRegister, setSuccessRegister] = useState<boolean>(false);
  const [isValidCaptcha, setIsValidCaptcha] = useState<boolean>(false);

  const { formState, onInputChange, resetForm } = useForm(initialForm);
  const { password, confirmPassword } = formState;
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const updatePasswordService = useRacerUpdatePasswordService();

  const isPasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmitUpdatePassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setShowPassword(false);

    if (!isValidCaptcha) {
      setIsLoading(false);
      return;
    }

    const count = validateData(formState);
    if (count > 0) {
      setIsLoading(false);
      return;
    }
    if (token) {
      const newPassword: UpdatePasswordRequest = {
        password: password.trim(),
        confirmPassword: confirmPassword.trim(),
      };
      updatePasswordService.chargePasswordInOptions(newPassword, token);
      const state = await updatePasswordService.getFetch();
      if (isApiResponseError(state.data)) {
        setIsServerError(true);
      } else {
        const newResponse = state.data as ValidTokenResponse;
        if (newResponse.valid) {
          setSuccessRegister(true);
          resetForm();
        } else {
          setIsServerError(true);
        }
      }
      setIsValidCaptcha(false);
      setIsLoading(false);
      setTimeout(() => {
        setSuccessRegister(false);
        setFailEditPassword([]);
        setFailEditConfirmPassword(false);
        setIsServerError(false);
        setIsLoading(false);
      }, 10000);
    }
  };

  const validateData = (data: UpdatePasswordRequest) => {
    let count = 0;
    if (data.password.trim() !== data.confirmPassword.trim()) {
      setFailEditConfirmPassword(true);
      count++;
    } else {
      setFailEditConfirmPassword(false);
    }
    const newPasswordIssues = getPasswordValidationIssues(data.password.trim());
    if (newPasswordIssues.length > 0) {
      setFailEditPassword(newPasswordIssues);
      count++;
    } else {
      setFailEditPassword([]);
    }
    return count;
  };

  const onVerifyCaptcha = (isValid: boolean) => {
    setIsValidCaptcha(isValid);
  };

  return (
    <Container>
      <Row>
        <Col>
          <Card className="profile-card border border-primary-subtle text-light">
            <Card.Header className="text-center fw-bold fs-2">
              {t("forgotPasswordResetTitle")}
            </Card.Header>
            <Card.Body>
              <Form
                onSubmit={async (event) => await onSubmitUpdatePassword(event)}
              >
                {successRegister ? (
                  <Form.Group>
                    <Form.Label
                      column={true}
                      className="d-flex justify-content-center align-items-center text-center"
                    >
                      <Alert
                        variant="success"
                        onClose={() => setSuccessRegister(false)}
                        dismissible
                      >
                        <p>{t("forgotPasswordResetSuccessMessage")}</p>
                      </Alert>
                    </Form.Label>
                  </Form.Group>
                ) : null}
                {isServerError ? (
                  <Form.Group>
                    <Form.Label
                      column={true}
                      className="d-flex justify-content-center align-items-center"
                    >
                      <Alert
                        variant="danger"
                        onClose={() => setIsServerError(false)}
                        dismissible
                      >
                        <p>{t("loginConnectError")}</p>
                      </Alert>
                    </Form.Label>
                  </Form.Group>
                ) : null}
                <Form.Group className="mb-3">
                  <Row className="justify-content-between align-items-center">
                    <Col>
                      <Form.Label
                        column={true}
                        htmlFor="passwordRegister"
                        className="fw-bold fs-5"
                      >
                        {t("cAPassword")}
                      </Form.Label>
                    </Col>
                    <Col>
                      <Form.Check
                        id="showPassword"
                        name="showPassword"
                        reverse
                        label={t("showPassword")}
                        type="checkbox"
                        checked={showPassword}
                        onChange={isPasswordVisibility}
                        disabled={isLoading}
                      />
                    </Col>
                  </Row>
                  <Form.Control
                    id="passwordRegister"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    className="fw-medium"
                    placeholder={t("cAPasswordText")}
                    onChange={onInputChange}
                    autoComplete="new-password webauthn"
                    disabled={isLoading}
                    required
                  />
                  <Form.Text>
                    <span
                      className={
                        failEditPassword.includes("p8") ||
                        (!/^.{8,}$/.test(password) && password.length > 0)
                          ? "text-danger"
                          : "text-secondary"
                      }
                    >
                      {t("cAPasswordMessage1")}
                    </span>
                    <span
                      className={
                        failEditPassword.includes("pM") ||
                        (!/[A-Z]/.test(password) && password.length > 0)
                          ? "text-danger"
                          : "text-secondary"
                      }
                    >
                      {t("cAPasswordMessage2")}
                    </span>
                    <span
                      className={
                        failEditPassword.includes("pm") ||
                        (!/[a-z]/.test(password) && password.length > 0)
                          ? "text-danger"
                          : "text-secondary"
                      }
                    >
                      {t("cAPasswordMessage3")}
                    </span>
                    <span
                      className={
                        failEditPassword.includes("pN") ||
                        (!/\d/.test(password) && password.length > 0)
                          ? "text-danger"
                          : "text-secondary"
                      }
                    >
                      {t("cAPasswordMessage4")}
                    </span>
                    <span
                      className={
                        failEditPassword.includes("pE") ||
                        (!/[!@#$%^&*+ñ-]/.test(password) && password.length > 0)
                          ? "text-danger"
                          : "text-secondary"
                      }
                    >
                      {t("cAPasswordMessage5")}
                    </span>
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label
                    column={true}
                    htmlFor="repeatPasswordRegister"
                    className="fw-bold fs-5"
                  >
                    {t("cAConfirmPassword")}
                  </Form.Label>
                  <Form.Control
                    id="repeatPasswordRegister"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    className="fw-medium"
                    placeholder={t("cAConfirmPasswordText")}
                    onChange={onInputChange}
                    autoComplete="new-password webauthn"
                    disabled={isLoading}
                    required
                  />
                  <Form.Text
                    className={
                      failEditConfirmPassword ? "text-danger" : "text-secondary"
                    }
                  >
                    {t("cAConfirmPasswordMessage")}
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
                    {t("forgotPasswordResetButton")}
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

export default UpdatePasswordPage;
