import { useState } from "react";
import { doc, deleteDoc, getDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { db, storage } from "../firebase/index";
import { useNavigate } from "react-router-dom";

const useDeleteAlbum = () => {
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const deleteAlbum = async (id) => {
    setError(null);
    // get the album doc ref
    const docRef = doc(db, "albums", id);

    const album = await getDoc(docRef);
    const albumData = album.data();

    console.log(albumData);
    // loop through each album image and delete it from storage

    for (const img of albumData.images) {
      // Create a reference to the file to delete
      const imageRef = ref(storage, img.imagePath);

      try {
        // try to delete the image from storage
        await deleteObject(imageRef);
      } catch (err) {
        setError(err);
      }
    }

    const albumRef = doc(db, "albums", id);
    // try to delete the album document
    try {
      await deleteDoc(albumRef);
      navigate("/albums");
    } catch (err) {
      setError(err);
    }
  };
  return {
    deleteAlbum,
    error,
  };
};

export default useDeleteAlbum;
