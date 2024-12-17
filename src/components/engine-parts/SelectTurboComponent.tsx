import { FC } from "react";
import { Form } from "react-bootstrap";
import { TurboDto } from "../../types/TypeCars";
import {
  getColorLevel,
  translationLevels,
  translationTurboType,
} from "../../utilities/funcionExport";
import useWindowSize from "../../hooks/useWindowSize";

type SelectTurboComponentProps = {
  name: string;
  t: (key: string) => string;
  turboSelected: TurboDto;
  setTurboSelected: (turboId: number) => void;
  turbos: TurboDto[];
  isDisabled: boolean;
};



export const SelectTurboComponent: FC<SelectTurboComponentProps> = ({
  name,
  turbos,
  t,
  turboSelected,
  setTurboSelected,
  isDisabled,
}) => {
  const { width } = useWindowSize();
  return (
    <Form.Select
      name={name}
      size="sm"
      className="text-wrap fw-bold"
      style={{
        backgroundColor: getColorLevel(turboSelected.levelDto.id),
        color: "white",
      }}
      value={turboSelected.id}
      onChange={(e) => setTurboSelected(parseInt(e.target.value))}
      disabled={isDisabled}
    >
      {turbos.map((turbo) => (
        <option
          key={turbo.id}
          value={turbo.id}
          className="fw-medium"
          style={{
            backgroundColor: getColorLevel(turbo.levelDto.id),
            color: "white",
          }}
        >
          {`${t(translationTurboType[turbo.turboTypeDto.id])}${
            width >= 992
              ? ""
              : " (" + t(translationLevels[turbo.levelDto.id]) + ")"
          }`}
        </option>
      ))}
    </Form.Select>
  );
};
