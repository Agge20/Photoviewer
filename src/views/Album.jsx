import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAddImageToAlbum from "../hooks/useAddImageToAlbum";
import useAlbum from "../hooks/useAlbum";

const Album = () => {
  const params = useParams();
  const { albumData } = useAlbum(params.id);

  const { loading, error: imageUploadErr, addImage } = useAddImageToAlbum();

  const onFileChange = async (e) => {
    console.log(e.target.files[0]);
    if (e.target.files[0]) {
      await addImage(params.id, e.target.files[0]);
    }
  };

  useEffect(() => {
    console.log("albumdata: ", albumData);
  }, [albumData]);

  return (
    <>
      <div className="w-full mt-12">
        <form className="flex flex-col justify-center items-center">
          <label className="font-bold mx-auto mb-32 flex px-8 py-2 w-46 bg-primary text-white uppercase cursor-pointer hover:opacity-75 shadow-md rounded-md ">
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
        </form>
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
