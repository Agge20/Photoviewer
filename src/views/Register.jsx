import React, { useRef, useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register } = useAuthContext();
  const navigate = useNavigate();
  const email = useRef();
  const password = useRef();
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("email value is now: ", email.current.value);
    console.log("password value is now: ", password.current.value);
  }, [email, password]);

  const handleRegister = async (e) => {
    e.preventDefault();

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
