import React, { useEffect } from "react";
// packages
import { useNavigate } from "react-router-dom";

const Redirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div>redirecting...</div>;
};

export default Redirect;
