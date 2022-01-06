import React from "react";
import { Link } from "react-router-dom";

const Albums = () => {
  return (
    <div className="flex justify-center flex-col items-center">
      <h2 className="header-md">Here are your albums</h2>
      <h3>Add a new album</h3>
      {/* to create a new album */}
      <Link
        to="/albums/create"
        className="w-64 h-64 shadow-lg mt-2 flex flex-col justify-center items-center hover:pointer hover:cursor-pointer hover:scale-110 transition ease-out duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </Link>
      <div></div>
    </div>
  );
};

export default Albums;
