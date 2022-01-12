import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const Logout = () => {
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const logoutNow = async () => {
      await logout();
    };
    logoutNow();
    navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1 className="header-lg">Please wait, you are being logged out...</h1>
    </>
  );
};

export default Logout;
