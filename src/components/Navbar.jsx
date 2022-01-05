import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full flex justify-between bg-rose-600 h-12 p-3 font-mont text-white">
      <div>
        <h2 className="uppercase font-bold">Photoviewer</h2>
      </div>
      <div>
        <Link to="/" className="font-medium">
          Home
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
