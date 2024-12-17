import { Button, Form, Row, Col } from "react-bootstrap";
import {
  CarDto,
  ClassesDto,
  EngineDto,
  FilterCar,
  GearDto,
  MakerDto,
  StreetTypeDto,
  TurboTypeDto,
} from "../../types/TypeCars";
import { ChangeEvent, FC } from "react";
import {
  getColorLevel,
  translationLevels,
  translationStreetType,
  translationTurboType,
} from "../../utilities/funcionExport";
import useCurrentPath from "../../hooks/useCurrentPath";

type FilterComponentProps = {
  t: (key: string) => string;
  cars: CarDto[];
  makers: MakerDto[];
  classes: ClassesDto[];
  engines: EngineDto[];
  streetTypes: StreetTypeDto[];
  turboTypes: TurboTypeDto[];
  gears: GearDto[];
  results: number;
  filterForm: FilterCar;
  onChangeFilter: (event: ChangeEvent<HTMLSelectElement>) => void;
  onResetFilter: () => void;
  onSearchFilter?: () => void;
  isServerSearch?: boolean;
  onChangeServerSearch?: () => void;
  disableSearch?:boolean;
};

const FilterComponent: FC<FilterComponentProps> = ({
  t,
  cars,
  classes,
  engines,
  makers,
  streetTypes,
  turboTypes,
  gears,
  results,
  filterForm,
  onChangeFilter,
  onResetFilter,
  isServerSearch,
  onChangeServerSearch,
  onSearchFilter,
  disableSearch,
}) => {
  const currentPath = useCurrentPath();
  return (
    <Row className="w-100 p-3 my-3 profile-card rounded-4 shadow-sm border border-primary-subtle">
      <Row className="w-100">
        <Col>
          <h5 className="text-light fw-bold mb-3">
            {t("filterTitle") + ": " + results + " " + t("filterResults")}
          </h5>
        </Col>
        {currentPath !== "/community-builds" ? null : (
          <Col className="d-flex justify-content-end mb-2">
            <Button
              size="sm"
              variant="outline-light"
              className={
                "fw-medium text-nowrap mx-2 " +
                (isServerSearch ? "active-server" : "")
              }
              onClick={() => {
                if (!isServerSearch && onChangeServerSearch) {
                  onChangeServerSearch();
                }
              }}
            >
              Server
            </Button>
            <Button
              size="sm"
              variant="outline-light"
              className={
                "fw-medium text-nowrap mx-2 " +
                (isServerSearch ? "" : "active-server")
              }
              onClick={() => {
                if (isServerSearch && onChangeServerSearch) {
                  onChangeServerSearch();
                }
              }}
            >
              Local
            </Button>
          </Col>
        )}
      </Row>
      <hr />
      {/*Maker filter */}
      <Col md={6} lg={3} className="mb-3">
        <Form.Select
          size="sm"
          className="fw-bold text-light without-background"
          name="makerFilterId"
          value={filterForm.makerFilterId ? filterForm.makerFilterId : 0}
          onChange={onChangeFilter}
        >
          <option className="text-center bg-dark" value={0}>
            {t("makerSelect")}
          </option>
          {makers.map((maker) => (
            <option key={maker.id} value={maker.id} className="bg-dark">
              {maker.name}
            </option>
          ))}
        </Form.Select>
      </Col>

      {/*Car filter */}
      <Col md={6} lg={3} className="mb-3">
        <Form.Select
          size="sm"
          className="fw-bold text-light without-background"
          value={filterForm.carFilterId ? filterForm.carFilterId : 0}
          name="carFilterId"
          onChange={onChangeFilter}
        >
          <option className="text-center bg-dark" value={0}>
            {t("carSelect")}
          </option>
          {cars.map((car) => (
            <option key={car.id} value={car.id} className="bg-dark">
              {car.makerDto.name + " " + car.model + " (" + car.year + ")"}
            </option>
          ))}
        </Form.Select>
      </Col>

      {/*Class filter */}
      <Col md={6} lg={3} className="mb-3">
        <Form.Select
          size="sm"
          className="fw-bold text-light without-background"
          name="classesFilterId"
          value={filterForm.classesFilterId ? filterForm.classesFilterId : 0}
          onChange={onChangeFilter}
        >
          <option className="text-center bg-dark" value={0}>
            {t("classSelect")}
          </option>
          {classes.sort((a,b)=> a.id - b.id).map((classItem) => (
            <option key={classItem.id} value={classItem.id} className="bg-dark">
              {classItem.name}
            </option>
          ))}
        </Form.Select>
      </Col>

      {/*Street type filter */}
      <Col md={6} lg={3} className="mb-3">
        <Form.Select
          size="sm"
          className="fw-bold text-light without-background"
          name="streetTypeFilterId"
          value={
            filterForm.streetTypeFilterId ? filterForm.streetTypeFilterId : 0
          }
          onChange={onChangeFilter}
        >
          <option className="text-center bg-dark" value={0}>
            {t("streetTypeSelect")}
          </option>
          {streetTypes.map((streetType) => (
            <option
              key={streetType.id}
              value={streetType.id}
              className="bg-dark"
            >
              {t(translationStreetType[streetType.id])}
            </option>
          ))}
        </Form.Select>
      </Col>

      {/*Turbo Type filter*/}
      <Col md={6} lg={3} className="mb-3">
        <Form.Select
          size="sm"
          className="fw-bold text-light without-background"
          name="turboTypeFilterId"
          value={
            filterForm.turboTypeFilterId ? filterForm.turboTypeFilterId : 0
          }
          onChange={onChangeFilter}
        >
          <option className="text-center bg-dark" value={0}>
            {t("turboTypeSelect")}
          </option>
          {turboTypes.map((turboType) => (
            <option key={turboType.id} value={turboType.id} className="bg-dark">
              {t(translationTurboType[turboType.id])}
            </option>
          ))}
        </Form.Select>
      </Col>

      {/*Engine filter */}
      <Col md={6} lg={3} className="mb-3">
        <Form.Select
          size="sm"
          className="fw-bold text-light without-background"
          name="engineFilterId"
          value={filterForm.engineFilterId ? filterForm.engineFilterId : 0}
          onChange={onChangeFilter}
        >
          <option className="text-center bg-dark" value={0}>
            {t("engineSelect")}
          </option>
          {engines.map((eng) => (
            <option
              key={eng.id}
              value={eng.id}
              className="bg-dark"
              style={{
                backgroundColor: getColorLevel(eng.levelDto.id),
                color: "white",
                fontFamily: "cursive",
              }}
            >
              {eng.liters.toFixed(1) +
                "L " +
                eng.model +
                " " +
                eng.bhp +
                " bhp (" +
                t(translationLevels[eng.levelDto.id]) +
                ")"}
            </option>
          ))}
        </Form.Select>
      </Col>

      {/*Gear Filter*/}
      <Col md={6} lg={3} className="mb-3">
        <Form.Select
          size="sm"
          className="fw-bold text-light without-background"
          name="gearFilterId"
          value={filterForm.gearFilterId ? filterForm.gearFilterId : 0}
          onChange={onChangeFilter}
        >
          <option className="text-center bg-dark" value={0}>
            {t("gearSelect")}
          </option>
          {gears.map((gear) => (
            <option key={gear.id} value={gear.id} className="bg-dark">
              {gear.gearValue}
            </option>
          ))}
        </Form.Select>
      </Col>

      <Col className="d-flex justify-content-end mt-3">
        {currentPath === "/community-builds" && isServerSearch ? (
          <Button
            variant="outline-light"
            className="fw-medium text-nowrap px-4 mx-2"
            size="sm"
            onClick={onSearchFilter}
            disabled={disableSearch}
          >
            {t("searchButton")}
          </Button>
        ) : null}
        <Button
          variant="outline-light"
          className="fw-medium text-nowrap px-4"
          size="sm"
          onClick={onResetFilter}
        >
          {t("resetButton")}
        </Button>
      </Col>
    </Row>
  );
};

export default FilterComponent;
