import { ChangeEvent, FC } from "react";
import { Form } from "react-bootstrap";
import { CarConfigurationDto } from "../../types/TypeCars";

interface ControlTractionComponentProps {
  t: (key: string) => string;
  carConfig: CarConfigurationDto;
  setCarConfig: (config: CarConfigurationDto) => void;
  isDisabled: boolean;
}

const ControlTractionComponent: FC<ControlTractionComponentProps> = ({
  t,
  carConfig,
  setCarConfig,
  isDisabled,
}) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(event.target.value);
    const newCarConfig: CarConfigurationDto = { ...carConfig };
    newCarConfig.driverDto.controlTraction = value === 1;
    setCarConfig(newCarConfig);
    localStorage.setItem(
      "car-configuration-created",
      JSON.stringify(newCarConfig)
    );
  };

  return (
    <Form.Group className="d-flex justify-content-between align-items-center">
      <Form.Label
        column={true}
        htmlFor="selectControlTraction"
        className="text-light fw-medium text-nowrap text-decoration-underline me-5"
        style={{ fontSize: "0.7rem" }}
      >
        {t("tractionControl")}
      </Form.Label>
      <Form.Select
        id="selectControlTraction"
        name="selectControlTraction"
        size="sm"
        className="without-background text-light fw-medium"
        value={carConfig.driverDto.controlTraction ? 1 : 2}
        onChange={handleChange}
        style={{
          width: "auto",
          fontSize: "0.7rem",
        }}
        disabled={isDisabled}
      >
        <option className="bg-dark" value={1}>
          {t("tcON")}
        </option>
        <option className="bg-dark" value={2}>
          {t("tcOFF")}
        </option>
      </Form.Select>
    </Form.Group>
  );
};

export default ControlTractionComponent;
