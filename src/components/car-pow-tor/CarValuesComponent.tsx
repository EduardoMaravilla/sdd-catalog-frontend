import { Card, Col, Row } from "react-bootstrap";
import { CarConfigurationDto } from "../../types/TypeCars";
import { ChangeEvent, FC } from "react";

type CarValuesComponentProps = {
  t: (key: string) => string;
  carConfig: CarConfigurationDto;
  setCarConfig: (config: CarConfigurationDto) => void;
  isDisabled: boolean;
};

const CarValuesComponent: FC<CarValuesComponentProps> = ({
  t,
  carConfig,
  setCarConfig,
  isDisabled,
}) => {
  const updateCarConfig = (newConfig: CarConfigurationDto) => {
    setCarConfig(newConfig);
    localStorage.setItem(
      "car-configuration-created",
      JSON.stringify(newConfig)
    );
  };

  const limitValuesMap: { [key: string]: number } = {
    topSpeed: 500,
    oneHundred: 100,
    power: 5000,
    par: 5000,
    fourHundred: 50,
  };

  const onValueChanged = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    let newValue = value;
    if (newValue.length <= 0) {
      newValue = "0";
    }
    const parsedValue = parseFloat(newValue);
    if (!isNaN(parsedValue) && parsedValue <= limitValuesMap[name]) {
      const newCarConfig: CarConfigurationDto = {
        ...carConfig,
        [name]: parsedValue,
      };
      updateCarConfig(newCarConfig);
    }
  };

  return (
    <Card className="profile-card text-light border border-primary-subtle h-100 ">
      <Card.Header className="text-center fw-bold fs-5">
        {t("carValuesTitle")}
      </Card.Header>
      <Card.Body className="d-flex flex-column justify-content-between">
        <Row className="justify-content-around align-items-center">
          <Col>
            <div
              className="fw-medium"
              style={{
                textAlign: "center",
                border: "0",
                width: "100%",
                textWrap: "wrap",
              }}
            >
              {t("topSpeed")} [km/h]
            </div>
          </Col>
          <Col>
            <input
              name="topSpeed"
              type="number"
              className="without-background text-light fw-medium"
              style={{ textAlign: "center", width: "100%" }}
              value={carConfig.topSpeed.toString()}
              onChange={onValueChanged}
              disabled={isDisabled}
            />
          </Col>
        </Row>
        <hr />
        <Row className="justify-content-around align-items-center">
          <Col>
            <div
              className="fw-medium"
              style={{
                textAlign: "center",
                border: "0",
                width: "100%",
                textWrap: "wrap",
              }}
            >
              0 - 100 km/h [s]
            </div>
          </Col>
          <Col>
            <input
              name="oneHundred"
              type="number"
              className="without-background text-light fw-medium"
              style={{ textAlign: "center", width: "100%" }}
              value={carConfig.oneHundred.toString()}
              onChange={onValueChanged}
              disabled={isDisabled}
            />
          </Col>
        </Row>
        <hr />
        <Row className="justify-content-around align-items-center">
          <Col>
            <div
              className="fw-medium"
              style={{
                textAlign: "center",
                border: "0",
                width: "100%",
                textWrap: "wrap",
              }}
            >
              {t("power")} [bhp]
            </div>
          </Col>
          <Col>
            <input
              name="power"
              type="number"
              className="without-background text-light fw-medium"
              style={{ textAlign: "center", width: "100%" }}
              value={carConfig.power.toString()}
              onChange={onValueChanged}
              disabled={isDisabled}
            />
          </Col>
        </Row>
        <hr />
        <Row className="justify-content-around align-items-center">
          <Col>
            <div
              className="fw-medium"
              style={{
                textAlign: "center",
                border: "0",
                width: "100%",
                textWrap: "wrap",
              }}
            >
              {t("maxTorque")} [Nm]
            </div>
          </Col>
          <Col>
            <input
              name="par"
              type="number"
              className="without-background text-light fw-medium"
              style={{ textAlign: "center", width: "100%" }}
              value={carConfig.par.toString()}
              onChange={onValueChanged}
              disabled={isDisabled}
            />
          </Col>
        </Row>
        <hr />
        <Row className="justify-content-around align-items-center">
          <Col>
            <div
              className="fw-medium"
              style={{
                textAlign: "center",
                border: "0",
                width: "100%",
                textWrap: "wrap",
              }}
            >
              400 m [s]
            </div>
          </Col>
          <Col>
            <input
              name="fourHundred"
              type="number"
              className="without-background text-light fw-medium"
              style={{ textAlign: "center", width: "100%" }}
              value={carConfig.fourHundred.toString()}
              onChange={onValueChanged}
              disabled={isDisabled}
            />
          </Col>
        </Row>
        <br />
      </Card.Body>
    </Card>
  );
};

export default CarValuesComponent;
