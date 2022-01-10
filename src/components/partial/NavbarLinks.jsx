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
            className="mb-2 ml-0 sm:mb-4 sm:ml-4 text-lg sm:text-base border-b-2 sm:border-none p-2 sm:p-0 hover:opacity-75"
          >
            Albums
          </Link>
          <Link
            to="/albums/create"
            className="mb-2 ml-0 sm:mb-4 sm:ml-4 text-lg sm:text-base border-b-2 sm:border-none p-2 sm:p-0 hover:opacity-75"
          >
            Create Album
          </Link>
          <Link
            to="/logout"
            className="mb-2 ml-0 sm:mb-4 sm:ml-4 text-lg sm:text-base border-b-2 sm:border-none p-2 sm:p-0 hover:opacity-75"
          >
            Logout
          </Link>
        </>
      )}
      {!user && (
        <>
          <Link
            to="/"
            className="mb-2 ml-0 sm:mb-4 sm:ml-4 text-lg sm:text-base border-b-2 sm:border-none p-2 sm:p-0 hover:opacity-75"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="mb-2 ml-0 sm:mb-4 sm:ml-4 text-lg sm:text-base border-b-2 sm:border-none p-2 sm:p-0 hover:opacity-75"
          >
            Register
          </Link>
        </>
      )}
    </>
  );
};

export default NavbarLinks;
