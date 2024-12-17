import { Form } from "react-bootstrap";
import { AuxiliarDto } from "../../types/TypeCars";
import { FC } from "react";
import {
  getColorLevel,
  translationLevels,
} from "../../utils/funcionExport";
import useWindowSize from "../../hooks/useWindowSize";

type SelectAuxiliaryComponentProps = {
  t: (key: string) => string;
  name: string;
  auxiliaries: AuxiliarDto[];
  auxiliar: AuxiliarDto;
  setAuxiliar: (auxiliarId: number) => void;
  isDisabled: boolean;
};

const translationAuxiliaries: { [key: number]: string } = {
  1: "emptySpace",
  2: "impactProtection",
  3: "damageBoost",
  4: "repairKit",
  5: "driftNitro",
  6: "nitroGrip",
  7: "brushNitro",
  8: "slipstreamNitro",
  9: "jumpNitro",
  10: "impactProtection",
  11: "damageBoost",
  12: "repairKit",
  13: "driftNitro",
  14: "nitroGrip",
  15: "brushNitro",
  16: "slipstreamNitro",
  17: "jumpNitro",
  18: "radioJammer",
  19: "runawayDriver",
};

export const SelectAuxiliaryComponent: FC<SelectAuxiliaryComponentProps> = ({
  t,
  name,
  auxiliaries,
  auxiliar,
  setAuxiliar,
  isDisabled,
}) => {
  const { width } = useWindowSize();
  return (
    <Form.Select
      name={name}
      size="sm"
      className="fw-bold text-wrap"
      style={{
        backgroundColor: getColorLevel(auxiliar.levelDto.id),
        color: "white",
      }}
      value={auxiliar.id}
      onChange={(e) => setAuxiliar(parseInt(e.target.value))}
      disabled={isDisabled}
    >
      {auxiliaries.map((aux) => (
        <option
          key={aux.id}
          value={aux.id}
          className="fw-medium"
          style={{
            backgroundColor: getColorLevel(aux.levelDto.id),
            color: "white",
          }}
        >
          {`${t(translationAuxiliaries[aux.id])}${
            width >= 992
              ? ""
              : " (" + t(translationLevels[aux.levelDto.id]) + ")"
          }`}
        </option>
      ))}
    </Form.Select>
  );
};
