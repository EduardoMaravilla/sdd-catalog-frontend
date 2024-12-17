import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthenticationRequest } from "../types/TypesUserLogin";
import { useForm } from "../hooks/useForm";
import { useAuth } from "../context/auth/useAuth";
import { AuthenticationContext } from "../context/auth/AuthenticationContext";
import { useAuthLoginService } from "../services/auth/useAuthLoginService";
import { FC, FormEvent, useState } from "react";
import {
  isApiResponseError,
  isAuthenticationResponse,
} from "../utils/funcionExport";
import HReCaptchaComponent from "../components/utils/HReCaptchaComponent";
import SpinnerComponent from "../components/utils/SpinnerComponent";
import { SuccessfulModal } from "../components/modals-components/SuccessfulModal";

type loginProps = {
  t: (key: string) => string;
};

const initialForm: AuthenticationRequest = {
  usernameOrEmail: "",
  password: "",
  latitude: 0.0,
  longitude: 0.0,
};

export const LoginPage: FC<loginProps> = ({ t }) => {
  const { formState, onInputChange, resetForm } =
    useForm<AuthenticationRequest>(initialForm);
  const { usernameOrEmail, password } = formState;

  const [showAuthError, setShowAuthError] = useState<boolean>(false);
  const [showEmailInvalidError, setShowEmailInvalidError] =
    useState<boolean>(false);
  const [showConnectError, setShowConnectError] = useState<boolean>(false);
  const [showUserNotRegister, setShowUserNotRegister] =
    useState<boolean>(false);

  const {
    setJwtToken,
    setIsAuthenticated,
    isLoading,
    setIsLoading,
    isAuthenticated,
  } = useAuth(AuthenticationContext);

  const authLoginService = useAuthLoginService();

  const [showSuccessfulModal, setShowSuccessfulModal] =
    useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isValidCaptcha, setIsValidCaptcha] = useState<boolean>(false);
  const navigate = useNavigate();

  const isPasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmitLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setShowPassword(false);

    if (!isValidCaptcha) {
      setIsLoading(false);
      return;
    }

    await authLoginService.chargeAuthRequestInOptions(formState);
    const state = await authLoginService.getFetch();
    if (isApiResponseError(state.data)) {
      const errorResponse = state.data;
      if (
        errorResponse.backendMessage === "Username or email don´t register!"
      ) {
        setShowUserNotRegister(true);
      } else if (errorResponse.backendMessage === "Email not validated!") {
        setShowEmailInvalidError(true);
      } else {
        setShowAuthError(true);
      }
      setIsLoading(false);
      setIsValidCaptcha(false);
      resetForm();
    } else if (isAuthenticationResponse(state.data)) {
      const authResponse = state.data;
      activeSuccessModal();
      localStorage.setItem(
        "token-jwt-nfs-catalog-unbound",
        authResponse.tokenJwt
      );
      setIsValidCaptcha(false);
      setJwtToken(authResponse.tokenJwt);
      
      setTimeout(() => {
        setIsAuthenticated(true);
        handleModalHide();
        setIsLoading(false);
        navigate("/home");
        resetForm();
      }, 10000);
    } else {
      setIsLoading(false);
      resetForm();
      setShowConnectError(true);
      setIsValidCaptcha(false);
    }
  };

  const onVerifyCaptcha = (isValid: boolean) => {
    setIsValidCaptcha(isValid);
  };

  const activeSuccessModal = () => {
    setShowSuccessfulModal(true);
  };

  const handleModalHide = () => {
    setShowSuccessfulModal(false);
  };

  return (
    <>
      <div className="d-flex flex-column w-100 h-100 justify-content-center align-items-center">
        <h2 className="text-center fs-1 text-light py-3">{t("initLogin")}</h2>
        <Form
          onSubmit={async (event) => await onSubmitLogin(event)}
          className="bg-login-custom p-3 rounded-3"
        >
          {showEmailInvalidError ? (
            <Form.Group>
              <Form.Label
                column={true}
                className="d-flex justify-content-center align-items-center text-center"
              >
                <Alert
                  variant="warning"
                  onClose={() => setShowEmailInvalidError(false)}
                  dismissible
                >
                  <p>{t("loginEmailInvalidError")}</p>
                </Alert>
              </Form.Label>
            </Form.Group>
          ) : null}
          {showAuthError ? (
            <Form.Group>
              <Form.Label
                column={true}
                className="d-flex justify-content-center align-items-center"
              >
                <Alert
                  variant="danger"
                  onClose={() => setShowAuthError(false)}
                  dismissible
                >
                  <p>{t("loginAuthError")}</p>
                </Alert>
              </Form.Label>
            </Form.Group>
          ) : null}
          {showConnectError ? (
            <Form.Group>
              <Form.Label
                column={true}
                className="d-flex justify-content-center align-items-center"
              >
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
          {showUserNotRegister ? (
            <Form.Group>
              <Form.Label
                column={true}
                className="d-flex justify-content-center align-items-center"
              >
                <Alert
                  variant="danger"
                  onClose={() => setShowUserNotRegister(false)}
                  dismissible
                >
                  <p>{t("loginUserNotRegisteredError")}</p>
                </Alert>
              </Form.Label>
            </Form.Group>
          ) : null}
          <Form.Group>
            <Form.Label
              column={true}
              htmlFor="usernameOrEmail"
              className="fs-5 fw-bold text-light"
            >
              {t("email")}
            </Form.Label>
            <Form.Control
              id="usernameOrEmail"
              name="usernameOrEmail"
              className="fw-medium"
              type="text"
              placeholder={t("emailMessage")}
              value={usernameOrEmail}
              onChange={onInputChange}
              disabled={isLoading}
              required
              autoComplete="email"
            />
          </Form.Group>
          <Form.Group className="my-2">
            <Row className="d-flex justify-content-between align-items-center ">
              <Col>
                <Form.Label
                  column={true}
                  htmlFor="password"
                  className="fs-5 fw-bold text-light"
                >
                  {t("password")}
                </Form.Label>
              </Col>
              <Col>
                <Form.Check
                  id="showPassword"
                  name="showPassword"
                  className="fs-6 align-items-center text-light"
                  reverse
                  label={t("showPassword")}
                  type="checkbox"
                  checked={showPassword}
                  disabled={isLoading}
                  onChange={isPasswordVisibility}
                />
              </Col>
            </Row>
            <Form.Control
              id="password"
              name="password"
              className="fw-medium"
              type={showPassword ? "text" : "password"}
              placeholder={t("passwordMessage")}
              value={password}
              onChange={onInputChange}
              disabled={isLoading}
              required
              autoComplete="current-password"
            />
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
              className="w-100 mt-3"
              disabled={isLoading || !isValidCaptcha}
            >
              {t("loginButton")}
            </Button>
          )}
          {!isLoading ? (
            <>
              <div className="text-center mt-3">
                <NavLink to="/forgot-password" className="text-light">
                  {t("forgotPassword")}
                </NavLink>
              </div>
              <div className="text-center mt-3">
                <NavLink to="/create-account" className="text-light">
                  {t("signUp")}
                </NavLink>
              </div>
            </>
          ) : null}
        </Form>
      </div>
      <SuccessfulModal
        t={t}
        show={showSuccessfulModal}
        onHide={handleModalHide}
        successfulMessage={t("successfulLogin")}
      />
    </>
  );
};
