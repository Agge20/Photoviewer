import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const NavbarLinks = () => {
  const { user } = useAuthContext();
  return (
    <>
      {/* if user is logged in */}
      {user && (
        <>
          <Link
            to="/albums"
            className="font-medium mb-4  hover:text-secondary text-base sm:text-base border-b-2 sm:border-none pb-2"
          >
            Albums
          </Link>
          <Link
            to="/albums/create"
            className="font-medium mb-4 ml-4 hover:text-secondary text-base  sm:text-base border-b-2 sm:border-none pb-2"
          >
            Create Album
          </Link>
          <Link
            to="/logout"
            className="hover:text-secondary text-base mb-2 ml-4 sm:text-base border-b-2 sm:border-none pb-2 "
          >
            Logout
          </Link>
        </>
      )}
      {!user && (
        <>
          <Link
            to="/"
            className="font-medium text-base mb-2 ml-4 sm:text-base border-b-2 sm:border-none pb-2 "
          >
            Login
          </Link>

          <Link
            to="/register"
            className="font-medium ml-2 mb-4 text-base sm:text-base border-b-2 sm:border-none pb-2"
          >
            Register
          </Link>
        </>
      )}
    </>
  );
};

export default NavbarLinks;
