import React from "react";
import { Navigate } from "react-router-dom";

interface AdminRouteProps {
  component: React.ComponentType<any>;
  [key: string]: any;
}

const AdminRoute: React.FC<AdminRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const isAuthenticated = !!localStorage.getItem("token");
  const isAdmin = localStorage.getItem("is_admin") === "true";

  return isAuthenticated && isAdmin ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/home" />
  );
};

export default AdminRoute;
