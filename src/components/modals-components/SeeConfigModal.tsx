import { FC } from "react";
import { Button, Modal } from "react-bootstrap";
import { CarConfigurationDto } from "../../types/TypeCars";
import CreateBuildPage from "../../pages/CreateBuildPage";
import { getBackgroundForPath } from "../../utils/funcionExport";
import useCurrentPath from "../../hooks/useCurrentPath";

interface SeeConfigModalProps {
  show: boolean;
  onHide: () => void;
  t: (key: string) => string;
  carConfig: CarConfigurationDto;
  setCarConfigurationCreated: (carConfiguration: CarConfigurationDto) => void;
  onUpdateConfig: () => void;
}

export const SeeConfigModal: FC<SeeConfigModalProps> = ({
  t,
  show,
  onHide,
  carConfig,
  setCarConfigurationCreated,
  onUpdateConfig,
}) => {
  const currentPath = useCurrentPath();
  return (
    <Modal show={show} fullscreen={true} onHide={onHide} size="lg" centered>
      <Modal.Header className="text-light" style={{ backgroundColor: "Black" }}>
        <Modal.Title>
          {t("viewMyConfig") +
            " (" +
            carConfig.carDto?.makerDto.name +
            " " +
            carConfig.carDto?.model +
            " (" +
            carConfig.carDto?.year +
            "))"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          backgroundImage: getBackgroundForPath("/modal"),
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <CreateBuildPage
          t={t}
          carConfigurationCreated={carConfig}
          setCarConfigurationCreated={setCarConfigurationCreated}
          isDisabled={true}
        />
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "Black" }}>
        {currentPath !== "/personal-builds" ? null : (
          <Button variant="info" onClick={onUpdateConfig}>
            {t("updateButton")}
          </Button>
        )}
        <Button variant="primary" onClick={onHide}>
          {t("closeModal")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
