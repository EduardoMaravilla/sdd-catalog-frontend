import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth/useAuth";
import { AuthenticationContext } from "../context/auth/AuthenticationContext";

const FooterComponent = () => {
   const {isLoading} = useAuth(AuthenticationContext);
  return (
    <div className="text-center text-light fw-medium">
      <div>
        <p className="my-2">© 2024 SDD-CATALOGO.</p>
      </div>
      <div>
        <a target="_blank" href="https://icons8.com/icon/69470/need-for-speed">
          Icons
        </a>{" "}
        By{" "}
        <a target="_blank" href="https://icons8.com">
          Icons8
        </a>
      </div>
      <div>
        <span>Background </span>
        <a target="_blank" href="https://es.vecteezy.com/fotos-gratis/velocidad">Fotos de Stock por Vecteezy</a>
      </div>
      <div>
        <Nav.Link as={Link} to="/Terms" disabled={isLoading}>Terms and Conditions</Nav.Link>
      </div>
    </div>
  );
};

export default FooterComponent;
