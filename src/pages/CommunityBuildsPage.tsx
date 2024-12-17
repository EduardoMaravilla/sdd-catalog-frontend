import { ChangeEvent, FC, useEffect, useState } from "react";
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
import FilterComponent from "../components/utils/FilterComponent";
import { useLoadBasicData } from "../context/load-basic-data/useLoadBasicData";
import { LoadBasicDataContext } from "../context/load-basic-data/LoadBasicDataContext";
import { PaginationComponent } from "../components/utils/PaginationComponent";
import { useAuth } from "../context/auth/useAuth";
import { AuthenticationContext } from "../context/auth/AuthenticationContext";
import { useGetAllCarsWithFilterService } from "../services/racer-car-configuration/useGetAllCarsWithFilterService";
import {
  isApiResponseError,
  loadDataFromLocalStorage,
} from "../utilities/funcionExport";
import { BuildConfigComponent } from "../components/utils/BuildConfigComponent";
import { useCarConfiguration } from "../context/config-car/useCarConfiguration";
import { CarConfigurationContext } from "../context/config-car/CarConfigurationContext";
import { useLoadProfileData } from "../context/profile-data/useLoadProfileData";
import { LoadProfileDataContext } from "../context/profile-data/LoadProfileDataContext";
import { SuccessfulSearchModal } from "../components/modals-components/SuccessfulSearchModal";

interface CommunityBuildsPageProps {
  t: (key: string) => string;
}

const initialForm: FilterCar = {
  carFilterId: null,
  makerFilterId: null,
  classesFilterId: null,
  engineFilterId: null,
  streetTypeFilterId: null,
  turboTypeFilterId: null,
  gearFilterId: null,
};

export const CommunityBuildsPage: FC<CommunityBuildsPageProps> = ({ t }) => {
  const { jwtToken, setIsLoading } = useAuth(AuthenticationContext);
  const { setCarConfigurationCreated } = useCarConfiguration(
    CarConfigurationContext
  );
  const { profileCommunityAllCarConfigs, setProfileCommunityAllCarConfigs,profileAllCarConfigs } =
    useLoadProfileData(LoadProfileDataContext);
  const { cars, classes, engines, makers, streetTypes, turboTypes, gears } =
    useLoadBasicData(LoadBasicDataContext);

  const [filterCar, setFilterCar] = useState<FilterCar>(initialForm);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [communityBuilds, setCommunityBuilds] = useState<CarConfigurationDto[]>(
    []
  );
  const [showPaginationsBuilds, setShowPaginationsBuilds] = useState<
    CarConfigurationDto[]
  >([]);
  const [totalPages, setTotalPages] = useState<number>(3);
  const [isServerSearch, setIsServerSearch] = useState<boolean>(false);

  const [communityCars, setCommunityCars] = useState<CarDto[]>(cars);
  const [communityClasses, setCommunityClasses] =
    useState<ClassesDto[]>(classes);
  const [communityEngines, setCommunityEngines] =
    useState<EngineDto[]>(engines);
  const [communityGears, setCommunityGears] = useState<GearDto[]>(gears);
  const [communityStreetTypes, setCommunityStreetTypes] =
    useState<StreetTypeDto[]>(streetTypes);
  const [communityTurboTypes, setCommunityTurboTypes] =
    useState<TurboTypeDto[]>(turboTypes);
  const [communityMakers, setCommunityMakers] = useState<MakerDto[]>(makers);
  const [modalSearch, setModalSearch] = useState<boolean>(false);
  const [isDisableSearch, setIsDisableSearch] = useState<boolean>(false);

  const getAllCarsFilterService = useGetAllCarsWithFilterService();

  const onResetFilter = () => {
    setFilterCar(initialForm);
    if (isServerSearch) {
      setCommunityBuilds([]);
    } else {
      setCommunityBuilds(profileCommunityAllCarConfigs);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const onChangeFilter = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(event.target.value);
    const key = event.target.name;
    setFilterCar((prevFilter) => ({
      ...prevFilter,
      [key]: value,
    }));
  };

  const excludeIds = () => {
    const idsCommunity = newCommunityCarConfigs(profileCommunityAllCarConfigs).map(c => c.id).filter((id): id is number => id !== null);
    const idsProfile = newCommunityCarConfigs(profileAllCarConfigs).map(c => c.id).filter((id): id is number => id !== null);
    filterCar.excludeIds = [...idsCommunity,...idsProfile];
  }

  const onSearchFilter = async () => {
    setIsLoading(true);
    setIsDisableSearch(true);
    excludeIds();

    if (jwtToken) {
      const response = await getAllCarsFilterService
        .useChargeDataInOptions( filterCar, 0, 30)
        .getFetch();
      if (isApiResponseError(response.data)) {
        setCommunityBuilds([]);
      } else if (response.data) {
        setCommunityBuilds(response.data.content);
        updateDataCommunityBuilds(response.data.content);
        setModalSearch(true);
        setFilterCar(initialForm);
      }
    }
    setIsLoading(false);    
    setTimeout(() => setIsDisableSearch(false), 30000);
  };

  useEffect(() => {
    const itemForPage = 10;
    setTotalPages(Math.ceil(communityBuilds.length / itemForPage));
    const startIndex = (currentPage - 1) * itemForPage;
    const endIndex = startIndex + itemForPage;
    setShowPaginationsBuilds(communityBuilds.slice(startIndex, endIndex));
  }, [communityBuilds.length, currentPage, communityBuilds]);

  //Update Car Configuration when user changed the filters
  useEffect(() => {
    if (isServerSearch) {
      if (filterCar.makerFilterId && filterCar.makerFilterId > 0) {
        setCommunityCars(
          cars
            .filter((c) => c.makerDto.id === filterCar.makerFilterId)
            .sort((a, b) => {
              const makerComparison = a.makerDto.name.localeCompare(
                b.makerDto.name
              );
              if (makerComparison !== 0) {
                return makerComparison;
              }
              return a.model.localeCompare(b.model);
            })
        );
      } else {
        setCommunityCars(cars);
      }
      if (filterCar.carFilterId && filterCar.carFilterId > 0) {
        const filterMaker = cars.filter(
          (c) => c.id === filterCar.carFilterId
        )[0];
        setCommunityMakers(
          makers.filter((m) => m.id === filterMaker.makerDto.id)
        );
      } else {
        setCommunityMakers(makers);
      }
      return;
    }
    const myCarsConfigs = newCommunityCarConfigs(profileCommunityAllCarConfigs);
    setCommunityBuilds(myCarsConfigs);
    setCurrentPage(1);
  }, [filterCar]); // eslint-disable-line react-hooks/exhaustive-deps
  
  //Filter Cars
  const newCommunityCarConfigs = (carConfigs: CarConfigurationDto[]) => {
    let myCarsConfigs = [...carConfigs];
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
    if (filterCar.turboTypeFilterId && filterCar.turboTypeFilterId > 0) {
      myCarsConfigs = myCarsConfigs.filter(
        (pACC) =>
          pACC.turboDto &&
          pACC.turboDto.turboTypeDto.id === filterCar.turboTypeFilterId
      );
    }
    if (filterCar.gearFilterId && filterCar.gearFilterId > 0) {
      myCarsConfigs = myCarsConfigs.filter(
        (pACC) => pACC.gearDto && pACC.gearDto.id === filterCar.gearFilterId
      );
    }
    return myCarsConfigs;
  };

  //Update filters
  useEffect(() => {
    if (isServerSearch) {
      setCommunityMakers(makers);
      setCommunityCars(cars);
      setCommunityClasses(classes);
      setCommunityEngines(engines);
      setCommunityGears(gears);
      setCommunityStreetTypes(streetTypes);
      setCommunityTurboTypes(turboTypes);
      return;
    }
    const myConfigs = Array.isArray(communityBuilds) ? communityBuilds : [];
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
    setCommunityCars(
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
    setCommunityClasses(
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
    setCommunityEngines(
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
            .filter((turboDto): turboDto is TurboDto => turboDto !== null)
            .map((t) => t.turboTypeDto)
            .filter(
              (turboTypeDto): turboTypeDto is TurboTypeDto =>
                turboTypeDto !== null
            )
            .map((turboTypeDto) => [JSON.stringify(turboTypeDto), turboTypeDto])
        ).values()
      )
    );
    setCommunityTurboTypes(
      Array.from(turboTypesSet).sort((a, b) => a.id - b.id)
    );

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
    setCommunityMakers(
      Array.from(makersSet).sort((a, b) => a.name.localeCompare(b.name))
    );

    const gearsSet = new Set<GearDto>(
      Array.from(
        new Map(
          myConfigs
            .map((pACC) => pACC.gearDto)
            .filter((gearDto): gearDto is GearDto => gearDto !== null)
            .map((gearDto) => [JSON.stringify(gearDto), gearDto])
        ).values()
      )
    );
    setCommunityGears(Array.from(gearsSet).sort((a, b) => a.id - b.id));

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

    setCommunityStreetTypes(
      Array.from(uniqueStreetTypes.values()).sort((a, b) => a.id - b.id)
    );
  }, [communityBuilds, isServerSearch]); // eslint-disable-line react-hooks/exhaustive-deps

  const onChangeServerSearch = () => {
    setIsServerSearch(!isServerSearch);
  };

  useEffect(() => onResetFilter(), [isServerSearch]); // eslint-disable-line react-hooks/exhaustive-deps

  const updateDataCommunityBuilds = (carConfigs: CarConfigurationDto[]) => {
    const profileCommunityAllCars = loadDataFromLocalStorage<
      CarConfigurationDto[]
    >("profileCommunityAllCarConfigs");
    if (profileCommunityAllCars) {
      const localCarConfigs: CarConfigurationDto[] = Array.from(
        new Map(
          profileCommunityAllCars.map((pCAC) => [JSON.stringify(pCAC), pCAC])
        ).values()
      );
      const newCarConfigs: CarConfigurationDto[] = Array.from(
        new Map(carConfigs.map((pCAC) => [JSON.stringify(pCAC), pCAC])).values()
      );
      const uniqueCarConfigs: CarConfigurationDto[] = Array.from(
        new Map(
          [...localCarConfigs, ...newCarConfigs].map((cC) => [
            JSON.stringify(cC),
            cC,
          ])
        ).values()
      );
      localStorage.setItem(
        "profileCommunityAllCarConfigs",
        JSON.stringify(uniqueCarConfigs)
      );
      setProfileCommunityAllCarConfigs(uniqueCarConfigs);
    } else {
      localStorage.setItem(
        "profileCommunityAllCarConfigs",
        JSON.stringify(carConfigs)
      );
      setProfileCommunityAllCarConfigs(carConfigs);
    }
  };

  //Load car configuration
  useEffect(() => {
    if (!isServerSearch) {
      setCommunityBuilds(profileCommunityAllCarConfigs);
    }
  }, [isServerSearch]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Container className="d-flex justify-content-center">
        <FilterComponent
          t={t}
          cars={communityCars}
          classes={communityClasses}
          engines={communityEngines}
          makers={communityMakers}
          streetTypes={communityStreetTypes}
          turboTypes={communityTurboTypes}
          gears={communityGears}
          results={communityBuilds.length}
          filterForm={filterCar}
          onResetFilter={onResetFilter}
          onChangeFilter={onChangeFilter}
          onSearchFilter={onSearchFilter}
          isServerSearch={isServerSearch}
          onChangeServerSearch={onChangeServerSearch}
          disableSearch={isDisableSearch}
        />
      </Container>
      {communityBuilds.length > 0 ? (
        <div className="border border-primary-subtle">
          <PaginationComponent
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={handlePageChange}
          />
          <div className="d-flex flex-wrap justify-content-center">
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
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={handlePageChange}
          />
        </div>
      ) : null}
      <SuccessfulSearchModal
        show={modalSearch}
        t={t}
        onHide={() => setModalSearch(false)}
        results={communityBuilds.length}
      />
    </>
  );
};
