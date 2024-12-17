import { FC } from "react";
import { Button, Modal } from "react-bootstrap";
import { FaCarCrash } from "react-icons/fa";

interface DeleteCarConfigModalProps {
  show: boolean;
  onHide: () => void;
  t: (key: string) => string;
  onDelete: () => void;
}

export const DeleteCarConfigModal: FC<DeleteCarConfigModalProps> = ({
  t,
  show,
  onHide,
  onDelete,
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
        <Modal.Title>{t("onDeleteBuild")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="delete-icon-container text-center">
          <h1>
            <FaCarCrash className="delete-icon" />
          </h1>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onDelete}>
          {t("deleteButton")}
        </Button>
        <Button variant="primary" onClick={onHide}>
          {t("closeModal")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
