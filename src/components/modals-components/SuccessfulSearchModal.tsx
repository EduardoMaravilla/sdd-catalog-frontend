import { FC } from "react";
import { Button, Modal } from "react-bootstrap";

interface SuccessfulSearchModalProps {
  show: boolean;
  onHide: () => void;
  t: (key: string) => string;
  results: number;
}
export const SuccessfulSearchModal: FC<SuccessfulSearchModalProps> = ({
  show,
  onHide,
  t,
  results,
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
        <Modal.Title id="contained-modal-title-vcenter" className="fw-bold text-info">{results+ " "+t("filterResults")}</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button onClick={onHide}>{t("closeModal")}</Button>
      </Modal.Footer>
    </Modal>
  );
};
