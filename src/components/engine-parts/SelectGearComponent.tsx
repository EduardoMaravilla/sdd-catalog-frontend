import { FC } from "react";
import { GearDto } from "../../types/TypeCars";
import { Form } from "react-bootstrap";
import {
  getColorLevel,
  translationLevels,
} from "../../utils/funcionExport";
import useWindowSize from "../../hooks/useWindowSize";

type SelectGearComponentProps = {
  t: (key: string) => string;
  name: string;
  gear: GearDto;
  setGear: (gearId: number) => void;
  gears: GearDto[];
  isDisabled: boolean;
};

export const SelectGearComponent: FC<SelectGearComponentProps> = ({
  name,
  gear,
  setGear,
  gears,
  t,
  isDisabled,
}) => {
  const { width } = useWindowSize();
  return (
    <Form.Select
      name={name}
      className="text-wrap fw-bold"
      style={{
        backgroundColor: getColorLevel(gear.levelDto.id),
        color: "white",
      }}
      value={gear.id}
      onChange={(e) => setGear(parseInt(e.target.value))}
      disabled={isDisabled}
    >
      {gears.map((g) => (
        <option
          key={g.id}
          value={g.id}
          className="text-light fw-medium"
          style={{
            backgroundColor: getColorLevel(g.levelDto.id),
            color: "white",
          }}
        >
          {`${g.gearValue}${
            width >= 992
              ? ""
              : " (" + t(translationLevels[g.levelDto.id]) + ")"
          }`}
        </option>
      ))}
    </Form.Select>
  );
};
