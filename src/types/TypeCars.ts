export interface BasicDataContextType {
  auxiliaries: AuxiliarDto[];
  setAuxiliaries: (auxiliaries: AuxiliarDto[]) => void;
  cars: CarDto[];
  setCars: (cars: CarDto[]) => void;
  classes: ClassesDto[];
  setClasses: (classes: ClassesDto[]) => void;
  engines: EngineDto[];
  setEngines: (engines: EngineDto[]) => void;
  gears: GearDto[];
  setGears: (gears: GearDto[]) => void;
  initSkids: InitSkidDto[];
  setInitSkids: (initSkids: InitSkidDto[]) => void;
  levels: LevelDto[];
  setLevels: (levels: LevelDto[]) => void;
  makers: MakerDto[];
  setMakers: (makers: MakerDto[]) => void;
  streetTypes: StreetTypeDto[];
  setStreetTypes: (streetTypes: StreetTypeDto[]) => void;
  suspensions: SuspensionDto[];
  setSuspensions: (suspensions: SuspensionDto[]) => void;
  tires: TireDto[];
  setTires: (tires: TireDto[]) => void;
  turbos: TurboDto[];
  setTurbos: (turbos: TurboDto[]) => void;
  turboTypes: TurboTypeDto[];
  setTurboTypes: (turboTypes: TurboTypeDto[]) => void;
}

export interface CarConfigurationContextType {
  carConfigurationCreated: CarConfigurationDto;
  setCarConfigurationCreated: (carConfiguration: CarConfigurationDto) => void;
}

export const initialCarConfiguration: CarConfigurationDto = {
  id: null,
  carDto: null,
  engineDto: {
    id: 1,
    bhp: 225,
    liters: 4.9,
    model: "V8",
    levelDto: {
      id: 1,
      level: "Basico",
    },
  },
  inductionLevelDto: { id: 1, level: "Basico" },
  ecuLevelDto: { id: 1, level: "Basico" },
  injectionLevelDto: { id: 1, level: "Basico" },
  escapeLevelDto: { id: 1, level: "Basico" },
  turboDto: {
    id: 1,
    turboTypeDto: { id: 1, type: "Aspiración Natural" },
    levelDto: { id: 1, level: "Basico" },
  },
  nitroLevelDto: { id: 2, level: "Deportivo" },
  suspensionDto: {
    id: 1,
    streetTypeDto: { id: 1, streetTypeVal: "Normal" },
    levelDto: { id: 1, level: "Basico" },
  },
  brakeLevelDto: { id: 1, level: "Basico" },
  tireDto: {
    id: 1,
    streetTypeDto: { id: 1, streetTypeVal: "Normal" },
    levelDto: { id: 1, level: "Basico" },
  },
  embragueLevelDto: { id: 1, level: "Basico" },
  gearDto: { id: 1, gearValue: 1, levelDto: { id: 5, level: "Elite" } },
  differentialLevelDto: { id: 5, level: "Elite" },
  topSpeed: 0,
  oneHundred: 0.0,
  power: 0,
  par: 0,
  fourHundred: 0.0,
  driverDto: {
    id: null,
    drive: 0,
    direction: 0,
    downForce: 0,
    controlTraction: false,
    initSkidDto: { id: 4, skidType: "POR DEFECTO" },
  },
  auxiliarOneDto: {
    id: 1,
    auxiliar: "ESPACIO VACIO",
    levelDto: { id: 1, level: "Basico" },
  },
  auxiliarTwoDto: {
    id: 1,
    auxiliar: "ESPACIO VACIO",
    levelDto: { id: 1, level: "Basico" },
  },
  classesDto: { id: 1, name: "B" },
};

export interface AuxiliarDto {
  id: number;
  auxiliar: string;
  levelDto: LevelDto;
}

export interface CarConfigurationDto {
  id: number | null;
  carDto: CarDto | null;
  engineDto: EngineDto;
  inductionLevelDto: LevelDto;
  ecuLevelDto: LevelDto;
  injectionLevelDto: LevelDto;
  escapeLevelDto: LevelDto;
  turboDto: TurboDto;
  nitroLevelDto: LevelDto;
  suspensionDto: SuspensionDto;
  brakeLevelDto: LevelDto;
  tireDto: TireDto;
  embragueLevelDto: LevelDto;
  gearDto: GearDto;
  differentialLevelDto: LevelDto; 
  topSpeed: number;
  oneHundred: number;
  power: number;
  par: number;
  fourHundred: number;
  driverDto: DriverDto;
  auxiliarOneDto: AuxiliarDto;
  auxiliarTwoDto: AuxiliarDto;
  classesDto: ClassesDto;
}

export interface CarDto {
  id: number;
  makerDto: MakerDto;
  model: string;
  year: string;
}

export interface ClassesDto {
  id: number;
  name: string;
}

export interface DriverDto {
  id: number | null;
  drive: number;
  direction: number;
  downForce: number;
  controlTraction: boolean;
  initSkidDto: InitSkidDto;
}

export interface EngineDto {
  id: number;
  bhp: number;
  liters: number;
  model: string;
  levelDto: LevelDto;
}

export interface GearDto {
  id: number;
  gearValue: number;
  levelDto: LevelDto;
}

export interface InitSkidDto {
  id: number;
  skidType: string;
}

export interface LevelDto {
  id: number;
  level: string;
}

export interface MakerDto {
  id: number;
  name: string;
}

export interface StreetTypeDto {
  id: number;
  streetTypeVal: string;
}

export interface SuspensionDto {
  id: number;
  streetTypeDto: StreetTypeDto;
  levelDto: LevelDto;
}

export interface TireDto {
  id: number;
  streetTypeDto: StreetTypeDto;
  levelDto: LevelDto;
}

export interface TurboDto {
  id: number;
  turboTypeDto: TurboTypeDto;
  levelDto: LevelDto;
}

export interface TurboTypeDto {
  id: number;
  type: string;
}

export interface FilterCar{
  makerFilterId: number | null;
  carFilterId: number | null;
  classesFilterId: number | null;
  engineFilterId: number | null;
  streetTypeFilterId: number | null;
  turboTypeFilterId: number | null;
  gearFilterId: number | null;
  excludeIds?: number[] | null;
}
