import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SRLWrapper } from "simple-react-lightbox";
import { useNavigate } from "react-router-dom";

// hooks
import useAlbum from "../hooks/useAlbum";
import useCreateReviewAlbum from "../hooks/useCreateReviewAlbum";

// svg
import ThumbsUp from "../svg/ThumbsUp";
import ThumbsDown from "../svg/ThumbsDown";
import Heart from "../svg/Heart";
import Trashcan from "../svg/Trashcan";

const ReviewAlbum = () => {
  const params = useParams();
  const navigate = useNavigate();
  // hook functions
  const { albumData } = useAlbum(params.id, false);
  const { createReviewAlbum, error } = useCreateReviewAlbum();
  // state
  const [allImages, setAllImages] = useState([]);
  const [likedImages, setLikedImages] = useState([]);
  const [dislikedImages, setDislikedImages] = useState([]);

  // when we have the album data images put it in a state
  useEffect(() => {
    if (albumData) {
      console.log(albumData);
      setAllImages(albumData.images);
    }
  }, [albumData]);

  // add the image to the liked image array
  const likeImage = (data) => {
    const newAllImages = allImages.filter((img) => img.id !== data.id);
    setAllImages(newAllImages);
    setLikedImages([...likedImages, data]);
  };

  // add the image to the dislike array
  const dislikeImage = (data) => {
    const newAllImages = allImages.filter((img) => img.id !== data.id);
    setAllImages(newAllImages);
    setDislikedImages([...dislikedImages, data]);
  };

  // remove from the like array
  const deleteFromLiked = (id) => {
    const removedImage = likedImages.filter((img) => img.id === id);
    const newImages = likedImages.filter((img) => img.id !== id);
    setAllImages([...allImages, removedImage[0]]);
    setLikedImages(newImages);
  };
  // remove from the dislike array
  const deleteFromDisliked = (id) => {
    const removedImage = dislikedImages.filter((img) => img.id === id);
    const newImages = dislikedImages.filter((img) => img.id !== id);
    setAllImages([...allImages, removedImage[0]]);
    setDislikedImages(newImages);
  };
  // handle the attempt to create a new review album
  const handleSubmit = async () => {
    // create dates to make render the date and time of the review
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    let time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateOfCreation = ` ${date.toString()} at ${time.toString()}`;

    // create review album
    createReviewAlbum("albums", {
      ...albumData,
      images: likedImages,
      title: albumData.title + dateOfCreation,
    });
    navigate("/review/finished");
  };

  return (
    <div>
      <div className="border-b-2 my-12">
        {albumData && (
          <h2 className="header-md sm:header-lg text-center">
            {albumData.title}
          </h2>
        )}
      </div>
      {likedImages.length > 0 && (
        <div className="flex flex-wrap justify-center items-center flex-col border-b-2">
          <div>
            <div className="flex items-center">
              <h3 className="header-sm mr-2 mb-0">Images to save</h3>
              <Heart />
            </div>
            <span className="italic text-primary">
              (click on image to delete it)
            </span>
          </div>
          <div className="flex flex-wrap justify-center">
            {likedImages.map((image, index) => (
              <img
                className="w-32 h-32 object-cover shadow-md m-2 border-green-600 border-4 hover:opacity-75 cursor-pointer hover:border-rose-600 hover:border-8"
                key={index}
                src={image.downUrl}
                alt={image.id}
                onClick={() => deleteFromLiked(image.id)}
              />
            ))}
          </div>
        </div>
      )}
      {dislikedImages.length > 0 && (
        <div className="flex flex-wrap justify-center items-center flex-col border-b-2">
          <div>
            <div className="flex items-center">
              <h3 className="header-sm mr-2 mb-0">Images to remove</h3>
              <Trashcan />
            </div>
            <span className="italic text-primary">
              (click on image to delete it)
            </span>
          </div>
          <div className="flex flex-wrap justify-center">
            {dislikedImages.map((image, index) => (
              <img
                className="w-32 h-32 object-cover shadow-md m-2 border-rose-600 border-4 hover:border-8 hover:opacity-75 cursor-pointer"
                key={index}
                src={image.downUrl}
                alt={image.id}
                onClick={() => deleteFromDisliked(image.id)}
              />
            ))}
          </div>
        </div>
      )}
      {allImages.length < 1 && (
        <div className="flex justify-center">
          <button className="btn-primary bg-green-600" onClick={handleSubmit}>
            Submit Images
          </button>
          {error && <span className="warning-popup">NOT Created :(</span>}
        </div>
      )}

      <SRLWrapper>
        <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-4 p-5">
          {allImages &&
            allImages.map((image) => (
              <div key={image.id}>
                <div className="flex justify-center mb-5">
                  <button
                    className="btn-primary bg-green-600"
                    onClick={() => likeImage(image)}
                  >
                    <ThumbsUp />
                  </button>
                  <button
                    className="btn-primary bg-rose-600 ml-2"
                    onClick={() => dislikeImage(image)}
                  >
                    <ThumbsDown />
                  </button>
                </div>
                <img
                  src={image.downUrl}
                  alt={image.id}
                  className="w-full max-h-96 object-contain hover:cursor-pointer hover:scale-105 transition ease-out duration-300"
                />
              </div>
            ))}
        </div>
      </SRLWrapper>
    </div>
  );
};

export default ReviewAlbum;
