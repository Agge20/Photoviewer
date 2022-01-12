import React, { useState, useRef } from "react";
// packages
import { useParams } from "react-router-dom";
import { SRLWrapper } from "simple-react-lightbox";
import ProgressBar from "@ramonak/react-progress-bar";
//hooks
import useAddImageToAlbum from "../hooks/useAddImageToAlbum";
import useAlbum from "../hooks/useAlbum";
import useDeleteAlbum from "../hooks/useDeleteAlbum";
import useDeleteImage from "../hooks/useDeleteImage";
import useUpdateAlbum from "../hooks/useUpdateAlbum.js";
// components
import CreateAlbumFromImgs from "../components/CreateAlbumFromImgs";

// svg
import Chain from "../svg/Chain";
import Plus from "../svg/Plus";
import TrashcanWhite from "../svg/TrashcanWhite";

const Album = () => {
  const params = useParams();
  const newTitle = useRef();

  const [showTitleEditor, setShowTitleEditor] = useState(false);
  const [newAlbumImages, setNewAlbumImages] = useState([]);
  const { deleteAlbum, error: deleteAlbumError } = useDeleteAlbum();
  const { deleteImage, error: deleteImageError } = useDeleteImage();

  const { updateTitle } = useUpdateAlbum(params.id);
  const { albumData, unAuthUser } = useAlbum(params.id, true);
  const {
    loading,
    error: imageUploadErr,
    addImage,
    progress,
  } = useAddImageToAlbum();

  // on images files change
  const onFileChange = async (e) => {
    const files = e.target.files;
    // if user has added atleast one image
    if (files.length > 0) {
      // loop through files
      for (let i = 0; i < files.length; i++) {
        // trying to add each image to the album
        await addImage(params.id, e.target.files[i]);
      }
    }
  };

  // to change the current album title
  const handleTitleEdit = () => {
    if (!newTitle.current.value.length < 1) {
      updateTitle(newTitle.current.value) && setShowTitleEditor(false);
    } else {
      setShowTitleEditor(false);
    }
  };

  // to add images to a new album
  const addNewAlbumImage = (data) => {
    setNewAlbumImages([...newAlbumImages, data]);
  };

  // delete the entire current album
  const onDelete = () => {
    deleteAlbum(params.id);
  };
  // handle a specific image and send its id
  const handleDeleteImage = (imgId) => {
    deleteImage(imgId, params.id);
  };

  return (
    <>
      <div className="w-full mt-12">
        {unAuthUser && (
          <div className="header-md sm:header-lg text-red-600 sm:text-red-600 text-center">
            You are not the owner of this album...
          </div>
        )}
        {!unAuthUser && (
          <div className="flex flex-col justify-center items-center">
            <h2 className="header-md">Review Link</h2>
            <div className="inline text-center p-2 shadow-md bg-primary text-white">
              <div className="flex flex-col justify-center items-center">
                <span className="whitespace-pre-line">{`${window.origin}/review-album/${params.id}`}</span>
                <div
                  className="ml-2 mt-2 cursor-pointer hover:opacity-75"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${window.origin}/review-album/${params.id}`
                    );
                  }}
                >
                  <Chain />
                </div>
              </div>
            </div>
            {deleteAlbumError && <span>{deleteAlbumError.msg}</span>}
            {deleteImageError && <span>{deleteImageError.msg}</span>}
          </div>
        )}

        {albumData && (
          <div className="flex flex-col items-center justify-center max-w-96">
            <div className="flex flex-col items-center sm:items-start sm:flex-row p-6 border-b-2">
              <img
                src={albumData.coverUrl}
                alt={albumData.title}
                className="w-32 h-32 object-cover rounded-md mb-2"
              />
              <div>
                {!showTitleEditor && (
                  <div className="flex items-center">
                    <h2 className="header-sm sm:header-md mt-0 ml-5 mb-0">
                      {albumData.title}
                    </h2>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mb-0 ml-2 sm:ml-2 text-primary hover:opacity-75 cursor-pointer"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      onClick={() => setShowTitleEditor(true)}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </div>
                )}
                {showTitleEditor && (
                  <div>
                    <input
                      className="border-2 w-48 ml-5 rounded-full indent-2"
                      type="text"
                      placeholder="test"
                      maxLength="19"
                      ref={newTitle}
                      onKeyDown={(e) => e.key === "Enter" && handleTitleEdit()}
                    />
                  </div>
                )}
                <p className="ml-5">{albumData.desc}</p>
              </div>
            </div>
            <label className="font-bold mx-auto mt-5 mb-16 flex px-8 py-2 w-46 bg-primary text-white uppercase cursor-pointer hover:opacity-75 shadow-md rounded-md ">
              Upload Image
              <input
                id="cover"
                type="file"
                multiple
                //onChange={onCoverChange}
                className="input sm:w-64 mb-2"
                onChange={onFileChange}
                disabled={loading}
              />
            </label>
            <div className="w-64 sm:w-96">
              {progress > 0 && (
                <ProgressBar completed={progress} bgColor="#5863F8" />
              )}
            </div>

            {/* create new album in album */}
            <CreateAlbumFromImgs images={newAlbumImages} />
            {imageUploadErr && <span>{imageUploadErr}</span>}
          </div>
        )}
      </div>
      {!unAuthUser && (
        <div className="mb-8 flex flex-col sm:flex-row justify-center items-center">
          <button
            className="btn-warning--yellow flex w-48"
            onClick={() => setNewAlbumImages([])}
          >
            Clear Selected
            <TrashcanWhite />
          </button>
          <button
            className="bg-rose-600 btn-primary flex sm:ml-2 w-48"
            onClick={() => onDelete()}
          >
            Delete Album <TrashcanWhite />
          </button>
        </div>
      )}

      <div className="w-full p-5">
        {albumData && (
          <SRLWrapper>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16">
              {albumData.images.length > 0 &&
                albumData.images.map((img) => (
                  <div key={img.id}>
                    <div className="flex justify-center">
                      <button
                        onClick={() =>
                          addNewAlbumImage({ id: img.id, downUrl: img.downUrl })
                        }
                        className="h-8 w-8 mb-2 z-10 flex justify-center items-center bg-primary rounded-lg hover:bg-green-600"
                      >
                        <Plus />
                      </button>
                      <button
                        onClick={() => handleDeleteImage(img.id)}
                        className="h-8 w-8 mb-2 ml-1 z-10 flex justify-center items-center bg-rose-600 rounded-lg hover:opacity-75"
                      >
                        <TrashcanWhite />
                      </button>
                    </div>
                    <img
                      src={img.downUrl}
                      alt={img.id}
                      className="w-full max-h-96 object-contain hover:cursor-pointer hover:scale-105 transition ease-out duration-300"
                    />
                  </div>
                ))}
            </div>
          </SRLWrapper>
        )}
      </div>
    </>
  );
};

export default Album;
