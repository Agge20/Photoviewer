import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import useAddImageToAlbum from "../hooks/useAddImageToAlbum";
import useAlbum from "../hooks/useAlbum";
import useUpdateAlbum from "../hooks/useUpdateAlbum.js";
import { SRLWrapper } from "simple-react-lightbox";
import CreateAlbumFromImgs from "../components/CreateAlbumFromImgs";
import useDeleteAlbum from "../hooks/useDeleteAlbum";
import useDeleteImage from "../hooks/useDeleteImage";

// svg
import Chain from "../svg/Chain";
import Plus from "../svg/Plus";
import TrashcanWhite from "../svg/TrashcanWhite";

const Album = () => {
  const params = useParams();
  const newTitle = useRef();
  const [showTitleEditor, setShowTitleEditor] = useState(false);
  const [newAlbumImages, setNewAlbumImages] = useState([]);
  const { deleteAlbum } = useDeleteAlbum();
  const { deleteImage } = useDeleteImage();

  const { updateTitle } = useUpdateAlbum(params.id);
  const { albumData } = useAlbum(params.id);
  const { loading, error: imageUploadErr, addImage } = useAddImageToAlbum();

  const onFileChange = async (e) => {
    console.log(e.target.files[0]);
    if (e.target.files[0]) {
      await addImage(params.id, e.target.files[0]);
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

  const onDelete = () => {
    deleteAlbum(params.id);
  };

  const handleDeleteImage = (imgId) => {
    deleteImage(imgId, params.id);
  };

  return (
    <>
      <div className="w-full mt-12">
        <div className="flex flex-col justify-center items-center">
          <h2 className="header-md">Review Link</h2>
          <div className="inline text-center p-2 shadow-md bg-primary text-white">
            <div className="flex">
              <span>{`${window.origin}/review-album/${params.id}`}</span>
              <div
                className="ml-2 cursor-pointer hover:opacity-75"
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
        </div>

        {albumData && (
          <div className="flex flex-col items-center justify-center max-w-96">
            <div className="flex items-start p-6 border-b-2">
              <img
                src={albumData.coverUrl}
                alt={albumData.title}
                className="w-32 h-32 object-cover rounded-md"
              />
              <div>
                {!showTitleEditor && (
                  <div className="flex items-center">
                    <h2 className="header-md mt-0 ml-5">{albumData.title}</h2>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mb-5 ml-2 text-primary hover:opacity-75 cursor-pointer"
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
                //onChange={onCoverChange}
                className="input sm:w-64 mb-2"
                onChange={onFileChange}
                disabled={loading}
              />
            </label>

            {/* create new album in album */}
            <CreateAlbumFromImgs images={newAlbumImages} />
            {imageUploadErr && <span>{imageUploadErr}</span>}
          </div>
        )}
      </div>
      <div className="mb-8 flex">
        <button
          className="btn-warning--yellow flex"
          onClick={() => setNewAlbumImages([])}
        >
          Clear Selected{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
        <button
          className="bg-rose-600 btn-primary flex ml-2"
          onClick={() => onDelete()}
        >
          Delete Album <TrashcanWhite />
        </button>
      </div>
      <div className="w-full">
        {albumData && (
          <SRLWrapper>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16">
              {albumData.images.length > 0 &&
                albumData.images.map((img) => (
                  <div key={img.id}>
                    <div className="flex">
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
                      className="w-full max-h-96 object-contain hover:cursor-pointer hover:scale-110 transition ease-out duration-300"
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
