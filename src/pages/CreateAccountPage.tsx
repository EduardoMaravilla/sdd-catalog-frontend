import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Alert,
} from "react-bootstrap";
import { ChangeEvent, FC, FormEvent, useState } from "react";
import { TermsAndConditionModal } from "../components/modals-components/TermsAndConditionModal";
import { UserSaveDto } from "../types/TypeConctact";
import { useForm } from "../hooks/useForm";
import {
  getPasswordValidationIssues,
  isApiResponseError,
  isValidEmail,
  isValidStringLength,
} from "../utilities/funcionExport";
import { useRacerRegisterProfileService } from "../services/racer/useRacerRegisterProfileService";
import { useAuth } from "../context/auth/useAuth";
import { AuthenticationContext } from "../context/auth/AuthenticationContext";
import { ValidTokenResponse } from "../types/TypesUserLogin";
import HReCaptchaComponent from "../components/utils/HReCaptchaComponent";
import SpinnerComponent from "../components/utils/SpinnerComponent";

type CreateAccountPageProps = {
  t: (key: string) => string;
};

const initialUserRegister: UserSaveDto = {
  name: "",
  username: "",
  email: "",
  password: "",
  repeatedPassword: "",
  latitude: 0.0,
  longitude: 0.0
};

const CreateAccountPage: FC<CreateAccountPageProps> = ({ t }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [failEditName, setFailEditName] = useState<boolean>(false);
  const [failEditUsername, setFailEditUsername] = useState<boolean>(false);
  const [failEditEmail, setFailEditEmail] = useState<boolean>(false);
  const [failEditPassword, setFailEditPassword] = useState<string[]>([]);

  const [failEditRepeatedPassword, setFailEditRepeatedPassword] =
    useState<boolean>(false);
  const [invalidUsername, setInvalidUsername] = useState<boolean>(false);
  const [invalidEmail, setInvalidEmail] = useState<boolean>(false);
  const [invalidData, setInvalidData] = useState<boolean>(false);
  const [isServerError, setIsServerError] = useState<boolean>(false);
  const [isTermAcceptError, setIsTermAcceptError] = useState<boolean>(false);
  const [successRegister, setSuccessRegister] = useState<boolean>(false);
  const [isValidCaptcha, setIsValidCaptcha] = useState<boolean>(false);

  const racerRegisterProfileService = useRacerRegisterProfileService();
  const { isLoading, setIsLoading, isAuthenticated } = useAuth(
    AuthenticationContext
  );

  const { formState, onInputChange, resetForm } =
    useForm<UserSaveDto>(initialUserRegister);
  const { name, username, email, password, repeatedPassword } = formState;

  const handleCheckboxChange = () => {
    setShowModal(!isLoading);
  };

  const handleModalHide = () => {
    setShowModal(false);
  };

  const handleTermsAccepted = (e: ChangeEvent<HTMLInputElement>) => {
    setIsTermsAccepted(e.target.checked);
  };
  const isPasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmitCreateAccount = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    if (!isValidCaptcha) {
      setIsLoading(false);
      return;
    }

    const count = validateData(formState);
    if (count > 0 || username.includes(" ")) {
      setIsLoading(false);
      setInvalidData(true);
      setTimeout(() => {
        setInvalidData(false);
      }, 10000);
      return;
    }

    if (!isTermsAccepted) {
      setIsLoading(false);
      setIsTermAcceptError(true);
      setTimeout(() => {
        setIsTermAcceptError(false);
      }, 10000);
      return;
    }
    const userSave: UserSaveDto = {
      name: formState.name.trim(),
      username: formState.username.trim(),
      email: formState.email.trim(),
      password: formState.password.trim(),
      repeatedPassword: formState.repeatedPassword.trim(),
      latitude: 0.0,
      longitude: 0.0,
    };
    await racerRegisterProfileService.chargeRegisterInOptions(userSave);
    const state = await racerRegisterProfileService.getFetch();
    if (isApiResponseError(state.data)) {
      const responseError = state.data;
      if (responseError.backendMessage === "User already exists") {
        setInvalidUsername(true);
      } else if (responseError.backendMessage === "Email already exists") {
        setInvalidEmail(true);
      } else {
        setIsServerError(true);
      }
      setIsLoading(false);
      finishRegister();
      return;
    } else {
      const validResponse = state.data as ValidTokenResponse;
      if (validResponse.valid) {
        setSuccessRegister(true);
      } else {
        setIsServerError(true);
      }
    }
    resetForm();
    setIsValidCaptcha(false);
    setIsTermsAccepted(false);
    setIsLoading(false);
    finishRegister();
  };

  const finishRegister = () => {
    setTimeout(() => {
      setInvalidUsername(false);
      setInvalidEmail(false);
      setIsServerError(false);
      setSuccessRegister(false);
    }, 10000);
  };

  const validateData = (data: UserSaveDto) => {
    let count = 0;
    if (!isValidStringLength(data.name.trim())) {
      setFailEditName(true);
      count++;
    } else {
      setFailEditName(false);
    }
    if (!isValidStringLength(data.username.trim())) {
      setFailEditUsername(true);
      count++;
    } else {
      setFailEditUsername(false);
    }
    if (!isValidEmail(data.email.trim())) {
      setFailEditEmail(true);
      count++;
    } else {
      setFailEditEmail(false);
    }
    if (data.password.trim() !== data.repeatedPassword.trim()) {
      setFailEditRepeatedPassword(true);
      count++;
    } else {
      setFailEditRepeatedPassword(false);
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
    <Container className="d-flex justify-content-center align-items-center w-100 my-2">
      <Row className="w-100">
        <Col
          md={6}
          lg={10}
          className="d-flex justify-content-center align-items-center mx-auto"
        >
          <Card className="profile-card text-light border border-primary">
            <Card.Header className="text-center fw-bold fs-3">
              {t("createAccountTitle")}
            </Card.Header>
            <Card.Body>
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
                      <p>{t("cASuccessRegisterMessage")}</p>
                    </Alert>
                  </Form.Label>
                </Form.Group>
              ) : null}
              {invalidData ? (
                <Form.Group>
                  <Form.Label
                    column={true}
                    className="d-flex justify-content-center align-items-center text-center"
                  >
                    <Alert
                      variant="warning"
                      onClose={() => setInvalidData(false)}
                      dismissible
                    >
                      <p>{t("cAInvalidData")}</p>
                    </Alert>
                  </Form.Label>
                </Form.Group>
              ) : null}
              {isTermAcceptError ? (
                <Form.Group>
                  <Form.Label
                    column={true}
                    className="d-flex justify-content-center align-items-center text-center"
                  >
                    <Alert
                      variant="warning"
                      onClose={() => setIsTermAcceptError(false)}
                      dismissible
                    >
                      <p>{t("termsAndConditionsError")}</p>
                    </Alert>
                  </Form.Label>
                </Form.Group>
              ) : null}
              {invalidUsername ? (
                <Form.Group>
                  <Form.Label
                    column={true}
                    className="d-flex justify-content-center align-items-center text-center"
                  >
                    <Alert
                      variant="warning"
                      onClose={() => setInvalidUsername(false)}
                      dismissible
                    >
                      <p>{t("cAInvalidUsername")}</p>
                    </Alert>
                  </Form.Label>
                </Form.Group>
              ) : null}
              {invalidEmail ? (
                <Form.Group>
                  <Form.Label
                    column={true}
                    className="d-flex justify-content-center align-items-center text-center"
                  >
                    <Alert
                      variant="warning"
                      onClose={() => setInvalidEmail(false)}
                      dismissible
                    >
                      <p>{t("cAInvalidEmail")}</p>
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
              <Form
                onSubmit={async (event) => await onSubmitCreateAccount(event)}
              >
                <Form.Group className="mb-3">
                  <Form.Label
                    column={true}
                    htmlFor="nameRegister"
                    className="fw-bold fs-5"
                  >
                    {t("cAName")}
                    <span className="text-danger fs-6">
                      <sup>*</sup>
                    </span>
                  </Form.Label>
                  <Form.Control
                    id="nameRegister"
                    name="name"
                    type="text"
                    value={name}
                    className="fw-medium"
                    placeholder={t("cANameText")}
                    onChange={onInputChange}
                    autoComplete="name"
                    required
                    disabled={isLoading}
                  />
                  <Form.Text
                    className={failEditName ? "text-danger" : "text-secondary"}
                  >
                    {t("cANameMessage")}
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label
                    column={true}
                    htmlFor="usernameRegister"
                    className="fw-bold fs-5"
                  >
                    {t("cAUsername")}
                    <span className="text-danger fs-6">
                      <sup>*</sup>
                    </span>
                  </Form.Label>
                  <Form.Control
                    id="usernameRegister"
                    name="username"
                    type="text"
                    className="fw-medium"
                    value={username}
                    placeholder={t("cAUsernameText")}
                    onChange={onInputChange}
                    autoComplete="username"
                    disabled={isLoading}
                    required
                  />
                  <Form.Text
                    className={
                      failEditUsername ? "text-danger" : "text-secondary"
                    }
                  >
                    <span
                      className={
                        failEditUsername ? "text-danger" : "text-secondary"
                      }
                    >
                      {t("cAUsernameMessage1")}
                    </span>
                    <span
                      className={
                        username.includes(" ")
                          ? "text-danger"
                          : "text-secondary"
                      }
                    >
                      {t("cAUsernameMessage2")}
                    </span>
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label
                    column={true}
                    htmlFor="emailRegister"
                    className="fw-bold fs-5"
                  >
                    {t("cAEmail")}
                    <span className="text-danger fs-6">
                      <sup>*</sup>
                    </span>
                  </Form.Label>
                  <Form.Control
                    id="emailRegister"
                    name="email"
                    type="email"
                    value={email}
                    className="fw-medium"
                    placeholder={t("cAEmailText")}
                    onChange={onInputChange}
                    autoComplete="email"
                    disabled={isLoading}
                    required
                  />
                  <Form.Text
                    className={failEditEmail ? "text-danger" : "text-secondary"}
                  >
                    {t("cAEmailMessage")}
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Row className="justify-content-between align-items-center">
                    <Col>
                      <Form.Label
                        column={true}
                        htmlFor="passwordRegister"
                        className="fw-bold fs-5"
                      >
                        {t("cAPassword")}
                        <span className="text-danger fs-6">
                          <sup>*</sup>
                        </span>
                      </Form.Label>
                    </Col>
                    <Col>
                      <Form.Check
                        id="showPassword"
                        name="showPassword"
                        className="fw-medium"
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
                    placeholder={t("cAPasswordText")}
                    onChange={onInputChange}
                    className="fw-medium"
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
                    <span className="text-danger fs-6">
                      <sup>*</sup>
                    </span>
                  </Form.Label>
                  <Form.Control
                    id="repeatPasswordRegister"
                    name="repeatedPassword"
                    className="fw-medium"
                    type={showPassword ? "text" : "password"}
                    value={repeatedPassword}
                    placeholder={t("cAConfirmPasswordText")}
                    onChange={onInputChange}
                    autoComplete="new-password webauthn"
                    disabled={isLoading}
                    required
                  />
                  <Form.Text
                    className={
                      failEditRepeatedPassword
                        ? "text-danger"
                        : "text-secondary"
                    }
                  >
                    {t("cAConfirmPasswordMessage")}
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Check type="checkbox">
                    <Form.Check.Input
                      id="checkBoxTermsAndConditions"
                      type="checkbox"
                      checked={isTermsAccepted}
                      onChange={handleTermsAccepted}
                      isValid
                      disabled={isLoading}
                    />
                    <Form.Check.Label htmlFor="checkBoxTermsAndConditions">
                      {t("cAAcceptTerms")}
                    </Form.Check.Label>
                    <Form.Control.Feedback type="valid">
                      <button
                        type="button"
                        style={{
                          color: "green",
                          backgroundColor: "transparent",
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                        onClick={handleCheckboxChange}
                      >
                        {t("cAShowTerms")}
                      </button>
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type="valid">
                      {isTermsAccepted ? null : t("termsAndConditionsError")}
                    </Form.Control.Feedback>
                  </Form.Check>
                </Form.Group>
                <TermsAndConditionModal
                  show={showModal}
                  onHide={handleModalHide}
                  t={t}
                />
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
                    disabled={isLoading || !isValidCaptcha || !isTermsAccepted}
                  >
                    {t("cAConfirmButton")}
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

export default CreateAccountPage;
