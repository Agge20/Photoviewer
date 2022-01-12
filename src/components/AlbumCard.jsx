// packages
import React from "react";
import { Link } from "react-router-dom";

// component that renders a small album box/card on the albums page
const AlbumCard = ({ album }) => {
  return (
    <Link
      to={`/album/${album.id}`}
      className="w-64 h-64 shadow-lg m-4 border-red-300 hover:scale-110 transition ease-out duration-300 hover:cursor-pointer"
    >
      <div>
        <img
          src={album.coverUrl}
          alt={album.title}
          className="max-h-36 w-full object-cover"
        />
      </div>
      <div>
        <h4 className="header-sm ml-2 mb-2 mt-2 p-1">{album.title}</h4>
      </div>
    </Link>
  );
};

export default AlbumCard;
