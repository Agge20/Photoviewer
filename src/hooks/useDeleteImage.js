import { useState } from "react";
// firebase
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { db, storage } from "../firebase/index";

// hook to delete a single image from an album
const useDeleteImage = () => {
  const [error, setError] = useState(null);

  const deleteImage = async (id, albumId) => {
    const albumRef = doc(db, "albums", albumId);
    const album = await getDoc(albumRef);
    const albumData = album.data();
    // loop through the album-images and check which image has a macthed id
    const imageToDelete = albumData.images.filter((img) => img.id === id);
    const imageRef = ref(storage, imageToDelete[0].imagePath);
    // return all the images that shall remain
    const newAlbumImages = albumData.images.filter((img) => img.id !== id);
    // try to delete the image from storage
    try {
      await deleteObject(imageRef);
      await updateDoc(albumRef, {
        images: [...newAlbumImages],
      });
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };

  return {
    deleteImage,
    error,
  };
};

export default useDeleteImage;
