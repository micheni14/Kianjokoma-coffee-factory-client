import React from "react";

import { Outlet, Navigate, useLocation } from "react-router-dom";
const Auth = () => {
  const location = useLocation();
  let token = localStorage.getItem("userToken");
  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default Auth;
