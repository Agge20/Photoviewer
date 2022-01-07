import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useAddImageToAlbum from "../hooks/useAddImageToAlbum";

const Album = () => {
  const params = useParams();
  const [imageFile, setImageFile] = useState();
  const {
    finished: imageUploadFinished,
    error: imageUploadErr,
    addImage,
  } = useAddImageToAlbum();

  const onFileChange = (e) => {
    console.log(e.target.files[0]);
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addImage(params.id, imageFile);
  };
  return (
    <>
      <div className="border-2 w-full mt-12">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center"
        >
          <label className="font-bold mx-auto flex px-8 py-2 w-40 bg-primary text-white uppercase cursor-pointer hover:opacity-75 shadow-md rounded-md">
            Add Image
            <input
              id="cover"
              type="file"
              //onChange={onCoverChange}
              className="input sm:w-64 mb-2"
              onChange={onFileChange}
            />
          </label>
          <button className=" w-40 btn-primary-inverted" type="submit">
            Add Image
          </button>
          {imageUploadErr && <span>{imageUploadErr}</span>}
        </form>
      </div>
      <div>images in album goes here</div>
    </>
  );
};

export default Album;
