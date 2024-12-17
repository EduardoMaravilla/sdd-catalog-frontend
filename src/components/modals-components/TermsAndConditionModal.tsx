import { FC } from "react";
import { Button, Modal } from "react-bootstrap";
import { TermAndConditionsComponent } from "../utils/TermAndConditionsComponent";

type TermsAndConditionModalProps = {
  show: boolean;
  onHide: () => void;
  t: (key: string) => string;
};

export const TermsAndConditionModal: FC<TermsAndConditionModalProps> = ({
  t,
  show,
  onHide,
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
          {t("termsAndConditionsTitle")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TermAndConditionsComponent t={t} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>{t("closeModal")}</Button>
      </Modal.Footer>
    </Modal>
  );
};
