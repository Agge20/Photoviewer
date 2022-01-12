import React from "react";
// packages
import { Link } from "react-router-dom";
// hooks
import useGetAlbums from "../hooks/useGetAlbums";
// components
import AlbumCard from "../components/AlbumCard.jsx";
// context
import { useAuthContext } from "../context/AuthContext";
// svg
import PlusCirclePurple from "../svg/PlusCirclePurple";

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
          <PlusCirclePurple />
        </Link>
        {albums &&
          albums.map((album) => <AlbumCard key={album.id} album={album} />)}
      </div>
    </div>
  );
};

export default Albums;
