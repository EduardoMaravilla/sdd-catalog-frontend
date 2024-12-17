import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  Row,
} from "react-bootstrap";
import { ContactFormRequest } from "../types/TypeConctact";
import { useForm } from "../hooks/useForm";
import { FC, FormEvent, useState } from "react";
import {
  isApiResponseError,
  isValidTokenResponse,
} from "../utilities/funcionExport";
import { useAuth } from "../context/auth/useAuth";
import { AuthenticationContext } from "../context/auth/AuthenticationContext";
import HReCaptchaComponent from "../components/utils/HReCaptchaComponent";
import SpinnerComponent from "../components/utils/SpinnerComponent";
import { useAuthContactService } from "../services/auth/useAuthContactService";

const initialForm: ContactFormRequest = {
  nameContact: "",
  emailContact: "",
  subjectContact: "",
  messageContact: "",
};
type ContactPageProps = {
  t: (key: string) => string;
};

const ContactPage: FC<ContactPageProps> = ({ t }) => {
  const { isLoading, setIsLoading } = useAuth(
    AuthenticationContext
  );
  const { formState, onInputChange, resetForm } =
    useForm<ContactFormRequest>(initialForm);
  const { nameContact, emailContact, messageContact, subjectContact } =
    formState;

  const contactService = useAuthContactService();

  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [showContactWarning, setShowContactWarning] = useState<boolean>(false);
  const [showConnectError, setShowConnectError] = useState<boolean>(false);
  const [isValidCaptcha, setIsValidCaptcha] = useState<boolean>(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    if (!isValidCaptcha) {
      setIsLoading(false);
      return;
    }

    contactService.chargeContactInOptions(formState);
    const contactResponse = await contactService.getFetch();
    if (isApiResponseError(contactResponse.data)) {
      setShowContactWarning(true);
    } else if (isValidTokenResponse(contactResponse.data)) {
      if (contactResponse.data.valid) {
        setShowSuccessMessage(true);
      } else {
        setShowContactWarning(true);
      }
    } else {
      setShowConnectError(true);
    }
    resetForm();
    setIsLoading(false);
    setIsValidCaptcha(false);
    setTimeout(() => {
      setShowSuccessMessage(false);
      setShowContactWarning(false);
      setShowConnectError(false);
    }, 10000);
  };

  const onVerifyCaptcha = (isValid: boolean) => {
    setIsValidCaptcha(isValid);
  };

  return (
    <div className="py-5 d-flex justify-content-center align-items-center">
      <Row className="w-100 d-flex justify-content-center align-items-center">
        <Col sm={4} md={6}>
          <Card className="profile-card border border-primary-subtle">
            <Card.Header className="text-center text-light">
              <p className="fs-2 fw-bold">{t("pageContactTitle")}</p>
              <hr />
              <p className="fw-medium">{t("pageContactText")}</p>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={async (event) => await handleSubmit(event)}>
                {showSuccessMessage ? (
                  <Form.Group>
                    <Form.Label
                      column={true}
                      className="d-flex justify-content-center align-items-center"
                    >
                      <Alert
                        variant="success"
                        onClose={() => setShowSuccessMessage(false)}
                        dismissible
                      >
                        <p>{t("pageContactSuccessMessage")}</p>
                      </Alert>
                    </Form.Label>
                  </Form.Group>
                ) : null}
                {showContactWarning ? (
                  <Form.Group>
                    <Form.Label
                      column={true}
                      className="d-flex justify-content-center align-items-center"
                    >
                      <Alert
                        variant="warning"
                        onClose={() => setShowContactWarning(false)}
                        dismissible
                      >
                        <p>{t("pageContactError")}</p>
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
                <Form.Group className="mb-3">
                  <Form.Label
                    column={true}
                    htmlFor="nameContact"
                    className="text-light fw-bold fs-6"
                  >
                    {t("pageContactName")}
                    <span className="text-danger fs-6">
                      <sup>*</sup>
                    </span>
                  </Form.Label>
                  <Form.Control
                    id="nameContact"
                    name="nameContact"
                    type="text"
                    className="fw-medium"
                    placeholder={t("pageContactNameText")}
                    value={nameContact}
                    onChange={onInputChange}
                    required
                    disabled={isLoading}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label
                    column={true}
                    htmlFor="emailContact"
                    className="text-light fw-bold fs-6"
                  >
                    {t("pageContactEmail")}
                    <span className="text-danger fs-6">
                      <sup>*</sup>
                    </span>
                  </Form.Label>
                  <Form.Control
                    id="emailContact"
                    name="emailContact"
                    type="email"
                    className="fw-medium"
                    placeholder={t("pageContactEmailText")}
                    value={emailContact}
                    onChange={onInputChange}
                    required
                    disabled={isLoading}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label
                    column={true}
                    htmlFor="subjectContact"
                    className="text-light fw-bold fs-6"
                  >
                    {t("pageContactSubject")}
                    <span className="text-danger fs-6">
                      <sup>*</sup>
                    </span>
                  </Form.Label>
                  <Form.Control
                    id="subjectContact"
                    name="subjectContact"
                    type="text"
                    className="fw-medium"
                    placeholder={t("pageContactSubjectText")}
                    value={subjectContact}
                    onChange={onInputChange}
                    disabled={isLoading}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label
                    column={true}
                    htmlFor="messageContact"
                    className="text-light fw-bold fs-6"
                  >
                    {t("pageContactMessage")}
                    <span className="text-danger fs-6">
                      <sup>*</sup>
                    </span>
                  </Form.Label>
                  <Form.Control
                    id="messageContact"
                    name="messageContact"
                    className="fw-medium"
                    as="textarea"
                    rows={4}
                    placeholder={t("pageContactMessageText")}
                    value={messageContact}
                    onChange={onInputChange}
                    required
                    disabled={isLoading}
                  />
                  <Form.Text
                    className={
                      messageContact.length > 500 ? "text-danger" : "text-light"
                    }
                  >
                    ({messageContact.length}/500)
                  </Form.Text>
                </Form.Group>
                <HReCaptchaComponent t={t} onVerify={onVerifyCaptcha} />
                {isLoading ? (
                  <SpinnerComponent />
                ) : (
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100"
                    disabled={isLoading || !isValidCaptcha}
                  >
                    {t("pageContactSubmit")}
                  </Button>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ContactPage;
