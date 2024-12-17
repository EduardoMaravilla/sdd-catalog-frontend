import { FC } from "react";
import { Button, Modal } from "react-bootstrap";
import { RiLogoutBoxRFill } from "react-icons/ri";

interface LogoutModalProps {
  show: boolean;
  onHide: () => void;
  onLogout: () => void;
  t: (key: string) => string;
}

export const LogoutModal: FC<LogoutModalProps> = ({
  t,
  show,
  onHide,
  onLogout,
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
          {t("confirmLogout")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="logout-icon-container text-center">
          <h1>
            <RiLogoutBoxRFill className="logout-icon" />
          </h1>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={onLogout}>
          {t("logout")}
        </Button>
        <Button onClick={onHide}>{t("closeModal")}</Button>
      </Modal.Footer>
    </Modal>
  );
};
