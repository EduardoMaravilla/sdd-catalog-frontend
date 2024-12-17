import { ChangeEvent, FC, useEffect, useState } from "react";
import FilterComponent from "../components/utils/FilterComponent";
import {
  CarConfigurationDto,
  CarDto,
  ClassesDto,
  EngineDto,
  FilterCar,
  GearDto,
  MakerDto,
  StreetTypeDto,
  TurboDto,
  TurboTypeDto,
} from "../types/TypeCars";
import { Container } from "react-bootstrap";
import { BuildConfigComponent } from "../components/utils/BuildConfigComponent";
import { useCarConfiguration } from "../context/config-car/useCarConfiguration";
import { CarConfigurationContext } from "../context/config-car/CarConfigurationContext";
import { PaginationComponent } from "../components/utils/PaginationComponent";
import { useLoadProfileData } from "../context/profile-data/useLoadProfileData";
import { LoadProfileDataContext } from "../context/profile-data/LoadProfileDataContext";

type PersonalBuildsPageProps = {
  t: (key: string) => string;
};

const initialForm: FilterCar = {
  carFilterId: null,
  makerFilterId: null,
  classesFilterId: null,
  engineFilterId: null,
  streetTypeFilterId: null,
  turboTypeFilterId: null,
  gearFilterId: null,
};

const PersonalBuildsPage: FC<PersonalBuildsPageProps> = ({ t }) => {
  const { profileAllCarConfigs } = useLoadProfileData(LoadProfileDataContext);
  const { setCarConfigurationCreated } = useCarConfiguration(
    CarConfigurationContext
  );
  const [allMyCarConfigs, setAllMyCarConfigs] =
    useState<CarConfigurationDto[]>(profileAllCarConfigs);
  const [filterCar, setFilterCar] = useState<FilterCar>(initialForm);

  const [profileCars, setProfileCars] = useState<CarDto[]>([]);
  const [profileClasses, setProfileClasses] = useState<ClassesDto[]>([]);
  const [profileEngines, setProfileEngines] = useState<EngineDto[]>([]);
  const [profileMakers, setProfileMakers] = useState<MakerDto[]>([]);
  const [profileStreetTypes, setProfileStreetTypes] = useState<StreetTypeDto[]>(
    []
  );
  const [profileTurboTypes, setProfileTurboTypes] = useState<TurboTypeDto[]>([]);
  const [profileGears, setProfileGears] = useState<GearDto[]>([]);


  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showPaginationsBuilds, setShowPaginationsBuilds] = useState<
    CarConfigurationDto[]
  >([]);
  const [totalPages, setTotalPages] = useState<number>(3);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  //Load car configuration
  useEffect(() => {
    setAllMyCarConfigs(profileAllCarConfigs);
  }, [profileAllCarConfigs]);

  const onChangeFilter = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(event.target.value);
    let newValue: number | null = null;
    const key = event.target.name;
    if (value === 0) {
      newValue = null;
    } else {
      newValue = value;
    }
    setFilterCar((prevFilter) => ({
      ...prevFilter,
      [key]: newValue,
    }));
  };

  const onResetFilter = () => {
    setFilterCar(initialForm);
    setAllMyCarConfigs(profileAllCarConfigs);
  };

  //Update Car Configuration when user changed the filters
  useEffect(() => {
    let myCarsConfigs = [...profileAllCarConfigs];
    if (filterCar.carFilterId && filterCar.carFilterId > 0) {
      myCarsConfigs = myCarsConfigs.filter(
        (pACC) => pACC.carDto && pACC.carDto.id === filterCar.carFilterId
      );
    }
    if (filterCar.makerFilterId && filterCar.makerFilterId > 0) {
      myCarsConfigs = myCarsConfigs.filter(
        (pACC) =>
          pACC.carDto && pACC.carDto.makerDto.id === filterCar.makerFilterId
      );
    }
    if (filterCar.classesFilterId && filterCar.classesFilterId > 0) {
      myCarsConfigs = myCarsConfigs.filter(
        (pACC) =>
          pACC.classesDto && pACC.classesDto.id === filterCar.classesFilterId
      );
    }
    if (filterCar.engineFilterId && filterCar.engineFilterId > 0) {
      myCarsConfigs = myCarsConfigs.filter(
        (pACC) =>
          pACC.engineDto && pACC.engineDto.id === filterCar.engineFilterId
      );
    }
    if (filterCar.streetTypeFilterId && filterCar.streetTypeFilterId > 0) {
      myCarsConfigs = myCarsConfigs.filter(
        (pACC) =>
          (pACC.tireDto &&
            pACC.tireDto.streetTypeDto.id === filterCar.streetTypeFilterId) ||
          (pACC.suspensionDto &&
            pACC.suspensionDto.streetTypeDto.id ===
              filterCar.streetTypeFilterId)
      );
    }

    if(filterCar.turboTypeFilterId && filterCar.turboTypeFilterId > 0) {
        myCarsConfigs = myCarsConfigs.filter(
          (pACC) =>
            pACC.turboDto &&
            pACC.turboDto.turboTypeDto.id === filterCar.turboTypeFilterId
        );
    }
    
    if(filterCar.gearFilterId && filterCar.gearFilterId > 0) {
      myCarsConfigs = myCarsConfigs.filter(
        (pACC) =>
          pACC.gearDto && pACC.gearDto.id === filterCar.gearFilterId
      );
    }

    setAllMyCarConfigs(myCarsConfigs);
    setCurrentPage(1);
  }, [filterCar]); // eslint-disable-line react-hooks/exhaustive-deps

  //Update filters
  useEffect(() => {
    const myConfigs = Array.isArray(allMyCarConfigs) ? allMyCarConfigs : [];

    const carsSet = new Set<CarDto>(
      Array.from(
        new Map(
          myConfigs
            .map((pACC) => pACC.carDto)
            .filter((carDto): carDto is CarDto => carDto !== null)
            .map((carDto) => [JSON.stringify(carDto), carDto])
        ).values()
      )
    );
    setProfileCars(
      Array.from(carsSet).sort((a, b) => {
        const makerComparison = a.makerDto.name.localeCompare(b.makerDto.name);
        if (makerComparison !== 0) {
          return makerComparison;
        }
        return a.model.localeCompare(b.model);
      })
    );

    const classesSet = new Set<ClassesDto>(
      Array.from(
        new Map(
          myConfigs
            .map((pACC) => pACC.classesDto)
            .filter(
              (classesDto): classesDto is ClassesDto => classesDto !== null
            )
            .map((classesDto) => [JSON.stringify(classesDto), classesDto])
        ).values()
      )
    );
    setProfileClasses(
      Array.from(classesSet).sort((a, b) => a.name.localeCompare(b.name))
    );

    const enginesSet = new Set<EngineDto>(
      Array.from(
        new Map(
          myConfigs
            .map((pACC) => pACC.engineDto)
            .filter((engineDto): engineDto is EngineDto => engineDto !== null)
            .map((engineDto) => [JSON.stringify(engineDto), engineDto])
        ).values()
      )
    );
    setProfileEngines(
      Array.from(enginesSet).sort((a, b) => {
        if (a.levelDto.id !== b.levelDto.id) {
          return a.levelDto.id - b.levelDto.id;
        }
        return a.liters - b.liters;
      })
    );

    const turboTypesSet = new Set<TurboTypeDto>(
      Array.from(
        new Map(
          myConfigs
            .map((pACC) => pACC.turboDto)
            .filter((turboDto): turboDto is TurboDto => turboDto!== null)
            .map((t) => t.turboTypeDto)
            .filter((turboTypeDto): turboTypeDto is TurboTypeDto => turboTypeDto!== null)
            .map((turboTypeDto) => [JSON.stringify(turboTypeDto), turboTypeDto])
        ).values()
      )
    );
    setProfileTurboTypes(Array.from(turboTypesSet).sort((a,b)=> a.id - b.id));

    const makersSet = new Set<MakerDto>(
      Array.from(
        new Map(
          myConfigs
            .map((pACC) => pACC.carDto)
            .filter((carDto): carDto is CarDto => carDto !== null)
            .map((carDto) => carDto.makerDto)
            .filter((makerDto): makerDto is MakerDto => makerDto !== null)
            .map((makerDto) => [JSON.stringify(makerDto), makerDto])
        ).values()
      )
    );
    setProfileMakers(
      Array.from(makersSet).sort((a, b) => a.name.localeCompare(b.name))
    );

    const gearsSet = new Set<GearDto>(
      Array.from(
        new Map(
          myConfigs
            .map((pACC) => pACC.gearDto)
            .filter((gearDto): gearDto is GearDto => gearDto!== null)
            .map((gearDto) => [JSON.stringify(gearDto), gearDto])
        ).values()
      )
    );
    setProfileGears(Array.from(gearsSet).sort((a, b) => a.id - b.id));

    const myTires: StreetTypeDto[] = Array.from(
      new Map(
        myConfigs
          .map((pACC) => pACC.tireDto?.streetTypeDto)
          .filter((sT): sT is StreetTypeDto => sT !== undefined)
          .map((sT) => [JSON.stringify(sT), sT])
      ).values()
    );

    const mySuspensions: StreetTypeDto[] = Array.from(
      new Map(
        myConfigs
          .map((pACC) => pACC.suspensionDto?.streetTypeDto)
          .filter((sT): sT is StreetTypeDto => sT !== undefined)
          .map((sT) => [JSON.stringify(sT), sT])
      ).values()
    );

    const uniqueStreetTypes = new Map(
      [...myTires, ...mySuspensions].map((sT) => [JSON.stringify(sT), sT])
    );

    setProfileStreetTypes(
      Array.from(uniqueStreetTypes.values()).sort((a, b) => a.id - b.id)
    );
  }, [allMyCarConfigs]);

  useEffect(() => {
    const itemForPage = 10;
    setTotalPages(Math.ceil(allMyCarConfigs.length / itemForPage));
    const startIndex = (currentPage - 1) * itemForPage;
    const endIndex = startIndex + itemForPage;
    setShowPaginationsBuilds(allMyCarConfigs.slice(startIndex, endIndex));
  }, [allMyCarConfigs.length, currentPage, allMyCarConfigs]);

  return (
    <>
      <Container className="d-flex justify-content-center">
        <FilterComponent
          t={t}
          cars={profileCars}
          classes={profileClasses}
          engines={profileEngines}
          makers={profileMakers}
          streetTypes={profileStreetTypes}
          turboTypes={profileTurboTypes}
          gears={profileGears}
          filterForm={filterCar}
          results={allMyCarConfigs.length}
          onChangeFilter={onChangeFilter}
          onResetFilter={onResetFilter}
        />
      </Container>
      {allMyCarConfigs.length > 0 ? (
        <div className="border border-primary-subtle">
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={handlePageChange}
          />
          <div className="d-flex flex-wrap justify-content-center align-items-center">
            {showPaginationsBuilds.map((carConfig) => (
              <BuildConfigComponent
                key={carConfig.id}
                t={t}
                nameCar={
                  carConfig.carDto
                    ? `${carConfig.carDto.makerDto.name} ${carConfig.carDto.model} (${carConfig.carDto.year})`
                    : ""
                }
                classCar={carConfig.classesDto.name}
                carConfig={carConfig}
                setCarConfigurationCreated={setCarConfigurationCreated}
              />
            ))}
          </div>
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={handlePageChange}
          />
        </div>
      ) : null}
    </>
  );
};

export default PersonalBuildsPage;
