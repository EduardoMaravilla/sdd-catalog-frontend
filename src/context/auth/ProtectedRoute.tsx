import { Navigate, Outlet } from "react-router-dom";
import { FC } from "react";
import { useAuth } from "./useAuth";
import { AuthenticationContext } from "./AuthenticationContext";

const ProtectedRoute : FC = () => {
  const { isAuthenticated } = useAuth(AuthenticationContext);
  return (isAuthenticated ? <Outlet /> : <Navigate to="/login" />);
};

export default ProtectedRoute;
