import React, { useState } from "react";
import CreateAlbum from "../views/CreateAlbum";

const CreateAlbumFromImgs = ({ images }) => {
  const [showCreateAlbum, setShowCreateAlbum] = useState(false);
  return (
    <div className="flex flex-col mb-12">
      {showCreateAlbum && (
        <div className="flex flex-col justify-center items-center border-t-2 border-b-2 mb-12">
          <CreateAlbum
            images={images}
            onClick={() => setShowCreateAlbum(!showCreateAlbum)}
          />
          <button
            className="btn-primary mx-auto mb-5"
            onClick={() => setShowCreateAlbum(!showCreateAlbum)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
          </button>
        </div>
      )}
      {!showCreateAlbum && (
        <>
          <h3 className="header-md mb-2 text-center">Create New Album</h3>
          <button
            className="btn-primary mx-auto mb-5 mt-2"
            onClick={() => setShowCreateAlbum(!showCreateAlbum)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </>
      )}
      {/* render the selected images */}
      <div>
        <h3 className="header-sm text-center border-b-2 pb-2">
          Selected Images
        </h3>
        <div className="flex flex-wrap">
          {images &&
            images.map((image, index) => (
              <img
                className="w-32 h-32 m-2 object-cover shadow-lg"
                src={image.downUrl}
                alt="Album Cover"
                key={index}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default CreateAlbumFromImgs;
