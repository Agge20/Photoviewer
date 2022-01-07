import React from "react";
import { Link } from "react-router-dom";
import useGetDocuments from "../hooks/useGetDocuments";
import AlbumCard from "../components/AlbumCard.jsx";

const Albums = () => {
  const { albums } = useGetDocuments();

  return (
    <div className="flex justify-center flex-col items-center">
      <h2 className="header-lg mt-16">Here are your albums</h2>
      <div className="flex flex-wrap">
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
