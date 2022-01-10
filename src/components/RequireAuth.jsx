import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const RequireAuth = ({ children, redirectTo }) => {
  const { user } = useAuthContext();

  return user ? children : <Navigate to={redirectTo} />;
};

export default RequireAuth;
