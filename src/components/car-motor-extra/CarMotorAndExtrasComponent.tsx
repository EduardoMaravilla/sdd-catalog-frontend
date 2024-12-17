import { Button, Card, Col, Row } from "react-bootstrap";
import { useLoadBasicData } from "../../context/load-basic-data/useLoadBasicData";
import { LoadBasicDataContext } from "../../context/load-basic-data/LoadBasicDataContext";
import {
  CarConfigurationDto,
  initialCarConfiguration,
} from "../../types/TypeCars";

import { FC, useEffect, useState } from "react";
import { SelectAuxiliaryComponent } from "./SelectAuxiliaryComponent";
import { SelectEngineComponent } from "./SelectEngineComponent";
import {
  getColorLevel,
  isApiResponseError,
  isValidTokenResponse,
} from "../../utilities/funcionExport";
import { useAuth } from "../../context/auth/useAuth";
import { AuthenticationContext } from "../../context/auth/AuthenticationContext";
import { useSaveRacerCarService } from "../../services/racer-car-configuration/useSaveRacerCarConfigService";
import { SuccessfulModal } from "../modals-components/SuccessfulModal.tsx";
import { ErrorModal } from "../modals-components/ErrorModal";
import { SaveCarConfigModal } from "../modals-components/SaveCarConfigModal";
import { useUpdateRacerCarService } from "../../services/racer-car-configuration/useUpdateRacerCarService.ts";
import { useGetAllRacerCarService } from "../../services/racer-car-configuration/useGetAllRacerCarService";
import { useLoadProfileData } from "../../context/profile-data/useLoadProfileData.ts";
import { LoadProfileDataContext } from "../../context/profile-data/LoadProfileDataContext.tsx";

type CarMotorAndExtrasComponentProps = {
  t: (key: string) => string;
  carConfig: CarConfigurationDto;
  setCarConfig: (config: CarConfigurationDto) => void;
  isDisabled: boolean;
};

export const CarMotorAndExtrasComponent: FC<
  CarMotorAndExtrasComponentProps
> = ({ t, carConfig, setCarConfig, isDisabled }) => {
  const { engines, auxiliaries } = useLoadBasicData(LoadBasicDataContext);
  const { isLoading, setIsLoading, jwtToken } = useAuth(AuthenticationContext);
  const { setProfileAllCarConfigs } = useLoadProfileData(
    LoadProfileDataContext
  );
  const [isSuccessfulSaveModal, setIsSuccessfulSaveModal] =
    useState<boolean>(false);
  const [isErrorSaveModal, setIsErrorSaveModal] = useState<boolean>(false);
  const [isSaveModal, setIsSaveModal] = useState<boolean>(false);
  const [isResetModal, setIsResetModal] = useState<boolean>(false);

  const racerSaveCarService = useSaveRacerCarService();
  const racerUpdateCarService = useUpdateRacerCarService();
  const profileAllCarService = useGetAllRacerCarService();

  const [disableSaveButton, setDisableSaveButton] = useState<boolean>(false);

  const updateAuxiliaryOne = (auxSelected: number) => {
    const aux = auxiliaries.find((a) => a.id === auxSelected);
    if (aux) {
      const newCarConfig: CarConfigurationDto = { ...carConfig };
      newCarConfig.auxiliarOneDto = aux;
      setCarConfig(newCarConfig);
      localStorage.setItem(
        "car-configuration-created",
        JSON.stringify(newCarConfig)
      );
    }
  };

  const updateAuxiliaryTwo = (auxSelected: number) => {
    const aux = auxiliaries.find((a) => a.id === auxSelected);
    if (aux) {
      const newCarConfig: CarConfigurationDto = { ...carConfig };
      newCarConfig.auxiliarTwoDto = aux;
      setCarConfig(newCarConfig);
      localStorage.setItem(
        "car-configuration-created",
        JSON.stringify(newCarConfig)
      );
    }
  };

  const updateEngine = (engineSelected: number) => {
    const engine = engines.find((e) => e.id === engineSelected);
    if (engine) {
      const newCarConfig: CarConfigurationDto = { ...carConfig };
      newCarConfig.engineDto = engine;
      setCarConfig(newCarConfig);
      localStorage.setItem(
        "car-configuration-created",
        JSON.stringify(newCarConfig)
      );
    }
  };

  const onResetButton = (isAvoid: boolean = false) => {
    if (!isAvoid) {
      return;
    }
    const newCarConfig: CarConfigurationDto = { ...initialCarConfiguration };
    newCarConfig.driverDto = {
      id: null,
      drive: 0,
      direction: 0,
      downForce: 0,
      controlTraction: false,
      initSkidDto: { id: 4, skidType: "POR DEFECTO" },
    };
    setCarConfig(newCarConfig);
    localStorage.setItem(
      "car-configuration-created",
      JSON.stringify(newCarConfig)
    );
    setIsResetModal(false);
  };

  const onSaveButton = async () => {
    onStartSave();

    if (jwtToken) {
      const saveResponse = await saveCarConfiguration(carConfig);
      const allCarsResponse = await profileAllCarService.getFetch();
      if (
        isApiResponseError(saveResponse.data) ||
        isApiResponseError(allCarsResponse.data)
      ) {
        setIsLoading(false);
        setIsErrorSaveModal(true);
      } else if (isValidTokenResponse(saveResponse.data)) {
        if (saveResponse.data.valid) {
          setIsSuccessfulSaveModal(true);
          onResetButton(true);
          if (allCarsResponse.data) {
            setProfileAllCarConfigs(allCarsResponse.data);
            localStorage.setItem(
              "profileAllCarConfigs",
              JSON.stringify(allCarsResponse.data)
            );
          }
        } else {
          setIsErrorSaveModal(true);
        }
      } else {
        setIsErrorSaveModal(true);
      }
    }
    onFinishSave();
  };

  const saveCarConfiguration = async (config: CarConfigurationDto) => {
    if (config.id) {
      return await racerUpdateCarService
        .useChargeDataInOptions(config)
        .getFetch();
    } else {
      racerSaveCarService.chargeDataInOptions(config);
      return await racerSaveCarService.getFetch();
    }
  };

  const onStartSave = () => {
    setIsLoading(true);
    setIsSaveModal(false);
    setDisableSaveButton(true);
  };
  const onFinishSave = () => {
    setIsLoading(false);
    setIsSaveModal(false);
    setTimeout(() => {
      setIsSuccessfulSaveModal(false);
      setIsErrorSaveModal(false);
    }, 8000);
  };

  useEffect(() => {
    if(carConfig.carDto){
      setDisableSaveButton(false);
    }else { 
      setDisableSaveButton(true);
    }
  }, [carConfig.carDto]);

  return (
    <>
      <Card className="h-100 text-light profile-card  border border-primary-subtle">
        <Card.Header className="text-center fw-bold fs-5">
          {t("motorAndAuxiliaryTitle")}
        </Card.Header>
        <Card.Body>
          <Row>
            <Col>
              <Card className="without-background border border-primary-subtle">
                <Card.Header className="text-center text-light fw-bold">
                  {t("auxiliaryOne")}
                </Card.Header>
                <Card.Body>
                  <SelectAuxiliaryComponent
                    t={t}
                    name="auxiliarOne"
                    auxiliaries={auxiliaries}
                    auxiliar={carConfig.auxiliarOneDto}
                    setAuxiliar={updateAuxiliaryOne}
                    isDisabled={isDisabled}
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="without-background border border-primary-subtle">
                <Card.Header className="text-center text-light fw-bold">
                  {t("auxiliaryTwo")}
                </Card.Header>
                <Card.Body>
                  <SelectAuxiliaryComponent
                    t={t}
                    name="auxliarTwo"
                    auxiliaries={auxiliaries}
                    auxiliar={carConfig.auxiliarTwoDto}
                    setAuxiliar={updateAuxiliaryTwo}
                    isDisabled={isDisabled}
                  />
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="justify-content-around align-items-center my-2">
            <Col>
              <Card className="without-background border border-primary-subtle">
                <Card.Header className="text-center text-light fw-bold">
                  {t("engineTitle")}
                </Card.Header>
                <Card.Body>
                  <SelectEngineComponent
                    t={t}
                    name="selectEngine"
                    engine={carConfig.engineDto}
                    engines={engines}
                    setEngine={updateEngine}
                    isDisabled={isDisabled}
                  />
                </Card.Body>
              </Card>
            </Col>
          </Row>
          {isDisabled ? null : (
            <Row>
              <Col>
                <Button
                  className="w-100 border text-light fw-bold my-4"
                  variant="info"
                  type="reset"
                  onClick={() => setIsResetModal(true)}
                  disabled={isLoading || isDisabled}
                >
                  {t("resetButton")}
                </Button>
              </Col>
              <Col>
                <Button
                  className="w-100 text-light fw-bold border border-primary-subtle my-4"
                  variant="success"
                  type="button"
                  onClick={() => setIsSaveModal(true)}
                  disabled={isLoading || disableSaveButton || isDisabled }
                >
                  {carConfig.id ? t("updateButton") : t("saveButton")}
                </Button>
              </Col>
            </Row>
          )}
          <hr />
          <Row className="justify-content-between align-items-center my-3">
            <Col>
              <h6>
                <span
                  className="showColorLevel"
                  style={{
                    background: getColorLevel(1),
                  }}
                >
                  {t("levelBasic")}
                </span>
              </h6>
            </Col>
            <Col>
              <h6>
                <span
                  className="showColorLevel"
                  style={{
                    background: getColorLevel(2),
                  }}
                >
                  {t("levelSport")}
                </span>
              </h6>
            </Col>
            <Col>
              <h6>
                <span
                  className="showColorLevel"
                  style={{
                    background: getColorLevel(3),
                  }}
                >
                  {t("levelPro")}
                </span>
              </h6>
            </Col>
            <Col>
              <h6>
                <span
                  className="showColorLevel"
                  style={{
                    background: getColorLevel(4),
                  }}
                >
                  {t("levelSuper")}
                </span>
              </h6>
            </Col>
            <Col>
              <h6>
                <span
                  className="showColorLevel"
                  style={{
                    background: getColorLevel(5),
                  }}
                >
                  {t("levelElite")}
                </span>
              </h6>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <SuccessfulModal
        t={t}
        show={isSuccessfulSaveModal}
        onHide={() => setIsSuccessfulSaveModal(false)}
        successfulMessage={t("successSaveCarConfig")}
      />
      <ErrorModal
        t={t}
        show={isErrorSaveModal}
        onHide={() => setIsErrorSaveModal(false)}
        errorMessage={t("errorSaveCarConfig")}
      />
      <SaveCarConfigModal
        t={t}
        show={isResetModal}
        onHide={() => setIsResetModal(false)}
        isReset={true}
        saveOfResetMessage={t("confirmResetButton")}
        onAcceptSaveOrReset={() => onResetButton(true)}
        saveOrResetButton={t("resetButton")}
      />
      <SaveCarConfigModal
        t={t}
        show={isSaveModal}
        onHide={() => setIsSaveModal(false)}
        isReset={false}
        saveOfResetMessage={t("confirmSaveButton")}
        saveOrResetButton={t("saveButton")}
        onAcceptSaveOrReset={async () => await onSaveButton()}
      />
    </>
  );
};
