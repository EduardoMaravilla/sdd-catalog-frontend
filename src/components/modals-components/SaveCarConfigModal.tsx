import { FC } from "react";
import { Button, Modal } from "react-bootstrap";
import { BsSaveFill } from "react-icons/bs";
import { MdRestartAlt } from "react-icons/md";

interface SaveCarConfigModalProps {
  show: boolean;
  onAcceptSaveOrReset: () => void;
  onHide: () => void;
  t: (key: string) => string;
  saveOfResetMessage: string;
  saveOrResetButton: string;
  isReset: boolean;
}

export const SaveCarConfigModal: FC<SaveCarConfigModalProps> = ({
  show,
  onHide,
  t,
  saveOfResetMessage,
  onAcceptSaveOrReset,
  isReset,
  saveOrResetButton,
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
          {saveOfResetMessage}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isReset ? (
          <div className="reset-icon-container text-center">
            <h1>
              <MdRestartAlt className="reset-icon" />
            </h1>
          </div>
        ) : (
          <div className="save-icon-container text-center">
            <h1>
              <BsSaveFill className="save-icon" />
            </h1>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={onAcceptSaveOrReset}>
          {saveOrResetButton}
        </Button>
        <Button onClick={onHide}>{t("closeModal")}</Button>
      </Modal.Footer>
    </Modal>
  );
};
