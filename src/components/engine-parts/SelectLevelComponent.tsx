import { FC } from "react";
import { Form } from "react-bootstrap";
import {
  getColorLevel,
  translationLevels,
} from "../../utilities/funcionExport";
import { useLoadBasicData } from "../../context/load-basic-data/useLoadBasicData";
import { LoadBasicDataContext } from "../../context/load-basic-data/LoadBasicDataContext";

type SelectLevelComponentProps = {
  name: string;
  t: (key: string) => string;
  selectedLevel: number;
  setSelectedLevel: (levelId: number) => void;
  isDisabled: boolean;
};

const letterColor: string = "white";

export const SelectLevelComponent: FC<SelectLevelComponentProps> = ({
  name,
  t,
  selectedLevel,
  setSelectedLevel,
  isDisabled,
}) => {
  const { levels } = useLoadBasicData(LoadBasicDataContext);
  return (
    <Form.Select
      name={name}
      className="text-wrap fw-bold"
      size="sm"
      style={{
        backgroundColor: getColorLevel(selectedLevel),
        color: letterColor,
      }}
      value={selectedLevel}
      onChange={(e) => setSelectedLevel(parseInt(e.target.value))}
      disabled={isDisabled}
    >
      {levels.sort((a,b)=> a.id - b.id).map((level) => (
        <option
          key={level.id}
          className="fw-medium"
          style={{
            backgroundColor: getColorLevel(level.id),
            color: letterColor,
          }}
          value={level.id}
        >
          {t(translationLevels[level.id])}
        </option>
      ))}
    </Form.Select>
  );
};
