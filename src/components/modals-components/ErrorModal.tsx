import { FC } from "react";
import { Button, Modal } from "react-bootstrap";
import { VscError } from "react-icons/vsc";

interface ErrorSaveCarConfigModalProps {
  t: (key: string) => string;
  show: boolean;
  onHide: () => void;
  errorMessage: string;
}

export const ErrorModal: FC<ErrorSaveCarConfigModalProps> = ({
  t,
  show,
  onHide,
  errorMessage,
}) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {errorMessage}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="error-icon-container text-center">
          <h1>
            <VscError className="error-icon" />
          </h1>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>{t("closeModal")}</Button>
      </Modal.Footer>
    </Modal>
  );
};
