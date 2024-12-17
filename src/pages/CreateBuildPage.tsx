import DriveConfigComponent from "../components/driver-config/DriveConfigComponentCard";
import CarLevelSelectComponent from "../components/card-level/CarLevelSelectComponent";
import CarValuesComponent from "../components/car-pow-tor/CarValuesComponent";
import EnginePartsComponents from "../components/engine-parts/EnginePartsComponents";
import { CarMotorAndExtrasComponent } from "../components/car-motor-extra/CarMotorAndExtrasComponent";
import { FC } from "react";

import useWindowSize from "../hooks/useWindowSize";
import { CarConfigurationDto } from "../types/TypeCars";

type CreateBuildPAgeProps = {
  t: (key: string) => string;
  carConfigurationCreated: CarConfigurationDto;
  setCarConfigurationCreated: (config: CarConfigurationDto) => void;
  isDisabled: boolean;
};

const CreateBuildPage: FC<CreateBuildPAgeProps> = ({
  t,
  carConfigurationCreated,
  setCarConfigurationCreated,
  isDisabled,
}) => {
  const { width } = useWindowSize();

  return (
    <div className="text-light">
      {isDisabled ? null : (
        <div className="text-center">
          <p className="fs-2 fw-bold">
            {carConfigurationCreated.id
              ? t("updateBuildTitle")
              : t("createBuildTitle")}
          </p>
          <hr className="fw-bold" />
        </div>
      )}
      {width >= 1100 ? (
        <>
          <div className="d-flex justify-content-between">
            <div className="flex-fill mx-2 my-2">
              <DriveConfigComponent
                t={t}
                carConfig={carConfigurationCreated}
                setCarConfig={setCarConfigurationCreated}
                isDisabled={isDisabled}
              />
            </div>
            <div className="flex-fill mx-2 my-2">
              <CarLevelSelectComponent
                t={t}
                carConfig={carConfigurationCreated}
                setCarConfig={setCarConfigurationCreated}
                isDisabled={isDisabled}
              />
            </div>
            <div className="flex-fill mx-2 my-2">
              <CarValuesComponent
                t={t}
                carConfig={carConfigurationCreated}
                setCarConfig={setCarConfigurationCreated}
                isDisabled={isDisabled}
              />
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <div className="flex-fill mx-2 my-2">
              <EnginePartsComponents
                t={t}
                carConfig={carConfigurationCreated}
                setCarConfig={setCarConfigurationCreated}
                isDisabled={isDisabled}
              />
            </div>
            <div className="flex-fill mx-2 my-2">
              <CarMotorAndExtrasComponent
                t={t}
                carConfig={carConfigurationCreated}
                setCarConfig={setCarConfigurationCreated}
                isDisabled={isDisabled}
              />
            </div>
          </div>
        </>
      ) : (
        <div>
          <div className="my-2">
            <CarLevelSelectComponent
              t={t}
              carConfig={carConfigurationCreated}
              setCarConfig={setCarConfigurationCreated}
              isDisabled={isDisabled}
            />
          </div>
          <div className="my-2">
            <CarValuesComponent
              t={t}
              carConfig={carConfigurationCreated}
              setCarConfig={setCarConfigurationCreated}
              isDisabled={isDisabled}
            />
          </div>
          <div className="my-2">
            <DriveConfigComponent
              t={t}
              carConfig={carConfigurationCreated}
              setCarConfig={setCarConfigurationCreated}
              isDisabled={isDisabled}
            />
          </div>
          <div className="my-2">
            <EnginePartsComponents
              t={t}
              carConfig={carConfigurationCreated}
              setCarConfig={setCarConfigurationCreated}
              isDisabled={isDisabled}
            />
          </div>
          <div className="my-2">
            <CarMotorAndExtrasComponent
              t={t}
              carConfig={carConfigurationCreated}
              setCarConfig={setCarConfigurationCreated}
              isDisabled={isDisabled}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateBuildPage;
