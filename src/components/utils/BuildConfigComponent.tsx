import { FC, useState } from "react";
import { Button, Card, Image } from "react-bootstrap";
import { CarConfigurationDto } from "../../types/TypeCars";
import { SeeConfigModal } from "../modals-components/SeeConfigModal";
import { useNavigate } from "react-router-dom";
import { UpdateCarConfigModal } from "../modals-components/UpdateCarConfigModal";
import { DeleteCarConfigModal } from "../modals-components/DeleteCarConfigModal";
import { useDeleteRacerCarService } from "../../services/racer-car-configuration/useDeleteRacerCarService";
import { useAuth } from "../../context/auth/useAuth";
import { AuthenticationContext } from "../../context/auth/AuthenticationContext";
import {
  isApiResponseError,
  isValidTokenResponse,
} from "../../utils/funcionExport.ts";
import { ErrorModal } from "../modals-components/ErrorModal";
import { SuccessfulModal } from "../modals-components/SuccessfulModal.tsx";
import { useGetAllRacerCarService } from "../../services/racer-car-configuration/useGetAllRacerCarService";
import { useLoadProfileData } from "../../context/profile-data/useLoadProfileData.ts";
import { LoadProfileDataContext } from "../../context/profile-data/LoadProfileDataContext.tsx";
import useCurrentPath from "../../hooks/useCurrentPath.ts";

interface BuildConfigComponentProps {
  t: (key: string) => string;
  nameCar: string | null;
  carConfig: CarConfigurationDto;
  setCarConfigurationCreated: (carConfiguration: CarConfigurationDto) => void;
  classCar: string;
}

export const BuildConfigComponent: FC<BuildConfigComponentProps> = ({
  t,
  nameCar,
  classCar,
  carConfig,
  setCarConfigurationCreated,
}) => {
  const [showSeeConfig, setShowSeeConfig] = useState<boolean>(false);
  const [showUpdateConfig, setShowUpdateConfig] = useState<boolean>(false);
  const [showDeleteConfig, setShowDeleteConfig] = useState<boolean>(false);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  const { isLoading, setIsLoading } = useAuth(AuthenticationContext);
  const { setProfileAllCarConfigs } = useLoadProfileData(
    LoadProfileDataContext
  );
  const deleteRacerCarService = useDeleteRacerCarService();
  const profileAllCarService = useGetAllRacerCarService();
  const navigate = useNavigate();
  const currentPath = useCurrentPath();

  const onDeleteCarConfiguration = async () => {
    setShowDeleteConfig(false);
    setIsLoading(true);
    if (carConfig.id) {
      const responseState = await deleteRacerCarService
        .useChargeDataInOptions(carConfig.id)
        .getFetch();
      const allCarsResponse = await profileAllCarService.getFetch();
      if (
        isApiResponseError(responseState.data) ||
        isApiResponseError(allCarsResponse.data)
      ) {
        setShowErrorModal(true);
      } else if (isValidTokenResponse(responseState.data)) {
        if (responseState.data.valid) {
          setShowSuccessModal(true);
          if (allCarsResponse.data) {
            setProfileAllCarConfigs(allCarsResponse.data);
            localStorage.setItem(
              "profileAllCarConfigs",
              JSON.stringify(allCarsResponse.data)
            );
          }
        } else {
          setShowErrorModal(true);
        }
      } else {
        setShowErrorModal(true);
      }
    }
    setIsLoading(false);
  };

  const onUpdateCarConfiguration = () => {
    setCarConfigurationCreated(JSON.parse(JSON.stringify(carConfig)));
    localStorage.setItem(
      "car-configuration-created",
      JSON.stringify(carConfig)
    );
    setShowUpdateConfig(false);
    setShowSeeConfig(false);
    navigate("/create-build");
  };
  return (
    <>
      <Card className="m-1 profile-card border border-primary-subtle">
        <Card.Header className="text-center text-light fw-bold">
          {nameCar + " (" + classCar + ")"}
        </Card.Header>
        <Card.Body className="d-flex justify-content-center">
          <Image
            className="border border-primary-subtle rounded-2"
            src="images/cars/car.webp"
            height={100}
          ></Image>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-center">
          <Button
            size="sm"
            variant="success"
            className="mx-2"
            onClick={() => setShowSeeConfig(true)}
            disabled={isLoading}
          >
            {t("pageBuildProfileSee")}
          </Button>
          {currentPath !== "/personal-builds" ? null : (
            <>
              <Button
                size="sm"
                variant="info"
                className="mx-2"
                onClick={() => setShowUpdateConfig(true)}
                disabled={isLoading}
              >
                {t("pageBuildProfileUpdate")}
              </Button>
              <Button
                size="sm"
                variant="danger"
                className="mx-2"
                onClick={() => setShowDeleteConfig(true)}
                disabled={isLoading}
              >
                {t("pageBuildProfileRemove")}
              </Button>
            </>
          )}
        </Card.Footer>
      </Card>
      <SeeConfigModal
        t={t}
        show={showSeeConfig}
        onHide={() => setShowSeeConfig(false)}
        carConfig={carConfig}
        setCarConfigurationCreated={setCarConfigurationCreated}
        onUpdateConfig={() => setShowUpdateConfig(true)}
      />
      <UpdateCarConfigModal
        t={t}
        show={showUpdateConfig}
        onHide={() => setShowUpdateConfig(false)}
        onUpdate={onUpdateCarConfiguration}
      />
      <DeleteCarConfigModal
        t={t}
        show={showDeleteConfig}
        onHide={() => setShowDeleteConfig(false)}
        onDelete={async () => await onDeleteCarConfiguration()}
      />
      <ErrorModal
        show={showErrorModal}
        t={t}
        onHide={() => setShowErrorModal(false)}
        errorMessage={t("loginConnectError")}
      />
      <SuccessfulModal
        t={t}
        show={showSuccessModal}
        onHide={() => setShowSuccessModal(false)}
        successfulMessage={t("deleteMessageBuildSuccess")}
      />
    </>
  );
};
