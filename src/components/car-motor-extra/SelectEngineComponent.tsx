import { FC } from "react";
import { EngineDto } from "../../types/TypeCars";
import { Form } from "react-bootstrap";
import {
  getColorLevel,
  translationLevels,
} from "../../utilities/funcionExport";
import useWindowSize from "../../hooks/useWindowSize";

type SelectEngineComponentProps = {
  t: (key: string) => string;
  name: string;
  engines: EngineDto[];
  engine: EngineDto;
  setEngine: (engineId: number) => void;
  isDisabled: boolean;
};

export const SelectEngineComponent: FC<SelectEngineComponentProps> = ({
  t,
  name,
  engines,
  engine,
  setEngine,
  isDisabled,
}) => {
  const { width } = useWindowSize();
  return (
    <Form.Select
      name={name}
      className="fw-bold"
      style={{
        backgroundColor: getColorLevel(engine.levelDto.id),
        color: "white",
        fontFamily: "cursive",
      }}
      value={engine.id}
      onChange={(e) => setEngine(parseInt(e.target.value))}
      disabled={isDisabled}
    >
      {engines.map((eng) => (
        <option
          key={eng.id}
          value={eng.id}
          className="fw-bold"
          style={{
            backgroundColor: getColorLevel(eng.levelDto.id),
            color: "white",
            fontFamily: "cursive",
          }}
        >
          {eng.liters.toFixed(1) +
            "L " +
            eng.model +
            " " +
            eng.bhp +
            " bhp" +
            (width >= 992
              ? ""
              : " (" + t(translationLevels[eng.levelDto.id]) + ")")}
        </option>
      ))}
    </Form.Select>
  );
};
