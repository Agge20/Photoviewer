import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import useAddImageToAlbum from "../hooks/useAddImageToAlbum";
import useAlbum from "../hooks/useAlbum";
import useUpdateAlbum from "../hooks/useUpdateAlbum.js";

const Album = () => {
  const params = useParams();
  const newTitle = useRef();
  const [showTitleEditor, setShowTitleEditor] = useState(false);

  const { updateTitle } = useUpdateAlbum(params.id);
  const { albumData } = useAlbum(params.id);
  const { loading, error: imageUploadErr, addImage } = useAddImageToAlbum();

  const onFileChange = async (e) => {
    console.log(e.target.files[0]);
    if (e.target.files[0]) {
      await addImage(params.id, e.target.files[0]);
    }
  };

  return (
    <>
      <div className="w-full mt-12">
        {albumData && (
          <div className="flex flex-col items-center justify-center max-w-96">
            <div className="flex items-start p-6 border-b-2">
              <img
                src={albumData.coverUrl}
                alt={albumData.title}
                className="w-32 h-32 object-cover mb-"
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
                      onKeyDown={(e) =>
                        e.key === "Enter" &&
                        updateTitle(newTitle.current.value) &&
                        setShowTitleEditor(false)
                      }
                    />
                  </div>
                )}
                <p className="ml-5">{albumData.desc}</p>
              </div>
            </div>
            <label className="font-bold mx-auto mt-5 mb-32 flex px-8 py-2 w-46 bg-primary text-white uppercase cursor-pointer hover:opacity-75 shadow-md rounded-md ">
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
            {imageUploadErr && <span>{imageUploadErr}</span>}
          </div>
        )}
      </div>
      <div className="h-96 w-full">
        {" "}
        {albumData && (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16">
            {albumData.images.length &&
              albumData.images.map((img) => (
                <img
                  key={img.id}
                  src={img.downUrl}
                  alt={img.id}
                  className="w-full max-h-96 object-contain hover:cursor-pointer hover:scale-125 transition ease-out duration-300"
                />
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Album;
