import { ChangeEvent, FC } from "react";
import { Form } from "react-bootstrap";
import { CarConfigurationDto, InitSkidDto } from "../../types/TypeCars";
import { useLoadBasicData } from "../../context/load-basic-data/useLoadBasicData";
import { LoadBasicDataContext } from "../../context/load-basic-data/LoadBasicDataContext";

type InitSkidComponentProps = {
  t: (key: string) => string;
  carConfig: CarConfigurationDto;
  setCarConfig: (config: CarConfigurationDto) => void;
  isDisabled: boolean;
};

const InitSkidComponent: FC<InitSkidComponentProps> = ({
  t,
  carConfig,
  setCarConfig,
  isDisabled,
}) => {
  const { initSkids } = useLoadBasicData(LoadBasicDataContext);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(event.target.value);
    const initSkid = initSkids.find(
      (initSkid: InitSkidDto) => initSkid.id === value
    );
    if (initSkid) {
      const newCarConfig: CarConfigurationDto = { ...carConfig };
      newCarConfig.driverDto.initSkidDto = initSkid;
      setCarConfig(newCarConfig);
      localStorage.setItem(
        "car-configuration-created",
        JSON.stringify(newCarConfig)
      );
    }
  };

  return (
    <Form.Group className="d-flex justify-content-between align-items-center">
      <Form.Label
        column={true}
        htmlFor="selectInitSkids"
        className="text-light fw-bold text-nowrap text-decoration-underline me-3"
        style={{ fontSize: "0.7rem" }}
      >
        {t("initSkid")}
      </Form.Label>
      <Form.Select
        id="selectInitSkids"
        name="selectInitSkids"
        size="sm"
        className="without-background text-light fw-medium"
        value={carConfig.driverDto.initSkidDto.id}
        onChange={handleChange}
        style={{ fontSize: "0.65rem" }}
        disabled={isDisabled}
      >
        <option className="bg-dark" value={4}>
          {t("isDefault")}
        </option>
        <option className="bg-dark" value={3}>
          {t("isAcc")}
        </option>
        <option className="bg-dark" value={2}>
          {t("isBrake")}
        </option>
        <option className="bg-dark" value={1}>
          {t("tcOFF")}
        </option>
      </Form.Select>
    </Form.Group>
  );
};

export default InitSkidComponent;
