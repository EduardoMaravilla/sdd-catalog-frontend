import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { FaAddressCard } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { MdCarRepair } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth/useAuth";
import { AuthenticationContext } from "../../context/auth/AuthenticationContext";
import useCurrentPath from "../../hooks/useCurrentPath";
import { GiGearHammer } from "react-icons/gi";

type NavBarMobileProps = {
  t: (key: string) => string;
};

const NavBarMobile: React.FC<NavBarMobileProps> = ({ t }) => {
  const { isLoading } = useAuth(AuthenticationContext);
  const currentPath = useCurrentPath();
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleNavItemClick = () => {
    setExpanded(false); 
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-primary-subtle" expanded={expanded}>
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setExpanded(!expanded)}/>
        <h4>{t("menu")}</h4>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              to="/create-build"
              className="nav-item-mobile"
              disabled={isLoading}
              active={currentPath === "/create-build"}
              onClick={handleNavItemClick}
            >
              <GiGearHammer size={30} />
              <h5>{t("createBuild")}</h5>
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/community-builds"
              className="nav-item-mobile"
              disabled={isLoading}
              active={currentPath === "/community-builds"}
              onClick={handleNavItemClick}
            >
              <IoIosPeople size={30} />
              <h5>{t("communityBuilds")}</h5>
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/personal-builds"
              className="nav-item-mobile"
              disabled={isLoading}
              active={currentPath === "/personal-builds"}
              onClick={handleNavItemClick}
            >
              <MdCarRepair size={30} />
              <h5>{t("personalBuilds")}</h5>
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/profile"
              className="nav-item-mobile"
              disabled={isLoading}
              active={currentPath === "/profile"}
              onClick={handleNavItemClick}
            >
              <FaAddressCard size={30} />
              <h5>{t("profile")}</h5>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBarMobile;
