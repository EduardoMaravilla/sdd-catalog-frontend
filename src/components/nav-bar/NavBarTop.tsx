import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth/useAuth";
import { AuthenticationContext } from "../../context/auth/AuthenticationContext";
import { useAuthLogoutService } from "../../services/auth/useAuthLogoutService";
import { FC, useState } from "react";
import { useCarConfiguration } from "../../context/config-car/useCarConfiguration";
import { CarConfigurationContext } from "../../context/config-car/CarConfigurationContext";
import useWindowSize from "../../hooks/useWindowSize";
import useCurrentPath from "../../hooks/useCurrentPath";
import {
  isApiResponseError,
  isLogoutResponse,
} from "../../utilities/funcionExport";
import { initialCarConfiguration } from "../../types/TypeCars";
import { LogoutSuccessful } from "../modals-components/LogoutSuccessfulModal.tsx";
import { LogoutModal } from "../modals-components/LogoutModal";
import { IconTitleComponent } from "../utils/IconTitleComponent.tsx";

interface NavBarTopProps {
  t: (key: string) => string;
  changeLanguage: (lng: string) => void;
}

const NavBarTop: FC<NavBarTopProps> = ({ t, changeLanguage }) => {
  const {
    isAuthenticated,
    isLoading,
    setIsAuthenticated,
    setIsLoading,
    setJwtToken,
  } = useAuth(AuthenticationContext);
  const logoutService = useAuthLogoutService();
  const [showSuccessfulModal, setShowSuccessfulModal] = useState(false);
  const navigate = useNavigate();
  const { setCarConfigurationCreated } = useCarConfiguration(
    CarConfigurationContext
  );
  const [isLogoutModal, setIsLogoutModal] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleNavItemClick = () => {
    setExpanded(false);
  };

  const { width } = useWindowSize();
  const currentPath = useCurrentPath();

  const onHandleClickLogout = async () => {
    setIsLoading(true);
    const state = await logoutService.getFetch();
    if (isApiResponseError(state.data)) {
      setIsLoading(false);
    } else if (isLogoutResponse(state.data)) {
      setIsLogoutModal(false);
      setShowSuccessfulModal(true);
      setTimeout(() => {
        setShowSuccessfulModal(false);
        setCarConfigurationCreated({ ...initialCarConfiguration });
        localStorage.removeItem("token-jwt-nfs-catalog-unbound");
        localStorage.removeItem("car-configuration-created");
        localStorage.removeItem("user-profile-response");
        localStorage.removeItem("profileAllCarConfigs");
        setIsAuthenticated(false);
        setJwtToken("");
        setIsLoading(false);
      }, 3000);
    } else {
      setIsLoading(false);
    }
  };

  const onClickTitle = () => {
    if (!isLoading) {
      navigate("/home");
    }
  };

  const handleModalHide = () => {
    setShowSuccessfulModal(false);
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      className="fw-bold"
      expanded={expanded}
    >
      {width >= 992 ? (
        <div className="d-flex h-100 justify-content-center align-items-center">
          <button className="no-style-button ms-3" onClick={onClickTitle}>
            <IconTitleComponent />
          </button>
          <button className="no-style-button mx-2 mt-2" onClick={onClickTitle}>
            <p
              className="fs-3 text-nowrap"
              style={{ color: "rgb(0, 234, 255)" }}
            >
              {t("title")}<sup style={{fontSize:"0.8rem"}}>Beta-v1</sup>
            </p>
          </button>
        </div>
      ) : null}
      <Container>
        {width < 992 ? (
          <Navbar.Brand
            onClick={onClickTitle}
            style={{ color: "rgb(0, 234, 255)" }}
          >
            <IconTitleComponent /> {t("title")}
          </Navbar.Brand>
        ) : null}
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => setExpanded(!expanded)}
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              to="/home"
              disabled={isLoading}
              active={currentPath === "/home"}
              onClick={handleNavItemClick}
            >
              {t("home")}
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/about"
              disabled={isLoading}
              active={currentPath === "/about"}
              onClick={handleNavItemClick}
            >
              {t("about")}
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/contact"
              disabled={isLoading}
              active={currentPath === "/contact"}
              onClick={handleNavItemClick}
            >
              {t("contact")}
            </Nav.Link>
          </Nav>
          <Nav>
            {isAuthenticated ? (
              <Nav.Link
                onClick={() => {
                  setIsLogoutModal(true);
                  handleNavItemClick();
                }}
                disabled={isLoading}
              >
                {t("logout")}
              </Nav.Link>
            ) : (
              <Nav.Link
                as={Link}
                to="/login"
                disabled={isLoading}
                active={currentPath === "/login"}
                onClick={handleNavItemClick}
              >
                {t("login")}
              </Nav.Link>
            )}
            <NavDropdown
              title={t("language") + "(" + t("currentLanguage") + ")"}
              id="collapsible-nav-dropdown"
              disabled={isLoading}
            >
              <NavDropdown.Item
                className="fw-medium"
                onClick={() => {
                  changeLanguage("en");
                  handleNavItemClick();
                }}
              >
                English (en)
              </NavDropdown.Item>
              <NavDropdown.Item
                className="fw-medium"
                onClick={() => {
                  changeLanguage("es");
                  handleNavItemClick();
                }}
              >
                Español (es)
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <LogoutModal
        t={t}
        show={isLogoutModal}
        onHide={() => setIsLogoutModal(false)}
        onLogout={async () => await onHandleClickLogout()}
      />
      <LogoutSuccessful
        show={showSuccessfulModal}
        onHide={handleModalHide}
        t={t}
      />
    </Navbar>
  );
};

export default NavBarTop;
