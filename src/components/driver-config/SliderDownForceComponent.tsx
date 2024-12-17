import { Box, Slider, Typography } from "@mui/material";
import { FC } from "react";
import { CarConfigurationDto } from "../../types/TypeCars";

const MAX = 5;
const MIN = -5;

type SliderDownForceComponentProps = {
  t: (key: string) => string;
  carConfig: CarConfigurationDto;
  setCarConfig: (config: CarConfigurationDto) => void;
  isDisabled: boolean;
};

const SliderDownForceComponent: FC<SliderDownForceComponentProps> = ({
  t,
  carConfig,
  setCarConfig,
  isDisabled,
}) => {
  const handleChange = (_: Event, newValue: number | number[]) => {
    const value = newValue as number;
    const newCarConfig: CarConfigurationDto = { ...carConfig };
    newCarConfig.driverDto.downForce = value;
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
          {t("downForce")}
        </Typography>
        <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
          {carConfig.driverDto.downForce}
        </Typography>
      </Box>
      <Slider
        step={1}
        value={carConfig.driverDto.downForce}
        valueLabelDisplay="off"
        min={MIN}
        max={MAX}
        onChange={handleChange}
        track={false}
        disabled={isDisabled}
      />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
          {t("low")}
        </Typography>
        <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
          {t("high")}
        </Typography>
      </Box>
    </Box>
  );
};

export default SliderDownForceComponent;
