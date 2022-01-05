import React, { useRef, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const [error, setError] = useState(null);
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const { login } = useAuthContext();

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
      <h1 className="header-lg">Welcome, please log in</h1>
      {error && <span className="font-bold text-primary">{error}</span>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          className="border-2 rounded-lg"
          ref={email}
          placeholder="Email..."
        />
        <input
          type="password"
          className="border-2 ml-2 rounded-lg"
          ref={password}
          placeholder="Password..."
        />
        <button className="btn-red">Login</button>
      </form>
      <h3 className="header-md">Don't have an account?</h3>

      <Link to="/register" className="btn-red">
        Register
      </Link>
    </div>
  );
};

export default Welcome;
