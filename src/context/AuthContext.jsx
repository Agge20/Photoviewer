import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase/index";

const AuthContext = createContext();

const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // function to register a new user
  const register = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // function to login a registered user
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    // run code on auth-change
    onAuthStateChanged(auth, (user) => {
      console.log("user changed. User is now: ", user);
      setUser(user);
    });
  }, []);

  // the values that shall be provided to the children
  const contextValues = {
    register,
    login,
    user,
  };

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

export { useAuthContext, AuthContextProvider as default };
