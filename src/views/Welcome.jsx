import React, { useRef, useState } from "react";
// packages
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// context
import { useAuthContext } from "../context/AuthContext";

const Welcome = () => {
  const navigate = useNavigate();
  const { login } = useAuthContext();
  const [error, setError] = useState(null);
  const email = useRef();
  const password = useRef();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(email.current.value, password.current.value);
      navigate("/albums");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="h-min-screen flex flex-col justify-center items-center mt-12 ">
      <h1 className="header-md sm:header-lg p-2 text-center">
        Welcome, please log in
      </h1>
      {error && <span className="font-bold text-primary">{error}</span>}
      <form onSubmit={handleLogin} className="flex flex-wrap">
        <div className="flex flex-wrap justify-center items-center w-full sm:w-auto">
          <input
            type="email"
            className="input"
            ref={email}
            placeholder="Email..."
          />
          <input
            type="password"
            className="input"
            ref={password}
            placeholder="Password..."
          />
        </div>
        <div className="flex justify-center items-center w-full sm:w-auto mb-8 sm:mb-0">
          <button className="btn-primary ml-2 mt-2">Login</button>
        </div>
      </form>
      <h3 className="header-md mb-2 text-center">Don't have an account?</h3>
      <Link to="/register" className="btn-primary mt-0">
        Register
      </Link>
    </div>
  );
};

export default Welcome;
