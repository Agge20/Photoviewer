import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const Logout = () => {
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  useEffect(async () => {
    await logout();
    console.log("user logged out");
    navigate("/");
  }, []);

  return (
    <>
      <h1 className="header-lg">Please wait, you are being logged out...</h1>
    </>
  );
};

export default Logout;
