import React, { useState, useEffect } from "react";
import NavbarLinks from "./partial/NavbarLinks";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [showNav, setShowNav] = useState(false);
  // hide nav when you enter a new route
  useEffect(() => {
    setShowNav(false);
  }, [navigate]);
  return (
    <nav className="w-full flex justify-between bg-primary h-12 p-3 font-mont text-white sm:rounded-b-xl shadow-xl">
      <div>
        <h2 className="uppercase font-bold text-white">Photoviewer 📷</h2>
      </div>
      <div
        className="w-8 h-6 flex flex-col justify-between sm:hidden cursor-pointer  hover:scale-105 transition ease-out duration-200 "
        onClick={() => setShowNav(!showNav)}
      >
        <div className="h-1 w-full bg-white"></div>
        <div className="h-1 w-full bg-white"></div>
        <div className="h-1 w-full bg-white"></div>
      </div>
      {showNav && (
        <div className="py-12 bg-primary w-screen absolute top-12 left-0 h-auto sm:hidden flex flex-col justify-center items-center ">
          <NavbarLinks />
        </div>
      )}

      <div className="hidden sm:block">
        <NavbarLinks />
      </div>
    </nav>
  );
};

export default Navbar;
