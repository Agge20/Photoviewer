import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Redirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, []);
  return <div>redirecting...</div>;
};

export default Redirect;
