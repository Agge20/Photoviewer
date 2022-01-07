import React, { useRef, useState, useEffect } from "react";
import useCreateAlbum from "../hooks/useCreateAlbum";

const CreateAlbum = () => {
  const { createAlbum, finished, setFinished, loading, error } =
    useCreateAlbum();
  const [message, setMessage] = useState(null);

  const albumTitle = useRef();
  const albumDes = useRef();
  const [albumCover, setAlbumCover] = useState(null);

  // on file cover image file change
  const onCoverChange = (e) => {
    if (e.target.files[0]) {
      setAlbumCover(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!albumTitle.current.value || albumCover === null) {
      setMessage("Please enter a title and a album cover image...");
      return;
    }
    // create the new album
    await createAlbum(
      "albums",
      {
        title: albumTitle.current.value,
        desc: albumDes.current.value,
      },
      albumCover
    );
    albumTitle.current.value = "";
    albumDes.current.value = "";
    setAlbumCover(null);
  };

  // make message popup disappear
  useEffect(() => {
    const timeId = setTimeout(() => {
      // After 3 seconds set the show value to false
      setMessage(null);
      setFinished(false);
    }, 4000);

    return () => {
      clearTimeout(timeId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message, finished]);

  return (
    <div>
      <h2 className="header-lg text-center">Create Album</h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center"
      >
        {message && <span className="warning-popup">{message}</span>}
        <label htmlFor="cover" className="header-sm mb-3">
          Album Cover
        </label>
        <label className="flex px-8 py-2 bg-primary text-white uppercase cursor-pointer hover:opacity-75 shadow-md rounded-md">
          Upload
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
            />
          </svg>
          <input
            id="cover"
            type="file"
            onChange={onCoverChange}
            className="input sm:w-64 mb-2"
          />
        </label>

        {albumCover && (
          <img
            className="w-64 h-64 mt-5 object-cover shadow-lg"
            src={URL.createObjectURL(albumCover)}
            alt="Album Cover"
          />
        )}

        <label className="header-sm mb-3">Title</label>
        <input
          className="input w-64 sm:w-96"
          type="text"
          ref={albumTitle}
          maxLength="20"
        />
        <label className="header-sm mb-3">Description</label>
        <textarea
          className="input w-64 sm:w-96"
          ref={albumDes}
          maxLength="56"
        />
        <button className="btn-primary">Create Album</button>
        {finished && (
          <span className="success-popup">Album created successfully 🥳</span>
        )}
        {error && <span className="warning-popup">{error}</span>}
      </form>
    </div>
  );
};

export default CreateAlbum;
