import { Card, Form, Image, ListGroup } from "react-bootstrap";
import { useLoadBasicData } from "../../context/load-basic-data/useLoadBasicData";
import { LoadBasicDataContext } from "../../context/load-basic-data/LoadBasicDataContext";
import { CarConfigurationDto, CarDto } from "../../types/TypeCars";
import { FC } from "react";

type CarLevelSelectComponentProps = {
  t: (key: string) => string;
  carConfig: CarConfigurationDto;
  setCarConfig: (config: CarConfigurationDto) => void;
  isDisabled: boolean;
};

const CarLevelSelectComponent: FC<CarLevelSelectComponentProps> = ({
  t,
  carConfig,
  setCarConfig,
  isDisabled,
}) => {
  const { classes, cars } = useLoadBasicData(LoadBasicDataContext);

  const onClickClass = (value: number) => {
    const newClass = classes.find((c) => c.id === value);
    if (newClass) {
      const newCarConfig: CarConfigurationDto = { ...carConfig };
      newCarConfig.classesDto = newClass;
      setCarConfig(newCarConfig);
      localStorage.setItem(
        "car-configuration-created",
        JSON.stringify(newCarConfig)
      );
    }
  };

  const onHandleCarSelect = (carId: number) => {
    const newCarConfig: CarConfigurationDto = { ...carConfig };

    const carObject = cars.find((car: CarDto) => car.id === carId);
    if (carObject) {
      newCarConfig.carDto = carObject;
    } else {
      newCarConfig.carDto = null;
    }
    setCarConfig(newCarConfig);
    localStorage.setItem(
      "car-configuration-created",
      JSON.stringify(newCarConfig)
    );
  };

  return (
    <Card className="profile-card border border-primary-subtle w-100 h-100">
      <Card.Header>
        <Form.Select
          className="fw-bold fs-6 text-light without-background text-wrap"
          name="selectCar"
          size="sm"
          value={carConfig.carDto ? carConfig.carDto.id : 0}
          onChange={(e) => onHandleCarSelect(parseInt(e.target.value))}
          disabled={isDisabled}
        >
          <option className="text-center fw-medium bg-dark" value={0}>
            {t("carSelect")}
          </option>
          {cars.map((car) => (
            <option className="fw-medium bg-dark" key={car.id} value={car.id}>
              {car.makerDto.name + " " + car.model + " (" + car.year + ")"}
            </option>
          ))}
        </Form.Select>
      </Card.Header>
      <Card.Body className="d-flex flex-column justify-content-between">
        <br />
        <div className="d-flex flex-column align-items-center h-100 w-100">
          <div className="d-flex justify-content-center h-100 w-100">
            <Image className="rounded-3" src="images/cars/car.webp" height={180} />
          </div>
        </div>

        <Card className="without-background">
          <Card.Header className="text-center text-light fw-bold fs-5">
            {t("classSelect")}
          </Card.Header>
          <Card.Body>
            <ListGroup horizontal>
              {classes.map((clase) => (
                <ListGroup.Item
                  className="text-center profile-card text-light fw-medium select-class"
                  key={clase.id}
                  action
                  active={clase.id === carConfig.classesDto.id}
                  onClick={() => {
                    if (!isDisabled) {
                      onClickClass(clase.id);
                    }
                  }}
                >
                  {clase.name}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>
        <br />
      </Card.Body>
    </Card>
  );
};

export default CarLevelSelectComponent;
