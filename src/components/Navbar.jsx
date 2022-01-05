import React, { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user } = useAuthContext();

  return (
    <nav className="w-full flex justify-between bg-primary h-12 p-3 font-mont text-white">
      <div>
        <h2 className="uppercase font-bold">Photoviewer</h2>
      </div>
      <div>
        {/* if user is logged in */}
        {user && (
          <>
            <Link to="/albums" className="font-medium m-2">
              Albums
            </Link>
            <Link to="/albums/create" className="font-medium m-2">
              Create Album
            </Link>
          </>
        )}
        {!user && (
            <Link to="/" className="font-medium">
              Login
            </Link>
          ) && (
            <Link to="/register" className="font-medium">
              Register
            </Link>
          )}
      </div>
    </nav>
  );
};

export default Navbar;
