import { Box, Slider, Typography } from "@mui/material";
import { FC } from "react";
import { CarConfigurationDto } from "../../types/TypeCars";

const MAX = 100;
const MIN = -100;

type SliderDriverComponentProps = {
  t: (key: string) => string;
  carConfig: CarConfigurationDto;
  setCarConfig: (config: CarConfigurationDto) => void;
  isDisabled: boolean;
};

const SliderDriverComponent: FC<SliderDriverComponentProps> = ({
  t,
  carConfig,
  setCarConfig,
  isDisabled,
}) => {  

  const handleChange = (_: Event, newValue: number | number[]) => {
    const value = newValue as number;
    const newCarConfig: CarConfigurationDto = { ...carConfig };
    newCarConfig.driverDto.drive = value;
    setCarConfig(newCarConfig);
    localStorage.setItem(
      "car-configuration-created",
      JSON.stringify(newCarConfig)
    );
  };
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="body2"
          sx={{
            fontSize: "0.75rem",
            fontWeight: "bold",
            textDecoration: "underline",
          }}
        >
          {t("handling")}
        </Typography>
        <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
          {Math.abs(carConfig.driverDto.drive) + " %"}{" "}
          {carConfig.driverDto.drive <= 0 ? t("grip") : t("drift")}
        </Typography>
      </Box>
      <Slider
        step={5}
        value={carConfig.driverDto.drive}
        valueLabelDisplay="off"
        min={MIN}
        max={MAX}
        onChange={handleChange}
        track={false}
        disabled={isDisabled}
      />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
          {t("grip")}
        </Typography>
        <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
          {t("drift")}
        </Typography>
      </Box>
    </Box>
  );
};

export default SliderDriverComponent;
