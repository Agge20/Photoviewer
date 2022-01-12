import React, { useRef, useEffect, useState } from "react";
// packages
import { useNavigate } from "react-router-dom";
// context
import { useAuthContext } from "../context/AuthContext";

const Register = () => {
  const { register } = useAuthContext();
  const navigate = useNavigate();
  const email = useRef();
  const password = useRef();
  const [error, setError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    // try and create a new auth-user
    try {
      await register(email.current.value, password.current.value);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-24">
      <h2 className="text-4xl mb-6">Register</h2>{" "}
      {error && <span className="font-bold text-rose-600">{error}</span>}
      <form onSubmit={handleRegister}>
        <input
          type="email"
          className="input"
          ref={email}
          placeholder="Email..."
        />
        <input
          className="input"
          ref={password}
          placeholder="Password..."
          type="password"
        />
        <button className="btn-primary ml-2">Register</button>
      </form>
    </div>
  );
};

export default Register;
