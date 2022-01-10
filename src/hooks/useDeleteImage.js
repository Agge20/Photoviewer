import { useState } from "react";
import { doc, deleteDoc, getDoc, updateDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { db, storage } from "../firebase/index";

const useDeleteImage = () => {
  const [error, setError] = useState(null);

  const deleteImage = async (id, albumId) => {
    const albumRef = doc(db, "albums", albumId);
    const album = await getDoc(albumRef);
    const albumData = album.data();

    const imageToDelete = albumData.images.filter((img) => img.id === id);
    const imageRef = ref(storage, imageToDelete[0].imagePath);

    const newAlbumImages = albumData.images.filter((img) => img.id !== id);

    // try to delete the image from storage
    try {
      // try to delete the image from storage
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
