import { FC } from "react";
import { SuspensionDto, TireDto } from "../../types/TypeCars";
import { Form } from "react-bootstrap";
import {
  getColorLevel,
  translationLevels,
  translationStreetType,
} from "../../utils/funcionExport";
import useWindowSize from "../../hooks/useWindowSize";

type SelectStreetTypeComponentProps = {
  name: string;
  t: (key: string) => string;
  streetType: SuspensionDto | TireDto;
  setStreetType: (streetTypeId: number) => void;
  streetTypes: SuspensionDto[] | TireDto[];
  isDisabled: boolean;
};

export const SelectStreetTypeComponent: FC<SelectStreetTypeComponentProps> = ({
  name,
  t,
  streetType,
  setStreetType,
  streetTypes,
  isDisabled,
}) => {
  const { width } = useWindowSize();
  return (
    <Form.Select
      name={name}
      size="sm"
      className="fw-bold text-wrap"
      style={{
        backgroundColor: getColorLevel(streetType.levelDto.id),
        color: "white",
      }}
      value={streetType.id}
      onChange={(e) => setStreetType(parseInt(e.target.value))}
      disabled={isDisabled}
    >
      {streetTypes.map((sT) => (
        <option
          key={sT.id}
          value={sT.id}
          className="fw-medium"
          style={{
            backgroundColor: getColorLevel(sT.levelDto.id),
            color: "white",
          }}
        >
          {`${t(translationStreetType[sT.streetTypeDto.id])}${
            width >= 992
              ? ""
              : " (" + t(translationLevels[sT.levelDto.id]) + ")"
          }`}
        </option>
      ))}
    </Form.Select>
  );
};
