import { FC } from "react";
import { Button, Modal } from "react-bootstrap";
import { GiAutoRepair } from "react-icons/gi";

interface UpdateCarConfigModalProps {
  t: (key: string) => string;
  show: boolean;
  onHide: () => void;
  onUpdate: () => void;
}

export const UpdateCarConfigModal: FC<UpdateCarConfigModalProps> = ({
  t,
  onHide,
  onUpdate,
  show,
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
        <Modal.Title>{t("onUpdateBuild")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="update-icon-container text-center">
          <h1>
            <GiAutoRepair className="update-icon" />
          </h1>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="info" onClick={onUpdate}>
          {t("updateButton")}
        </Button>
        <Button variant="primary" onClick={onHide}>
          {t("closeModal")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
