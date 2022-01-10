import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useGetAlbums from "../hooks/useGetAlbums";
import AlbumCard from "../components/AlbumCard.jsx";
import { useAuthContext } from "../context/AuthContext";

const Albums = () => {
  const { user } = useAuthContext();
  const { albums } = useGetAlbums();

  return (
    <div className="flex justify-center flex-col items-center">
      {user && (
        <div className="mt-2 flex justify-center text-center">
          <p>
            Hello, you are logged in as:
            <span className="text-primary"> {user.email}</span>
          </p>
        </div>
      )}
      <h2 className="header-sm sm:header-lg mt-16">Here are your albums</h2>
      <div className="flex flex-wrap justify-center">
        {/* to create a new album */}
        <Link
          to="/albums/create"
          className="w-64 h-64 shadow-lg m-4 flex flex-col justify-center items-center 
        hover:pointer hover:cursor-pointer hover:scale-110 transition ease-out duration-300 
        hover:after:content-['Create_New_Album'] after:content-['Create_New_Album'] text-white hover:text-primary uppercase"
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
        {albums &&
          albums.map((album) => <AlbumCard key={album.id} album={album} />)}
      </div>
    </div>
  );
};

export default Albums;
