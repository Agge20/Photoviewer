import React, { useRef, useState, useEffect } from "react";
import useCreateAlbum from "../hooks/useCreateAlbum";

const CreateAlbum = () => {
  const { createAlbum, finished, setFinished, loading } = useCreateAlbum();
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

    await createAlbum(
      "albums",
      {
        title: albumTitle.current.value,
        desc: albumDes.current.value,
      },
      albumCover
    );
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
      <h2 className="header-lg text-center">Create album</h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center"
      >
        {message && <span className="warning-popup">{message}</span>}
        <label htmlFor="cover" className="mb-2">
          Album cover
        </label>
        <input
          id="cover"
          type="file"
          onChange={onCoverChange}
          className="input sm:w-64 mb-2"
        />
        {albumCover && (
          <img
            className="w-64 h-64 object-cover shadow-lg"
            src={URL.createObjectURL(albumCover)}
            alt="Album Cover"
          />
        )}

        <label className="header-sm">Title</label>
        <input
          className="input w-64 sm:w-96"
          type="text"
          ref={albumTitle}
          maxLength="20"
        />
        <label className="header-sm">Description</label>
        <textarea className="input w-64 sm:w-96" ref={albumDes} />
        <button disabled={loading} className="btn-primary">
          Create Album...
        </button>
        {finished && (
          <span className="success-popup">Album created successfully 🥳</span>
        )}
      </form>
    </div>
  );
};

export default CreateAlbum;
